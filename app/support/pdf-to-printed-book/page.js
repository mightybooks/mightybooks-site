import Link from 'next/link'
import styles from '../../reference/reference.module.css'

export const metadata = {
  title: '전자책·PDF를 소량 종이책으로 만들려면 | 파일 점검 기준',
  description: '전자책이나 완성 PDF를 소량 종이책으로 제작할 때 판형, 원본파일, 표지 책등·뒤표지와 인쇄용 PDF에서 확인할 사항을 안내합니다.',
  alternates: { canonical: '/support/pdf-to-printed-book' },
  openGraph: {
    title: '전자책·PDF를 소량 종이책으로 만들려면 | 파일 점검 기준',
    description: '이미 완성한 파일을 활용해 필요한 재편집과 인쇄 공정만 구분하는 기준을 확인하세요.',
    url: '/support/pdf-to-printed-book',
    type: 'article',
  },
}

const checks = [
  ['판형', '전자책 화면이나 A4 문서 크기가 실제 종이책 판형과 같은지 확인합니다.'],
  ['본문 PDF', '재단 여백, 글꼴, 이미지 해상도, 페이지 순서와 빈 페이지를 점검합니다.'],
  ['수정 원본', 'HWP·Word·Canva·InDesign 등 수정 가능한 원본이 있으면 판형 변경과 오류 보완 범위를 줄일 수 있습니다.'],
  ['표지', '전자책용 앞표지만 있는지, 종이책에 필요한 앞표지·책등·뒤표지 펼침면이 준비됐는지 확인합니다.'],
  ['수량과 제본', '필요 부수, 무선·양장 제본, 용지와 후가공에 따라 알맞은 제작 방식을 정합니다.'],
  ['출간 여부', '개인 소장·증정용 제작인지, ISBN과 서점 유통을 포함한 정식 출간인지 구분합니다.'],
]

const faqItems = [
  ['PDF만 있어도 종이책을 만들 수 있나요?', '가능할 수 있습니다. 다만 현재 판형과 글꼴·이미지·여백 상태에 따라 그대로 인쇄하거나 PDF를 재구성해야 할 수 있습니다.'],
  ['전자책 표지를 종이책에도 쓸 수 있나요?', '전자책 앞표지 이미지는 활용할 수 있지만 종이책에는 책등과 뒤표지를 포함한 펼침면 파일이 추가로 필요합니다.'],
  ['Canva로 만든 파일도 인쇄할 수 있나요?', '내보낸 PDF와 원본 디자인의 크기, 재단 여백, 글꼴과 이미지 해상도를 확인한 뒤 인쇄 가능 여부와 보완 범위를 정합니다.'],
  ['소량 제작에도 ISBN이 필요한가요?', '개인 보관이나 증정용 제작에는 ISBN을 반드시 적용하지 않습니다. 정식 출간과 서점 유통을 원할 때는 출판물의 기본 품질과 발행 정보를 별도로 확인합니다.'],
]

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    { '@type': 'Article', headline: metadata.title, description: metadata.description, mainEntityOfPage: 'https://mightybooks.kr/support/pdf-to-printed-book', author: { '@type': 'Organization', name: '마이티북스' }, publisher: { '@type': 'Organization', name: '마이티북스', url: 'https://mightybooks.kr' } },
    { '@type': 'BreadcrumbList', itemListElement: [
      { '@type': 'ListItem', position: 1, name: '홈', item: 'https://mightybooks.kr/' },
      { '@type': 'ListItem', position: 2, name: '출판 안내', item: 'https://mightybooks.kr/support/guide' },
      { '@type': 'ListItem', position: 3, name: '전자책·PDF 소량 종이책 제작', item: 'https://mightybooks.kr/support/pdf-to-printed-book' },
    ] },
    { '@type': 'FAQPage', mainEntity: faqItems.map(([name, text]) => ({ '@type': 'Question', name, acceptedAnswer: { '@type': 'Answer', text } })) },
  ],
}

const BulletList = ({ items }) => <ul className={styles.bulletList}>{items.map(item => <li key={item}>{item}</li>)}</ul>

export default function PdfToPrintedBookPage() {
  return (
    <div className={styles.wrap}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }} />
      <header className={styles.hero}>
        <nav className={styles.breadcrumb} aria-label="현재 위치"><Link href="/">홈</Link> &gt; <Link href="/support/guide">출판 안내</Link> &gt; 전자책·PDF 소량 종이책 제작</nav>
        <span className={styles.tag}>PDF to Printed Book</span>
        <h1 className={styles.title}>전자책·PDF를<br /><em>소량 종이책으로 만들려면</em></h1>
        <div className={styles.line} />
        <p className={styles.heroSub}>이미 전자책이나 PDF까지 완성했다면 전체 출판 제작을 처음부터 다시 의뢰할 필요 없이, 현재 파일을 점검한 뒤 필요한 공정만 진행할 수 있습니다.</p>
      </header>
      <main className={styles.content}>
        <div className={styles.lead}>PDF라는 이름만으로 바로 인쇄할 수 있는지는 판단할 수 없습니다. 실제 책 크기, 재단 여백, 이미지와 글꼴, 수정 원본과 종이책용 표지 상태를 함께 확인해야 합니다.</div>
        <blockquote className={styles.quote}>이미 완료한 작업은 활용하고, 종이책 제작에 필요한 부분만 보완합니다.</blockquote>

        <section className={styles.section}>
          <h2>인쇄 전에 확인할 6가지</h2>
          <div className={styles.grid}>{checks.map(([title, text], index) => <article className={styles.card} key={title}><div className={styles.cardNum}>{String(index + 1).padStart(2, '0')}</div><h3>{title}</h3><p>{text}</p></article>)}</div>
        </section>

        <section className={styles.section}>
          <h2>현재 파일 상태에 따라 작업이 달라집니다</h2>
          <h3>인쇄 준비가 끝난 PDF</h3>
          <p>최종 판형과 여백이 맞고 본문 PDF와 표지 펼침면이 준비됐다면 파일 점검 후 필요한 수량의 인쇄·제본 중심으로 진행할 수 있습니다.</p>
          <h3>실제 책 크기와 다른 PDF</h3>
          <p>A4 문서나 전자책 화면 크기로 편집했다면 글자 크기, 줄바꿈, 이미지와 페이지 구성이 달라질 수 있어 종이책 판형에 맞는 재편집 범위를 확인합니다.</p>
          <h3>PDF와 수정 가능한 원본파일이 있는 경우</h3>
          <p>HWP·Word·Canva·InDesign 원본을 활용할 수 있으면 기존 디자인을 살리면서 판형과 인쇄 오류를 조정하기가 비교적 수월합니다.</p>
          <h3>PDF만 있는 경우</h3>
          <p>간단한 오류 보완이 가능한지, 본문을 다시 구성해야 하는지 먼저 확인합니다. PDF 상태에 따라 원본파일 확보를 요청할 수 있습니다.</p>
        </section>

        <section className={styles.section}>
          <h2>전자책 앞표지와 종이책 표지는 다릅니다</h2>
          <p>전자책은 보통 앞표지 한 장을 사용하지만 종이책 인쇄 파일에는 앞표지, 책등과 뒤표지가 이어진 펼침면이 필요합니다. 책등 폭은 최종 페이지 수, 용지와 제본 방식이 정해진 뒤 계산하므로 앞표지 이미지가 있어도 종이책용 표지 작업이 추가될 수 있습니다.</p>
        </section>

        <section className={styles.section}>
          <h2>소량 제작과 정식 출간은 구분합니다</h2>
          <p>개인 보관, 가족 증정과 행사 기념용 책은 고객이 준비한 파일을 기반으로 필요한 제작 공정만 진행할 수 있습니다. 반면 마이티북스 명의의 ISBN과 서점 유통을 포함하는 정식 출간은 인쇄만 하는 작업과 달리 원고, 내지와 표지의 기본 품질을 함께 확인합니다.</p>
          <BulletList items={['개인 소장·증정용 제작에는 정식 출간 절차를 강제하지 않습니다.','ISBN을 단순한 추가 옵션이나 발급 상품처럼 다루지 않습니다.','정식 출간에 보완이 필요하면 원고·편집·디자인 범위를 먼저 안내합니다.']} />
        </section>

        <section className={styles.section}>
          <h2>자주 묻는 질문</h2>
          <div className={styles.faqList}>{faqItems.map(([question, answer]) => <details key={question}><summary>{question}</summary><p>{answer}</p></details>)}</div>
        </section>

        <div className={styles.cta}>
          <div className={styles.ctaText}>현재 PDF와 원본파일, 표지와 희망 수량을 기준으로 필요한 제작 방식을 먼저 확인해 보세요.</div>
          <div className={styles.ctaBtns}>
            <Link href="/tools/publishing-guide" className={styles.ctaBtn}>내 파일 상태 확인하기</Link>
            <Link href="/business/epub" className={styles.ctaBtnGhost}>전자책·웹북 제작 안내</Link>
          </div>
        </div>
      </main>
    </div>
  )
}
