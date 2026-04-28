import styles from './500-character-fiction.module.css'

export const metadata = {
  title: '500자 글쓰기 워크숍 | 마이티북스',
  description:
    '500자 글쓰기는 AI 시대의 텍스트 숏폼입니다. 마이티북스 500자 글쓰기 워크숍은 자기 서사를 압축하고 요약하고 설득하는 8주 글쓰기 과정입니다.',
}

const WORKSHOP_STORE_URL = 'https://smartstore.naver.com/shop15th/products/13464496645'

const targets = [
  '긴 원고를 쓰기 전, 내 이야기를 짧고 설득력 있게 정리해보고 싶은 분',
  '출판사에 원고를 보내기 전, 내 원고의 핵심을 설명하는 힘이 필요한 분',
  '자기 경험, 인생 이야기, 전문성을 콘텐츠로 압축하고 싶은 분',
  '블로그, SNS, 책 소개문, 저자 소개 등 퍼스널 브랜드 문장이 필요한 분',
]

const curriculum = [
  {
    step: '01',
    title: '500자는 왜 강한가',
    desc: 'AI 시대의 텍스트 숏폼으로서 500자 글쓰기의 역할과 활용 가능성을 이해합니다.',
  },
  {
    step: '02',
    title: '인물과 상황 만들기',
    desc: '짧은 글 안에서 독자가 따라올 수 있는 인물과 상황을 구성합니다.',
  },
  {
    step: '03',
    title: '사건과 변화 만들기',
    desc: '단순한 설명이 아니라 읽히는 이야기로 만들기 위해 사건과 전환을 설계합니다.',
  },
  {
    step: '04',
    title: '500자 소설 완성',
    desc: '문장 제거, 압축, 생략, 여운을 통해 짧지만 완성된 500자 서사를 작성합니다.',
  },
  {
    step: '05',
    title: '내 이야기 500자로 설명하기',
    desc: '자기 경험과 활동을 500자 안에서 설명 가능한 자기서사로 정리합니다.',
  },
  {
    step: '06',
    title: '원고와 책을 500자로 소개하기',
    desc: '원고 소개문, 책 소개문, 저자 소개문처럼 출판사가 먼저 보는 문장을 만듭니다.',
  },
  {
    step: '07',
    title: 'SNS 카드뉴스로 확장하기',
    desc: '500자 원문을 후킹, 문제 제기, 전환, 제안, CTA가 있는 카드뉴스 구조로 나눕니다.',
  },
  {
    step: '08',
    title: 'CTA 문장까지 완성하기',
    desc: '읽는 사람이 문의, 신청, 구매, 구독으로 이동할 수 있도록 마지막 행동 문장을 설계합니다.',
  },
]

export default function WorkshopPage() {
  return (
    <div className={styles.wrap}>
      <section className={styles.hero}>
        <span className={styles.tag}>Writing Workshop</span>
        <h1 className={styles.title}>
          긴 원고를 쓰기 전<br />
          <em>500자로 먼저 설득하세요</em>
        </h1>
        <div className={styles.line} />
        <p className={styles.heroSub}>
          500자 글쓰기는 AI 시대의 텍스트 숏폼입니다.
        </p>
        <p className={styles.seoLine}>
          자기 서사를 압축하고, 요약하고, 설득하는 글쓰기 훈련을 시작합니다.
        </p>
      </section>

      <section className={styles.intro}>
        <div className={styles.introText}>
          <span className={styles.tag}>Why 500 Characters</span>
          <h2 className={styles.sectionTitle}>
            왜 출판을 준비하는 사람에게 500자가 필요한가
          </h2>
          <p>
            출판사를 찾는 사람에게 필요한 것은 긴 원고만이 아닙니다.
            자신의 이야기가 무엇인지, 왜 읽혀야 하는지, 누구에게 필요한지 짧게 설명하는 힘도 필요합니다.
          </p>
          <p>
            500자 글쓰기는 AI 시대의 텍스트 숏폼입니다.
            짧은 분량 안에서 인물, 상황, 사건, 변화를 구성하며 하나의 이야기를 완성합니다.
            이 과정은 단순히 짧은 글쓰기를 넘어, 자기 서사를 압축하고 요약하고 설득하는 훈련이 됩니다.
          </p>
          <p>
            이 훈련을 통해 원고 소개문, 책 소개문, 저자 소개, 블로그 글, SNS 콘텐츠,
            퍼스널 브랜드 문장까지 확장할 수 있습니다.
            긴 원고를 쓰기 전, 먼저 500자 안에서 자기 이야기를 설명할 수 있어야 합니다.
          </p>
        </div>
        <div className={styles.introImg}>
          <img src="/image/home/edu006.jpg" alt="500자 글쓰기 워크숍" />
        </div>
      </section>

      <section className={styles.targetWrap}>
        <div className={styles.sectionHeader}>
          <span className={styles.tag}>Who We Help</span>
          <h2 className={styles.sectionTitle}>이런 분에게 맞습니다</h2>
          <div className={styles.line} />
        </div>
        <div className={styles.targetGrid}>
          {targets.map((target, i) => (
            <div key={target} className={styles.targetCard}>
              <div className={styles.targetNum}>{String(i + 1).padStart(2, '0')}</div>
              <p>{target}</p>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.curriculumWrap}>
        <div className={styles.sectionHeader}>
          <span className={styles.tag}>Curriculum</span>
          <h2 className={styles.sectionTitle}>8주 커리큘럼</h2>
          <div className={styles.line} />
        </div>
        <div className={styles.curriculumList}>
          {curriculum.map(item => (
            <div key={item.step} className={styles.curriculumItem}>
              <div className={styles.curriculumStep}>{item.step}</div>
              <div>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.method}>
        <div>
          <span className={styles.tag}>Format</span>
          <h2 className={styles.sectionTitle}>진행 방식</h2>
          <p>
            워크숍은 총 8주 구성으로 진행됩니다.
            앞의 4주는 500자 소설을 통해 인물, 상황, 사건, 변화의 기본 문법을 훈련하고,
            뒤의 4주는 이를 자기소개, 원고 소개문, SNS 카드뉴스, CTA 문장으로 확장합니다.
          </p>
        </div>
        <div>
          <span className={styles.tag}>Output</span>
          <h2 className={styles.sectionTitle}>결과물</h2>
          <p>
            워크숍의 목표는 단순히 500자 글 한 편을 쓰는 것이 아닙니다.
            참여자는 500자 소설, 500자 자기서사, 원고 소개문, 책 소개문,
            SNS 카드뉴스 구성안, CTA 문장까지 실전 활용 가능한 결과물을 정리합니다.
          </p>
        </div>
      </section>

      <section className={styles.intro}>
        <div className={styles.introText}>
          <span className={styles.tag}>Personal Branding</span>
          <h2 className={styles.sectionTitle}>
            500자는 퍼스널 브랜드의 최소 단위가 될 수 있습니다
          </h2>
          <p>
            책을 내고 싶은 사람에게 필요한 것은 원고만이 아닙니다.
            자신의 경험과 관점, 문제의식, 전문성을 사람들이 이해할 수 있는 짧은 문장으로 바꾸는 힘도 필요합니다.
          </p>
          <p>
            500자 안에 자신의 이야기를 담을 수 있다면, 그것은 블로그 글의 도입부가 될 수 있고,
            SNS 콘텐츠가 될 수 있으며, 책 소개문이나 저자 소개문으로도 확장될 수 있습니다.
          </p>
          <p>
            특히 500자 텍스트는 SNS 카드뉴스로 확장하기 좋습니다.
            하나의 500자 원문을 후킹 문장, 문제 제기, 공감, 전환, 제안, CTA로 나누면
            7장 미만의 짧은 카드 콘텐츠로 재구성할 수 있습니다.
          </p>
          <p>
            결국 500자 쓰기는 짧은 글을 쓰는 기술만이 아니라,
            출판을 준비하는 사람이 자기 이야기를 압축하고, 요약하고, 설득하는 훈련입니다.
          </p>
        </div>
        <div className={styles.introImg}>
          <img src="/image/home/edu005.avif" alt="퍼스널 브랜드 글쓰기 워크숍" />
        </div>
      </section>

      <section className={styles.intro}>
        <div className={styles.introText}>
          <span className={styles.tag}>Payment Process</span>
          <h2 className={styles.sectionTitle}>신청 및 결제 방법</h2>
          <p>
            500자 글쓰기 워크숍은 스마트스토어 상품 페이지에서 신청하실 수 있습니다.
            상세페이지에서 일정, 진행 방식, 참여 조건을 확인한 뒤 연락처를 정확히 기입하고 결제해 주세요.
          </p>
          <p>
            결제 확인 후 마이티북스에서 순차적으로 연락드립니다.
            이후 참여 안내, 준비 사항, 진행 일정을 개별 안내합니다.
          </p>
        </div>
        <div className={styles.introImg}>
          <img src="/image/home/edu006.jpg" alt="500자 글쓰기 워크숍 신청 안내" />
        </div>
      </section>

      <section className={styles.cta}>
        <div className={styles.ctaInner}>
          <h2 className={styles.ctaTitle}>
            긴 원고를 쓰기 전, 500자로 먼저 설득하세요
          </h2>
          <p className={styles.heroSub}>
            스마트스토어 상세페이지에서 워크숍 내용을 확인하고 결제하시면,
            결제 확인 후 마이티북스에서 참여 안내를 드립니다.
          </p>
          <div className={styles.ctaBtns}>
            <a
              href={WORKSHOP_STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.ctaBtn}
            >
              스마트스토어에서 워크숍 결제 →
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}