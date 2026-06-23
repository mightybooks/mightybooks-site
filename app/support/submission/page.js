import styles from './submission.module.css'

export const metadata = {
  title: '원고 접수 안내 | 마이티북스',
  description:
    '마이티북스 원고 접수 안내. 원고 검토와 출간 방식 판단은 기획출간 유료상담을 통해 진행하며, 자서전·시집·문집 제작 문의는 제작 상담으로 연결합니다.',
  alternates: {
    canonical: '/support/submission',
  },
}

export default function SubmissionPage() {
  return (
    <div className={styles.wrap}>
      <div className={styles.hero}>
        <span className={styles.tag}>Manuscript Submission Guide</span>
        <h1 className={styles.title}>원고 접수 <em>안내</em></h1>
        <div className={styles.line} />
        <p className={styles.seoLine}>
          마이티북스는 사전 협의 없는 일방적인 원고 투고 파일은 검토하지 않습니다.
          직접적인 원고 검토, 기획출간 가능성 판단은 기획출간 유료상담을 통해 진행합니다.
        </p>
      </div>

      <div className={styles.content}>
        <div className={styles.statement}>
          <p>원고를 보내기 전에</p>
          <p>제작 목적을 먼저 확인합니다.</p>
        </div>

        <p className={styles.statementSub}>
          책을 만들고 싶은 이유가 자서전 제작인지, 시집 제작인지, 문집 제작인지,
          개인 원고의 출간 가능성 검토인지에 따라 상담 경로가 달라집니다.
          목적이 분명한 제작 문의는 해당 서비스 상담으로 연결하고, 원고의 출간 방식 판단이 필요한 경우
          기획출간 유료상담을 안내합니다.
        </p>

        <div className={styles.divider} />

        <h2 className={styles.subTitle}>원고 접수 전 확인할 것</h2>

        <ul className={styles.list}>
          <li>완성 원고, 일부 원고, 기획 메모 중 현재 준비된 자료가 무엇인지 정리해 주세요.</li>
          <li>책의 목적이 가족 보관용, 기념 배포용, 서점 유통용 중 어디에 가까운지 확인해 주세요.</li>
          <li>자서전 제작은 원고가 없어도 인터뷰 기반 집필로 시작할 수 있습니다.</li>
          <li>시집·문집 제작은 작품 수, 참여자 수, 원고 취합 상태, 제작 부수를 먼저 확인합니다.</li>
          <li>원고 투고 가능성, 출판 방식, 비용 구조를 판단해야 한다면 기획출간 유료상담을 신청해 주세요.</li>
        </ul>

        <div className={styles.emailBox}>
          <div className={styles.emailLabel}>현재 상황에 맞는 상담 경로</div>
          <a href="/support/paid-consultation" className={styles.emailAddr}>
            기획출간 유료상담 보기 →
          </a>
          <p className={styles.emailNote}>
            원고 상태, 출간 방식, 제작비 구조를 점검해야 할 때 이용합니다.
          </p>
          <a href="/business/autobiography" className={styles.emailAddr}>
            자서전·기념 도서 제작 →
          </a>
          <p className={styles.emailNote}>
            부모님 자서전, 회고록, 퇴임기념집, 가족에게 남기는 책을 만들고 싶을 때 이용합니다.
          </p>
          <a href="/business/poetry" className={styles.emailAddr}>
            시집·문집 제작 →
          </a>
          <p className={styles.emailNote}>
            개인 시집, 동호회 문집, 가족 문집, 추모 문집을 만들고 싶을 때 이용합니다.
          </p>
        </div>
      </div>
    </div>
  )
}
