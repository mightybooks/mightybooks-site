import styles from './greeting.module.css'

export const metadata = {
  title: '마이티북스 인사말 | 자비출판·기획출판 전문 출판사',
  description: '마이티북스 대표 문수림의 인사말. 자비출판, 기획출판, 책 출간 상담까지 실제 출판 현장에서 쌓은 경험을 바탕으로 운영되는 출판사입니다.',
}

export default function GreetingPage() {
  return (
    <div className={styles.wrap}>

      {/* HERO — 강렬하게 */}
      <section className={styles.hero}>
        <div className={styles.heroBg} />
        <div className={styles.heroOverlay} />
        <div className={styles.heroContent}>
          <span className={styles.tag}>Greeting</span>
          <h1 className={styles.heroTitle}>
            기획출판·자비출판<br />
            <em>종합 전문</em> 출판사<br />            
          </h1>
          <div className={styles.heroLine} />
          <p className={styles.heroSub}>인사말</p>
        </div>
        <div className={styles.scrollHint}>↓</div>
      </section>

      {/* STATEMENT 1 */}
      <section className={styles.statement}>
        <div className={styles.statementInner}>
          <div className={styles.statementText}>
            <p className={styles.statementLead}>
              책 속에는 우리의 삶을 바꿀<br />
              <strong>강력한 힘이 있다</strong>고 믿는<br />
              마이티북스입니다.
            </p>
            <div className={styles.redBar} />
            <p className={styles.statementBody}>
              급변하는 시대, 콘텐츠의 홍수 속에서도<br />
              <mark>읽히는 책, 팔리는 책, 소장하고 싶은 책</mark>을 만들고 있습니다.
            </p>
            <p className={styles.statementBody}>
              마이티북스가 클래식 단행본을 고집하는 건<br />
              <br />
              사람을 성장하게 하는 힘<br />
              변화를 만드는 힘<br />
              관계를 만드는 힘<br />
              <br />
              모두 <mark>제대로 만들어진 책 한권</mark>에 들어있기 때문입니다.
            </p>
                  <section>
                    <p>
                      마이티북스는 자비출판과 기획출판을 중심으로<br/>
                      원고 기획, 편집, 제작, 출간까지 전 과정을 함께하는 출판사입니다.<br/>
                      책 출간을 고민하는 저자를 위한 출판 상담을 제공합니다.
                    </p>
                  </section>

          </div>
          {/* 사진 자리 — 나중에 실제 이미지로 교체 */}
          <div className={styles.portraitWrap}>
            <img src="/image/home/munsurim.jpg" alt="마이티북스 대표 문수림" className={styles.portraitImg} />            
            <div className={styles.portraitDeco} />
          </div>
        </div>
      </section>

      {/* STATEMENT 2 — 북컨설턴트 */}
      <section className={styles.dark}>
        <div className={styles.darkInner}>
          <div className={styles.darkLeft}>
            <h2 className={styles.darkTitle}>
              북컨설턴트의<br />
              <em>프리미엄 에디션</em>
            </h2>
            <div className={styles.darkLine} />
          </div>
          <div className={styles.darkRight}>
            <p>마이티북스는 기획출판 전문 출판 업체입니다.</p>
            <p>다년간 북컨설팅으로 입지를 다진 전문가들이</p>
            <p><strong>책다운 책을 만든다는 목표로</strong></p>
            <p>저자를 발굴하고 도서를 기획하고 있습니다.</p>
          </div>
        </div>
      </section>

      {/* CLOSING — 진솔하게 */}
      <section className={styles.closing}>
        <div className={styles.closingBg} />
        <div className={styles.closingOverlay} />
        <div className={styles.closingContent}>
          <blockquote className={styles.quote}>
            "AI가 콘텐츠를 쏟아내는 시대일수록<br />
            사람이 직접 빚어낸 한 권의 책은<br />
            더 강하게 빛납니다."
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
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Organization",
          "@id": "https://mightybooks.co.kr/#organization",
          "name": "마이티북스",
          "url": "https://mightybooks.co.kr",
          "logo": "https://mightybooks.co.kr/logo.png",
          "description": "기획출판과 자비출판을 중심으로 책 출간을 지원하는 출판사",
          "founder": {
            "@id": "https://mightybooks.co.kr/#person"
          }
        },
        {
          "@type": "Person",
          "@id": "https://mightybooks.co.kr/#person",
          "name": "문수림",
          "jobTitle": "대표, 작가",
          "worksFor": {
            "@id": "https://mightybooks.co.kr/#organization"
          },
          "url": "https://surimstudio.com/writer",
          "sameAs": [
            "https://surimstudio.com"
          ]
        },
        {
          "@type": "WebSite",
          "@id": "https://mightybooks.co.kr/#website",
          "url": "https://mightybooks.co.kr",
          "name": "마이티북스",
          "publisher": {
            "@id": "https://mightybooks.co.kr/#organization"
          }
        }
      ]
    })
  }}
/>

    </div>
  )
}