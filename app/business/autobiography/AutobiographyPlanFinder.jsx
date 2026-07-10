'use client'
import { useMemo, useState } from 'react'
import { EMAIL_ADDRESS, KAKAO_URL, PhoneConsultModal } from '../components/ServiceContactCta'
import styles from './autobiography.module.css'

const planInfo = {
  light: {
    name: '라이트 플랜',
    price: '예상 100만 원~',
    title: '라이트 플랜이 적합해 보입니다.',
    body: '이미 준비된 원고가 있고, 가족 소장용이나 기념 선물용으로 소량 제작을 원하시는 경우에 적합한 플랜입니다. 기본 윤문, 내지 편집, 사진 20장 이내의 기본 배치를 포함해 짧은 생애 기록이나 기념 도서 형태로 제작할 수 있습니다.',
    note: '최종 견적은 원고 분량, 사진 수, 인쇄 부수와 제본 방식에 따라 달라질 수 있습니다.',
  },
  standard: {
    name: '스탠다드 플랜',
    price: '예상 200만 원~',
    title: '스탠다드 플랜이 적합해 보입니다.',
    body: '원고, 녹취, 메모를 바탕으로 일반적인 자서전이나 회고록을 제작하려는 경우에 적합한 플랜입니다. 생애 흐름에 맞춰 목차를 구성하고, 문장을 정리해 가족·지인 배포용 도서로 완성할 수 있습니다.',
    note: '녹취 정리, 원고 보완, 사진 추가 작업, 인쇄 부수에 따라 최종 견적이 달라질 수 있습니다.',
  },
  premium: {
    name: '프리미엄 플랜',
    price: '예상 660만 원~',
    title: '프리미엄 플랜이 적합해 보입니다.',
    body: '완성 원고가 없거나, 인터뷰를 통해 생애 흐름을 재구성해야 하는 경우에 적합한 플랜입니다. 여러 자료와 기억을 정리해 본격적인 자서전, 회고록, 가족 기록집으로 구성할 수 있습니다.',
    note: '인터뷰 횟수, 가족·지인 보충 인터뷰, 사진과 자료 정리 범위, 출장 여부에 따라 최종 견적이 달라질 수 있습니다.',
  },
  business: {
    name: '비즈니스 플랜',
    price: '예상 1,800만 원~',
    title: '비즈니스 플랜이 적합해 보입니다.',
    body: '사업가, 전문직, 단체장, 정치인, 기관장 등 외부 공개와 브랜딩 목적의 자서전·회고록 제작에 적합한 플랜입니다. 개인의 이력과 사건을 단순 정리가 아니라 서사와 메시지를 갖춘 책의 구조로 설계합니다.',
    note: '심화 인터뷰, 자료 검토, 사건 구조화, 전기소설형 구성, 외부 공개와 유통 범위에 따라 최종 견적이 달라질 수 있습니다.',
  },
}

const questions = [
  {
    id: 'quantity',
    title: '몇 권을 제작하고 싶으십니까?',
    options: [
      { label: '5권 기본 소량 제작', score: { light: 2 }, flags: [] },
      { label: '20권 미만', score: { light: 1, standard: 1 }, flags: [] },
      { label: '100권 이상', score: { standard: 1, premium: 1 }, flags: ['print100'] },
      { label: '300권 이상', score: { premium: 1, business: 1 }, flags: ['print300'] },
      { label: '500권 이상', score: { premium: 1, business: 1 }, flags: ['print300'] },
    ],
  },
  {
    id: 'manuscript',
    title: '작성된 원고가 있습니까?',
    options: [
      { label: '예, 거의 완성된 원고가 있습니다.', score: { light: 2, standard: 1 }, flags: [] },
      { label: '일부 원고, 메모, 녹취 자료가 있습니다.', score: { standard: 2, premium: 1 }, flags: [] },
      { label: '아직 원고는 없지만 기록하고 싶은 이야기가 있습니다.', score: { premium: 2 }, flags: [] },
      { label: '사업, 경력, 활동 이력을 브랜딩 목적의 책으로 만들고 싶습니다.', score: { business: 3 }, flags: ['businessIntent'] },
    ],
  },
  {
    id: 'length',
    title: '원고 분량은 어느 정도입니까?',
    options: [
      { label: '원고 미작성', score: { premium: 1 }, flags: [] },
      { label: 'A4 20장 미만 또는 2만 자 미만', score: { light: 2 }, flags: [] },
      { label: 'A4 20~60장 정도 또는 2만~6만 자', score: { standard: 2 }, flags: [] },
      { label: 'A4 60장 이상 또는 6만~8만 자', score: { standard: 1, premium: 2 }, flags: [] },
      { label: '8만 자 초과', score: { premium: 2, business: 1 }, flags: ['longManuscript'] },
    ],
  },
  {
    id: 'method',
    title: '원고가 준비되어 있지 않거나 보완이 필요하다면, 어떤 방식이 좋으십니까?',
    options: [
      { label: '직접 녹음한 파일이나 메모를 전달하고 싶습니다.', score: { standard: 2 }, flags: [] },
      { label: '온라인 또는 전화로 인터뷰를 진행하고 싶습니다.', score: { premium: 2 }, flags: [] },
      { label: '대면으로 만나 이야기를 나누며 인터뷰하고 싶습니다.', score: { premium: 2 }, flags: ['travelInterview'] },
      { label: '가족·지인 보충 인터뷰까지 포함하고 싶습니다.', score: { premium: 3 }, flags: ['extraInterview'] },
      { label: '사업·경력·활동 이력을 고급 자서전 또는 브랜딩 도서로 구성하고 싶습니다.', score: { business: 3 }, flags: ['businessIntent'] },
    ],
  },
  {
    id: 'purpose',
    title: '책의 주된 목적은 무엇입니까?',
    options: [
      { label: '가족 소장용', score: { light: 2 }, flags: [] },
      { label: '부모님 선물, 칠순·팔순·퇴임 기념', score: { light: 1, standard: 1 }, flags: [] },
      { label: '가족·지인에게 배포할 회고록', score: { standard: 1, premium: 1 }, flags: [] },
      { label: '외부 공개 또는 서점 유통까지 고려', score: { premium: 1, business: 2 }, flags: ['businessIntent'] },
      { label: '사업, 경력, 전문성, 정치·기관 활동의 브랜딩', score: { business: 3 }, flags: ['businessIntent'] },
    ],
  },
  {
    id: 'photos',
    title: '사진과 자료는 어느 정도 있습니까?',
    options: [
      { label: '사진 20장 이하', score: { light: 1, standard: 1 }, flags: [] },
      { label: '사진 20~50장', score: { standard: 1, premium: 1 }, flags: ['photoExtra'] },
      { label: '사진 50장 이상', score: { premium: 1 }, flags: ['photoExtra'] },
      { label: '오래된 사진 복원이나 자료 정리가 필요합니다.', score: { premium: 2 }, flags: ['photoExtra', 'photoRestore'] },
      { label: '사진보다 사건, 이력, 자료 구조화가 중요합니다.', score: { premium: 1, business: 2 }, flags: ['businessIntent'] },
    ],
  },
]

const flagMessages = {
  print100: '100권 이상 제작은 인쇄 부수와 제본 사양에 따라 제작비 차이가 커집니다. 추천 플랜과 별도로 인쇄 견적 확인이 필요합니다.',
  print300: '300권 이상 제작은 인쇄 방식, 종이, 제본, 납품 방식에 따라 별도 견적이 필요합니다. 상담 시 부수와 납품 일정을 함께 확인합니다.',
  longManuscript: '8만 자를 초과하는 원고는 기본 제작 범위를 넘어설 수 있으므로 별도 견적이 적용될 수 있습니다.',
  photoExtra: '사진 20장을 초과하는 경우 추가 편집·배치 비용이 발생할 수 있습니다.',
  photoRestore: '오래된 사진의 고난도 복원, 컬러 복원, 대량 스캔·정리는 별도 견적이 필요할 수 있습니다.',
  travelInterview: '대면 또는 출장 인터뷰는 지역과 일정에 따라 출장비가 별도로 발생할 수 있습니다.',
  extraInterview: '가족·지인 보충 인터뷰는 인터뷰 횟수와 정리 범위에 따라 별도 견적이 필요할 수 있습니다.',
}

const priority = ['business', 'premium', 'standard', 'light']

function getResult(answers) {
  const scores = { light: 0, standard: 0, premium: 0, business: 0 }
  const flags = new Set()
  const reasons = []

  answers.forEach((answer) => {
    if (!answer) return
    Object.entries(answer.score).forEach(([key, value]) => {
      scores[key] += value
    })
    answer.flags.forEach((flag) => flags.add(flag))
    reasons.push(answer.label)
  })

  if (!flags.has('businessIntent')) {
    scores.business = Math.min(scores.business, scores.premium - 1)
  }

  const plan = priority.reduce((best, key) => {
    if (!best) return key
    return scores[key] > scores[best] ? key : best
  }, null)

  return {
    plan,
    reasons: reasons.slice(1, 5),
    alerts: Array.from(flags)
      .filter((flag) => flagMessages[flag])
      .map((flag) => flagMessages[flag]),
  }
}

export default function AutobiographyPlanFinder() {
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState([])
  const [isPhoneOpen, setIsPhoneOpen] = useState(false)
  const isComplete = answers.length === questions.length
  const currentQuestion = questions[step]
  const result = useMemo(() => getResult(answers), [answers])
  const selectedLabel = answers[step]?.label

  const selectOption = (option) => {
    const nextAnswers = answers.slice(0, step)
    nextAnswers[step] = option
    setAnswers(nextAnswers)
    if (step < questions.length - 1) {
      setStep(step + 1)
    }
  }

  const goBack = () => {
    setStep((current) => Math.max(0, current - 1))
  }

  const reset = () => {
    setStep(0)
    setAnswers([])
  }

  if (isComplete) {
    const plan = planInfo[result.plan]

    return (
      <div className={styles.finderCard}>
        <div className={styles.finderEyebrow}>상담 전 예상 플랜</div>
        <h3 className={styles.finderResultTitle}>{plan.title}</h3>
        <div className={styles.finderPrice}>{plan.price}</div>
        <p className={styles.finderText}>{plan.body}</p>

        <div className={styles.finderReasonBox}>
          <h4>추천 이유</h4>
          <ul>
            {result.reasons.map((reason) => <li key={reason}>{reason}</li>)}
          </ul>
        </div>

        <div className={styles.finderReasonBox}>
          <h4>추가 확인이 필요한 항목</h4>
          <ul>
            <li>{plan.note}</li>
            {result.alerts.map((alert) => <li key={alert}>{alert}</li>)}
            <li>모든 금액은 상담 전 예상 기준이며, 최종 견적은 상담 후 확정됩니다.</li>
          </ul>
        </div>

        <p className={styles.finderText} style={{ marginTop: '24px' }}>
          이 결과는 확정 견적이 아니라 상담 전 참고용입니다. 상담을 통해 원고 상태, 제작 목적, 예산,
          인쇄 부수, 사진 자료, 인터뷰 필요 여부를 더 자세히 알려주시면 그에 맞춰 제작 방향과 견적을 조정해드릴 수 있습니다.
        </p>

        <div className={styles.finderActions}>
          <a
            href={KAKAO_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.ctaBtn}
            aria-label="카카오톡으로 자서전 추천 플랜 상담하기"
          >
            오픈채팅 문의
          </a>
          <button type="button" className={styles.ctaBtnGhost} onClick={() => setIsPhoneOpen(true)}>
            전화 문의
          </button>
          <a href={`mailto:${EMAIL_ADDRESS}`} className={styles.ctaBtnGhost}>
            이메일 문의
          </a>
          <button type="button" className={styles.ctaBtnGhost} onClick={reset}>
            다시 선택하기
          </button>
        </div>
        {isPhoneOpen && (
          <PhoneConsultModal
            styles={styles}
            onClose={() => setIsPhoneOpen(false)}
          />
        )}
      </div>
    )
  }

  return (
    <div className={styles.finderCard}>
      <div className={styles.finderTop}>
        <div>
          <span className={styles.finderEyebrow}>Question</span>
          <h3 className={styles.finderQuestion}>{currentQuestion.title}</h3>
        </div>
        <div className={styles.finderProgress}>{step + 1} / {questions.length}</div>
      </div>

      <div className={styles.finderOptions}>
        {currentQuestion.options.map((option) => (
          <button
            key={option.label}
            type="button"
            className={`${styles.finderOption} ${selectedLabel === option.label ? styles.finderOptionSelected : ''}`}
            onClick={() => selectOption(option)}
          >
            {option.label}
          </button>
        ))}
      </div>

      <div className={styles.finderActions}>
        <button
          type="button"
          className={styles.ctaBtnGhost}
          onClick={goBack}
          disabled={step === 0}
        >
          이전
        </button>
        <button type="button" className={styles.ctaBtnGhost} onClick={reset}>
          다시 선택하기
        </button>
      </div>
    </div>
  )
}
