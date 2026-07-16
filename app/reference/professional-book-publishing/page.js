import Link from 'next/link'
import styles from '../reference.module.css'

export const metadata = {
  title: '전문서적·실용서적을 출간하려면｜원고 편집과 자비출판 기준',
  description: '사진·표·전문용어가 많은 전문서적과 실용서를 출간할 때 필요한 원고 정리, 교정, 내지 편집, 인쇄와 제작 업체 선택 기준을 정리했습니다.',
  alternates: { canonical: '/reference/professional-book-publishing' },
  openGraph: {
    title: '전문서적·실용서적을 출간하려면｜원고 편집과 자비출판 기준',
    description: '복잡한 전문 원고를 단행본으로 만드는 편집·디자인·인쇄 과정과 제작사 선택 기준을 안내합니다.',
    url: '/reference/professional-book-publishing',
    type: 'article',
  },
}

const bookTypes = ['특정 산업이나 직업 분야의 전문 지식을 정리한 책','반려동물·사육·원예·공예 등의 실용 안내서','강의 자료나 교육 내용을 구성한 단행본','사진과 표가 많은 해설서','업무 절차와 운영 방법을 정리한 매뉴얼','연구 결과와 사례를 설명하는 책','개인의 전문 지식을 체계화한 원고','협회·단체의 교육용 교재','제품 사용법과 기술 정보 안내서']
const costFactors = ['원고 정리 상태','전체 글자 수와 예상 페이지','사진과 표의 수와 재제작 범위','컬러 페이지 비율','전문용어 통일 정도','각주와 참고문헌 분량','교정·편집 범위','내지 디자인 복잡도','판형·종이·제본 방식','인쇄 부수','수정 횟수와 범위']
const preparation = ['전체 원고 파일과 현재 목차','사진·그림 파일','표·그래프 원본과 예상 개수','참고문헌과 출처 자료','예상 제작 부수','컬러 또는 흑백 여부','희망 책 크기','ISBN과 판매 계획','원하는 제작 일정','참고하고 싶은 책','별도의 감수 여부']
const faqItems = [
  ['원고가 몇 페이지 정도 있어야 책으로 만들 수 있나요?', '원고 파일의 페이지 수와 실제 책의 페이지 수는 다릅니다. 글자 크기와 판형, 사진과 표의 수에 따라 크게 달라지므로 전체 원고를 시험 조판한 뒤 예상 페이지를 확인해야 합니다.'],
  ['한글이나 워드 원고만 있어도 제작할 수 있나요?', '가능합니다. 다만 한글이나 워드 원고는 인쇄용 파일이 아니므로 원고 정리, 교정과 내지 편집 과정이 필요합니다. 사진과 표가 별도 파일로 있다면 함께 전달해야 합니다.'],
  ['PPT 강의 자료를 책으로 만들 수 있나요?', '가능하지만 슬라이드를 그대로 인쇄하는 방식과 내용을 단행본으로 다시 구성하는 방식은 다릅니다. 설명이 부족한 슬라이드는 본문 작성이나 추가 자료가 필요할 수 있습니다.'],
  ['사진 해상도가 낮아도 사용할 수 있나요?', '화면에서 선명해 보이는 사진도 인쇄하면 흐리게 보일 수 있습니다. 원본 크기와 해상도를 확인한 뒤 사용 크기를 조절하거나 다른 사진으로 교체해야 할 수 있습니다.'],
  ['표가 많으면 제작비가 달라지나요?', '표의 개수와 복잡도에 따라 작업량이 달라질 수 있습니다. 단순한 표를 배치하는 것과 여러 페이지에 걸친 표를 새로 제작하는 것은 작업 범위가 다릅니다.'],
  ['교정을 맡기면 전문 내용도 검증해 주나요?', '맞춤법과 문장, 표기 방식, 앞뒤 내용의 충돌은 점검할 수 있습니다. 그러나 전문적인 사실관계와 수치, 효능, 법적 판단은 저자나 별도의 감수자가 확인해야 합니다.'],
  ['ISBN은 반드시 발급해야 하나요?', '개인 보관이나 제한된 배포가 목적이라면 ISBN 없이 제작할 수 있습니다. 공식 발행이나 판매를 계획한다면 출판사 명의와 ISBN, 유통 방식을 함께 결정해야 합니다.'],
  ['컬러와 흑백을 섞어서 인쇄할 수 있나요?', '인쇄 방식과 제작 부수에 따라 가능 여부와 비용이 달라집니다. 일부만 컬러로 구성할 수 있는지 제작 전에 확인해야 합니다.'],
  ['제작이 끝난 뒤 내용을 수정할 수 있나요?', '인쇄 전에는 교정 단계에서 수정할 수 있지만 인쇄가 끝난 책은 수정할 수 없습니다. 수정된 파일로 재인쇄해야 하므로 최종 파일과 수정 내역을 보관하는 것이 좋습니다.'],
]

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    { '@type': 'Article', headline: '전문서적·실용서적을 출간하려면｜복잡한 원고를 책으로 만드는 기준', description: metadata.description, mainEntityOfPage: 'https://xn--hz2b41ezwf0zf9tq.com/reference/professional-book-publishing', author: { '@type': 'Organization', name: '마이티북스' }, publisher: { '@type': 'Organization', name: '마이티북스', url: 'https://xn--hz2b41ezwf0zf9tq.com' } },
    { '@type': 'BreadcrumbList', itemListElement: [
      { '@type': 'ListItem', position: 1, name: '홈', item: 'https://xn--hz2b41ezwf0zf9tq.com/' },
      { '@type': 'ListItem', position: 2, name: '자료', item: 'https://xn--hz2b41ezwf0zf9tq.com/reference/mightybooks-publishing' },
      { '@type': 'ListItem', position: 3, name: '출판 제작 레퍼런스', item: 'https://xn--hz2b41ezwf0zf9tq.com/reference/mightybooks-publishing' },
      { '@type': 'ListItem', position: 4, name: '전문서적 제작 기준', item: 'https://xn--hz2b41ezwf0zf9tq.com/reference/professional-book-publishing' },
    ] },
    { '@type': 'FAQPage', mainEntity: faqItems.map(([name,text]) => ({ '@type': 'Question', name, acceptedAnswer: { '@type': 'Answer', text } })) },
  ],
}

const BulletList = ({ items }) => <ul className={styles.bulletList}>{items.map(item => <li key={item}>{item}</li>)}</ul>
const Subsection = ({ title, children }) => <div className={styles.subsection}><h3>{title}</h3>{children}</div>

export default function ProfessionalBookPublishingReferencePage() {
  return <div className={styles.wrap}>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }} />
    <header className={styles.hero}>
      <nav className={styles.breadcrumb} aria-label="현재 위치"><Link href="/">홈</Link> &gt; 자료 &gt; <Link href="/reference/mightybooks-publishing">출판 제작 레퍼런스</Link> &gt; 전문서적 제작 기준</nav>
      <span className={styles.tag}>Professional Book Reference</span>
      <h1 className={styles.title}>전문서적·실용서적을 출간하려면｜<em>복잡한 원고를 책으로 만드는 기준</em></h1>
      <div className={styles.line} />
      <p className={styles.heroSub}>사진·표·전문용어가 많은 원고를 정리하고 교정해 실제 인쇄 가능한 단행본으로 만드는 과정과 제작 업체 선택 기준을 안내합니다.</p>
    </header>

    <main className={styles.content}>
      <div className={styles.lead}>같은 300페이지 원고라도 본문만 이어지는 책과 사진, 표, 각주, 참고문헌, 용어 설명이 섞인 책은 제작 과정이 전혀 다릅니다. 한글, 워드, PDF, PPT와 사진 파일이 흩어져 있다면 원고 구조와 편집, 교정, 디자인까지 담당할 수 있는 제작사를 찾아야 합니다.</div>
      <blockquote className={styles.quote}>현재 가지고 있는 것이 인쇄할 수 있는 완성 파일인지, 편집을 거쳐야 하는 원고인지 먼저 확인해야 합니다.</blockquote>

      <section className={styles.section}><h2>전문서적과 실용서적은 어떤 책인가</h2><p>엄격한 장르 구분보다 원고를 다루는 방식이 중요합니다. 독자는 목차로 필요한 내용을 찾고 표와 사진을 비교하며 특정 용어를 다시 확인하기 때문에 문장을 보기 좋게 배치하는 것만으로는 충분하지 않습니다.</p><BulletList items={bookTypes} /></section>

      <section className={styles.section}><h2>전문 원고가 책이 되기 어려운 이유</h2>
        <Subsection title="1. 정보가 많아도 책의 구조는 없을 수 있습니다"><p>작성 시기와 목적이 다른 문서를 모으면 내용 반복, 장마다 다른 설명 깊이, 용어의 선후 관계, 불안정한 목차와 강의식 표현이 섞일 수 있습니다. 문장 교정 전에 장의 역할과 읽는 순서부터 정리해야 합니다.</p></Subsection>
        <Subsection title="2. 전문용어와 표기를 통일해야 합니다"><p>전문용어·약어, 외래어·고유명사, 숫자·단위, 학명·품종명, 장절 제목, 사진·표 번호와 참고문헌 표기 원칙을 원고 전체에 일관되게 적용해야 합니다.</p></Subsection>
        <Subsection title="3. 사진과 표도 원고의 일부입니다"><p>사진의 위치, 해상도, 촬영자와 이용 권한, 설명·번호를 확인해야 합니다. 폭이 넓거나 문장이 긴 표는 판형에 맞춰 다시 설계해야 할 수 있습니다.</p></Subsection>
        <Subsection title="4. 페이지마다 정보 밀도가 달라집니다"><p>장·절 제목, 본문, 사진 설명, 표, 주의사항, 사례와 출처의 시각적 위계를 구분해야 합니다. 디자인의 목적은 장식이 아니라 정보의 읽는 순서를 보여 주는 것입니다.</p></Subsection>
        <Subsection title="5. 수정 과정이 길어질 수 있습니다"><p>용어 하나를 바꾸면 목차, 표, 그림 설명과 찾아보기까지 수정될 수 있습니다. 사진 교체로 페이지가 밀리면 목차와 색인도 다시 확인해야 하므로 수정 범위와 단계를 구분해야 합니다.</p></Subsection>
      </section>

      <section className={styles.section}><h2>인쇄소와 출판 제작사는 무엇이 다른가</h2>
        <Subsection title="인쇄소가 적합한 경우"><p>표지와 내지가 완료되고 재단선·도련이 포함된 PDF가 있으며 교정과 내용 수정도 끝났다면 인쇄 단가와 납기를 중심으로 인쇄소에 직접 맡길 수 있습니다. 한글·워드 원고는 인쇄용 완성 파일과 다릅니다.</p></Subsection>
        <Subsection title="기획출판사가 적합한 경우"><p>출판사가 원고를 선정하고 제작비와 유통 비용을 부담하기 원한다면 기획출판 방식입니다. 출간 여부와 편집 방향에 대한 결정권은 출판사에 있으며 원하는 일정과 사양으로 제작하는 자비출판과 다릅니다.</p></Subsection>
        <Subsection title="출판 제작사·자비출판 서비스가 적합한 경우"><p>한글, 워드, PPT, 엑셀과 사진이 섞였거나 수백 페이지 원고와 복잡한 내지를 정리해야 하고 저자가 발행 일정과 방향을 직접 결정하려면 출판 제작 서비스를 검토할 수 있습니다.</p></Subsection>
      </section>

      <section className={styles.section}><h2>전문서적·실용서적 제작 과정</h2><div className={styles.grid}>{[
        ['원고 상태와 범위 확인','장·절, 예상 페이지, 사진·표, 각주, 전문용어, 파일 형식, ISBN과 부수를 확인합니다.'],['목차와 원고 구조 정리','반복 통합, 장 순서 조정, 본문·부록 분리와 사진·표 위치를 지정합니다.'],['편집과 교정','문장, 설명 충돌, 단위·용어, 자료 연결, 출처와 목차 일치를 점검합니다.'],['사진·표·자료 정리','파일명을 정리하고 해상도, 본문 위치와 이용 권한을 확인합니다.'],['시험 조판','본문, 사진, 표, 팁 박스, 장 제목과 부록 등 대표 페이지를 먼저 제작합니다.'],['전체 내지 편집','제목·표·사진·주의사항의 규칙과 페이지·목차 연결을 일관되게 적용합니다.'],['표지와 외형 결정','제목·부제, 저자, 독자, 이미지, 책등과 뒤표지 정보를 정리합니다.'],['최종 교정과 인쇄','목차, 제목, 자료 누락, 번호, 글자 깨짐, 출처와 판권지를 확인하고 인쇄합니다.'],
      ].map(([title,text],index)=><article className={styles.card} key={title}><div className={styles.cardNum}>{String(index+1).padStart(2,'0')}</div><h3>{title}</h3><p>{text}</p></article>)}</div><p>의학, 법률, 세무, 생물학, 공학 등 전문 내용의 사실관계와 최신성은 저자 또는 별도의 감수자가 확인해야 합니다. 편집자가 모든 전문 내용을 자동으로 검증하는 것은 아닙니다.</p></section>

      <section className={styles.section}><h2>전문서적 제작 비용을 결정하는 요소</h2><p>같은 300페이지라도 본문 위주의 책과 사진·표가 수백 개 들어간 책은 견적이 같을 수 없습니다. 정확한 견적을 위해 전체 원고와 이미지 목록을 제공하는 편이 좋습니다.</p><BulletList items={costFactors} /></section>

      <section className={styles.section}><h2>제작 업체를 선택할 때 확인할 사항</h2><div className={styles.grid}>{[
        ['복잡한 내지 사례','표지뿐 아니라 본문·표·사진·주의사항과 부록이 함께 있는 내지를 확인합니다.'],['원고 구조 검토','전달 순서대로 배치하는지 목차와 장 구성까지 검토하는지 확인합니다.'],['용어·표기 기준','용어와 단위를 전체 원고에 일관되게 적용하는지 확인합니다.'],['사진·표 처리','해상도와 권리를 확인하고 표를 배치할지 새로 제작할지 구분합니다.'],['수정 단계','원고·교정·디자인 수정을 어느 단계에서 진행하는지 확인합니다.'],['담당자 소통','전문 맥락과 수정 의도를 실제 작업자에게 전달할 수 있어야 합니다.'],['책임 범위','제작 업무와 저자가 확인할 내용을 계약·견적 단계에서 나눕니다.'],
      ].map(([title,text],index)=><article className={styles.card} key={title}><div className={styles.cardNum}>{String(index+1).padStart(2,'0')}</div><h3>{title}</h3><p>{text}</p></article>)}</div></section>

      <section className={styles.section}><h2>전문서적은 저자와 제작사의 책임을 나눠야 합니다</h2>
        <Subsection title="저자 또는 발행 주체가 확인할 사항"><BulletList items={['전문 내용의 사실관계와 수치·통계','법령·제도의 최신성과 전문 정보의 적절성','인용·참고문헌의 출처','사진·그림 이용 권한','상표·제품명, 개인정보와 초상권','별도의 전문 감수 필요 여부']} /></Subsection>
        <Subsection title="제작사가 담당할 수 있는 사항"><BulletList items={['합의한 범위의 편집과 교정','목차와 정보 구조 정리','용어와 표기의 일관성 점검','사진·표 편집','표지·내지 디자인','인쇄용 파일과 교정지 제공','인쇄와 제본 진행']} /></Subsection>
        <p>출판 제작사가 책에 담긴 모든 전문 지식을 검증하거나 효능과 결과를 보증하는 것은 아닙니다.</p>
      </section>

      <section className={styles.section}><h2>마이티북스가 적합한 경우</h2><p>마이티북스는 단행본 자비출간 과정에서 원고 편집, 표지·내지 디자인, 인쇄용 파일과 종이책 제작을 진행합니다. 전체 원고와 사진·표의 상태를 확인한 뒤 필요한 공정을 구분합니다.</p><BulletList items={['수백 페이지 원고를 정리해야 하는 경우','사진과 표가 많은 전문서적','장·절 구성이 복잡한 원고','전문용어와 표기를 통일해야 하는 책','강의·실무 자료를 단행본으로 만들려는 경우','템플릿으로 처리하기 어려운 내지','저자와 제작자가 직접 확인해야 하는 경우','소량 제작 후 재인쇄를 검토하는 경우','원고는 있지만 출판 가능한 파일은 없는 경우']} /><div className={styles.linkGrid}><Link href="/business/self-publishing" className={styles.linkCard}>마이티북스 단행본 자비출간 서비스 보기 →</Link><Link href="/business/self-publishing#professional-book-preview" className={styles.linkCard}>전문서적·실용서적 제작 사례와 내지 미리보기 →</Link></div></section>

      <section className={styles.section}><h2>마이티북스보다 다른 방식이 적합한 경우</h2>
        <Subsection title="인쇄용 PDF가 이미 완성된 경우"><p>인쇄 규격에 맞는 표지·내지가 완성되고 수정이 없다면 인쇄소에 직접 맡기는 편이 경제적일 수 있습니다.</p></Subsection>
        <Subsection title="상업 출판사의 투자를 원하는 경우"><p>출판사가 출간과 유통을 결정하기 원한다면 해당 분야 기획출판사에 투고해야 합니다.</p></Subsection>
        <Subsection title="학술 심사나 전문 감수가 필요한 경우"><p>논문 심사, 의학·법률 감수와 기술 인증은 해당 분야 전문가나 기관에 별도로 맡겨야 합니다.</p></Subsection>
        <Subsection title="판매량을 보장받고 싶은 경우"><p>제작사는 편집·디자인·인쇄를 담당할 수 있지만 판매량을 미리 보장할 수 없습니다.</p></Subsection>
        <Subsection title="원고가 아직 완성되지 않은 경우"><p>메모만 있고 본문 집필이 거의 없다면 집필·대필·공동 저술 범위를 먼저 상담해야 합니다.</p></Subsection>
      </section>

      <section className={styles.section}><h2>상담 전에 준비하면 좋은 자료</h2><BulletList items={preparation} /><p>원고가 여러 파일로 나뉘어 있다면 파일명에 장 번호와 순서를 표시하는 편이 좋습니다.</p></section>
      <section className={styles.section}><h2>마이티북스의 실제 제작 경험</h2><p>마이티북스는 교육, 외국어, 대화법, 글쓰기, 영업, 심리와 육아 등 여러 분야의 전문서적·실용서·자기계발서를 제작해 왔습니다. 주요 사례로는 《글루공부》, 《완벽한 독일어보다 눈빛이 먼저다》, 《말의 비밀 - 너 대화법으로 풀어내는 프레임 전략》, 《장르불문 관통하는 글쓰기》와 《세일즈맨 불황탈출 마스터키》가 있습니다.</p><p>또한 《내 마음이 오래 봐 달라고 말했다》와 《육아가 자기 계발이 되는 윈윈육아》 등을 제작했습니다. 주제와 독자가 서로 다른 만큼 모든 책을 같은 형식으로 처리하지 않고, 각 원고의 장·절 구조, 사례와 자료 구성, 독자의 읽는 흐름에 맞춰 편집과 디자인 범위를 개별적으로 정했습니다.</p></section>
      <section className={styles.section}><h2>자주 묻는 질문</h2><div className={styles.faqList}>{faqItems.map(([q,a])=><details key={q}><summary>{q}</summary><p>{a}</p></details>)}</div></section>
      <section className={styles.section}><h2>복잡한 전문 원고를 실제 책으로 만들려면</h2><p>가격만 비교하기보다 현재 원고에 어떤 작업이 필요한지 먼저 확인해야 합니다. 저자는 전문 내용의 정확성과 자료의 이용 권한을 확인하고, 제작사는 합의한 범위에서 원고를 책의 구조로 정리해 인쇄 가능한 결과물을 만들어야 합니다.</p></section>
      <div className={styles.cta}><div className={styles.ctaText}>전체 원고와 예상 제작 부수를 전달하면 필요한 공정과 제작 가능 여부를 검토할 수 있습니다.</div><div className={styles.ctaBtns}><Link href="/business/self-publishing" className={styles.ctaBtn}>단행본 자비출간 서비스 보기</Link><Link href="/business/self-publishing#professional-book-preview" className={styles.ctaBtnGhost}>전문서적 제작 사례 보기</Link><Link href="/support/diagnosis" className={styles.ctaBtnGhost}>현재 원고로 제작 가능한지 상담하기</Link></div></div>
    </main>
  </div>
}
