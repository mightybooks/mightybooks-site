import styles from './education.module.css'

export const metadata = {
  title: '글쓰기 강의 | 출판까지 연결되는 교육',
  description: '출판을 목표로 하는 글쓰기 교육. 1:1 맞춤 커리큘럼과 실제 출간까지 연결되는 과정',
}

const steps = [
  { num: '01', icon: '📞', label: '상담하기' },
  { num: '02', icon: '📝', label: '계약서 작성' },
  { num: '03', icon: '💳', label: '신청 및 결제' },
  { num: '04', icon: '📚', label: '수업 준비' },
  { num: '05', icon: '🖥️', label: '수업 진행' },
  { num: '06', icon: '📖', label: '투고 및 출간' },
]

const stepDetails = [
  {
    label: '전화상담 or ZOOM 미팅',
    desc: '마이티북스의 모든 교육은 1:1 또는 소규모 그룹으로 이루어집니다. 이에 따라 예비 저자에게 필요한 현실 점검 후 수업을 진행하니, 반드시 결제 전 전화 또는 ZOOM 미팅 신청을 해 주세요.'
  },
  {
    label: '계약서 작성',
    desc: '모든 관계는 신뢰에서 시작한다고 믿습니다. 따라서 수업 기간과 커리큘럼 확인, 강사들의 콘텐츠 보안을 위해 수업 전 마이티북스와 수강생 간 계약서를 작성합니다.'
  },
  {
    label: '신청 및 결제',
    desc: '상담과 계약서 작성 완료 후에는 수업에 동의한다는 의미로 받아들이고, 결제 방식을 안내해 드립니다. 현금 결제 시 필요에 따라 현금영수증, 계산서, 지출 증빙 중 1종을 발급해 드리며, 카드 결제는 간편 결제 시스템으로 불편함을 최소화해 드립니다.'
  },
  {
    label: '수업 준비',
    desc: '책 출간 또는 글쓰기 습관을 제대로 잡아보겠다는 의지만 준비해 주시면 됩니다. 경우에 따라 사전 과제가 주어질 수도 있습니다.'
  },
  {
    label: '수업 진행',
    desc: '서로 합의한 시간에 커리큘럼에 따라 수업합니다. 매시간 과제가 주어지며, 제출한 과제를 바탕으로 피드백하는 방식을 원칙으로 두므로, 과제를 착실히 하는 만큼 성장하는 수업입니다.'
  },
  {
    label: '투고 및 출간',
    desc: '초반에 계약한 내용에 따라 마이티북스에서의 출간 및 타 출판사 투고를 도와드립니다. 희망자에 한해 할인된 금액으로 재수강도 가능합니다.'
  },
]

const courses = [
  {
    title: 'AI저작권 침해 대응',
    desc: 'AI학습에 따른 저작권 침해를 미연에 방지하고자 개인 창작자의 콘텐츠 보안 강화 방법에 대해 알려드립니다.',
    img: '/image/home/edu002.avif',
  },
  {
    title: '개인 POD출간 클레스',
    desc: '개인 창작자들이 직접 POD로 출간할 수 있도록 세부적인 방법을 안내해 드립니다.',
    img: '/image/home/edu003.avif',
  },
  {
    title: '독립출판사 창업 클레스',
    desc: '1인출판사, 독립출판사 창업 과정을 세부적으로 도와드립니다. 사업경험 없는 초보들이 놓치기 쉬운 세금 문제 안내 등.',
    img: '/image/home/edu004.avif',
  },
  {
    title: '원데이 특강',
    desc: '10명 내외 예비 작가 그룹을 대상으로 특강 요청이 가능합니다.',
    img: '/image/home/edu005.avif',
  },
  {
    title: '글쓰기 기초 이론',
    desc: '글쓰기의 부담감을 없애고 싶은 예비 작가를 대상으로 진행하는 1:1 또는 소그룹 수업입니다.',
    img: '/image/home/edu006.jpg',
  },
  {
    title: '글쓰기 실전 특강',
    desc: '글쓰기에 대한 부담감은 없지만 한 편의 글을 제대로 완성하고 싶은 예비 작가를 대상으로 하는 1:1 또는 소그룹 수업입니다.',
    img: '/image/home/edu007.avif',
  },
]

export default function EducationPage() {
  return (
    <div className={styles.wrap}>

      {/* HERO */}
      <div className={styles.hero}>
        <span className={styles.tag}>Online Education</span>
        <h1 className={styles.title}>출판까지 연결되는 <em>글쓰기 교육</em></h1>
        <div className={styles.line} />
        <p className={styles.heroSub}>저자의, 저자에 의한, 저자를 위한 강의</p>
        <p className={styles.seoLine}>
          출판을 목표로 하는 글쓰기 교육과 1:1 맞춤 커리큘럼을 제공하는 마이티북스 온라인 강의입니다.
        </p>
      </div>

      {/* 1:1 소개 */}
      <div className={styles.intro}>
        <div className={styles.introText}>
          <h2 className={styles.introTitle}>1:1 맞춤형 커리큘럼</h2>
          <p>마이티북스 대부분의 강의는<br/>1:1 맞춤형 커리큘럼입니다.<br/>그만큼 출간까지 들이는<br/>에너지 소모가 많기 때문입니다.</p>
          <br/>
          <p>전문가의 집중 케어에 따라<br/><strong>'저자'의 꿈을 달성하세요.</strong></p>
          <a href="https://open.kakao.com/me/mightybooks" target="_blank" rel="noopener noreferrer" className={styles.introBtn}>
            출판 상담 및 수강 문의 →
          </a>
        </div>
        <div className={styles.introImg}>
          <img src="/image/home/edu001.avif" alt="1:1 맞춤형 커리큘럼" />
        </div>
      </div>

      {/* 수업 진행 과정 */}
      <div className={styles.processWrap}>
        <div className={styles.sectionHeader}>
          <span className={styles.tag}>Process</span>
          <h2 className={styles.sectionTitle}>수업 진행 <em>과정</em></h2>
          <div className={styles.line} />
        </div>

        {/* 스텝 아이콘 */}
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

        {/* 스텝 상세 */}
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
      <div className={styles.coursesWrap}>
        <div className={styles.sectionHeader}>
          <span className={styles.tag}>Courses</span>
          <h2 className={styles.sectionTitle}>강좌 <em>목록</em></h2>
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
                <a href="https://open.kakao.com/me/mightybooks" target="_blank" rel="noopener noreferrer" className={styles.courseBtn}>
                  수강 문의 →
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  )
}