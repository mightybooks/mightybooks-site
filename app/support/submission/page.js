import styles from './submission.module.css'

export const metadata = {
  title: '출판사 원고 투고 | 마이티북스 투고 안내',
  description: '출판사 원고 투고 방법과 기준 안내. 마이티북스 투고 가이드 확인하세요.',
}

export default function SubmissionPage() {
  return (
    <div className={styles.wrap}>
      <div className={styles.hero}>
        <span className={styles.tag}>Submission</span>
        <h1 className={styles.title}>원고 <em>투고</em></h1>
        <div className={styles.line} />        
        <p className={styles.seoLine}>
          출판사 원고 투고 방법과 기준을 안내하는 마이티북스 투고 페이지입니다.
        </p>
      </div>

      <div className={styles.content}>
        <div className={styles.statement}>
          <p>마이티북스는 모두에게 열려있지만,</p>
          <p>모두와 함께 할 수는 없습니다.</p>
        </div>
        <p className={styles.statementSub}>
          시장성이 뚜렷하지 않은 원고나 마이티북스의 기획 방향과 맞지 않는 원고는 발탁되기 어렵습니다.
        </p>

        <div className={styles.divider} />

        <h2 className={styles.subTitle}>원고 투고 시 참고사항</h2>
        <ul className={styles.list}>
          <li>원고 완성도가 충분하지 않은 경우, 투고 검토가 진행되지 않을 수 있습니다.</li>
          <li>투고 시 요약 정리가 훌륭하더라도 작성하신 원고가 <strong>전체의 8할 이상 완성</strong>되어 있지 않다면, 출간 진행은 무리입니다.</li>
          <li>투고 시에는 작성하신 기획안과 원고와 함께 아래의 내용이 반드시 포함되어 있어야 합니다.</li>
          <li>투고자의 성명, 연락 받으실 연락처, 회신 받을 메일주소.</li>
        </ul>

        <div className={styles.emailBox}>
          <div className={styles.emailLabel}>원고 투고 메일</div>
          <a href="mailto:novelstudylab@naver.com" className={styles.emailAddr}>
            novelstudylab@naver.com
          </a>
          <p className={styles.emailNote}>최대한 빠른 검토 후 연락드리겠습니다.</p>
        </div>
      </div>
    </div>
  )
}