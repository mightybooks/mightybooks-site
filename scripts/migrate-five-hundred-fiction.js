/* eslint-disable @typescript-eslint/no-require-imports */
const { createClient } = require('@supabase/supabase-js')
const fs = require('node:fs')
const path = require('node:path')

const TARGET_SLUGS = Object.freeze([
  'askmoon-exprimentsentence-500fic-diff', 'askmoon-novelsanmoondiff-500fic',
  'askmoon-500figamsang-diff', 'askmoon-500fic-sanmoon-diff', 'askmoon-location-500fic',
  'askmoon-dfiific500-sshortstory', 'askmoon-500ficdiffrule-sshort',
  'askmoon-short500fic-supershortfic-diff', 'askmoon-500ficshort-under',
  'askmoon-scene500-onecutrule-narrative', 'askmoon-first-ending-pressrule',
  'askmoon-500ficpress-ruleimportent', 'askmoon-500ficrule-emptyskill',
  'askmoon-shortrule-easyorhard', 'askmoon-shortrule-limit-structure',
  'askmoon-500fic-500plusminus', 'askmoon-rule-short-effectfic', 'askmoon-rule500-ficrule',
  'askmoon-500fic-completenarrative', 'askmoon-500fic-genrenarrative',
  'askmoon-whyfix-500fic500', 'askmoon-why500fic-500mean', '500fic-flashfic-diffaskmoon',
  'askmoon-equal-500ficmicro', 'askmoon-500ficshortstory-muchdiff',
  'diff-askmoon-shortvs500fic', 'askmoon-basic-500fic', 'askmoon-surimji-500fic',
  'askmoon-surimstudio-500fic', 'askmoon-diff-shortessay-story', 'askmoon-500fic-surimstudio',
  'askmoon-diff1-short500', 'askmoon-justonlyshort', 'askmoon-500ficwrite-diff',
  'askmoon-why-500fic', 'moonask-500-endandstart', 'askmoon-flash-fiction',
  'askmoon-500fic-structuretail', 'askmoon-microfiction-500fiction', 'ask-moon-whatis',
  'ask-moon-500fiction-sample', 'ask-reserch-500fiction', 'diff-novelstory-short',
  'shortdiff-500fiction-ask', 'moon-ask-500fiction', 'short-novel-rule',
  'moon-short-narative', '100word-500charater-diff', 'drabble-100word-diff',
  'microfiction-500-diffequa', 'microfiction-500-fixed', 'microfiction-stealcut-500',
  'microfiction-drabble-diff-500', 'microfiction-flashfiction-diff-moon',
  '500-diff-wordcount', '1000word-500charater-diff', 'moon-flashfiction-500',
  'sixword-story-other500', 'real-short-sixword', 'interview-moon-500', 'leaf-diff-500',
  'short-short-500', 'diff-handnovel-500', 'moon-500-short1', '500-character-fiction0001',
])

const EXPECTED_COUNT = TARGET_SLUGS.length
const SNAPSHOT_PATH = path.join(__dirname, 'five-hundred-fiction-rollback.json')
const mode = process.argv[2] || 'dry-run'
const url = process.env.NEXT_PUBLIC_SUPABASE_URL
const key = mode === 'dry-run'
  ? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  : process.env.SUPABASE_SERVICE_ROLE_KEY

if (!url || !key) throw new Error('Supabase environment variables are missing.')
if (!['dry-run', 'apply', 'rollback'].includes(mode)) throw new Error(`Unknown mode: ${mode}`)

const supabase = createClient(url, key, { auth: { persistSession: false } })

async function fetchTargets(category) {
  const { data, error } = await supabase
    .from('posts')
    .select('id,title,slug,category,published,scheduled_at,created_at,updated_at')
    .in('slug', TARGET_SLUGS)
    .eq('category', category)
    .order('created_at', { ascending: false })
  if (error) throw error
  return data || []
}

function assertExactTargets(rows, expectedCategory) {
  if (rows.length !== EXPECTED_COUNT) {
    throw new Error(`Expected ${EXPECTED_COUNT} ${expectedCategory} rows, found ${rows.length}. Aborting.`)
  }
  const actual = new Set(rows.map(row => row.slug))
  const missing = TARGET_SLUGS.filter(slug => !actual.has(slug))
  if (missing.length) throw new Error(`Target mismatch: ${missing.join(', ')}`)
}

async function dryRun() {
  const rows = await fetchTargets('books')
  assertExactTargets(rows, 'books')
  console.table(rows.map(row => ({
    id: row.id, title: row.title, slug: row.slug, category: row.category,
    status: row.published ? 'published' : 'draft', publishedAt: row.scheduled_at || row.created_at,
    reason: '명시적으로 확인된 문수림 500자 소설 연재·정의·형식론·비교·질문형 콘텐츠',
  })))
  console.log(`Dry run only: ${rows.length} rows. No data changed.`)
}

async function apply() {
  const rows = await fetchTargets('books')
  assertExactTargets(rows, 'books')
  fs.writeFileSync(SNAPSHOT_PATH, JSON.stringify(rows.map(({ id, slug, category, updated_at }) => ({ id, slug, category, updated_at })), null, 2))
  const ids = rows.map(row => row.id)
  const { error } = await supabase.from('posts').update({ category: 'five_hundred_fiction' }).in('id', ids).eq('category', 'books')
  if (error) throw error
  const changed = await fetchTargets('five_hundred_fiction')
  assertExactTargets(changed, 'five_hundred_fiction')
  console.log(`Applied: ${changed.length} rows. Snapshot: ${SNAPSHOT_PATH}`)
}

async function rollback() {
  if (!fs.existsSync(SNAPSHOT_PATH)) throw new Error(`Rollback snapshot not found: ${SNAPSHOT_PATH}`)
  const snapshot = JSON.parse(fs.readFileSync(SNAPSHOT_PATH, 'utf8'))
  if (snapshot.length !== EXPECTED_COUNT) throw new Error('Rollback snapshot count mismatch. Aborting.')
  const current = await fetchTargets('five_hundred_fiction')
  assertExactTargets(current, 'five_hundred_fiction')
  const { error } = await supabase.from('posts').update({ category: 'books' }).in('id', snapshot.map(row => row.id)).eq('category', 'five_hundred_fiction')
  if (error) throw error
  const restored = await fetchTargets('books')
  assertExactTargets(restored, 'books')
  console.log(`Rolled back: ${restored.length} rows.`)
}

Promise.resolve(mode === 'dry-run' ? dryRun() : mode === 'apply' ? apply() : rollback())
  .catch(error => { console.error(error); process.exitCode = 1 })
