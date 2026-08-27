import Link from 'next/link'
import PublishingGuideCta from '../components/PublishingGuideCta'
import styles from '../../reference/reference.module.css'

export const metadata = {
  title: '완성된 PDF로 5권·10권 소량 책을 만들 수 있나요? | 마이티북스',
  description: '완성 PDF로 5권·10권 등 소량 종이책을 제작할 때 판형, 원본파일, 표지 책등·뒤표지와 인쇄용 PDF에서 확인할 사항을 안내합니다.',
  alternates: { canonical: '/support/pdf-to-printed-book' },
  openGraph: {
    title: '완성된 PDF로 5권·10권 소량 책을 만들 수 있나요? | 마이티북스',
    description: '완성 PDF를 활용해 필요한 재편집과 소량 인쇄·제본 공정만 구분하는 기준을 확인하세요.',
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
  ['PDF만 보내면 종이책을 만들 수 있나요?', '가능할 수 있습니다. 현재 PDF의 판형, 재단 여백, 글꼴, 이미지, 페이지 순서와 종이책용 표지를 확인해 그대로 제작할지 보완할지 정합니다.'],
  ['PDF로 책을 5권·10권만 제작할 수 있나요?', '소량 제작은 가능합니다. 실제 비용과 방식은 수량 외에도 판형, 페이지, 컬러 여부, 종이, 제본과 파일 상태를 함께 확인해 정합니다.'],
  ['인쇄용 PDF인지 어떻게 확인하나요?', '희망 판형과 PDF 페이지 크기가 맞는지, 재단·안전 여백, 이미지 해상도, 글자와 페이지 위치, 컬러 데이터와 표지 펼침면을 확인합니다.'],
  ['원본파일이 없어도 가능한가요?', '수정이 없고 인쇄 조건에 맞는 PDF라면 가능할 수 있습니다. 판형 변경이나 내용 수정이 필요하면 원본 확보 또는 별도 재편집을 검토합니다.'],
  ['PDF의 오탈자나 이미지를 조금 수정할 수 있나요?', '간단한 보완 가능성을 먼저 확인하지만 PDF는 수정 가능한 원본파일이 아닙니다. 텍스트·레이아웃·이미지 수정이 많으면 재편집 범위가 됩니다.'],
  ['전자책 앞표지를 종이책에도 쓸 수 있나요?', '앞표지 이미지는 활용할 수 있지만 종이책에는 최종 페이지 수와 제본 사양에 맞춘 책등·뒤표지 포함 펼침면이 추가로 필요합니다.'],
]

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    { '@type': 'Article', headline: metadata.title, description: metadata.description, mainEntityOfPage: 'https://mightybooks.kr/support/pdf-to-printed-book', author: { '@type': 'Organization', name: '마이티북스' }, publisher: { '@type': 'Organization', name: '마이티북스', url: 'https://mightybooks.kr' } },
    { '@type': 'BreadcrumbList', itemListElement: [
      { '@type': 'ListItem', position: 1, name: '홈', item: 'https://mightybooks.kr/' },
      { '@type': 'ListItem', position: 2, name: '출판 안내', item: 'https://mightybooks.kr/support/guide' },
      { '@type': 'ListItem', position: 3, name: '완성 PDF 소량 종이책 제작', item: 'https://mightybooks.kr/support/pdf-to-printed-book' },
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
        <nav className={styles.breadcrumb} aria-label="현재 위치"><Link href="/">홈</Link> &gt; <Link href="/support/guide">출판 안내</Link> &gt; 완성 PDF 소량 종이책 제작</nav>
        <span className={styles.tag}>PDF to Printed Book</span>
        <h1 className={styles.title}>완성된 PDF로<br /><em>5권·10권 소량 책을 만들 수 있나요?</em></h1>
        <div className={styles.line} />
        <p className={styles.heroSub}>이미 PDF까지 완성했다면 전체 출판 제작을 처음부터 다시 의뢰할 필요 없이, 현재 파일을 점검한 뒤 필요한 소량 인쇄·제본 공정만 진행할 수 있습니다.</p>
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
          <h2>PDF는 수정 가능한 원본파일이 아닙니다</h2>
          <p>내용 수정이 없고 실제 제작 판형과 여백이 맞는 PDF라면 파일 점검 후 인쇄·제본 중심으로 빠르게 진행할 수 있습니다.</p>
          <p>반대로 텍스트 수정, 대규모 판형 변경, 이미지 교체, 레이아웃 수정과 페이지 재구성이 필요하면 단순 소량 제작이 아니라 별도 재편집 범위가 될 수 있습니다.</p>
          <blockquote className={styles.quote}>이미 완료한 작업은 다시 맡길 필요가 없지만, PDF에서 원본 문서처럼 자유롭게 수정할 수 있는 것은 아닙니다.</blockquote>
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

        <section className={styles.section}>
          <h2>파일 상태에 맞는 관련 안내</h2>
          <div className={styles.linkGrid}>
            <Link className={styles.linkCard} href="/support/ebook-pdf-to-printed-book">전자책 PDF를 종이책으로 바꾸는 기준 →</Link>
            <Link className={styles.linkCard} href="/support/canva-pdf-to-printed-book">Canva에서 만든 PDF 제작 기준 →</Link>
            <Link className={styles.linkCard} href="/support/print-ready-pdf-check">인쇄 직전 PDF 점검 항목 →</Link>
            <Link className={styles.linkCard} href="/support/small-run-book-printing">10권·20권 소량 제작 기준 →</Link>
          </div>
        </section>

        <PublishingGuideCta />
      </main>
    </div>
  )
}
