import MemoirScheduleCalculator from './MemoirScheduleCalculator'
import styles from '../tools.module.css'

export const metadata = {
  title: '칠순·팔순 기념책 제작 일정 계산기 | 마이티북스',
  description: '칠순·팔순, 생신, 퇴임 등 가족 기념일에 맞춰 자서전과 기념책을 언제부터 준비해야 하는지 계산해 보세요. 권장 제작 시작일과 공정별 일정을 확인할 수 있습니다.',
  alternates: { canonical: '/tools/memoir-schedule' },
  openGraph: {
    title: '칠순·팔순 기념책 제작 일정 계산기 | 마이티북스',
    description: '행사 날짜를 기준으로 자서전과 가족 기념책의 권장 제작 시작일을 계산해 보세요.',
    url: '/tools/memoir-schedule',
    type: 'website',
  },
}

const faqs = [
  ['기념책 제작에는 보통 얼마나 걸리나요?', '대부분 약 2개월 이내에 마무리됩니다. 다만 가족 검토, 수정, 인쇄 일정까지 안정적으로 확보하려면 최대 3개월 전에 시작하는 것이 좋습니다.'],
  ['원고가 이미 완성되어 있으면 기간이 줄어드나요?', '네. 완성된 원고가 있다면 인터뷰와 원고 작성 기간을 줄일 수 있습니다. 다만 원고 분량, 사진 자료, 수정 범위, 제작 부수에 따라 전체 기간은 달라질 수 있습니다.'],
  ['행사까지 두 달이 남지 않았는데 제작할 수 있나요?', '현재 원고 상태와 제작 부수, 인쇄 방식에 따라 가능할 수 있습니다. 계산 결과가 촉박하게 나오면 상담을 통해 실제 제작 가능 일정을 확인해 주세요.'],
  ['가족 검토는 왜 오래 걸릴 수 있나요?', '자서전과 가족 기념책은 여러 가족이 원고와 사진을 함께 확인하는 경우가 많습니다. 확인자가 많거나 수정 의견을 모으는 데 시간이 걸리면 전체 일정이 늦어질 수 있습니다.'],
]

const reasons = [
  ['기념책 제작에 2개월가량 필요한 이유', '인터뷰 내용을 원고로 구성하고 사진과 기록을 정리한 뒤 디자인·교정·인쇄까지 여러 공정을 거치기 때문입니다.'],
  ['가족 검토 기간의 영향', '여러 가족의 의견을 한 번에 모으기 어렵기 때문에 검토와 수정 기간이 전체 일정의 핵심 변수가 됩니다.'],
  ['인터뷰가 늦어질 때', '원고 작성의 출발점이 늦어져 디자인과 인쇄 일정까지 연쇄적으로 밀릴 수 있습니다.'],
  ['인쇄 일정의 여유', '인쇄 사양 확인, 제작, 검수와 배송에는 시간이 필요하며 성수기에는 일정이 더 길어질 수 있습니다.'],
  ['촉박할 때 상담이 필요한 이유', '완성 원고 여부, 부수와 제본 방식에 따라 단축 가능한 공정이 달라 실제 조건을 함께 확인해야 합니다.'],
]

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    { '@type': 'WebApplication', name: '칠순·팔순 기념책 제작 일정 계산기', url: 'https://xn--hz2b41ezwf0zf9tq.com/tools/memoir-schedule', applicationCategory: 'BusinessApplication', operatingSystem: 'Web Browser', description: metadata.description },
    { '@type': 'FAQPage', mainEntity: faqs.map(([name, text]) => ({ '@type': 'Question', name, acceptedAnswer: { '@type': 'Answer', text } })) },
  ],
}

export default function MemoirSchedulePage() {
  return (
    <div className={styles.wrap}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }} />
      <header className={styles.hero}>
        <span className={styles.eyebrow}>Memoir Schedule Calculator</span>
        <h1 className={styles.title}>칠순·팔순 기념책 <em>제작 일정 계산기</em></h1>
        <p className={styles.lead}>행사 날짜를 입력하면 자서전과 가족 기념책을 언제부터 준비해야 하는지 확인할 수 있습니다. 기념책 제작에 필요한 가족 검토, 디자인, 교정과 인쇄 기간까지 반영해 권장 제작 시작일을 계산해 보세요.</p>
      </header>
      <MemoirScheduleCalculator />
      <section className={styles.content} aria-labelledby="why-title">
        <div className={styles.contentInner}>
          <span className={styles.eyebrow}>Why it takes time</span>
          <h2 id="why-title" className={styles.sectionTitle}>기념책 일정에 <em>여유가 필요한 이유</em></h2>
          <div className={styles.reasonGrid}>{reasons.map(([title, text]) => <article key={title}><h3>{title}</h3><p>{text}</p></article>)}</div>
        </div>
      </section>
      <section className={styles.faq} aria-labelledby="faq-title">
        <div className={styles.faqInner}>
          <span className={styles.eyebrow}>Frequently Asked Questions</span>
          <h2 id="faq-title" className={styles.sectionTitle}>자주 묻는 <em>질문</em></h2>
          <div className={styles.faqList}>{faqs.map(([question, answer]) => <details key={question}><summary>{question}</summary><p>{answer}</p></details>)}</div>
        </div>
      </section>
    </div>
  )
}
