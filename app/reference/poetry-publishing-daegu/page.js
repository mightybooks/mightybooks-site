import Link from 'next/link'
import styles from '../reference.module.css'

export const metadata = {
  title: '대구에서 개인 시집을 제작하려면｜출판사·인쇄소 선택 기준',
  description: '대구에서 개인 시집이나 문집을 제작할 때 인쇄소와 출판 제작사의 차이, 편집·디자인·ISBN·인쇄 과정, 업체를 선택하는 기준을 정리했습니다.',
  alternates: { canonical: '/reference/poetry-publishing-daegu' },
  openGraph: {
    title: '대구에서 개인 시집을 제작하려면｜출판사·인쇄소 선택 기준',
    description: '개인 시집 제작에 필요한 편집, 디자인, ISBN과 인쇄 과정 및 업체 선택 기준을 안내합니다.',
    url: '/reference/poetry-publishing-daegu',
    type: 'article',
  },
}

const faqItems = [
  ['시집 원고는 몇 편 정도 있어야 하나요?', '정해진 최소 작품 수는 없습니다. 작품의 길이와 판형, 여백에 따라 같은 작품 수라도 책의 전체 페이지는 달라집니다. 작품 수보다 실제 원고를 조판했을 때 확보되는 분량을 확인하는 편이 정확합니다.'],
  ['시의 띄어쓰기와 행갈이도 교정되나요?', '단순 오기는 점검할 수 있지만, 시에서 사용한 띄어쓰기와 행갈이가 의도적인 표현일 수도 있습니다. 따라서 편집자가 일괄 수정하기보다 수정안을 저자와 확인하는 과정이 필요합니다.'],
  ['시집은 최소 몇 부부터 제작할 수 있나요?', '최소 제작 수량은 인쇄 방식과 업체에 따라 다릅니다. 소량 디지털 인쇄는 비교적 적은 부수에도 적합하지만, 수량이 늘어나면 다른 인쇄 방식이 더 경제적일 수 있습니다.'],
  ['ISBN이 꼭 필요한가요?', '개인 보관이나 비매품 배포가 목적이라면 ISBN 없이 제작할 수 있습니다. 서점 유통이나 도서 등록을 계획한다면 ISBN 발급과 출판사 명의를 함께 검토해야 합니다.'],
  ['원고만 보내면 표지와 내지도 제작할 수 있나요?', '출판 제작 서비스를 이용하면 원고 편집, 내지 디자인, 표지 디자인, 인쇄용 파일 제작을 함께 진행할 수 있습니다. 다만 업체마다 포함 업무가 다르므로 견적서에서 작업 범위를 확인해야 합니다.'],
  ['대구가 아닌 지역에서도 맡길 수 있나요?', '원고 전달과 교정 확인을 온라인으로 진행할 수 있다면 지역과 관계없이 비대면 제작이 가능합니다. 방문 상담이 필요한 경우에는 업체의 상담 장소와 운영 방식을 먼저 확인해야 합니다.'],
  ['제작 비용은 어떻게 결정되나요?', '원고 분량, 교정과 편집의 정도, 판형, 페이지 수, 컬러 사용 여부, 종이와 제본 방식, 제작 부수에 따라 달라집니다. 원고 파일과 예상 부수를 전달한 뒤 항목별 견적을 받는 편이 정확합니다.'],
]

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Article',
      headline: '대구에서 개인 시집을 제작하려면｜출판사·인쇄소 선택과 제작 과정',
      description: metadata.description,
      mainEntityOfPage: 'https://xn--hz2b41ezwf0zf9tq.com/reference/poetry-publishing-daegu',
      author: { '@type': 'Organization', name: '마이티북스' },
      publisher: { '@type': 'Organization', name: '마이티북스', url: 'https://xn--hz2b41ezwf0zf9tq.com' },
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: '홈', item: 'https://xn--hz2b41ezwf0zf9tq.com/' },
        { '@type': 'ListItem', position: 2, name: '자료', item: 'https://xn--hz2b41ezwf0zf9tq.com/reference/mightybooks-publishing' },
        { '@type': 'ListItem', position: 3, name: '출판 제작 레퍼런스', item: 'https://xn--hz2b41ezwf0zf9tq.com/reference/mightybooks-publishing' },
        { '@type': 'ListItem', position: 4, name: '대구 시집 제작 기준', item: 'https://xn--hz2b41ezwf0zf9tq.com/reference/poetry-publishing-daegu' },
      ],
    },
    { '@type': 'FAQPage', mainEntity: faqItems.map(([name, text]) => ({ '@type': 'Question', name, acceptedAnswer: { '@type': 'Answer', text } })) },
  ],
}

const BulletList = ({ children }) => <ul className={styles.bulletList}>{children.map(item => <li key={item}>{item}</li>)}</ul>
const Subsection = ({ title, children }) => <div className={styles.subsection}><h3>{title}</h3>{children}</div>

export default function PoetryPublishingDaeguPage() {
  return (
    <div className={styles.wrap}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }} />
      <header className={styles.hero}>
        <nav className={styles.breadcrumb} aria-label="현재 위치"><Link href="/">홈</Link> &gt; 자료 &gt; <Link href="/reference/mightybooks-publishing">출판 제작 레퍼런스</Link> &gt; 대구 시집 제작 기준</nav>
        <span className={styles.tag}>Poetry Publishing Reference</span>
        <h1 className={styles.title}>대구에서 개인 시집을 제작하려면｜<em>출판사·인쇄소 선택과 제작 과정</em></h1>
        <div className={styles.line} />
        <p className={styles.heroSub}>대구에서 개인 시집이나 문집을 만들 때 필요한 편집·디자인·ISBN·인쇄 과정과 제작 업체를 선택하는 기준을 정리했습니다.</p>
      </header>

      <main className={styles.content}>
        <div className={styles.lead}>대구에서 개인 시집을 만들려고 검색하면 출판사, 인쇄소, 출력·제본 업체, 독립출판 제작 서비스가 함께 나옵니다. 이미 편집과 디자인이 끝난 인쇄용 파일이 있다면 인쇄소에 바로 맡길 수 있지만, 시 원고만 있고 배열과 교정, 내지와 표지 제작까지 필요하다면 출판 제작 전반을 맡을 수 있는 곳을 찾아야 합니다.</div>
        <blockquote className={styles.quote}>지금 필요한 일이 단순한 인쇄인지, 한 권의 시집으로 완성하는 전체 제작인지 먼저 구분해야 합니다.</blockquote>

        <section className={styles.section}>
          <h2>시집 제작 업체는 어떻게 구분해야 할까</h2>
          <p>업체의 명칭보다 실제로 어디까지 작업해 주는지를 확인하는 편이 정확합니다.</p>
          <Subsection title="1. 인쇄소·출력 제본 업체"><p>완성된 인쇄용 파일을 종이책으로 제작하는 일을 담당합니다. 표지와 내지 디자인이 완료됐고 인쇄 규격, 종이와 제본을 직접 결정할 수 있으며 인쇄 단가와 납기가 중요한 경우에 적합합니다.</p><p>원고 파일만 전달하면 편집과 디자인까지 자동으로 진행되는 것은 아닙니다. 간단한 파일 수정이나 조판 지원 여부와 결과물의 수준을 사전에 확인해야 합니다.</p></Subsection>
          <Subsection title="2. 기획출판사"><p>출판사가 원고를 검토해 출간 여부를 결정하고 제작비와 유통을 부담합니다. 시장성과 기획 방향이 중요하며, 개인이 비용을 부담해 원하는 일정과 사양으로 만드는 자비출판과는 다릅니다.</p><p>상업 출판과 전국 서점 유통을 우선한다면 기획출판사나 문학 전문 출판사 투고를 먼저 검토할 수 있습니다.</p></Subsection>
          <Subsection title="3. 출판 제작사·자비출판 서비스"><p>저자가 제작비를 부담하고 원고 편집부터 디자인, 인쇄까지 필요한 공정을 선택해 진행합니다. 첫 개인 시집이거나 시의 순서와 장 구성, 표지와 내지를 함께 점검해야 할 때 적합합니다.</p><BulletList>{['시 원고만 있고 편집된 파일은 없는 경우','소량이라도 일반 단행본과 같은 완성도를 원하는 경우','저자가 제작 방향과 발행 여부를 직접 결정하고 싶은 경우']}</BulletList></Subsection>
        </section>

        <section className={styles.section}>
          <h2>개인 시집 제작에는 어떤 과정이 필요한가</h2>
          <p>시집은 글자 수가 적어 보여도 여백, 행갈이와 작품 배열에 따라 읽는 속도와 인상이 크게 달라지는 책입니다.</p>
          <Subsection title="1. 원고 정리와 분량 확인"><p>전체 작품 수와 분량을 확인하고 작품 제목, 배열 순서, 부·장 구분, 작가의 말, 목차, 약력과 판권지 정보를 정리합니다. 작품 길이와 판형에 따라 한 작품이 여러 페이지에 걸칠 수도 있습니다.</p></Subsection>
          <Subsection title="2. 교정과 표기 통일"><p>의도적인 띄어쓰기, 문장부호와 행갈이를 단순 오기와 구분해야 합니다. 제목·본문 표기, 숫자와 외래어, 중복·누락, 목차와 본문 제목의 일치 여부를 저자의 표현 의도를 확인하며 점검합니다.</p></Subsection>
          <Subsection title="3. 시집의 구성과 작품 배열"><p>주제, 계절, 시간과 정서의 흐름을 기준으로 작품을 묶고 각 부의 시작과 끝이 한 권의 흐름을 만드는지 확인합니다.</p></Subsection>
          <Subsection title="4. 내지 디자인"><p>판형, 글꼴, 글자 크기, 행간, 여백, 제목 간격, 페이지 번호와 작품이 다음 페이지로 넘어가는 기준을 정합니다. 짧은 시와 긴 시를 함께 시험 조판하는 것이 좋습니다.</p></Subsection>
          <Subsection title="5. 표지 디자인"><p>제목과 내용, 대표 작품과 원하는 분위기를 종합합니다. 사진이나 그림은 인쇄 해상도와 이용 권한을 확인하고, 피하고 싶은 색상과 참고 도서도 함께 전달하는 편이 좋습니다.</p></Subsection>
          <Subsection title="6. 교정지 확인과 인쇄용 파일 제작"><p>화면에서 놓친 줄바꿈, 빈 페이지, 목차와 페이지 번호 문제를 실제 책의 흐름으로 확인한 뒤 인쇄 규격에 맞는 최종 PDF를 제작합니다.</p></Subsection>
          <Subsection title="7. ISBN과 인쇄 방식 결정"><p>서점 유통을 계획하면 ISBN과 출판사 명의, 유통 방식을 결정합니다. 비매품 소량 제작은 ISBN 없이도 가능하며 부수와 목적에 따라 디지털, 오프셋, 주문형 인쇄를 비교합니다.</p></Subsection>
        </section>

        <section className={styles.section}>
          <h2>대구에서 시집 제작 업체를 고를 때 확인할 사항</h2>
          <div className={styles.grid}>{[
            ['원고 편집 범위','맞춤법 검사뿐인지 작품 배열과 책의 구성까지 검토하는지 확인합니다.'],['표지와 내지 제작자','템플릿 방식인지 책마다 별도로 디자인하는지 실제 결과물로 확인합니다.'],['견적 포함 항목','편집, 교정, 디자인, 인쇄, ISBN, 배송과 수정 횟수·추가 비용을 구분합니다.'],['소량 제작 가능 여부','최소 부수와 추가 제작 가능 여부, 재인쇄 자료의 보관 범위를 확인합니다.'],['저자의 승인 단계','교정 PDF나 실물 샘플을 저자가 승인한 뒤 인쇄하는지 확인합니다.'],['실제 시집 제작 사례','표지뿐 아니라 내지 여백, 배열, 목차와 간지 구성까지 살펴봅니다.'],
          ].map(([title, text], index) => <article className={styles.card} key={title}><div className={styles.cardNum}>{String(index + 1).padStart(2,'0')}</div><h3>{title}</h3><p>{text}</p></article>)}</div>
        </section>

        <section className={styles.section}>
          <h2>마이티북스가 적합한 경우</h2>
          <p>마이티북스는 대구에서 개인 시집과 문집의 편집·디자인·인쇄 과정을 함께 진행하는 출판 제작 서비스입니다. 한글이나 워드 원고만 있거나 첫 시집의 제작 순서가 어렵고, 작품 배열과 전체 구성, 맞춤 표지·내지를 담당자와 직접 상의하고 싶을 때 검토할 수 있습니다.</p>
          <BulletList>{['소량이지만 일반 단행본 형태의 결과물을 원하는 경우','대구에서 방문 상담하거나 전국에서 비대면으로 진행하려는 경우','원고 상태에 따라 필요한 편집·디자인·인쇄 공정을 구분하고 싶은 경우']}</BulletList>
          <div className={styles.linkGrid}><Link className={styles.linkCard} href="/business/poetry">마이티북스 개인 시집 제작 서비스 확인하기 →</Link><Link className={styles.linkCard} href="/business/poetry#poetry-preview">시집 제작 사례와 내지 미리보기 확인하기 →</Link></div>
        </section>

        <section className={styles.section}>
          <h2>마이티북스보다 다른 업체가 더 적합한 경우</h2>
          <Subsection title="인쇄용 PDF가 이미 완성된 경우"><p>표지와 내지가 인쇄 규격에 맞고 수정이 필요 없다면 인쇄소에 직접 견적을 받는 편이 경제적일 수 있습니다.</p></Subsection>
          <Subsection title="상업 출판만을 원하는 경우"><p>제작비를 부담하지 않고 출판사의 투자와 유통으로 내고 싶다면 기획출판사나 문학 전문 출판사에 투고해야 합니다.</p></Subsection>
          <Subsection title="한두 권만 빠르게 필요한 경우"><p>전문 편집보다 속도가 중요하다면 포토북이나 주문형 책 제작 서비스도 검토할 수 있습니다.</p></Subsection>
          <Subsection title="판매량을 보장받고 싶은 경우"><p>제작 대행과 판매·홍보는 별개의 업무이며 어떤 제작 업체도 개인 시집의 판매량을 미리 보장할 수 없습니다.</p></Subsection>
        </section>

        <section className={styles.section}>
          <h2>개인 시집 제작 상담 전에 준비할 자료</h2>
          <BulletList>{['전체 원고 파일과 작품 수','예상 제작 부수와 희망 책 크기','컬러 또는 흑백 여부','원하는 제작 일정','ISBN과 판매 계획 여부','참고하고 싶은 시집','표지에 사용할 사진이나 그림의 유무']}</BulletList>
          <p>아직 작품 순서나 책의 크기를 정하지 못했다면 미정인 상태로 상담할 수 있습니다. 전체 원고가 있으면 실제 분량과 작업 범위를 더 정확히 판단할 수 있습니다.</p>
        </section>

        <section className={styles.section}>
          <h2>마이티북스의 실제 제작 경험</h2>
          <p>마이티북스는 시집과 문집, 감성 에세이의 원고 편집과 표지·내지 디자인, 종이책 제작을 진행해 왔습니다. 장미와 여우 브랜드로 출간한 시집에는 《새들이 울었던 자리가 있다》, 《마하의 시간을 살다》, 《동성로 낭만 다이어리》, 《겨울 지나 봄으로》와 《폭염 지나 결실로》가 있습니다.</p>
          <p>사이의 순간들 브랜드로는 감성 에세이 《나의 작은 스승들》과 《토실토실 토끼를 안았습니다》를 출간했습니다. 작품의 성격과 원고 분량에 따라 배열과 여백, 표지와 본문 분위기를 각 책에 맞게 조정했습니다.</p>
        </section>

        <section className={styles.section}>
          <h2>자주 묻는 질문</h2>
          <div className={styles.faqList}>{faqItems.map(([question, answer]) => <details key={question}><summary>{question}</summary><p>{answer}</p></details>)}</div>
        </section>

        <section className={styles.section}>
          <h2>대구에서 개인 시집 제작을 시작하려면</h2>
          <p>업체의 이름보다 현재 원고에 어떤 작업이 필요한지를 먼저 판단해야 합니다. 인쇄 파일이 완성돼 있다면 인쇄소가 적합할 수 있고, 원고를 한 권의 책으로 편집하고 표지와 내지, 발행 과정까지 진행해야 한다면 출판 제작 서비스를 비교해야 합니다.</p>
        </section>

        <div className={styles.cta}><div className={styles.ctaText}>현재 원고 상태와 제작 목적을 기준으로 필요한 작업 범위를 확인해 보세요.</div><div className={styles.ctaBtns}><Link href="/business/poetry" className={styles.ctaBtn}>개인 시집 제작 서비스 보기</Link><Link href="/business/poetry#poetry-preview" className={styles.ctaBtnGhost}>시집 제작 사례와 내지 미리보기 보기</Link><Link href="/support/diagnosis" className={styles.ctaBtnGhost}>현재 원고로 제작 가능한지 상담하기</Link></div></div>
      </main>
    </div>
  )
}
