import EpubPage from './Epub'

export const metadata = {
  title: '전자책·웹북 제작 | EPUB·PDF 전자책 제작 | 마이티북스',
  description:
    '원고의 목적과 이용 방식에 맞춰 EPUB, PDF, 웹북으로 제작합니다. 전자책 서점 유통용 EPUB, 교재·자료집용 PDF, 모바일·PC에서 바로 읽는 반응형 웹북 제작을 지원합니다.',
  alternates: {
    canonical: '/business/epub',
  },
  openGraph: {
    title: '전자책·웹북 제작 | EPUB·PDF 전자책 제작 | 마이티북스',
    description:
      'EPUB, PDF와 반응형 웹북의 차이를 확인하고 목적에 맞는 디지털 출판 방식을 상담합니다.',
    url: '/business/epub',
    type: 'website',
  },
}

export default function Page() {
  return <EpubPage />
}
