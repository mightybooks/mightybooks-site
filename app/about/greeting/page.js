import styles from './greeting.module.css'

export const metadata = {
  title: '마이티북스 인사말 | 책 출간 상담과 출판 제작을 함께하는 출판사',
  description:
    '마이티북스 대표 문수림의 인사말. 원고의 목적과 방향을 먼저 확인하고, 책다운 책으로 완성하기 위한 출판 상담과 제작 과정을 안내합니다.',
}

export default function GreetingPage() {
  return (
    <div className={styles.wrap}>

      {/* HERO */}
      <section className={styles.hero}>
        <div className={styles.heroBg} />
        <div className={styles.heroOverlay} />
        <div className={styles.heroContent}>
          <span className={styles.tag}>Greeting</span>
          <h1 className={styles.heroTitle}>
            책이 되기 전,<br />
            먼저 <em>방향</em>을 봅니다
          </h1>
          <div className={styles.heroLine} />
          <p className={styles.heroSub}>마이티북스 인사말</p>
        </div>
        <div className={styles.scrollHint}>↓</div>
      </section>

      {/* STATEMENT 1 */}
      <section className={styles.statement}>
        <div className={styles.statementInner}>
          <div className={styles.statementText}>
            <p className={styles.statementLead}>
              마이티북스는<br />
              원고를 곧바로 책으로 만들기보다<br />
              <strong>왜 책이어야 하는지</strong>를 먼저 묻는 출판사입니다.
            </p>

            <div className={styles.redBar} />

            <p className={styles.statementBody}>
              한 권의 책은 단순히 글을 묶어 인쇄한 결과물이 아닙니다.
              저자의 목적, 독자의 위치, 원고의 성격, 제작 방식이 맞아야
              비로소 책다운 책이 됩니다.
            </p>

            <p className={styles.statementBody}>
              그래서 마이티북스는 모든 문의를 같은 방식으로 처리하지 않습니다.
              먼저 출간 목적과 원고 상태를 확인하고,
              필요한 경우에만 상담, 검토, 제작 단계로 이어갑니다.
            </p>

            <p className={styles.statementBody}>
              빠르게 출간하는 일보다 중요한 것은
              <mark>무엇을, 어떻게, 책으로 만들 것인지</mark>를
              분명히 정하는 일이라고 믿습니다.
            </p>
          </div>

          <div className={styles.portraitWrap}>
            <img
              src="/image/home/munsurim.jpg"
              alt="마이티북스 대표 문수림"
              className={styles.portraitImg}
            />
            <div className={styles.portraitDeco} />
          </div>
        </div>
      </section>

      {/* STATEMENT 2 */}
      <section className={styles.dark}>
        <div className={styles.darkInner}>
          <div className={styles.darkLeft}>
            <h2 className={styles.darkTitle}>
              출판은<br />
              <em>판단의 과정</em>입니다
            </h2>
            <div className={styles.darkLine} />
          </div>

          <div className={styles.darkRight}>
            <p>
              마이티북스는 원고의 가능성과 한계를 함께 봅니다.
            </p>
            <p>
              책으로 만들 수 있는 원고인지, 더 정리가 필요한 원고인지,
              제작 중심으로 접근해야 하는지, 별도의 기획이 필요한지 판단합니다.
            </p>
            <p>
              무조건 출간을 권하지 않습니다.
            </p>
            <p>
              대신 지금 필요한 다음 단계를 가능한 한 분명하게 안내합니다.
            </p>
          </div>
        </div>
      </section>

      {/* STATEMENT 3 */}
      <section className={styles.statement}>
        <div className={styles.statementInner}>
          <div className={styles.statementText}>
            <p className={styles.statementLead}>
              마이티북스가 중요하게 여기는 것은<br />
              <strong>저자에게 필요한 현실적인 출판 경로</strong>입니다.
            </p>

            <div className={styles.redBar} />

            <p className={styles.statementBody}>
              어떤 원고는 정식 출간을 목표로 검토되어야 하고,
              어떤 원고는 개인 기록, 자서전, 문집, 교육 자료처럼
              목적에 맞는 제작 방식이 더 적합할 수 있습니다.
            </p>

            <p className={styles.statementBody}>
              출판 방식은 이름보다 구조가 중요합니다.
              저자가 원하는 결과와 원고의 실제 상태가 맞아야
              제작 과정도, 비용도, 이후 활용도도 흔들리지 않습니다.
            </p>

            <p className={styles.statementBody}>
              마이티북스는 그 판단을 함께 정리하고,
              책으로 만들 수 있는 경우에는 편집, 디자인, 제작, 유통 가능성까지
              단계별로 안내합니다.
            </p>
          </div>
        </div>
      </section>

      {/* CLOSING */}
      <section className={styles.closing}>
        <div className={styles.closingBg} />
        <div className={styles.closingOverlay} />
        <div className={styles.closingContent}>
          <blockquote className={styles.quote}>
            "AI가 콘텐츠를 빠르게 만들어내는 시대일수록<br />
            한 권의 책에는 더 분명한 판단과 책임이 필요합니다."
          </blockquote>

          <div className={styles.sig}>
            <div className={styles.sigLine} />
            <div className={styles.sigName}>
              마이티북스 대표 <strong>문수림</strong>
            </div>
          </div>
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@graph': [
              {
                '@type': 'Organization',
                '@id': 'https://mightybooks.co.kr/#organization',
                name: '마이티북스',
                url: 'https://mightybooks.co.kr',
                logo: 'https://mightybooks.co.kr/logo.png',
                description:
                  '원고의 목적과 방향을 확인하고 책 출간 상담과 제작을 지원하는 출판사',
                founder: {
                  '@id': 'https://mightybooks.co.kr/#person',
                },
              },
              {
                '@type': 'Person',
                '@id': 'https://mightybooks.co.kr/#person',
                name: '문수림',
                jobTitle: '대표, 작가',
                worksFor: {
                  '@id': 'https://mightybooks.co.kr/#organization',
                },
                url: 'https://surimstudio.com/writer',
                sameAs: ['https://surimstudio.com'],
              },
              {
                '@type': 'WebSite',
                '@id': 'https://mightybooks.co.kr/#website',
                url: 'https://mightybooks.co.kr',
                name: '마이티북스',
                publisher: {
                  '@id': 'https://mightybooks.co.kr/#organization',
                },
              },
            ],
          }),
        }}
      />

    </div>
  )
}