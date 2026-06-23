import PoetryPage from './Poetry'

export const metadata = {
  title: '대구 시집·문집 제작 | 개인 시집·동호회 문집 출간 - 마이티북스',
  description:
    '개인 시집, 동호회 문집, 가족 문집, 추모 문집 제작을 상담합니다. 원고 정리, 교정, 편집, 표지 디자인, 소량 인쇄까지 출판 과정을 안내합니다.',
  alternates: {
    canonical: '/business/poetry',
  },
  openGraph: {
    title: '대구 시집·문집 제작 | 개인 시집·동호회 문집 출간 - 마이티북스',
    description:
      '개인 시집, 동호회 문집, 가족 문집, 추모 문집 제작을 상담합니다.',
    url: '/business/poetry',
    type: 'website',
  },
}

export default function Page() {
  return <PoetryPage />
}
