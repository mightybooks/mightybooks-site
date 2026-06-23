import FaqPage from './Faq.jsx'

export const metadata = {
  title: 'FAQ | 자서전·시집·기관 소책자·전자책 제작 - 마이티북스',
  description:
    '자서전 제작, 기념 도서 제작, 시집·문집 제작, 기관ㆍ기업 소책자, 전자책 제작, 기획출간 유료상담에 대해 자주 묻는 질문을 정리했습니다.',
  alternates: {
    canonical: '/support/faq',
  },
  openGraph: {
    title: 'FAQ | 자서전·시집·기관 소책자·전자책 제작 - 마이티북스',
    description:
      '자서전 제작, 기념 도서 제작, 시집·문집 제작, 기관ㆍ기업 소책자, 전자책 제작, 기획출간 유료상담에 대해 자주 묻는 질문을 정리했습니다.',
    url: '/support/faq',
    type: 'website',
  },
}

export default function Page() {
  return <FaqPage />
}
