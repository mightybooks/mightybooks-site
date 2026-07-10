import PoetryPage from './Poetry'

export const metadata = {
  title: '대구 시집·문집·에세이 제작 | 개인 저서 출간 | 마이티북스',
  description: '완성된 원고를 바탕으로 개인 시집, 에세이집, 수필집, 문학회·동호회 문집을 제작합니다. 한 권부터 소량 인쇄, 맞춤형 표지·내지 디자인, ISBN 발급과 서점 유통까지 지원합니다.',
  alternates: { canonical: '/business/poetry' },
  openGraph: { title: '대구 시집·문집·에세이 제작 | 개인 저서 출간 | 마이티북스', description: '완성된 원고로 시집, 문집, 에세이를 한 권부터 제작하고 맞춤 디자인과 출간을 지원합니다.', url: '/business/poetry', type: 'website' },
}

export default function Page() { return <PoetryPage /> }
