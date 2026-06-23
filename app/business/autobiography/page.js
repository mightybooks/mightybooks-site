import AutobiographyPage from './Autobiography'

export const metadata = {
  title: '대구 자서전 제작 | 인터뷰 기반 회고록·기념 도서 출간 - 마이티북스',
  description:
    '원고가 없어도 인터뷰를 통해 자서전, 회고록, 부모님 자서전, 퇴임기념집을 제작합니다. 대구·경북권 방문 상담은 예약제로 진행합니다.',
  alternates: {
    canonical: '/business/autobiography',
  },
  openGraph: {
    title: '대구 자서전 제작 | 인터뷰 기반 회고록·기념 도서 출간 - 마이티북스',
    description:
      '원고가 없어도 인터뷰를 통해 자서전, 회고록, 부모님 자서전, 퇴임기념집을 제작합니다.',
    url: '/business/autobiography',
    type: 'website',
  },
}

export default function Page() {
  return <AutobiographyPage />
}
