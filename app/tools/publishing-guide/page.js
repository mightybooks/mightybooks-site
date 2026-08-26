import PublishingGuide from '@/components/publishing-guide/PublishingGuide'
import styles from '../tools.module.css'

export const metadata = {
  title: '출판 길라잡이 | 원고 상태별 책 제작 방법 확인 | 마이티북스',
  description: '책 종류, 원고와 파일 상태, 종이책 수량과 출간 목적을 선택해 현재 필요한 편집·디자인·인쇄·전자출판 방향을 확인합니다.',
  alternates: { canonical: '/tools/publishing-guide' },
  openGraph: {
    title: '출판 길라잡이 | 원고 상태별 책 제작 방법 확인',
    description: '원고가 없거나 PDF까지 완성된 경우에도 현재 상태에 필요한 책 제작 방향을 확인할 수 있습니다.',
    url: '/tools/publishing-guide',
    type: 'website',
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebApplication',
      name: '마이티북스 출판 길라잡이',
      url: 'https://mightybooks.kr/tools/publishing-guide',
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'Web Browser',
      description: metadata.description,
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: '홈', item: 'https://mightybooks.kr/' },
        { '@type': 'ListItem', position: 2, name: '출판 도구', item: 'https://mightybooks.kr/tools' },
        { '@type': 'ListItem', position: 3, name: '출판 길라잡이', item: 'https://mightybooks.kr/tools/publishing-guide' },
      ],
    },
  ],
}

export default function PublishingGuidePage() {
  return (
    <div className={styles.wrap}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }} />
      <header className={styles.hero}>
        <span className={styles.eyebrow}>Publishing Guide</span>
        <h1 className={styles.title}>원고 상태에 맞는 <em>책 제작 방법 확인</em></h1>
        <p className={styles.lead}>정해진 패키지나 자동견적을 제시하지 않습니다. 지금까지 준비한 작업과 앞으로 필요한 공정을 구분해 상담 전에 현재 상태를 정리합니다.</p>
      </header>
      <section className={styles.calculatorSection} aria-label="출판 길라잡이 질문">
        <PublishingGuide />
      </section>
    </div>
  )
}
