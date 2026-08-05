/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require('node:fs')
const path = require('node:path')
const { createClient } = require('@supabase/supabase-js')

const mode = process.argv[2] || 'dry-run'
const url = process.env.NEXT_PUBLIC_SUPABASE_URL
const key = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!['dry-run', 'apply'].includes(mode)) throw new Error(`Unknown mode: ${mode}`)
if (!url || !key) throw new Error('Supabase environment variables are missing.')

const supabase = createClient(url, key, { auth: { persistSession: false } })
const authorSlug = 'toke-eddie'
const bookSlug = 'glue-study'
const sampleDirectory = path.join(
  process.cwd(),
  'public',
  'library',
  'books',
  bookSlug,
  'pages'
)

const author = {
  slug: authorSlug,
  display_name: '에디',
  status: 'published',
  pen_name: null,
  occupation: null,
  profile_image_path: '/library/authors/toke-eddie/profile.png',
  short_bio: '2007년부터 무역 외길. 프린터기 부품 무역에서 속눈썹 연장 업계로 들어온 지 17년차 베테랑.',
  bio_paragraphs: [
    '본명은 유병용.',
    '2007년부터 무역 외길. 프린터기 부품 무역에서 속눈썹 연장 업계로 들어온 지 17년차 베테랑.',
    '지금은 쌍둥이 형과 함께 ‘똑똑하고 게으르게’라는 뜻의 TOKE라는 회사를 운영하며, 그저 파는 제품을 더 자세하게 알고 싶고 더 잘 알려주고 싶어서 원장님들과 함께 공부하는 책상물림 사장님.',
  ],
  display_order: 4,
  career_sections: [],
  social_links: [],
  external_links: [],
  press_enabled: false,
  press_items: [],
}

const bookDescription = '속눈썹 연장용 접착제(글루)에 대한 전문적인 화학 지식을 초보자 ‘하나’와 전문가 ‘에디’의 대화 형식으로 풀어낸 교육용 서적입니다.'

function inspectAssets() {
  const requiredFiles = [
    path.join(process.cwd(), 'public', 'library', 'authors', authorSlug, 'profile.png'),
    path.join(process.cwd(), 'public', 'library', 'books', bookSlug, 'cover.webp'),
  ]

  for (const file of requiredFiles) {
    if (!fs.existsSync(file)) throw new Error(`Required asset is missing: ${file}`)
  }

  const sampleFiles = fs.readdirSync(sampleDirectory)
    .filter(file => file.toLowerCase().endsWith('.webp'))
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))

  if (sampleFiles.length === 0) throw new Error('No sample pages were found.')

  sampleFiles.forEach((file, index) => {
    const expected = `gluesample${String(index + 1).padStart(3, '0')}.webp`
    if (file !== expected) {
      throw new Error(`Unexpected sample page order: expected ${expected}, found ${file}`)
    }
  })

  return sampleFiles
}

async function findExisting(table, slug) {
  const { data, error } = await supabase
    .from(table)
    .select('id,slug')
    .eq('slug', slug)
    .maybeSingle()

  if (error) throw error
  return data
}

async function run() {
  const sampleFiles = inspectAssets()
  const [existingAuthor, existingBook] = await Promise.all([
    findExisting('authors', authorSlug),
    findExisting('books', bookSlug),
  ])

  console.log(JSON.stringify({
    mode,
    author: { slug: authorSlug, action: existingAuthor ? 'update' : 'create' },
    book: { slug: bookSlug, title: '글루공부', action: existingBook ? 'update' : 'create' },
    samplePages: sampleFiles,
  }, null, 2))

  if (mode === 'dry-run') return

  const { data: authorId, error: authorError } = await supabase.rpc(
    'save_admin_library_author_v2',
    { p_author_id: existingAuthor?.id ?? null, p_author: author }
  )
  if (authorError) throw authorError

  const book = {
    slug: bookSlug,
    title: '글루공부',
    status: 'published',
    display_title: '글루공부',
    publisher_name: null,
    publication_label: null,
    cover_image_path: '/library/books/glue-study/cover.webp',
    cover_width: 3180,
    cover_height: 4500,
    short_description: bookDescription,
    description_paragraphs: [bookDescription],
    contents: [
      '화학을 전혀 몰라도 된다!',
      '인터넷 밈(meme)만 알아도 술술 쉽게 읽을 수 있는 책.',
    ],
    display_order: 4,
    authors: [{ author_id: authorId, role: 'author', sort_order: 0 }],
    sample_asset: {
      public_path_prefix: '/library/books/glue-study/pages/gluesample{page}',
      page_count: sampleFiles.length,
      file_extension: 'webp',
      filename_padding: 3,
      page_width: 3180,
      page_height: 4500,
      status: 'active',
    },
    reader_asset: null,
  }

  const { data: bookId, error: bookError } = await supabase.rpc(
    'save_admin_library_book',
    { p_book_id: existingBook?.id ?? null, p_book: book }
  )
  if (bookError) throw bookError

  console.log(`Applied author ${authorId} and book ${bookId}.`)
}

run().catch(error => {
  console.error(error.message)
  process.exitCode = 1
})
