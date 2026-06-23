import BookletPage from './Booklet'

export const metadata = {
  title: '기관ㆍ기업 소책자 제작 | 자료집·교육자료·보고서 편집 - 마이티북스',
  description:
    '기관, 단체, 기업의 자료를 읽기 쉬운 책자 구조로 정리합니다. 자료집, 교육자료, 프로젝트 보고서, 포트폴리오 책자 제작 상담을 진행합니다.',
  alternates: {
    canonical: '/business/booklet',
  },
  openGraph: {
    title: '기관ㆍ기업 소책자 제작 | 자료집·교육자료·보고서 편집 - 마이티북스',
    description:
      '기관, 단체, 기업 자료를 목적에 맞는 소책자 구조로 편집·디자인·인쇄합니다.',
    url: '/business/booklet',
    type: 'website',
  },
}

export default function Page() {
  return <BookletPage />
}
