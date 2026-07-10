import BookletPage from './Booklet'

export const metadata = {
  title: '기관·기업 소책자·자료집 제작 | 사례집·기념 책자 | 마이티북스',
  description:
    '기관·기업·단체의 사례집, 자료집, 교육 소책자, 기념 책자와 행사 간행물을 원고 정리부터 편집디자인, 인쇄와 납품까지 제작합니다.',
  alternates: {
    canonical: '/business/booklet',
  },
  openGraph: {
    title: '기관·기업 소책자·자료집 제작 | 사례집·기념 책자 | 마이티북스',
    description:
      '기관, 단체, 기업 자료를 목적에 맞는 소책자 구조로 편집·디자인·인쇄합니다.',
    url: '/business/booklet',
    type: 'website',
  },
}

export default function Page() {
  return <BookletPage />
}
