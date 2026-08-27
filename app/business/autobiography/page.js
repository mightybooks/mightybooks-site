import AutobiographyPage from './Autobiography'

export const metadata = {
  title: '대구 자서전 제작 · 부모님 생애 기록 · 회고록 출간 | 마이티북스',
  description:
    '원고가 없어도 시작할 수 있는 자서전·회고록·부모님 생애 기록 제작. 대구 본사 방문상담, 대구·경북·경남 출장상담 20만 원부터, 전국 비대면 상담 중 선택할 수 있습니다.',
  alternates: {
    canonical: '/business/autobiography',
  },
  openGraph: {
    title: '대구 자서전 제작 · 부모님 생애 기록 · 회고록 출간 | 마이티북스',
    description:
      '원고가 없어도 시작하는 자서전·회고록 제작. 종이책과 프라이빗 링크 기반 웹북 중 목적에 맞는 제작 방식을 선택할 수 있습니다.',
    url: '/business/autobiography',
    type: 'website',
  },
}

export default function Page() {
  return <AutobiographyPage />
}
