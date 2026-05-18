import Link from 'next/link'
import styles from './personal-content-diagnosis.module.css'
import PersonalContentDiagnosisCta from './PersonalContentDiagnosisCta'

export const metadata = {
  title: '퍼스널 콘텐츠 진단 | 마이티북스',
  description:
    '마이티북스 퍼스널 콘텐츠 진단. 1:1 인터뷰로 개인의 경험과 경력을 정리해 콘텐츠, 브랜딩, 전자책, 출판 가능성을 진단하는 유료 서비스입니다.',
  alternates: {
    canonical: '/support/personal-content-diagnosis',
  },
}

const targets = [
  '내 경력과 경험을 콘텐츠로 정리하고 싶은 1인사업자와 프리랜서',
  '강사, 상담사, 코치로 활동하지만 나만의 설명 문장이 부족한 분',
  '전자책이나 책을 내고 싶지만 주제와 소재가 흐린 예비 저자',
  '퇴직, 전직, 경력 전환을 앞두고 자신을 새롭게 설명해야 하는 분',
  '내가 무엇을 팔 수 있는지 모르겠다고 느끼는 분',
  'AI로 글을 써도 결국 내 이야기가 비어 있다고 느끼는 분',
]

const diagnosisItems = [
  '개인의 경험',
  '반복되는 문제의식',
  '콘텐츠화 가능한 주제',
  '브랜딩을 위한 문장의 방향성',
  '강의, 상담, 코칭, 전자책, 단행본 출판 등 다양한 채널로 확장 가능한 가능성',
  '피해야 할 진부한 포장 방식',
]

const process = [
  { step: '01', title: '사전 질문지 작성', desc: '경험, 경력, 활동 이력, 현재 고민을 먼저 정리합니다.' },
  { step: '02', title: '1:1 인터뷰 진행', desc: '질문과 대화를 통해 스스로 놓치고 있던 이야기의 단서를 찾습니다.' },
  { step: '03', title: '경험과 서사의 핵심축 정리', desc: '반복되는 주제와 기억될 만한 장면을 콘텐츠 관점으로 묶습니다.' },
  { step: '04', title: '콘텐츠화 가능한 방향 제안', desc: '자기소개, 강의, 상담, 코칭, 전자책, 출판으로 확장할 가능성을 봅니다.' },
  { step: '05', title: '필요 시 후속 상품 안내', desc: '원고 검토, 500자 글쓰기 워크숍, 출판 상담이 적합한지 안내합니다.' },
]

const outputs = [
  '개인 콘텐츠 핵심축',
  '콘텐츠화 가능한 경험과 주제',
  '자기소개 방향',
  '전자책/강의/출판 가능성',
  '다음 단계 제안',
]

const prices = [
  { name: 'Lite', price: '66,000원', desc: '핵심 고민을 짧게 정리하고 방향을 확인하는 진단' },
  { name: 'Standard', price: '178,000원', desc: '인터뷰를 바탕으로 콘텐츠 축과 활용 방향을 정리하는 진단' },
  { name: 'Package', price: '별도 견적', desc: '후속 정리와 기획 방향 제안까지 포함하는 확장형 진단' },
]

export default function PersonalContentDiagnosisPage() {
  return (
    <div className={styles.wrap}>
      <section className={styles.hero}>
        <span className={styles.tag}>Personal Content Diagnosis</span>
        <h1 className={styles.title}>퍼스널 콘텐츠 <em>진단</em></h1>
        <div className={styles.line} />
        <p className={styles.heroSub}>보여주기보다 기억되기 위한 콘텐츠를 정리합니다.</p>
        <p className={styles.seoLine}>
          개인의 경험과 경력을 인터뷰로 정리해 콘텐츠·브랜딩·전자책·출판 가능성을 진단하는 1:1 유료 서비스입니다.
        </p>
      </section>

      <section className={styles.intro}>
        <div className={styles.introText}>
          <span className={styles.tag}>Why It Matters</span>
          <h2 className={styles.sectionTitle}>무엇을 말할 수 있는 사람인지 먼저 봅니다</h2>
          <p>
            많은 사람이 자기소개, 브랜드 소개, 강의 소개, 전자책 주제, 책 기획을 고민하지만
            정작 자신이 무엇을 말할 수 있는 사람인지 정리하지 못합니다.
          </p>
          <p>
            퍼스널 콘텐츠 진단은 멋진 포장부터 시작하지 않습니다.
            먼저 한 사람의 경험 안에서 반복되는 주제, 기억될 만한 장면,
            콘텐츠로 확장 가능한 축을 찾습니다.
          </p>
          <p>
            이 과정은 단순히 멋져 보이는 브랜딩이 아니라, 오래 기억될 수 있는 개인 콘텐츠의 출발점을 찾는 일입니다.
          </p>
        </div>
        <div className={styles.notice}>
          <div className={styles.noticeTitle}>출판사의 인터뷰와 편집 감각으로 보는 진단입니다</div>
          <p>
            단순 퍼스널 브랜딩 컨설팅이 아닙니다.
            마이티북스가 출판사로서 보유한 인터뷰, 편집, 기획 역량을 바탕으로
            개인의 경험과 서사를 콘텐츠로 발굴하는 상품입니다.
          </p>
        </div>
      </section>

      <section className={styles.targetWrap}>
        <div className={styles.sectionHeader}>
          <span className={styles.tag}>Who We Help</span>
          <h2 className={styles.sectionTitle}>이런 분께 적합합니다</h2>
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

      <section className={styles.splitSection}>
        <div>
          <span className={styles.tag}>Diagnosis Points</span>
          <h2 className={styles.sectionTitle}>무엇을 진단하나요</h2>
        </div>
        <ul className={styles.list}>
          {diagnosisItems.map(item => <li key={item}>{item}</li>)}
        </ul>
      </section>

      <section className={styles.processWrap}>
        <div className={styles.sectionHeader}>
          <span className={styles.tag}>Process</span>
          <h2 className={styles.sectionTitle}>진행 방식</h2>
          <div className={styles.line} />
        </div>
        <div className={styles.processList}>
          {process.map(item => (
            <div key={item.step} className={styles.processItem}>
              <div className={styles.processStep}>{item.step}</div>
              <div>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.splitSection}>
        <div>
          <span className={styles.tag}>Output</span>
          <h2 className={styles.sectionTitle}>제공 결과</h2>
          <p className={styles.sideText}>
            인터뷰에서 확인한 내용을 바탕으로 지금 단계에서 활용 가능한 콘텐츠 방향을 정리합니다.
          </p>
        </div>
        <ul className={styles.list}>
          {outputs.map(item => <li key={item}>{item}</li>)}
        </ul>
      </section>

      <section className={styles.portfolio}>
        <div className={styles.sectionHeader}>
          <span className={styles.tag}>Publisher Experience</span>
          <h2 className={styles.sectionTitle}>마이티북스가 이 진단을 할 수 있는 이유</h2>
          <div className={styles.line} />
        </div>
        <p className={styles.centerText}>
          마이티북스는 단순히 글쓰기 조언을 하는 곳이 아니라, 실제 인터뷰를 바탕으로 도서를 기획하고 제작한 경험이 있는 출판사입니다.
          아래 사례는 인터뷰 기반 기획·출간 경험을 보여주는 포트폴리오입니다.
        </p>
        <div className={styles.bookGrid}>
          <article className={styles.bookCard}>
            <img src="/image/list/list007.jpg" alt="세일즈맨 불황탈출 마스터키 표지" />
            <div>
              <h3>『세일즈맨 불황탈출 마스터키』</h3>
              <p>실제 인터뷰를 기반으로 기획·출간된 서적입니다.</p>
            </div>
          </article>
          <article className={styles.bookCard}>
            <img src="/image/list/list023.jpg" alt="동방의 별 표지" />
            <div>
              <h3>『동방의 별』</h3>
              <p>제22대 국회의원 선거 무소속 출마자의 삶과 활동을 바탕으로 구성된 자전적 전기소설입니다.</p>
            </div>
          </article>
        </div>
        <Link href="/portfolio/books" className={styles.textLink}>출간 도서 포트폴리오 보기 →</Link>
      </section>

      <section className={styles.compare}>
        <div className={styles.sectionHeader}>
          <span className={styles.tag}>Service Guide</span>
          <h2 className={styles.sectionTitle}>기존 서비스와의 차이</h2>
          <div className={styles.line} />
        </div>
        <div className={styles.compareGrid}>
          <Link href="/support/diagnosis" className={styles.compareItem}>
            <strong>원고가 이미 있다면</strong>
            <span>검토 및 유료상담</span>
          </Link>
          <div className={styles.compareItemActive}>
            <strong>아직 원고는 없지만 내 경험을 콘텐츠로 만들고 싶다면</strong>
            <span>퍼스널 콘텐츠 진단</span>
          </div>
          <Link href="/workshop/500-character-fiction" className={styles.compareItem}>
            <strong>짧고 선명한 소개문 훈련이 필요하다면</strong>
            <span>500자 글쓰기 워크숍</span>
          </Link>
          <Link href="/business/epub" className={styles.compareItem}>
            <strong>책 제작 단계로 넘어가고 싶다면</strong>
            <span>출판 상담 또는 전자책/출판 제작 상담</span>
          </Link>
        </div>
        <div className={styles.relatedLinks}>
          <Link href="/support/diagnosis">검토 및 유료상담 →</Link>
          <Link href="/support/submission">원고 접수 안내 →</Link>
          <Link href="/workshop/500-character-fiction">500자 글쓰기 워크숍 →</Link>
        </div>
      </section>

      <section className={styles.priceWrap}>
        <div className={styles.sectionHeader}>
          <span className={styles.tag}>Pricing</span>
          <h2 className={styles.sectionTitle}>가격 안내</h2>
          <div className={styles.line} />
        </div>
        <div className={styles.priceGrid}>
          {prices.map(item => (
            <div key={item.name} className={styles.priceCard}>
              <h3>{item.name}</h3>
              <strong>{item.price}</strong>
              <p>{item.desc}</p>
            </div>
          ))}
        </div>
        <p className={styles.priceNote}>상세 구성과 최종 금액은 상담 범위와 결과물 수준에 따라 달라질 수 있습니다.</p>
      </section>

      <section className={styles.warning}>
        <strong>오해 방지 안내</strong>
        <p>
          이 서비스는 심리상담, 진로상담, 취업상담, 대필 서비스가 아닙니다.
          개인의 경험과 경력을 콘텐츠·브랜딩·출판 관점에서 정리하는 인터뷰형 유료 진단입니다.
        </p>
      </section>

      <section className={styles.cta}>
        <div className={styles.ctaInner}>
          <h2 className={styles.ctaTitle}>퍼스널 콘텐츠 진단 진행 가능 여부를 문의해 주세요.</h2>
          <p className={styles.ctaDesc}>
            본 서비스는 유료 진단 상품입니다.
            전화·이메일·카카오톡 문의는 진행 방식과 일정 안내를 위한 사전 문의입니다.
          </p>
          <PersonalContentDiagnosisCta />
        </div>
      </section>
    </div>
  )
}
