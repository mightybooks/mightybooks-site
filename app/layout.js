import './globals.css'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'

export const metadata = {
  metadataBase: new URL('https://xn--hz2b41ezwf0zf9tq.com'),
  title: {
    default: '마이티북스 | 대구 자서전·시집·문집 제작 출판사',
    template: '%s',
  },
  description:
    '대구 동구에 위치한 마이티북스는 자서전, 회고록, 시집, 문집 제작과 출판 상담을 진행하는 출판사입니다.',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: '마이티북스 | 대구 자서전·시집·문집 제작 출판사',
    description:
      '자서전, 회고록, 시집, 문집 제작과 출판 상담을 진행하는 대구 동구 출판사입니다.',
    url: '/',
    siteName: '마이티북스',
    images: [
      {
        url: '/og.png',
        width: 1200,
        height: 630,
      },
    ],
    locale: 'ko_KR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: '마이티북스 | 대구 자서전·시집·문집 제작 출판사',
    description:
      '자서전, 회고록, 시집, 문집 제작과 출판 상담을 진행하는 대구 동구 출판사입니다.',
    images: ['/og.png'],
  },
}

const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': 'https://xn--hz2b41ezwf0zf9tq.com/#organization',
      name: '마이티북스',
      url: 'https://xn--hz2b41ezwf0zf9tq.com',
      logo: 'https://xn--hz2b41ezwf0zf9tq.com/logo.png',
      telephone: '010-5148-9433',
      email: 'novelstudylab@naver.com',
    },
    {
      '@type': 'ProfessionalService',
      '@id': 'https://xn--hz2b41ezwf0zf9tq.com/#local',
      name: '마이티북스',
      url: 'https://xn--hz2b41ezwf0zf9tq.com',
      image: 'https://xn--hz2b41ezwf0zf9tq.com/logo.png',
      telephone: '010-5148-9433',
      email: 'novelstudylab@naver.com',
      address: {
        '@type': 'PostalAddress',
        streetAddress: '동호로7길 66',
        addressLocality: '동구',
        addressRegion: '대구',
        addressCountry: 'KR',
      },
      areaServed: ['대구', '경북'],
      serviceType: ['자서전 제작', '회고록 제작', '시집 제작', '문집 제작', '출판 상담'],
    },
  ],
}

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@300;400;500;700;900&family=Bebas+Neue&family=Oswald:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
      </head>
      <body>
        <Nav />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
