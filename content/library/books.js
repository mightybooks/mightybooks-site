export const samplePages = Array.from({ length: 12 }, (_, index) => ({
  src: `/library/books/500fiction-sample/${String(index + 1).padStart(3, '0')}.png`,
  width: 3180,
  height: 4500,
}))

export const gazeBeforePerfectGermanSamplePages = Array.from({ length: 14 }, (_, index) => ({
  src: `/library/books/gaze-before-perfect-german/pages/${String(index + 1).padStart(3, '0')}.webp`,
  width: 2531,
  height: 4500,
}))

export const myHeartSaidLookLongerSamplePages = Array.from({ length: 18 }, (_, index) => ({
  src: `/library/books/my-heart-said-look-longer/pages/${String(index + 1).padStart(3, '0')}.webp`,
  width: 3180,
  height: 4500,
}))

export const libraryBooks = [
  {
    slug: '500-character-fiction',
    title: '500자 소설',
    displayTitle: '문수림의 500자 소설',
    authorSlug: 'moon-surim',
    authorName: '문수림',
    publisher: '수림 스튜디오',
    publication: '2026년 3월 출간',
    coverImage: '/library/books/500-character-fiction/cover.png',
    coverWidth: samplePages[0].width,
    coverHeight: samplePages[0].height,
    shortDescription:
      '짧은 분량 안에서 인물, 상황, 사건과 변화를 밀도 있게 담아내는 문수림 작가의 500자 소설을 한 권으로 만납니다.',
    description: [
      '『500자 소설』은 ‘500자’라는 분량 제한을 하나의 조건으로 삼아 쓰인 단편소설 실험의 결과물이다. 이 책에 수록된 101편은 동일한 규칙 아래에서 반복적으로 쓰였으며, 그 반복 자체가 하나의 형식을 이룬다.',
      '개별 작품은 독립적인 소설이지만, 동시에 이 책은 500자라는 분량을 서사의 단위로 삼는 새로운 소설 형식을 제안한다. 『500자 소설』은 완결된 단행본인 동시에, 하나의 장르로서 계속 확장되는 쓰기의 일부다.',
    ],
    contents: [
      '500자 내외의 독립 소설 101편 수록',
      '동일한 분량 규칙을 반복해 하나의 형식으로 확장',
      '짧은 호흡 안에 인물·사건·전환·결말을 갖춘 독립 서사',      
      '단행본이면서 계속 확장되는 ‘500자 소설’ 프로젝트',      
    ],
    samplePages,
    published: true,
  },
  {
    slug: 'gaze-before-perfect-german',
    title: '완벽한 독일어보다 눈빛이 먼저다',
    displayTitle: '완벽한 독일어보다 눈빛이 먼저다',
    authorSlug: 'estella-cho',
    authorName: '조현영(에스텔라)',
    coverImage: '/library/books/gaze-before-perfect-german/cover.png',
    coverWidth: 2531,
    coverHeight: 4500,
    shortDescription:
      '오스트리아 현지 경험을 바탕으로 독일어권의 비즈니스 문화와 실전 커뮤니케이션을 전하는 독일어 실용서.',
    description: [
      '오스트리아 15년 차 강사가 알려주는 실전 비즈니스 생존기!',
      '단순히 독일어를 알려드리는 게 아니라, 일상에서 마주하게 되는 문화적 차이까지 짚어주는 독일어 실용서',
    ],
    contents: [
      '오스트리아 현지 생활과 비즈니스 경험을 바탕으로 한 실전 사례',
      '독일어 표현과 함께 짚어보는 독일어권의 문화적 차이',
      '해외영업·협상·조직생활에 필요한 비즈니스 커뮤니케이션',
      '완벽한 어학보다 먼저 필요한 글로벌 마인드셋',
    ],
    samplePages: gazeBeforePerfectGermanSamplePages,
    published: true,
  },
  {
    slug: 'my-heart-said-look-longer',
    title: '내 마음이 오래 봐 달라고 말했다',
    displayTitle: '내 마음이 오래 봐 달라고 말했다',
    authorSlug: 'jungmyeongju',
    authorName: '정명주',
    coverImage: '/library/books/my-heart-said-look-longer/cover.png',
    coverWidth: 3180,
    coverHeight: 4500,
    shortDescription:
      '100회의 셀프 명상상담 일지를 통해 고통의 흐름을 바라보고, 고요하고 편안한 본래의 자신을 찾아가는 자기 탐색의 기록.',
    description: [
      '지금 이 순간, 어떤 어려움의 한가운데를 지나고 있다면, 이 기록이 당신 안으로 향하는 작은 입구가 되었으면 합니다.',
      '더불어 그 길 끝에서 고요하고 편안한 본래의 자신과 마주할 수 있기를 바랍니다.',
    ],
    contents: [
      '100회의 셀프 명상상담 일지에 담아낸 깊고 진솔한 자기 탐색',
      '성공·인정·사랑을 향한 애씀 속에서 고통의 원인을 들여다보는 기록',
      '‘가짜 나’ 뒤에 가려진 ‘참된 나’를 만나는 명상상담의 과정',
      '누구나 일상에서 실천할 수 있도록 풀어낸 셀프 명상상담',
    ],
    samplePages: myHeartSaidLookLongerSamplePages,
    published: true,
  },
]

export const publishedBooks = libraryBooks.filter((book) => book.published)

export function getBookBySlug(slug) {
  return publishedBooks.find((book) => book.slug === slug)
}

export function getBooksByAuthor(authorSlug) {
  return publishedBooks.filter((book) => book.authorSlug === authorSlug)
}
