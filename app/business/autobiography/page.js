import AutobiographyPage from './Autobiography'

export const metadata = {
  title: '대구 자서전 제작 · 부모님 생애 기록 · 회고록 출간 | 마이티북스',
  description:
    '원고가 없어도 시작할 수 있는 자서전·회고록·부모님 생애 기록 제작. 종이책 제작과 저자 전용 온라인 서가·고화질 플립북을 함께 제공하며, 종이책 없이 웹북만 제작할 수도 있습니다. 대구·경북 대면 상담과 전국 비대면 진행이 가능합니다.',
  alternates: {
    canonical: '/business/autobiography',
  },
  openGraph: {
    title: '대구 자서전 제작 · 부모님 생애 기록 · 회고록 출간 | 마이티북스',
    description:
      '원고가 없어도 시작하는 자서전·회고록 제작. 종이책과 저자 전용 온라인 서가·고화질 플립북을 함께 제공하며, 웹북만 제작할 수도 있습니다.',
    url: '/business/autobiography',
    type: 'website',
  },
}

export default function Page() {
  return <AutobiographyPage />
}
