import styles from './diagnosis.module.css'

export const metadata = {
  title: '검토 및 유료상담 | 마이티북스',
  description:
    '마이티북스 유료 원고 검토 및 출판 상담 안내. 당신의 원고가 출판사가 선택할 만큼의 가능성을 가지고 있는지 현실적으로 점검합니다.',
}

const SMARTSTORE_URL = 'https://smartstore.naver.com/shop15th/products/13464496645'

const checks = [
  {
    title: '원고의 핵심성',
    desc: '이 원고가 무엇을 말하려는지, 한 문장으로 설명 가능한 중심이 있는지 확인합니다.',
  },
  {
    title: '독자 가능성',
    desc: '개인적 기록을 넘어 실제 독자가 읽을 이유가 있는지 검토합니다.',
  },
  {
    title: '출간 설득력',
    desc: '출판사가 시간과 비용을 들여 검토할 만한 기획적 힘이 있는지 살펴봅니다.',
  },
  {
    title: '보완 지점',
    desc: '구성, 문장, 분량, 주제, 독자 설정에서 보완해야 할 부분을 짚습니다.',
  },
  {
    title: '현실적 다음 단계',
    desc: '바로 투고할지, 원고를 고칠지, 제작형 출간이나 워크숍이 더 적합한지 판단합니다.',
  },
]

export default function DiagnosisPage() {
  return (
    <div className={styles.wrap}>
      <section className={styles.hero}>
        <span className={styles.tag}>Paid Manuscript Review</span>
        <h1 className={styles.title}>
          선택받을 원고인지 <em>먼저 봅니다</em>
        </h1>
        <div className={styles.line} />
        <p className={styles.heroSub}>
          당신의 원고가 10,000 : 1의 경쟁을 뚫고 기획 출간될 수 있을지 검토합니다.
        </p>
        <p className={styles.seoLine}>
          마이티북스의 유료상담은 출간을 보장하는 절차가 아니라, 원고의 가능성·한계·보완 방향을 현실적으로 점검하는 과정입니다.
        </p>
      </section>

      <section className={styles.intro}>
        <div className={styles.introText}>
          <span className={styles.tag}>Before Publishing</span>
          <h2 className={styles.sectionTitle}>왜 유료 원고 검토가 필요한가</h2>
          <p>
            많은 분들이 책을 내고 싶다고 말하지만, 실제로 바라는 것은 단순한 제작 안내가 아닙니다.
            대부분은 자신의 원고가 출판사의 선택을 받을 수 있는지, 돈을 들여 책으로 만들 만큼의 힘이 있는지 알고 싶어합니다.
          </p>
          <p>
            그러나 대부분의 원고는 출판사가 먼저 비용과 시간을 들여 선택하는 단계까지 가지 못합니다.
            그렇다고 모든 원고가 책이 될 수 없다는 뜻은 아닙니다. 중요한 것은 지금 원고가 선택받을 수 있는 상태인지,
            아니면 다른 방식의 준비가 필요한지를 먼저 구분하는 일입니다.
          </p>
        </div>

        <div className={styles.notice}>
          <div className={styles.noticeTitle}>출간 약속이 아니라 가능성 검토입니다</div>
          <p>
            유료 원고 검토는 출간을 보장하지 않습니다. 원고가 선택받기 위해 갖추어야 할 힘,
            현재 부족한 지점, 보완 후 다시 도전할 수 있는 방향을 확인하는 과정입니다.
            결제 전에는 개별 원고 검토를 진행하지 않습니다.
          </p>
        </div>
      </section>

      <section className={styles.manuscript} id="manuscript">
        <div className={styles.sectionHeader}>
          <span className={styles.tag}>Manuscript Review</span>
          <h2 className={styles.sectionTitle}>
            원고 검토 <em>방식</em>
          </h2>
          <div className={styles.line} />
        </div>
        <p className={styles.centerText}>
          원고가 완성되어 있지 않아도 상담은 가능합니다. 다만 검토 결과는 현재 준비된 원고,
          기획 메모, 출간 목적, 예상 독자, 제작 희망 범위를 기준으로 안내됩니다.
          상담은 제작 계약을 전제로 하지 않으며, 지금 단계에서 필요한 선택지를 정리하는 데 목적이 있습니다.
        </p>
      </section>

      <section className={styles.intro}>
        <div className={styles.introText}>
          <span className={styles.tag}>Required Preparation</span>
          <h2 className={styles.sectionTitle}>결제 후 사전 질문지를 작성합니다</h2>
          <p>
            유료 원고 검토는 즉석 전화 상담이나 간단한 감상평 제공이 아닙니다.
            결제 후 마이티북스에서 안내하는 사전 질문지를 작성해 제출해주셔야 합니다.
          </p>
          <p>
            질문지는 원고의 방향, 작성 목적, 예상 독자, 출간 기대, 현재 고민 지점을 확인하기 위한 과정입니다.
            작성된 답변과 제출 자료를 바탕으로 원고의 가능성, 한계, 보완 방향을 검토합니다.
          </p>
        </div>

        <div className={styles.notice}>
          <div className={styles.noticeTitle}>질문지 미제출 시 검토가 진행되지 않습니다</div>
          <p>
            사전 질문지와 필요한 원고 자료가 제출되지 않으면 유료 검토는 정상적으로 진행될 수 없습니다.
            결제만으로 상담이 자동 진행되는 것이 아니며, 제출 자료 확인 후 마이티북스에서 검토 및 상담 일정을 안내합니다.
          </p>
        </div>
      </section>

      <section className={styles.checks}>
        <div className={styles.sectionHeader}>
          <span className={styles.tag}>Review Check Point</span>
          <h2 className={styles.sectionTitle}>유료상담에서 확인하는 것</h2>
          <div className={styles.line} />
        </div>

        <div className={styles.checkGrid}>
          {checks.map((item, i) => (
            <div key={item.title} className={styles.checkCard}>
              <div className={styles.checkNum}>{String(i + 1).padStart(2, '0')}</div>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.intro}>
        <div className={styles.introText}>
          <span className={styles.tag}>Payment Process</span>
          <h2 className={styles.sectionTitle}>신청 및 결제 방법</h2>
          <p>
            유료 원고 검토 및 출판 상담은 스마트스토어 상품 페이지에서 신청하실 수 있습니다.
            상세페이지에서 상담 내용과 진행 방식을 확인한 뒤, 주문 시 연락처를 정확히 기입하고 결제해 주세요.
          </p>
          <p>
            결제 확인 후 마이티북스에서 사전 질문지와 자료 제출 방법을 안내합니다.
            질문지와 원고 자료가 접수된 뒤 검토가 시작되며, 이후 상담 일정과 진행 방식을 개별 안내합니다.
          </p>
        </div>

        <div className={styles.notice}>
          <div className={styles.noticeTitle}>상담은 결제와 자료 제출 후 진행됩니다</div>
          <p>
            유료상담은 결제 즉시 전화로 진행되는 방식이 아닙니다.
            사전 질문지와 원고 자료를 바탕으로 검토한 뒤, 필요한 내용을 정리해 상담을 진행합니다.
          </p>
        </div>
      </section>

      <section className={styles.cta}>
        <div className={styles.ctaInner}>
          <h2 className={styles.ctaTitle}>
            내 원고의 출간 가능성을 먼저 점검해보세요
          </h2>
          <p className={styles.centerText2}>
            스마트스토어 상세페이지에서 상담 내용을 확인하고 결제하시면,
            결제 확인 후 마이티북스에서 연락드립니다.
          </p>
          <p className={styles.centerText2}>
             단, 자서전, 개인 에세이, 시집, 동호회 문집, 교재·교구처럼 <strong>제작 목적이 분명한 도서는 
             무료 상담을 이용</strong>하실 수 있습니다.
          </p>
          <p className={styles.centerText2}>
            무료 상담은 목적형 도서 제작 문의를 위한 창구입니다.
            원고 투고, 기획 출간 가능성 검토, 출판사 선택 가능성 판단을 무료 상담으로 접수하실 경우
            개별 검토 없이 처리되어 정상 진행이 되지 않습니다.
          </p>
          
          <div className={styles.ctaBtns}>
            <a
              href={SMARTSTORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.ctaBtn}
            >
              스마트스토어에서 바로 결제 →
            </a>
            <a
              href="mailto:novelstudylab@naver.com"
              className={styles.ctaBtnGhost}
            >
              목적형 도서 무료상담 문의 →
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}