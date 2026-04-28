import styles from './guide.module.css'

export const metadata = {
  title: '출판 가이드 | 책 출간 전 확인해야 할 기준 | 마이티북스',
  description:
    '책 출간을 처음 고민하는 분을 위한 출판 가이드. 출판 상담 전 확인해야 할 원고 상태, 출간 목적, 제작 방식, 비용, 유통 기준을 정리했습니다.',
}

const guideJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: '출판 가이드 | 책 출간 전 확인해야 할 기준',
  description:
    '책 출간을 처음 고민하는 분을 위한 출판 가이드. 출판 상담 전 확인해야 할 원고 상태, 출간 목적, 제작 방식, 비용, 유통 기준을 정리했습니다.',
  author: {
    '@type': 'Person',
    name: '문수림',
  },
  publisher: {
    '@type': 'Organization',
    name: '마이티북스',
    url: 'https://mightybooks.co.kr',
  },
  mainEntityOfPage: {
    '@type': 'WebPage',
    '@id': 'https://mightybooks.co.kr/support/guide',
  },
}

export default function GuidePage() {
  return (
    <div className={styles.wrap}>

      {/* HERO */}
      <div className={styles.hero}>
        <span className={styles.tag}>Publishing Guide</span>
        <h1 className={styles.title}>
          책 출간 전<br />
          먼저 확인해야 할 <em>기준</em>
        </h1>
        <div className={styles.line} />
        <p className={styles.heroSub}>
          원고를 책으로 만들기 전에 정리해야 할 출판 판단 가이드
        </p>
        <p className={styles.seoLine}>
          출판 상담, 자비출판, 책 제작, 출판사 선택을 처음 고민하는 분을 위한 마이티북스 출판 가이드입니다.
        </p>
      </div>

      <div className={styles.content}>

        {/* 도입 */}
        <div className={styles.lead}>
          이 문서는 책 출간을 처음 고민하는 분들이
          출판사에 문의하기 전 스스로 점검해야 할 기준을 정리한 안내 문서입니다.
          단순 견적 비교보다 먼저 원고의 상태, 출간 목적, 제작 방식, 유통 가능성을 확인하는 데 목적이 있습니다.
        </div>

        {/* 1. 출판 문의 전 확인 */}
        <div className={styles.section}>
          <h2 className={styles.h2}>출판 상담 전, 먼저 정해야 할 것</h2>

          <p>
            책을 내고 싶다는 마음이 생기면 가장 먼저 출판사를 검색하게 됩니다.
            그리고 곧바로 비용, 제작 기간, 서점 유통 여부를 묻게 됩니다.
            하지만 실제 출판 과정에서 먼저 확인해야 하는 것은 가격표가 아닙니다.
          </p>

          <p>
            먼저 정해야 할 것은 <strong>이 원고가 어떤 목적의 책이 되어야 하는가</strong>입니다.
            독자에게 판매할 책인지, 개인 기록으로 남길 책인지, 강의나 상담에 활용할 책인지,
            가족·단체·기관 내부에서 공유할 책인지에 따라 제작 방식은 완전히 달라집니다.
          </p>

          <p>
            같은 원고라도 목적이 다르면 편집 방식, 디자인 수준, 제작 부수, 유통 여부, 예산 범위가 달라집니다.
            그래서 좋은 출판 상담은 “얼마인가요?”라는 질문보다
            “무엇을 위해 책을 만들려고 하십니까?”라는 질문에서 시작됩니다.
          </p>

          <div className={styles.alertBox}>
            <div className={styles.alertTitle}>출판 문의 전 기본 점검</div>
            <ul className={styles.alertList}>
              <li>이 책의 목적은 판매, 기록, 홍보, 교육 중 어디에 가까운가</li>
              <li>원고는 완성본인가, 초안인가, 아직 구상 단계인가</li>
              <li>독자는 일반 독자인가, 가족·지인·수강생·고객 등 특정 대상인가</li>
              <li>온라인 서점 유통이 필요한가, 소량 제작만으로 충분한가</li>
              <li>편집과 디자인에 어느 정도의 완성도를 원하는가</li>
            </ul>
          </div>
        </div>

        {/* 2. 원고 상태 */}
        <div className={styles.section}>
          <h2 className={styles.h2}>원고가 있다고 해서 곧바로 책이 되는 것은 아닙니다</h2>

          <p>
            출판 상담에서 가장 자주 생기는 오해는
            “원고 파일이 있으면 바로 책을 만들 수 있다”는 생각입니다.
            물론 기술적으로는 가능합니다.
            하지만 책다운 결과물이 되려면 원고의 상태를 먼저 확인해야 합니다.
          </p>

          <p>
            원고가 완성되어 있더라도 목차가 불안정할 수 있고,
            문장의 밀도는 좋지만 독자 흐름이 끊길 수 있습니다.
            반대로 아직 원고가 완성되지 않았더라도
            기획과 독자 대상이 분명하다면 출판 방향을 먼저 잡을 수 있습니다.
          </p>

          <p>
            중요한 것은 원고의 분량만이 아니라
            <strong> 책으로 구성될 수 있는 구조가 있는가 </strong>입니다.
            이 구조를 확인하지 않고 제작부터 시작하면,
            나중에 편집·디자인·유통 단계에서 계속 문제가 발생합니다.
          </p>

          <div className={styles.processGrid}>
            {[
              {
                step: '01',
                title: '목적 확인',
                desc: '왜 책을 만들려는지, 책을 만든 뒤 어디에 활용할지 확인합니다.',
              },
              {
                step: '02',
                title: '원고 상태 확인',
                desc: '완성 원고인지, 초안인지, 구상 단계인지에 따라 상담 방향이 달라집니다.',
              },
              {
                step: '03',
                title: '제작 방식 검토',
                desc: '편집, 디자인, 인쇄, 전자책, 유통 중 어디까지 필요한지 정리합니다.',
              },
              {
                step: '04',
                title: '진행 여부 판단',
                desc: '상담, 검토, 제작, 보류 중 현재 필요한 다음 단계를 안내합니다.',
              },
            ].map((p, i) => (
              <div key={i} className={styles.processCard}>
                <div className={styles.processStep}>{p.step}</div>
                <div className={styles.processTitle}>{p.title}</div>
                <div className={styles.processDesc}>{p.desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* 3. 출판사 선택 기준 */}
        <div className={styles.section}>
          <h2 className={styles.h2}>출판사를 선택할 때 확인해야 할 네 가지</h2>

          <p>
            출판사를 선택할 때 비용은 중요한 기준입니다.
            그러나 비용만으로 판단하면 실제로 무엇이 포함되고 무엇이 빠지는지 놓치기 쉽습니다.
            아래 네 가지는 출판 상담 전에 반드시 확인해야 할 기준입니다.
          </p>

          <div className={styles.criteriaList}>
            <div className={styles.criteriaItem}>
              <div className={styles.criteriaNum}>01</div>
              <div className={styles.criteriaBody}>
                <h3 className={styles.h3}>원고를 어떤 기준으로 판단하는가</h3>
                <p>
                  좋은 출판사는 모든 원고를 같은 방식으로 다루지 않습니다.
                  판매를 목표로 할 원고인지, 개인 기록으로 남길 원고인지,
                  교육 자료나 브랜딩 도구로 활용할 원고인지 먼저 구분해야 합니다.
                  이 판단이 없으면 책의 방향이 흐려집니다.
                </p>
              </div>
            </div>

            <div className={styles.criteriaItem}>
              <div className={styles.criteriaNum}>02</div>
              <div className={styles.criteriaBody}>
                <h3 className={styles.h3}>편집 범위가 어디까지인가</h3>
                <p>
                  교정·교열만 진행하는지, 문장 흐름과 목차 구조까지 보는지 확인해야 합니다.
                  같은 “편집”이라는 말 안에도 실제 작업 범위는 크게 다릅니다.
                  계약 전 편집 범위와 수정 횟수, 원고 정리 방식은 반드시 확인해야 합니다.
                </p>
              </div>
            </div>

            <div className={styles.criteriaItem}>
              <div className={styles.criteriaNum}>03</div>
              <div className={styles.criteriaBody}>
                <h3 className={styles.h3}>디자인과 제작 방식이 원고에 맞는가</h3>
                <p>
                  표지와 내지는 책의 성격을 드러내는 장치입니다.
                  모든 책을 같은 틀에 넣는 방식은 빠르고 저렴할 수 있지만,
                  원고의 성격이 사라질 수 있습니다.
                  포트폴리오를 확인하고, 내 책에 맞는 설계가 가능한지 살펴보는 것이 좋습니다.
                </p>
              </div>
            </div>

            <div className={styles.criteriaItem}>
              <div className={styles.criteriaNum}>04</div>
              <div className={styles.criteriaBody}>
                <h3 className={styles.h3}>유통과 활용 범위가 분명한가</h3>
                <p>
                  모든 책이 반드시 온라인 서점 유통을 목표로 해야 하는 것은 아닙니다.
                  어떤 책은 소량 제작이 더 적합하고, 어떤 책은 전자책 전환이나 온라인 판매가 필요합니다.
                  유통 여부, ISBN 등록, 재고 관리, 판매 정산 방식은 진행 전 확인해야 합니다.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 4. 흔한 오해 */}
        <div className={styles.section}>
          <h2 className={styles.h2}>출판 상담에서 자주 생기는 오해</h2>

          <div className={styles.caseGrid}>
            <div className={styles.caseCard}>
              <div className={styles.caseIcon}>💸</div>
              <h3 className={styles.h3}>“가장 싼 곳이 좋은 곳 아닌가요?”</h3>
              <p>
                비용은 중요합니다.
                다만 낮은 비용에는 보통 생략된 공정이 있습니다.
                기획, 편집, 디자인, 교정, 유통 중 무엇이 포함되어 있는지 확인하지 않으면
                결과물을 받은 뒤 다시 비용이 발생할 수 있습니다.
              </p>
            </div>

            <div className={styles.caseCard}>
              <div className={styles.caseIcon}>📄</div>
              <h3 className={styles.h3}>“원고만 보내면 알아서 봐주나요?”</h3>
              <p>
                원고 검토는 출판사의 시간과 판단이 들어가는 작업입니다.
                무작위로 원고를 먼저 보내는 방식보다,
                출간 목적과 원고 상태를 먼저 정리한 뒤 필요한 경우 검토로 이어지는 방식이 더 정확합니다.
              </p>
            </div>

            <div className={styles.caseCard}>
              <div className={styles.caseIcon}>📚</div>
              <h3 className={styles.h3}>“서점에 올라가면 책이 팔리나요?”</h3>
              <p>
                온라인 서점 등록은 판매의 시작일 뿐, 판매를 보장하지 않습니다.
                책의 주제, 독자층, 소개문, 저자의 활동, 홍보 방식이 함께 맞아야 합니다.
                유통 가능성과 판매 가능성은 구분해서 보아야 합니다.
              </p>
            </div>
          </div>
        </div>

        {/* 5. 마이티북스의 기준 */}
        <div className={styles.section}>
          <h2 className={styles.h2}>마이티북스가 출판 상담을 진행하는 방식</h2>

          <p>
            마이티북스는 모든 문의를 곧바로 제작 견적으로 연결하지 않습니다.
            먼저 책을 만들려는 목적, 원고의 현재 상태, 필요한 제작 범위, 이후 활용 계획을 확인합니다.
          </p>

          <p>
            간단한 문의와 진행 가능 여부 확인은 무료로 가능합니다.
            다만 원고의 방향, 출간 가능성, 제작 방식, 예상 비용, 유통 가능성 등을 구체적으로 검토해야 하는 경우에는
            별도의 출판 상담 진단으로 진행됩니다.
          </p>

          <p>
            이 절차는 상담을 복잡하게 만들기 위한 것이 아닙니다.
            오히려 불필요한 제작을 줄이고,
            저자에게 지금 필요한 다음 단계를 분명히 안내하기 위한 과정입니다.
          </p>

          <div className={styles.conclusionBox}>
            <div className={styles.conclusionItem}>
              <span className={styles.conclusionMark}>✓</span>
              원고를 먼저 보내기보다 출간 목적과 현재 상태를 먼저 정리합니다
            </div>
            <div className={styles.conclusionItem}>
              <span className={styles.conclusionMark}>✓</span>
              무료 문의와 유료 상담 진단의 범위를 구분합니다
            </div>
            <div className={styles.conclusionItem}>
              <span className={styles.conclusionMark}>✓</span>
              제작비보다 먼저 필요한 제작 범위를 확인합니다
            </div>
            <div className={styles.conclusionItem}>
              <span className={styles.conclusionMark}>✓</span>
              책으로 만들 수 있는 경우에만 편집, 디자인, 제작, 유통 단계로 이어갑니다
            </div>
          </div>
        </div>

        {/* 6. 결론 */}
        <div className={styles.section}>
          <h2 className={styles.h2}>좋은 출판 상담은 견적서보다 먼저 방향을 정리합니다</h2>

          <p>
            책 출간은 단순히 원고를 인쇄하는 일이 아닙니다.
            원고의 목적을 정하고, 독자를 상상하고, 필요한 제작 범위를 고르고,
            이후 활용 방식까지 판단하는 과정입니다.
          </p>

          <p>
            그래서 출판사를 선택할 때는 가격만 비교하기보다
            상담 방식, 편집 범위, 제작 기준, 유통 구조를 함께 확인해야 합니다.
            그 기준이 분명할수록 결과물에 대한 후회도 줄어듭니다.
          </p>

          <p>
            마이티북스는 책 출간을 고민하는 분들이
            무작정 제작으로 들어가기 전에 필요한 판단을 먼저 정리할 수 있도록 돕습니다.
          </p>
        </div>

        {/* CTA */}
        <div className={styles.cta}>
          <div className={styles.ctaText}>
            출판 진행 가능 여부를 먼저 확인하고 싶으신가요?
          </div>
          <div className={styles.ctaBtns}>
            <a href="/support/faq" className={styles.ctaBtn}>
              자주 묻는 질문 보기 →
            </a>
            <a href="mailto:novelstudylab@naver.com" className={styles.ctaBtnGhost}>
              사전 문의하기 →
            </a>
          </div>
        </div>

        <div className={styles.bottomNav}>
          <a href="/portfolio/books" className={styles.backLink}>
            ← 포트폴리오 보기
          </a>
        </div>

        <div className={styles.bottomNav}>
          <a href="/business/self-publishing" className={styles.backLink}>
            ← 출판 제작 안내
          </a>
        </div>

      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(guideJsonLd),
        }}
      />

    </div>
  )
}