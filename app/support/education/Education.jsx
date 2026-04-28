import styles from './education.module.css'

export const metadata = {
  title: '출판 관련 심화 교육 | 마이티북스',
  description:
    '마이티북스 출판 관련 실전 교육 안내. 글쓰기 심화교육, 저작권 교육, 1인 출판 툴 사용, 랜딩페이지와 결제툴 연동, AI 시대 퍼스널 브랜딩, 500자 글쓰기 워크숍을 안내합니다.',
}

const EDUCATION_APPLY_URL = 'https://open.kakao.com/me/mightybooks'

const steps = [
  { num: '01', icon: '🧭', label: '과정 선택' },
  { num: '02', icon: '📝', label: '목적 확인' },
  { num: '03', icon: '💳', label: '신청·결제' },
  { num: '04', icon: '📚', label: '자료 준비' },
  { num: '05', icon: '🖥️', label: '수업 진행' },
  { num: '06', icon: '📌', label: '실전 적용' },
]

const stepDetails = [
  {
    label: '과정 선택',
    desc: '글쓰기, 저작권, 1인 출판, 랜딩페이지, 퍼스널 브랜딩, 500자 글쓰기 중 현재 필요한 교육 과정을 선택합니다.',
  },
  {
    label: '목적 확인',
    desc: '수강 목적이 창작 역량 강화인지, 출판 준비인지, 판매 구조 설계인지, 퍼스널 브랜딩인지 먼저 확인합니다.',
  },
  {
    label: '신청·결제',
    desc: '과정별 상세 안내를 확인한 뒤 신청합니다. 결제 방식과 일정은 과정별 안내에 따라 진행됩니다.',
  },
  {
    label: '자료 준비',
    desc: '필요한 경우 현재 원고, 소개문, 랜딩페이지 초안, 사용 중인 툴, 판매 페이지, 콘텐츠 자료 등을 준비합니다.',
  },
  {
    label: '수업 진행',
    desc: '과정별 커리큘럼에 따라 실습 중심으로 진행합니다. 단순 이론보다 실제 작업에 적용할 수 있는 방식으로 안내합니다.',
  },
  {
    label: '실전 적용',
    desc: '수업 결과물을 바탕으로 원고, 콘텐츠, 저작권 관리, 판매 페이지, 퍼스널 브랜드 운영에 적용할 수 있는 다음 단계를 정리합니다.',
  },
]

const courses = [
  {
    title: '장르 불문 글쓰기 심화교육',
    desc: '소설, 에세이, 자서전, 칼럼, 콘텐츠 글쓰기에 공통으로 필요한 문장, 구조, 서사, 독자 설계를 다루는 8주 과정입니다.',
    img: '/image/home/edu007.avif',
    href: EDUCATION_APPLY_URL,
  },
  {
    title: '저작권 강화 교육',
    desc: '창작자와 1인 출판사가 반드시 알아야 할 저작권, 인용, 이미지·폰트 사용, AI 활용, 계약 주의사항을 다루는 원데이 클래스입니다.',
    img: '/image/home/edu003.avif',
    href: EDUCATION_APPLY_URL,
  },
  {
    title: '1인출판을 위한 툴 사용 교육',
    desc: '원고 정리, 편집, 표지·이미지 관리, 전자책 제작, 판매 준비에 필요한 실무 도구를 익히는 4주 과정입니다.',
    img: '/image/home/edu004.avif',
    href: EDUCATION_APPLY_URL,
  },
  {
    title: '랜딩페이지 작성과 결제툴 연동',
    desc: '상품 설명, CTA 문구, 신청 동선, 결제 링크 연결까지 판매 가능한 페이지 구조를 점검하는 원데이 클래스입니다.',
    img: '/image/home/edu005.avif',
    href: EDUCATION_APPLY_URL,
  },
  {
    title: 'AI 시대의 퍼스널 브랜딩',
    desc: 'AI가 문장을 대량 생성하는 시대에 자기 경험, 전문성, 콘텐츠 방향을 브랜드 문장으로 정리하는 원데이 클래스입니다.',
    img: '/image/home/edu006.jpg',
    href: EDUCATION_APPLY_URL,
  },
  {
    title: '500자 글쓰기 워크숍',
    desc: 'AI 시대의 텍스트 숏폼을 훈련하는 8주 과정입니다. 500자 소설에서 시작해 자기서사, 원고 소개문, 카드뉴스, CTA 문장으로 확장합니다.',
    img: '/image/home/edu002.avif',
    href: '/workshop/500-character-fiction',
  },
]

export default function EducationPage() {
  return (
    <div className={styles.wrap}>

      {/* HERO */}
      <div className={styles.hero}>
        <span className={styles.tag}>Practical Publishing Education</span>
        <h1 className={styles.title}>출판 관련 <em>실전 교육</em></h1>
        <div className={styles.line} />
        <p className={styles.heroSub}>
          쓰고, 만들고, 알리고, 판매하기 위한 새 시대의 출판 실무 교육
        </p>
        <p className={styles.seoLine}>
          마이티북스는 글쓰기와 출판, 저작권, 1인 출판 도구, 랜딩페이지, 퍼스널 브랜딩,
          500자 글쓰기까지 실제 작업에 필요한 교육을 안내합니다.
        </p>
      </div>

      {/* 소개 */}
      <div className={styles.intro}>
        <div className={styles.introText}>
          <h2 className={styles.introTitle}>이제 글만 잘 쓰는 것으로는 부족합니다</h2>
          <p>
            AI 시대의 창작자와 1인 출판자는 글을 쓰는 능력뿐 아니라
            자신의 콘텐츠를 정리하고, 보호하고, 알리고, 판매하는 능력까지 함께 갖춰야 합니다.
          </p>
          <br />
          <p>
            마이티북스의 출판 관련 실전 교육은 이론 설명에 머물지 않습니다.
            원고와 콘텐츠를 실제로 다루고, 저작권과 도구 사용을 점검하며,
            랜딩페이지와 결제 동선, 퍼스널 브랜딩까지 출판 이후의 활용을 함께 고려합니다.
          </p>
          <br />
          <p>
            교육은 과정별로 8주 과정, 4주 과정, 원데이 클래스로 나뉘며
            목적에 따라 필요한 과정을 선택할 수 있습니다.
          </p>
          <a href="#courses" className={styles.introBtn}>
            교육 과정 확인하기 →
          </a>
        </div>
        <div className={styles.introImg}>
          <img src="/image/home/edu001.avif" alt="출판 관련 실전 교육" />
        </div>
      </div>

      {/* 수업 진행 과정 */}
      <div className={styles.processWrap}>
        <div className={styles.sectionHeader}>
          <span className={styles.tag}>Process</span>
          <h2 className={styles.sectionTitle}>교육 진행 <em>과정</em></h2>
          <div className={styles.line} />
        </div>

        <div className={styles.steps}>
          {steps.map((s, i) => (
            <div key={i} className={styles.step}>
              <div className={styles.stepCircle}>{s.icon}</div>
              {i < steps.length - 1 && <div className={styles.stepArrow}>→</div>}
              <div className={styles.stepNum}>{s.num}</div>
              <div className={styles.stepLabel}>{s.label}</div>
            </div>
          ))}
        </div>

        <div className={styles.stepDetails}>
          {stepDetails.map((s, i) => (
            <div key={i} className={styles.stepDetail}>
              <div className={styles.stepDetailLabel}>{s.label}</div>
              <div className={styles.stepDetailDesc}>{s.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* 강좌 목록 */}
      <div className={styles.coursesWrap} id="courses">
        <div className={styles.sectionHeader}>
          <span className={styles.tag}>Courses</span>
          <h2 className={styles.sectionTitle}>실전 교육 <em>과정</em></h2>
          <div className={styles.line} />
        </div>
        <div className={styles.courseGrid}>
          {courses.map((c, i) => (
            <div key={i} className={styles.courseCard}>
              <div className={styles.courseImg}>
                <img src={c.img} alt={c.title} />
                <div className={styles.courseOverlay} />
              </div>
              <div className={styles.courseBody}>
                <h3 className={styles.courseTitle}>{c.title}</h3>
                <p className={styles.courseDesc}>{c.desc}</p>
                <a
                  href={c.href}
                  target={c.href.startsWith('http') ? '_blank' : '_self'}
                  rel="noopener noreferrer"
                  className={styles.courseBtn}
                >
                  교육 문의하기 →
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className={styles.intro}>
        <div className={styles.introText}>
          <h2 className={styles.introTitle}>필요한 교육을 골라 실전으로 연결하세요</h2>
          <p>
            출판 관련 실전 교육은 단순한 교양 강의가 아니라
            실제 원고, 콘텐츠, 판매 구조, 브랜드 운영에 연결되는 교육입니다.
          </p>
          <br />
          <p>
            수강 목적과 현재 준비 상태에 따라 적합한 과정을 선택해 주세요.
            세부 일정과 신청 방식은 과정별 안내에 따라 개별 확인됩니다.
          </p>
          <a href={EDUCATION_APPLY_URL} className={styles.introBtn}>
            교육 문의하기 →
          </a>
        </div>
        <div className={styles.introImg}>
          <img src="/image/home/edu006.jpg" alt="마이티북스 실전 교육 문의" />
        </div>
      </div>

    </div>
  )
}