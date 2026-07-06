import AutobiographyPage from './Autobiography'

export const metadata = {
  title: '대구 자서전 제작 · 부모님 생애 기록 · 회고록 출간 | 마이티북스',
  description:
    '원고가 없어도 시작할 수 있는 자서전·회고록·부모님 생애 기록 제작. 대구·경북 대면 상담, 전국 비대면 진행, 원고 정리·편집·디자인·인쇄·ISBN 상담까지 1:1로 진행합니다.',
  alternates: {
    canonical: '/business/autobiography',
  },
  openGraph: {
    title: '대구 자서전 제작 · 부모님 생애 기록 · 회고록 출간 | 마이티북스',
    description:
      '원고가 없어도 시작할 수 있는 자서전·회고록·부모님 생애 기록 제작. 대구·경북 대면 상담과 전국 비대면 진행이 가능합니다.',
    url: '/business/autobiography',
    type: 'website',
  },
}

export default function Page() {
  return <AutobiographyPage />
}
