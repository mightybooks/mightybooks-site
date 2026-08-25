import PoetryPage from './Poetry'

export const metadata = {
  title: '개인 시집 제작·출판 | 대구·전국 출판사 마이티북스',
  description:
    '마이티북스는 개인 시집의 원고 편집, 작품 배열, 교정, 표지·내지 디자인, ISBN 발급과 인쇄·출간을 함께 진행합니다. 문집과 에세이 제작도 상담합니다.',
  alternates: {
    canonical: '/business/poetry',
  },
  openGraph: {
    title: '개인 시집 제작·출판 | 대구·전국 출판사 마이티북스',
    description:
      '개인 시집의 원고 편집과 작품 배열부터 교정, 표지·내지 디자인, ISBN, 인쇄와 출간까지 함께합니다. 문집과 에세이도 제작합니다.',
    url: '/business/poetry',
    images: ['/og.png'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: '개인 시집 제작·출판 | 대구·전국 출판사 마이티북스',
    description:
      '개인 시집의 원고 편집과 작품 배열부터 교정, 표지·내지 디자인, ISBN, 인쇄와 출간까지 함께합니다. 문집과 에세이도 제작합니다.',
    images: ['/og.png'],
  },
}

export default function Page() { return <PoetryPage /> }
