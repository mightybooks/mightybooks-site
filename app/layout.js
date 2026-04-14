// app/layout.js
import './globals.css'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'

export const metadata = {
  title: '마이티북스 | Mighty Books',
  description: '작가와 독자를 잇는 출판 브랜드 마이티북스',

  openGraph: {
    title: '마이티북스 | Mighty Books',
    description: '당신의 인생도 한 권의 책이 될 수 있습니다',
    url: 'https://마이티북스.com',
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

  // 카카오/트위터 대응 (같이 넣는 게 안전)
  twitter: {
    card: 'summary_large_image',
    title: '마이티북스 | Mighty Books',
    description: '당신의 인생도 한 권의 책이 될 수 있습니다',
    images: ['/og.png'],
  },
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
      </head>
      <body>
        <Nav />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}