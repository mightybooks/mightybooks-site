import styles from './submission.module.css'

export const metadata = {
  title: '원고 접수 안내 | 마이티북스',
  description:
    '마이티북스 원고 접수 안내. 사전 협의 없는 원고 투고는 검토하지 않으며, 기획 출간 가능성 검토는 유료 원고 검토를 통해 진행합니다.',
}

export default function SubmissionPage() {
  return (
    <div className={styles.wrap}>
      <div className={styles.hero}>
        <span className={styles.tag}>Manuscript Submission Guide</span>
        <h1 className={styles.title}>원고 접수 <em>안내</em></h1>
        <div className={styles.line} />
        <p className={styles.seoLine}>
          마이티북스는 사전 협의 없는 원고 투고와 출간계획서를 검토하지 않습니다.
          원고의 출간 가능성 검토는 유료 원고 검토 절차를 통해 진행됩니다.
        </p>
      </div>

      <div className={styles.content}>
        <div className={styles.statement}>
          <p>일방적인 원고 투고는</p>
          <p>검토하지 않습니다.</p>
        </div>

        <p className={styles.statementSub}>
          출판사에는 수많은 원고와 출간계획서가 도착합니다.
          하지만 현실적으로 제대로 정리된 기획서와 출간 가능성을 갖춘 원고는 많지 않습니다.
          마이티북스는 사전 협의 없이 전달된 첨부파일, 원고, 출간계획서를 개별 검토하지 않으며
          별도 회신도 진행하지 않습니다.
        </p>

        <div className={styles.divider} />

        <h2 className={styles.subTitle}>마이티북스가 보는 것은 원고만이 아닙니다</h2>

        <p className={styles.statementSub}>
          마이티북스의 검토는 단순히 “이 원고가 출간될 수 있는가”를 확인하는 절차에 그치지 않습니다.
          책이 만들어졌을 때, 그것이 저자의 삶과 활동 안에서 어떤 사건이 될 수 있는지 함께 봅니다.
        </p>

        <p className={styles.statementSub}>
          어떤 원고는 지금 바로 출간을 이야기하기 어렵습니다.
          어떤 원고는 보완이 필요합니다.
          어떤 원고는 책보다 먼저 방향을 다시 세워야 합니다.
          중요한 것은 원고를 보내는 일이 아니라, 그 원고가 책이 되었을 때 무엇을 바꿀 수 있는지 판단하는 일입니다.
        </p>

        <div className={styles.divider} />

        <h2 className={styles.subTitle}>원고 접수 전 반드시 확인해 주세요</h2>

        <ul className={styles.list}>
          <li>
            사전 협의 없는 원고, 출간계획서, 대용량 첨부파일은 검토하지 않으며 회신하지 않습니다.
          </li>
          <li>
            기획 출간 가능성, 원고의 경쟁력, 출판사 선택 가능성에 대한 판단은
            <strong> 유료 원고 검토</strong>를 통해서만 진행합니다.
          </li>
          <li>
            유료 원고 검토는 결제 후 사전 질문지와 원고 자료를 제출한 뒤 진행됩니다.
          </li>
          <li>
            원고가 완성되어 있지 않아도 검토는 가능하지만, 판단은 현재 준비된 원고와 기획 자료를 기준으로 합니다.
          </li>
          <li>
            자서전, 개인 에세이, 시집, 동호회 문집, 교재·교구처럼 제작 목적이 분명한 도서는
            <strong> 목적형 도서 제작 무료상담</strong>을 이용하실 수 있습니다.
          </li>
          <li>
            목적형 도서 무료상담 창구로 원고 투고, 기획 출간 가능성 검토, 출판사 선택 가능성 판단을 요청할 경우
            정상적으로 진행되지 않습니다.
          </li>
        </ul>

        <div className={styles.emailBox}>
          <div className={styles.emailLabel}>내 원고의 출간 가능성을 검토받고 싶다면</div>
          <a href="/support/diagnosis" className={styles.emailAddr}>
            유료 원고 검토 안내 →
          </a>
          <p className={styles.emailNote}>
            자서전, 개인 에세이, 시집, 문집, 교재·교구 등 제작 목적이 분명한 도서는
            목적형 도서 제작 무료상담을 이용해 주세요.
          </p>
          <a href="/business/autobiography" className={styles.emailAddr}>
            목적형 도서 제작 무료상담 →
          </a>
        </div>
      </div>
    </div>
  )
}