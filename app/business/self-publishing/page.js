import SelfPublishingPage from './selfpublishing'

export const metadata = {
  title: '대구 전문서적·실용서·교재 제작 | 전문가 브랜딩 도서 | 마이티북스',
  description: '전문 분야의 지식, 강의 자료와 현장 노하우를 전문서적, 전문가 브랜딩 도서, 실용서와 교육용 교재로 제작합니다. 완성 원고가 없어도 자체 콘텐츠가 있다면 인터뷰 제작이 가능하며 평균 약 2개월을 기준으로 맞춤 진행합니다.',
  alternates: {
    canonical: '/business/self-publishing',
  },
  openGraph: {
    title: '대구 전문서적·실용서·교재 제작 | 전문가 브랜딩 도서 | 마이티북스',
    description: '전문 지식과 자체 콘텐츠를 독자가 이해하고 활용할 수 있는 한 권의 책으로 제작합니다.',
    url: '/business/self-publishing',
    type: 'website',
  },
}

export default function Page() {
  return <SelfPublishingPage />
}
