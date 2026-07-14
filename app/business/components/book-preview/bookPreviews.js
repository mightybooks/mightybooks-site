export const autobiographyPreview = {
  id: 'life-record-01',
  title: '실제 제작 도서 내지 미리보기',
  description: '책장을 넘겨 실제 제작 도서의 내지 구성과 편집 흐름을 확인해 보세요.',
  cover: '/book-previews/autobiography/life-record-01/cover3d01.png',
  coverAlt: '마이티북스 실제 제작 자서전 3D 표지',
  pages: Array.from(
    { length: 12 },
    (_, index) =>
      `/book-previews/autobiography/life-record-01/page${String(index + 1).padStart(3, '0')}.jpg`
  ),
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
  id: 'self-record-01',
  category: 'self-publishing',
  title: '전문·실용 도서 제작 사례',
  description:
    '책장을 넘겨 실제 제작된 전문·실용 도서의 내지 구성과 정보 편집 방식을 확인해 보세요.',
  cover: '/book-previews/self-publishing/self-record-01/cover3d.png',
  coverAlt: '마이티북스 실제 제작 전문·실용 도서 3D 표지',
  pages: Array.from(
    { length: 13 },
    (_, index) =>
      `/book-previews/self-publishing/self-record-01/page${String(index + 1).padStart(3, '0')}.jpg`
  ),
}

export const poetryPreview = {
  id: 'poem-01',
  category: 'poetry',
  title: '실제 제작 시집 내지 미리보기',
  description:
    '책장을 넘겨 실제 제작된 시집의 내지 구성과 시각적 편집 흐름을 확인해 보세요.',
  cover: '/book-previews/poetry/poem-01/cover3d.png',
  coverAlt: '마이티북스 실제 제작 시집 3D 표지',
  pages: Array.from(
    { length: 14 },
    (_, index) =>
      `/book-previews/poetry/poem-01/page${String(index + 1).padStart(3, '0')}.jpg`
  ),
}
