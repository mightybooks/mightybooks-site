export const samplePages = Array.from({ length: 13 }, (_, index) => ({
  src: `/library/books/500fiction-sample/pages/${String(index + 1).padStart(3, '0')}.png`,
  width: 3180,
  height: 4500,
}))

export const gazeBeforePerfectGermanSamplePages = Array.from({ length: 14 }, (_, index) => ({
  src: `/library/books/gaze-before-perfect-german/pages/${String(index + 1).padStart(3, '0')}.webp`,
  width: 3180,
  height: 4500,
}))

export const myHeartSaidLookLongerSamplePages = Array.from({ length: 18 }, (_, index) => ({
  src: `/library/books/my-heart-said-look-longer/pages/${String(index + 1).padStart(3, '0')}.webp`,
  width: 3180,
  height: 4500,
}))

export const iHeldAChubbyRabbitSamplePages = Array.from({ length: 13 }, (_, index) => ({
  src: `/library/books/i-held-a-chubby-rabbit/pages/${String(index + 1).padStart(3, '0')}.webp`,
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
    coverImage: '/library/books/500fiction-sample/cover.png',
    coverWidth: 3076,
    coverHeight: 4500,
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
    coverWidth: 3180,
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
  {
    slug: 'i-held-a-chubby-rabbit',
    title: '토실토실 토끼를 안았습니다',
    displayTitle: '토실토실 토끼를 안았습니다',
    authorSlug: 'sian',
    authorName: '시안',
    coverImage: '/library/books/i-held-a-chubby-rabbit/cover.webp',
    coverWidth: 3180,
    coverHeight: 4500,
    shortDescription:
      '유기된 토끼를 구조하고 임시 보호하며 반복되는 이별을 지켜본 한 개인의 기록. 유기토끼 문제의 현실과 작은 생명을 대하는 태도를 함께 담았다.',
    description: [
      '사람들은 개나 고양이에 대해서는 반려동물이란 인식이 분명하지만, 그 외 생명들에겐 여전히 무관심합니다.\n해마다 유기되는 토끼의 수는 대략 200마리 이상.\n이미 몇 년 전부터 공중파 방송에서 뉴스로 보도될 만큼 유기토끼의 수는 꾸준히 증가하는 추세입니다. 덕분에 이제는 서울의 도심 속 공원에서도 토끼들을 쉽게 볼 수 있을 정도입니다.',
      '토끼를 유기한 사람들은 공원에 풀어주는 것이 자연으로 되돌려 보낸 일이라 생각합니다. 그러나 집토끼는 야생종이 아니라서 결국 적응하지도 못한 채 생을 마감하게 됩니다. 게다가 특유의 번식력 때문에 불행은 다음 세대 개체까지 이어집니다.',
      '이 책은 그런 현실 앞에서 맞서는 개인의 이야기입니다. 순전히 개인의 힘으로 유기된 토끼를 구호하고, 임시 보호하며, 매번 가슴 아픈 이별까지 가장 가까운 곳에서 지켜본 이의 이야기.',
      '적나라한 현실과 가슴 뭉클해지는 서정적 정서가 나란히 걷고 있는 책을 여러분에게 소개하는 건 작은 생명을 대하는 태도가 곧 우리의 얼굴을 비추기 때문입니다.',
    ],
    contents: [
      '유기토끼 구조와 임시 보호 현장에서 마주한 생생한 기록',
      '집토끼 유기와 공원 방사가 만들어내는 현실적인 문제',
      '작은 생명을 구조하고 떠나보내는 과정에서 겪은 만남과 이별',
      '동물에 대한 무관심과 생명을 대하는 우리의 태도를 돌아보는 이야기',
    ],
    samplePages: iHeldAChubbyRabbitSamplePages,
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
