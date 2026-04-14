import styles from './guide.module.css'

export const metadata = {
  title: '출판 가이드 | 마이티북스',
  description: '자비출판을 처음 고려하는 분을 위한 출판사 선택 가이드',
}

export default function GuidePage() {
  return (
    <div className={styles.wrap}>

      {/* HERO */}
      <div className={styles.hero}>
        <span className={styles.tag}>Publishing Guide</span>
        <h1 className={styles.title}>출판 <em>가이드</em></h1>
        <div className={styles.line} />
        <p className={styles.heroSub}>
          자비출판을 처음 고려하는 분을 위한 출판사 선택 기준
        </p>
        <p className={styles.seoLine}>
          자비출판, 책 출간, 출판사 선택 기준을 정리한 마이티북스 출판 가이드입니다.
        </p>
      </div>

      <div className={styles.content}>

        {/* 도입 */}
        <div className={styles.lead}>
          이 글은 자비출판을 처음 고려하는 분들이
          출판사를 선택할 때 실질적인 판단 기준을 갖출 수 있도록
          작성된 안내 문서입니다.
          광고가 아닌, 정보 중심으로 읽어주시기 바랍니다.
        </div>

        {/* 1. 문제 제기 */}
        <div className={styles.section}>
          <h2 className={styles.h2}>자비출판, 왜 실패하는가</h2>
          <p>
            자비출판을 결심하고 출판사를 찾아보는 분들은 대부분 비슷한 과정을 겪습니다.
            인터넷에서 출판사를 검색하고, 몇 군데에 문의를 넣고, 견적을 비교합니다.
            이 과정에서 가장 먼저 눈에 들어오는 건 <strong>가격</strong>입니다.
          </p>
          <p>
            그런데 책이 완성된 뒤 후회하는 분들 대부분은 이렇게 말합니다.
            "가격만 보고 결정했다가 결과물이 너무 실망스러웠다."
            "편집이 엉망이어서 다시 제작했다."
            "유통 구조를 몰라서 서점에 들어가지도 못했다."
          </p>
          <p>
            자비출판의 실패는 대부분 <strong>비용, 품질, 신뢰</strong> 세 가지 문제에서 비롯됩니다.
            비용은 낮췄지만 품질이 따라오지 않았거나,
            계약 내용과 실제 결과물이 달랐거나,
            출판 이후의 지원이 전혀 없는 경우가 그것입니다.
          </p>

          <div className={styles.alertBox}>
            <div className={styles.alertTitle}>흔한 실패 패턴</div>
            <ul className={styles.alertList}>
              <li>비용이 저렴하다는 이유만으로 출판사를 선택한 경우</li>
              <li>템플릿 기반으로 제작되어 모든 책이 비슷한 구성인 경우</li>
              <li>기획 단계 없이 원고만 넘기고 제작이 진행된 경우</li>
              <li>출간 이후 유통 및 마케팅 지원이 전무한 경우</li>
            </ul>
          </div>
        </div>

        {/* 2. 자비출판 구조 */}
        <div className={styles.section}>
          <h2 className={styles.h2}>자비출판은 단순 제작이 아니다</h2>
          <p>
            자비출판을 단순히 "원고를 넘기면 책으로 만들어주는 것"으로 이해하는 분들이 많습니다.
            하지만 책 한 권이 완성되기까지의 공정은 생각보다 복잡합니다.
          </p>
          <p>
            <strong>자비출판은 단순 제작이 아니라 기획과 편집이 핵심입니다.</strong>
            원고가 있다고 해서 좋은 책이 되는 것은 아닙니다.
            독자가 읽기 쉽도록 구성하고, 시각적으로 완성도 있게 디자인하며,
            내용의 흐름을 잡아주는 편집 작업이 책의 품질을 결정합니다.
          </p>

          <div className={styles.processGrid}>
            {[
              { step: '01', title: '기획', desc: '주제 설정, 독자층 분석, 목차 구성, 제목 방향 설정' },
              { step: '02', title: '편집', desc: '원고 교정·교열, 문장 흐름 정리, 가독성 향상' },
              { step: '03', title: '디자인', desc: '표지 디자인, 내지 레이아웃, 이미지 편집' },
              { step: '04', title: '제작 및 유통', desc: '인쇄·제본, 서점 입고, ISBN 등록, 전자책 변환' },
            ].map((p, i) => (
              <div key={i} className={styles.processCard}>
                <div className={styles.processStep}>{p.step}</div>
                <div className={styles.processTitle}>{p.title}</div>
                <div className={styles.processDesc}>{p.desc}</div>
              </div>
            ))}
          </div>

          <p>
            이 네 가지 공정이 유기적으로 연결될 때 비로소
            <strong> 책다운 책을 만드는 과정</strong>이 완성됩니다.
            어느 하나라도 부실하면 전체 완성도가 떨어집니다.
          </p>
        </div>

        {/* 3. 출판사 선택 기준 */}
        <div className={styles.section}>
          <h2 className={styles.h2}>출판사 선택, 이 네 가지를 확인하십시오</h2>
          <p>
            수십 곳의 출판사 중 어디를 선택해야 할지 막막하다면,
            아래 네 가지 기준을 체크해보시기 바랍니다.
          </p>

          <div className={styles.criteriaList}>
            <div className={styles.criteriaItem}>
              <div className={styles.criteriaNum}>01</div>
              <div className={styles.criteriaBody}>
                <h3 className={styles.h3}>기획 개입 여부</h3>
                <p>
                  출판사가 원고를 단순히 받아서 제작만 하는지,
                  아니면 기획 단계부터 함께 개입하는지 확인하십시오.
                  기획이 없는 책은 독자에게 닿기 어렵습니다.
                  "원고만 주시면 됩니다"라는 말은 편리해 보이지만,
                  기획 없이 진행된 책은 완성도가 낮을 가능성이 높습니다.
                </p>
              </div>
            </div>

            <div className={styles.criteriaItem}>
              <div className={styles.criteriaNum}>02</div>
              <div className={styles.criteriaBody}>
                <h3 className={styles.h3}>편집 수준</h3>
                <p>
                  포트폴리오를 요청하십시오.
                  이전에 출간한 책들의 내지 샘플을 직접 확인하면
                  편집 수준을 가늠할 수 있습니다.
                  교정·교열 없이 원고 그대로 제작되는 경우,
                  오탈자와 문장 오류가 그대로 책에 남습니다.
                </p>
              </div>
            </div>

            <div className={styles.criteriaItem}>
              <div className={styles.criteriaNum}>03</div>
              <div className={styles.criteriaBody}>
                <h3 className={styles.h3}>제작 방식</h3>
                <p>
                  템플릿 기반인지, 아니면 개별 맞춤 제작인지 확인하십시오.
                  일부 업체는 표지와 내지를 정해진 틀에 끼워넣는 방식으로
                  빠르게 제작합니다. 비용은 낮지만 책의 개성이 사라집니다.
                  좋은 책은 내용에 맞는 디자인을 별도로 설계합니다.
                </p>
              </div>
            </div>

            <div className={styles.criteriaItem}>
              <div className={styles.criteriaNum}>04</div>
              <div className={styles.criteriaBody}>
                <h3 className={styles.h3}>유통 구조</h3>
                <p>
                  출간 후 책이 어디에 어떻게 유통되는지 계약 전에 명확히 확인하십시오.
                  주요 서점 입고 여부, 온라인 판매 플랫폼 등록 여부,
                  전자책 전환 지원 여부, 재고 권한이 누구에게 있는지
                  반드시 서면으로 확인해야 합니다.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 4. 흔한 실패 사례 */}
        <div className={styles.section}>
          <h2 className={styles.h2}>실제로 많이 발생하는 실패 사례</h2>

          <div className={styles.caseGrid}>
            <div className={styles.caseCard}>
              <div className={styles.caseIcon}>💸</div>
              <h3 className={styles.h3}>비용만 보고 선택</h3>
              <p>
                출판 비용이 낮을수록 어딘가를 줄인다는 뜻입니다.
                기획을 생략하거나, 편집자 없이 자동화 도구로 처리하거나,
                저가 인쇄소를 사용하는 방식으로 비용을 낮춥니다.
                결과물의 품질 차이는 책을 손에 쥐었을 때 바로 느껴집니다.
              </p>
            </div>
            <div className={styles.caseCard}>
              <div className={styles.caseIcon}>📋</div>
              <h3 className={styles.h3}>템플릿 제작</h3>
              <p>
                표지 색상만 바꾸는 방식의 템플릿 제작은
                빠르고 저렴하지만 책의 고유성이 없습니다.
                같은 출판사에서 나온 여러 책이 비슷하게 생겼다면
                템플릿 기반 제작일 가능성이 높습니다.
              </p>
            </div>
            <div className={styles.caseCard}>
              <div className={styles.caseIcon}>🚫</div>
              <h3 className={styles.h3}>기획 없는 진행</h3>
              <p>
                원고가 완성되어 있어도 기획 없이 제작이 진행되면
                독자층이 불분명하고 제목과 내용이 어긋나는 경우가 생깁니다.
                출간 이후 판매에 직접적인 영향을 미칩니다.
              </p>
            </div>
          </div>
        </div>

        {/* 5. 결론 */}
        <div className={styles.section}>
          <h2 className={styles.h2}>좋은 출판사란 무엇인가</h2>
          <p>
            앞서 설명한 네 가지 기준을 충족하는 출판사는 생각보다 많지 않습니다.
            기획부터 유통까지 전 공정을 직접 관리하고,
            각 책에 맞는 편집과 디자인을 별도로 설계하며,
            출간 이후의 저자 활동까지 함께 고민하는 곳이 좋은 출판사입니다.
          </p>
          <p>
            <strong>마이티북스는 대구를 기반으로 기획출판을 전문으로 하는 출판사입니다.</strong>
            자비출판 의뢰인을 받을 때도 기획 단계부터 함께 시작합니다.
            단순히 원고를 받아 제작하는 방식이 아니라,
            책의 방향성과 독자층을 함께 설정하고
            편집·디자인·제작·유통까지 전 공정을 직접 진행합니다.
          </p>
          <p>
            출판을 고려하고 있다면 여러 출판사에 문의하고 포트폴리오를 비교해보십시오.
            그 과정에서 위에 제시한 네 가지 기준으로 판단하신다면
            후회 없는 선택을 하실 수 있을 것입니다.
          </p>

          <div className={styles.conclusionBox}>
            <div className={styles.conclusionItem}>
              <span className={styles.conclusionMark}>✓</span>
              기획 개입 여부를 확인하십시오
            </div>
            <div className={styles.conclusionItem}>
              <span className={styles.conclusionMark}>✓</span>
              편집 수준을 포트폴리오로 직접 확인하십시오
            </div>
            <div className={styles.conclusionItem}>
              <span className={styles.conclusionMark}>✓</span>
              템플릿 기반인지 맞춤 제작인지 물어보십시오
            </div>
            <div className={styles.conclusionItem}>
              <span className={styles.conclusionMark}>✓</span>
              유통 구조와 재고 권한을 서면으로 확인하십시오
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className={styles.cta}>
          <div className={styles.ctaText}>
            마이티북스에 직접 문의하거나 포트폴리오를 확인해보십시오
          </div>
          <div className={styles.ctaBtns}>
            <a href="/portfolio/books" className={styles.ctaBtn}>포트폴리오 보기 →</a>
            <a href="mailto:novelstudylab@naver.com" className={styles.ctaBtnGhost}>이메일 문의 →</a>            
          </div>
        </div>

        <div className={styles.bottomNav}>
          <a href="/business/self-publishing" className={styles.backLink}>
            ← 자비출판 안내
          </a>
        </div>
        <div className={styles.bottomNav}>
          <a href="/support/faq" className={styles.backLink}>
            ← 자주묻는 질문
          </a>
        </div>
       </div>
      </div>
    
  )
}