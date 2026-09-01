import RetirementBookPage from './RetirementBook'

const title = '정년퇴임·은퇴 기념 책 제작 | 교수·교장·공무원 퇴직 기념도서 | 마이티북스'
const description = '정년퇴임·은퇴를 앞둔 교수, 교장, 공무원, 기업인과 사업가의 경력과 기록을 한 권의 책으로 제작합니다. 원고가 없어도 인터뷰·사진·경력자료를 바탕으로 소량 제작할 수 있습니다.'

export const metadata = {
  title,
  description,
  alternates: { canonical: '/business/retirement-book' },
  openGraph: {
    title,
    description,
    url: '/business/retirement-book',
    images: ['/og.png'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    images: ['/og.png'],
  },
}

export default function Page() {
  return <RetirementBookPage />
}
