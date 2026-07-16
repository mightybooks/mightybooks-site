import BookPageCalculator from './BookPageCalculator'
import styles from '../tools.module.css'

export const metadata = {
  title: '원고 글자 수로 예상 책 페이지 계산하기 | 마이티북스',
  description: '공백 포함 원고 글자 수와 장·작품 구성, 이미지와 부록 분량을 입력해 예상 책 페이지 범위를 확인해 보세요. 자서전, 에세이, 소설과 일반 산문 원고에 적용할 수 있습니다.',
  alternates: { canonical: '/tools/book-page-calculator' },
  openGraph: {
    title: '원고 글자 수로 예상 책 페이지 계산하기 | 마이티북스',
    description: '글자 수와 원고 구성, 이미지와 부록을 반영해 일반적인 단행본의 예상 페이지 범위를 계산해 보세요.',
    url: '/tools/book-page-calculator',
    type: 'website',
  },
}

const faqs = [
  ['공백 포함 글자 수는 어디서 확인하나요?', '한글과 워드의 문서 통계 기능에서 공백 포함 글자 수를 확인할 수 있습니다. 문서 전체를 기준으로 확인한 값을 입력해 주세요.'],
  ['계산 결과가 최종 페이지 수인가요?', '아닙니다. 계산 결과는 편집 전 예상 범위입니다. 실제 페이지 수는 판형, 글자 크기, 행간, 여백, 이미지와 장 구성에 따라 달라집니다.'],
  ['표지까지 포함한 페이지인가요?', '표지는 내지 페이지 수에 포함하지 않습니다. 계산 결과는 본문과 목차, 판권, 장 구분, 부록 등 책 안쪽 페이지를 기준으로 합니다.'],
  ['시집도 계산할 수 있나요?', '시집은 글자 수보다 작품 수, 행과 연 구성, 작품별 시작면에 따라 페이지 차이가 크기 때문에 별도 계산 대상입니다.'],
  ['사진이 많으면 페이지가 얼마나 늘어나나요?', '사진의 수보다 실제 배치 크기가 중요합니다. 본문 안에 작게 넣는 사진과 한 페이지 전체를 사용하는 사진은 페이지 증가 폭이 크게 다릅니다.'],
]

const reasons = [
  ['같은 글자 수인데 페이지가 달라지는 이유', '장 시작면, 작품별 여백, 사진 배치, 글자 크기와 행간, 판형과 여백에 따라 한 페이지에 들어가는 본문량이 달라집니다.'],
  ['6만 자 원고는 몇 페이지가 되나요?', '이어지는 산문이라면 약 160쪽 전후에서 시작할 수 있지만, 장 구분과 부록, 이미지가 많으면 약 200쪽 이상으로 구성될 수도 있습니다.'],
  ['10만 자 원고는 몇 페이지가 되나요?', '마이티북스의 일반적인 단행본 편집 기준에서는 약 240쪽 전후로 구성할 수 있습니다.'],
  ['12만 자 원고는 몇 페이지가 되나요?', '일반적인 편집에서는 약 280쪽 전후가 예상되며, 판형과 편집 밀도에 따라 달라질 수 있습니다.'],
  ['짧은 글 모음은 왜 작품 수가 중요한가요?', '작품마다 새 페이지를 시작하거나 제목과 여백을 별도로 사용하면 글자 수가 적어도 페이지가 크게 늘어날 수 있습니다.'],
]

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    { '@type': 'WebApplication', name: '원고 글자 수로 예상 책 페이지 계산하기', url: 'https://xn--hz2b41ezwf0zf9tq.com/tools/book-page-calculator', applicationCategory: 'BusinessApplication', operatingSystem: 'Web Browser', description: metadata.description },
    { '@type': 'FAQPage', mainEntity: faqs.map(([name, text]) => ({ '@type': 'Question', name, acceptedAnswer: { '@type': 'Answer', text } })) },
  ],
}

export default function BookPageCalculatorPage() {
  return <div className={styles.wrap}>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }} />
    <header className={styles.hero}>
      <span className={styles.eyebrow}>Book Page Calculator</span>
      <h1 className={styles.title}>원고 글자 수로 <em>예상 책 페이지 계산하기</em></h1>
      <p className={styles.lead}>공백 포함 글자 수와 원고 구성 방식을 입력하면 편집 전 예상 페이지 범위를 확인할 수 있습니다. 같은 글자 수라도 긴 글이 이어지는 책과 짧은 작품을 묶은 책은 최종 페이지가 크게 달라집니다. 장과 작품의 구성, 이미지와 부록 분량을 함께 반영해 예상 범위를 계산합니다.</p>
    </header>
    <BookPageCalculator />
    <section className={styles.content} aria-labelledby="page-count-reasons-title">
      <div className={styles.contentInner}>
        <span className={styles.eyebrow}>Understanding Page Count</span>
        <h2 id="page-count-reasons-title" className={styles.sectionTitle}>원고 분량과 페이지를<br /><em>함께 이해하기</em></h2>
        <div className={styles.reasonGrid}>{reasons.map(([title, text]) => <article key={title}><h3>{title}</h3><p>{text}</p></article>)}</div>
      </div>
    </section>
    <section className={styles.faq} aria-labelledby="book-page-faq-title">
      <div className={styles.faqInner}>
        <span className={styles.eyebrow}>Frequently Asked Questions</span>
        <h2 id="book-page-faq-title" className={styles.sectionTitle}>자주 묻는 <em>질문</em></h2>
        <div className={styles.faqList}>{faqs.map(([question, answer]) => <details key={question}><summary>{question}</summary><p>{answer}</p></details>)}</div>
      </div>
    </section>
  </div>
}
