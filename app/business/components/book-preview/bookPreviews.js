const createHighResolutionPages = (directory, pageCount) =>
  Array.from({ length: pageCount }, (_, index) => ({
    src: `${directory}/${String(index + 1).padStart(3, '0')}.webp`,
    width: 3180,
    height: 4500,
  }))

const oldScenesOfPyeongchangPages = createHighResolutionPages(
  '/library/books/old-scenes-of-pyeongchang/pages',
  13
)

const fromWinterToSpringPages = createHighResolutionPages(
  '/library/books/from-winter-to-spring/pages',
  12
)

const gazeBeforePerfectGermanPages = createHighResolutionPages(
  '/library/books/gaze-before-perfect-german/pages',
  16
)

export const autobiographyPreview = {
  id: 'old-scenes-of-pyeongchang',
  title: '실제 제작 도서 내지 미리보기',
  displayTitle: '이야기를 담은 평창의 옛 풍경',
  description: '책장을 넘겨 실제 제작 도서의 내지 구성과 편집 흐름을 확인해 보세요.',
  cover: '/library/books/old-scenes-of-pyeongchang/cover.webp',
  coverWidth: 3180,
  coverHeight: 4500,
  coverAlt: '이야기를 담은 평창의 옛 풍경 표지',
  pages: oldScenesOfPyeongchangPages,
  samplePages: oldScenesOfPyeongchangPages,
  highResolution: true,
}

export const companyBookletPreview = {
  id: 'company',
  category: 'booklet',
  title: '기업 소책자 제작 사례',
  description: '실제 제작된 소책자의 내지 구성과 정보 배치를 확인해 보세요.',
  cover: '/book-previews/booklet/company/cover3d.png',
  coverAlt: '마이티북스 실제 제작 기업 소책자 3D 표지',
  pages: Array.from(
    { length: 11 },
    (_, index) =>
      `/book-previews/booklet/company/page${String(index + 1).padStart(3, '0')}.jpg`
  ),
}

export const selfPublishingPreview = {
  id: 'gaze-before-perfect-german-service-preview',
  category: 'self-publishing',
  title: '전문·실용 도서 제작 사례',
  displayTitle: '완벽한 독일어보다 눈빛이 먼저다',
  description:
    '책장을 넘겨 실제 제작된 전문·실용 도서의 내지 구성과 정보 편집 방식을 확인해 보세요.',
  cover: '/library/books/gaze-before-perfect-german/cover.png',
  coverWidth: 3180,
  coverHeight: 4500,
  coverAlt: '완벽한 독일어보다 눈빛이 먼저다 표지',
  pages: gazeBeforePerfectGermanPages,
  samplePages: gazeBeforePerfectGermanPages,
  highResolution: true,
}

export const poetryPreview = {
  id: 'from-winter-to-spring',
  category: 'poetry',
  title: '실제 제작 시집 내지 미리보기',
  displayTitle: '겨울 지나 봄으로',
  description:
    '책장을 넘겨 실제 제작된 시집의 내지 구성과 시각적 편집 흐름을 확인해 보세요.',
  cover: '/library/books/from-winter-to-spring/cover.webp',
  coverWidth: 3180,
  coverHeight: 4500,
  coverAlt: '겨울 지나 봄으로 표지',
  pages: fromWinterToSpringPages,
  samplePages: fromWinterToSpringPages,
  highResolution: true,
}
