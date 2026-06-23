import EpubPage from './Epub'

export const metadata = {
  title: '전자책 제작 | PDF·EPUB 출판 자산 제작 - 마이티북스',
  description:
    '단순 파일 변환이 아니라 저자의 경험과 전문성을 장기적으로 활용 가능한 전자책 출판 자산으로 정리합니다. PDF, EPUB 제작 상담을 진행합니다.',
  alternates: {
    canonical: '/business/epub',
  },
  openGraph: {
    title: '전자책 제작 | PDF·EPUB 출판 자산 제작 - 마이티북스',
    description:
      '저자의 경험과 전문성을 강의, 상담, 사업, 브랜딩에 활용 가능한 전자책으로 정리합니다.',
    url: '/business/epub',
    type: 'website',
  },
}

export default function Page() {
  return <EpubPage />
}
