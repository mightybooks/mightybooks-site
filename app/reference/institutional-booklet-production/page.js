import Link from 'next/link'
import styles from '../reference.module.css'

export const metadata = {
  title: '기관·기업 소책자를 제작하려면｜자료집·안내서 제작 기준',
  description: '기관·기업 소책자, 교육 자료집, 사업 안내서, 결과보고서 등을 제작할 때 필요한 원고 취합, 편집, 디자인, 인쇄와 업체 선택 기준을 정리했습니다.',
  alternates: { canonical: '/reference/institutional-booklet-production' },
  openGraph: { title: '기관·기업 소책자를 제작하려면｜자료집·안내서 제작 기준', description: '기관과 기업의 자료를 공식 책자로 정리하는 편집·디자인·인쇄 과정과 업체 선택 기준을 안내합니다.', url: '/reference/institutional-booklet-production', type: 'article' },
}

const bookletTypes = ['기관 소개 책자','기업 소개서','사업·프로그램 이용 안내서','교육 자료집과 강의 교재','행사·세미나 자료집','정책 안내서','연구 결과 요약집','사업 성과 자료집과 결과보고서','매뉴얼과 업무 지침서','사례집과 인터뷰 모음집','기념 책자와 백서·연혁집','지역 문화·관광 안내서','복지 서비스 안내서','모집·홍보용 배포 책자']
const scheduleSteps = ['원고와 자료 취합','원고 편집','디자인 시안','전체 내지 제작','1차 교정','내부 의견 취합','2차 수정','최종 결재','인쇄와 제본','포장','배송과 납품']
const costFactors = ['원고 정리 정도','참여 필진과 자료 제공자 수','전체 페이지','사진·표·그래프 수와 재제작 범위','교정과 원고 편집 범위','디자인 복잡도','컬러·흑백 여부','판형·종이·후가공·제본','인쇄 부수','수정 횟수와 내부 결재 단계','납품 장소 수와 개별 포장','긴급 제작 여부']
const preparation = ['책자의 목적과 주요 독자·배포 대상','전체 원고와 현재 목차','기존 책자와 홍보물','기관 로고와 디자인 지침','사진 원본','엑셀 표와 그래프 원본','필수 기재 문구','참여·후원 기관 목록','예상 페이지와 제작 부수','컬러·흑백과 희망 판형','납품 희망일과 장소별 수량','내부 결재 기간','세금계산서와 계약 서류','개인정보와 초상권 확인 여부']
const faqItems = [
  ['원고가 완성되지 않아도 견적을 받을 수 있나요?', '대략적인 범위는 안내받을 수 있지만 최종 견적은 달라질 수 있습니다. 현재까지 작성된 원고와 예상 목차, 추가될 자료의 양을 함께 전달하는 편이 좋습니다.'],
  ['한글이나 PPT 자료만 있어도 책자를 만들 수 있나요?', '가능합니다. 다만 발표 자료를 그대로 인쇄하는 것과 내용을 책자 구조로 다시 편집하는 것은 작업 범위가 다르며 설명이 부족한 슬라이드는 자료 보완이 필요할 수 있습니다.'],
  ['기관 내부에서 여러 사람이 수정 의견을 보내도 되나요?', '여러 사람이 확인할 수는 있지만 제작사에는 의견을 취합해 한 명의 담당자가 전달하는 편이 안전합니다. 서로 다른 지시가 동시에 전달되면 누락이나 충돌이 생길 수 있습니다.'],
  ['제작 기간은 얼마나 걸리나요?', '원고 상태, 페이지, 디자인 난도, 내부 결재 기간과 인쇄 방식에 따라 달라집니다. 납품일을 기준으로 편집부터 배송까지 전체 일정을 역산해야 합니다.'],
  ['수정은 몇 번까지 가능한가요?', '수정 횟수와 범위는 계약에 따라 다릅니다. 오탈자 수정, 전체 디자인 변경과 새 원고 추가는 다른 수준의 작업이므로 기본 범위와 추가 비용 조건을 구분해야 합니다.'],
  ['표와 그래프도 새로 만들어 주나요?', '편집 가능한 원본 데이터가 있다면 책의 디자인에 맞춰 다시 제작할 수 있습니다. 개수와 복잡도에 따라 별도 작업이 될 수 있고 수치 정확성은 기관이 최종 확인해야 합니다.'],
  ['사진은 휴대전화로 찍은 것도 사용할 수 있나요?', '원본 크기와 촬영 상태에 따라 사용할 수 있습니다. 메신저나 문서에 삽입된 사진은 압축될 수 있으므로 촬영 원본을 전달하는 편이 좋습니다.'],
  ['기관 로고는 홈페이지에서 내려받아도 되나요?', '화면용 로고는 인쇄 해상도가 부족할 수 있습니다. 기관이 보관한 벡터 파일이나 고해상도 공식 로고와 사용 지침을 전달해야 합니다.'],
  ['개인정보가 들어간 자료도 전달할 수 있나요?', '제작에 꼭 필요한지 먼저 확인하고 불필요한 주민등록번호, 개인 연락처와 주소는 제거하는 편이 좋습니다. 민감한 자료는 전달·보관·폐기 방식도 협의해야 합니다.'],
  ['인쇄 전에 실물을 확인할 수 있나요?', '인쇄 방식과 일정에 따라 샘플 출력이나 가제본을 확인할 수 있지만 추가 비용과 시간이 필요할 수 있습니다. 최소한 전체 교정 PDF는 인쇄 전에 확인해야 합니다.'],
  ['납품 장소를 여러 곳으로 나눌 수 있나요?', '업체와 배송 조건에 따라 가능합니다. 여러 지점 발송이나 개별 포장이 필요하면 견적 단계에서 장소별 수량과 포장 방식을 알려야 합니다.'],
]

const jsonLd = { '@context': 'https://schema.org', '@graph': [
  { '@type': 'Article', headline: '기관·기업 소책자를 제작하려면｜자료집·안내서 제작과 업체 선택 기준', description: metadata.description, mainEntityOfPage: 'https://xn--hz2b41ezwf0zf9tq.com/reference/institutional-booklet-production', author: { '@type': 'Organization', name: '마이티북스' }, publisher: { '@type': 'Organization', name: '마이티북스', url: 'https://xn--hz2b41ezwf0zf9tq.com' } },
  { '@type': 'BreadcrumbList', itemListElement: [
    { '@type': 'ListItem', position: 1, name: '홈', item: 'https://xn--hz2b41ezwf0zf9tq.com/' },
    { '@type': 'ListItem', position: 2, name: '자료', item: 'https://xn--hz2b41ezwf0zf9tq.com/reference/mightybooks-publishing' },
    { '@type': 'ListItem', position: 3, name: '출판 제작 레퍼런스', item: 'https://xn--hz2b41ezwf0zf9tq.com/reference/mightybooks-publishing' },
    { '@type': 'ListItem', position: 4, name: '기관·기업 소책자 제작 기준', item: 'https://xn--hz2b41ezwf0zf9tq.com/reference/institutional-booklet-production' },
  ] },
  { '@type': 'FAQPage', mainEntity: faqItems.map(([name,text]) => ({ '@type': 'Question', name, acceptedAnswer: { '@type': 'Answer', text } })) },
] }

const BulletList = ({ items }) => <ul className={styles.bulletList}>{items.map(item => <li key={item}>{item}</li>)}</ul>
const Subsection = ({ title, children }) => <div className={styles.subsection}><h3>{title}</h3>{children}</div>

export default function InstitutionalBookletReferencePage() {
  return <div className={styles.wrap}>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }} />
    <header className={styles.hero}>
      <nav className={styles.breadcrumb} aria-label="현재 위치"><Link href="/">홈</Link> &gt; 자료 &gt; <Link href="/reference/mightybooks-publishing">출판 제작 레퍼런스</Link> &gt; 기관·기업 소책자 제작 기준</nav>
      <span className={styles.tag}>Institutional Booklet Reference</span>
      <h1 className={styles.title}>기관·기업 소책자를 제작하려면｜<em>자료집·안내서 제작과 업체 선택 기준</em></h1>
      <div className={styles.line} />
      <p className={styles.heroSub}>여러 부서와 담당자의 자료를 취합해 공식 소책자, 안내서, 자료집과 결과보고서로 만드는 편집·디자인·인쇄 기준을 정리했습니다.</p>
    </header>

    <main className={styles.content}>
      <div className={styles.lead}>기관이나 기업의 소책자는 한글 문서, 워드, 발표 자료, 엑셀 표, 사진, 로고와 기존 홍보물처럼 서로 다른 자료를 모아 만드는 경우가 많습니다. 흩어진 자료를 공식 책자로 정리해야 한다면 원고 편집과 디자인, 인쇄를 함께 진행할 수 있는 제작사를 찾아야 합니다.</div>
      <blockquote className={styles.quote}>누가 원고를 취합하고, 누가 내용을 승인하며, 어느 단계까지 수정할 수 있는지를 먼저 정해야 합니다.</blockquote>

      <section className={styles.section}><h2>기관·기업 소책자에는 어떤 제작물이 포함되는가</h2><p>소책자는 페이지가 적은 책만을 뜻하지 않습니다. 독자와 배포 장소, 홍보·교육·안내·기록 목적에 따라 분량, 구조와 우선순위가 달라집니다.</p><BulletList items={bookletTypes} /></section>

      <section className={styles.section}><h2>소책자·브로슈어·리플릿은 무엇이 다른가</h2>
        <Subsection title="리플릿"><p>한 장의 종이를 접어 행사 안내, 시설 이용법과 짧은 사업 소개를 빠르게 전달합니다. 대량 배포에는 유리하지만 많은 내용을 담기 어렵습니다.</p></Subsection>
        <Subsection title="브로슈어"><p>기관·기업 이미지와 주요 사업을 사진과 그래픽 중심으로 짧게 소개합니다. 긴 본문보다 핵심 메시지를 빠르게 전달하는 목적입니다.</p></Subsection>
        <Subsection title="소책자·자료집"><p>여러 페이지를 제본한 책 형태로 목차, 본문, 표, 사진과 사례를 일정한 순서로 전달하며 보관과 반복 열람에 적합합니다.</p></Subsection>
        <Subsection title="보고서·백서"><p>사업 경과, 결과, 통계, 사례와 평가를 기록합니다. 정확한 수치와 출처, 목차 구조와 표·그래프의 가독성이 중요합니다.</p></Subsection>
      </section>

      <section className={styles.section}><h2>기관·기업 소책자 제작이 어려운 이유</h2>
        <Subsection title="1. 원고 작성자와 제작 담당자가 다를 수 있습니다"><p>원고 작성자, 취합 담당자, 최종 결재권자, 디자인 확인자, 인쇄 승인자와 제작사 연락 담당자를 구분해야 합니다. 내부 의견은 한 차례 취합해 지정 담당자가 전달하는 편이 안전합니다.</p></Subsection>
        <Subsection title="2. 자료 형식이 서로 다릅니다"><p>한글·워드·PDF·PPT·엑셀·이메일·사진·스캔 문서와 과거 책자에서 본문과 참고 자료를 구분하고, 중복·오래된 자료와 누락 정보를 정리해야 합니다.</p></Subsection>
        <Subsection title="3. 기관 표기와 공식 명칭을 통일해야 합니다"><p>기관·부서·사업·프로그램명, 직위·이름, 날짜·연락처, 수치·단위, 협력 기관과 주최·주관·후원 표기, 로고 순서를 페이지 전체에서 일치시켜야 합니다.</p></Subsection>
        <Subsection title="4. 수정과 결재 과정이 길어질 수 있습니다"><p>원고 마감, 편집본, 디자인 시안, 전체 교정, 내부 결재, 최종 승인, 인쇄·제본·포장과 납품을 구분하고 실제 납품 완료일에서 역산해야 합니다.</p></Subsection>
        <Subsection title="5. 인쇄 뒤에는 수정할 수 없습니다"><p>기관명, 사람 이름, 날짜, 연락처, QR 코드, 통계·금액, 로고·후원 표기와 개인정보는 최종 승인 단계에서 별도로 확인해야 합니다.</p></Subsection>
      </section>

      <section className={styles.section}><h2>인쇄소와 출판 제작사는 어떻게 다른가</h2>
        <Subsection title="인쇄소가 적합한 경우"><p>편집·디자인·내부 승인이 끝난 인쇄용 PDF와 확정된 종이·제본 사양이 있고 대량 인쇄 단가와 납기가 중요하다면 인쇄소에 직접 맡길 수 있습니다.</p></Subsection>
        <Subsection title="디자인 업체가 적합한 경우"><p>내용과 순서는 확정됐고 브랜드 이미지, 인포그래픽과 홍보 그래픽을 중심으로 개선하려면 디자인 스튜디오가 적합할 수 있습니다. 원고 교정 포함 여부는 별도로 확인해야 합니다.</p></Subsection>
        <Subsection title="출판 제작사가 적합한 경우"><p>여러 형식의 자료를 한 권으로 정리하고 목차·장 구성, 교정·표기 통일, 표지·내지 디자인과 인쇄를 함께 진행해야 한다면 책의 페이지 구조를 다루는 출판 제작사를 검토할 수 있습니다.</p></Subsection>
      </section>

      <section className={styles.section}><h2>기관·기업 소책자 제작 과정</h2><div className={styles.grid}>{[
        ['목적과 독자 확인','홍보·교육·안내·기록 목적과 외부·내부 배포 여부를 정합니다.'],['담당자와 승인 절차','실무 담당자, 수정·디자인·인쇄 승인권자와 결재 기간을 지정합니다.'],['원고와 자료 취합','최종 원고, 참고 자료, 사진, 로고, 표·그래프와 필수 문구를 구분합니다.'],['목차와 페이지 설계','책자의 목적에 맞춰 기관 소개, 사업, 성과, 사례, 안내와 부록의 순서를 정합니다.'],['원고 편집·표기 통일','문체, 공식 명칭, 숫자·날짜·직위, 표와 그림 명칭을 통일합니다.'],['표와 그래프 정리','원본 데이터로 판형에 맞게 표를 분리하고 단위, 색상과 수치를 확인합니다.'],['사진·개인정보 확인','촬영자, 사용 권한, 초상권, 개인정보와 보안 정보를 확인합니다.'],['시험 페이지 확정','표지, 목차, 본문, 사진, 표·그래프와 사례 페이지를 함께 시험합니다.'],['전체 편집·내부 확인','페이지별 내용 수정과 전체 디자인 수정을 구분해 전달합니다.'],['최종 승인과 인쇄','기관명, 수치, 연락처, 로고, QR과 개인정보를 확인하고 기록이 남는 방식으로 승인합니다.'],
      ].map(([title,text],index)=><article className={styles.card} key={title}><div className={styles.cardNum}>{String(index+1).padStart(2,'0')}</div><h3>{title}</h3><p>{text}</p></article>)}</div></section>

      <section className={styles.section}><h2>제작 일정은 어떻게 잡아야 하는가</h2><p>기관 제작물은 편집보다 내부 확인과 결재에 더 많은 시간이 걸릴 수 있습니다. 행사 전날이 아니라 며칠 앞선 납품 완료일을 기준으로 역산해 배송 지연이나 인쇄 오류에 대응할 시간을 확보해야 합니다.</p><BulletList items={scheduleSteps} /></section>
      <section className={styles.section}><h2>제작 비용을 결정하는 요소</h2><p>완성 PDF를 인쇄하는 작업과 흩어진 자료를 취합해 처음부터 편집하는 작업은 비용이 같을 수 없습니다. 예상 페이지만이 아니라 실제 원고와 자료를 제공해야 정확한 범위를 판단할 수 있습니다.</p><BulletList items={costFactors} /></section>

      <section className={styles.section}><h2>제작 업체를 선택할 때 확인할 사항</h2><div className={styles.grid}>{[
        ['원고 편집 포함 여부','중복과 누락을 확인하고 책 구조로 정리하는지 봅니다.'],['여러 자료 형식','한글, 워드, PPT, 엑셀과 사진을 함께 다룰 수 있어야 합니다.'],['표·그래프 편집','이미지 삽입인지 판형에 맞춰 다시 제작하는지 확인합니다.'],['수정 절차','전달 방식, 기본 수정 횟수와 추가 비용 조건을 확인합니다.'],['일정·납품 관리','디자인 완료가 아닌 포장·배송을 포함한 최종 납품일을 확인합니다.'],['실제 내지 사례','본문, 사진, 표, 그래프와 목차가 함께 있는 페이지를 봅니다.'],['파일 보관','재인쇄·개정판을 위한 최종 파일과 원본 보관 방식을 확인합니다.'],['거래 서류','견적서, 거래명세서, 세금계산서, 계약·과업·납품 서류 가능 여부를 확인합니다.'],
      ].map(([title,text],index)=><article className={styles.card} key={title}><div className={styles.cardNum}>{String(index+1).padStart(2,'0')}</div><h3>{title}</h3><p>{text}</p></article>)}</div></section>

      <section className={styles.section}><h2>기관과 제작사의 책임을 구분해야 합니다</h2>
        <Subsection title="기관·기업에서 확인할 사항"><BulletList items={['기관명·사업명, 이름·직위','통계·실적·금액·예산','사업 기간과 법령·제도 정보','개인정보 공개 여부','사진·초상권과 외부 자료 이용 권한','후원·협력 기관 표기','최종 내용 승인과 공개 범위']} /></Subsection>
        <Subsection title="제작사가 담당할 수 있는 사항"><BulletList items={['합의 범위의 원고 편집과 교정','목차·페이지 구조와 문체·표기 통일','표·그래프 편집과 사진 배치','표지·내지 디자인','인쇄용 파일과 교정지 제공','인쇄·제본과 지정 장소 납품']} /></Subsection>
        <p>제작사는 불일치를 발견해 확인을 요청할 수 있지만 사업 실적, 통계와 개인정보 공개 가능 여부를 대신 판단할 수 없습니다.</p>
      </section>

      <section className={styles.section}><h2>마이티북스가 적합한 경우</h2><p>마이티북스는 전달받은 문서를 단순 배치하는 데서 그치지 않고, 합의한 범위에서 자료 순서와 정보 구조를 정리해 읽을 수 있는 책자 형태로 제작합니다.</p><BulletList items={['여러 문서와 자료를 한 권으로 정리해야 하는 경우','한글·PPT·엑셀·사진이 섞인 경우','원고 편집과 내지 디자인이 함께 필요한 경우','기관 소개서·사업 안내서 제작','교육 자료집·강의 교재 제작','결과보고서·사례집 제작','인터뷰·사진·표가 함께 들어가는 경우','표기와 문체 통일이 필요한 경우','소량·중간 규모 제작','수정·일정·인쇄·납품을 함께 관리해야 하는 경우']} /><div className={styles.linkGrid}><Link href="/business/booklet" className={styles.linkCard}>기관·기업 소책자 제작 서비스 보기 →</Link><Link href="/business/booklet#booklet-preview" className={styles.linkCard}>소책자 제작 사례와 내지 미리보기 →</Link></div></section>

      <section className={styles.section}><h2>마이티북스보다 다른 방식이 적합한 경우</h2>
        <Subsection title="인쇄용 파일이 이미 완성된 경우"><p>수정이 필요 없는 표지·내지 PDF가 있다면 인쇄소가 경제적일 수 있습니다.</p></Subsection>
        <Subsection title="한 장짜리 리플릿이 필요한 경우"><p>내용이 적고 간단한 배포물이라면 소책자보다 리플릿이나 전단이 적합할 수 있습니다.</p></Subsection>
        <Subsection title="대규모 광고 캠페인이 필요한 경우"><p>브랜드 전략, 광고 영상과 미디어 집행까지 필요하면 종합광고대행사를 검토해야 합니다.</p></Subsection>
        <Subsection title="고도의 데이터 시각화가 핵심인 경우"><p>복잡한 통계 시각화가 핵심이면 전문 데이터 시각화 디자이너가 더 적합할 수 있습니다.</p></Subsection>
        <Subsection title="극히 짧은 긴급 납품이 필요한 경우"><p>취합·결재 전 긴급 인쇄는 정상적인 교정이 어렵습니다. 간단한 배포 자료를 먼저 만들고 정식 책자를 별도로 제작하는 방식을 검토할 수 있습니다.</p></Subsection>
        <Subsection title="대량 인쇄 단가가 가장 중요한 경우"><p>수만 부 인쇄가 중심이고 편집이 끝났다면 대량 설비를 갖춘 인쇄 업체를 비교하는 편이 적합합니다.</p></Subsection>
      </section>

      <section className={styles.section}><h2>상담 전에 준비하면 좋은 자료</h2><BulletList items={preparation} /><p>자료가 취합 중이라면 현재 확보된 자료와 앞으로 추가될 자료 종류를 함께 알려 주는 것이 좋습니다.</p></section>
      <section className={styles.section}><h2>마이티북스의 실제 제작 경험</h2><p>마이티북스는 기관에서 취합한 교육 결과물과 현장 자료를 책자 형태로 정리한 경험이 있습니다. 주요 사례로는 삼국유사군위도서관의 교육 후기 모음집, 하안노인종합복지관의 교육 결과물로 제작한 공저 시집, KT서비스남부지사의 현장 교육 자료가 있습니다.</p><p>기관별로 전달된 원고와 사진, 교육 자료의 형식을 정리하고, 각 제작물의 독자와 활용 목적에 맞는 목차와 내지 구조로 제작했습니다.</p></section>
      <section className={styles.section}><h2>자주 묻는 질문</h2><div className={styles.faqList}>{faqItems.map(([q,a])=><details key={q}><summary>{q}</summary><p>{a}</p></details>)}</div></section>
      <section className={styles.section}><h2>기관·기업 소책자 제작을 시작하려면</h2><p>담당자를 정하고 내부 수정·승인 절차를 마련한 뒤, 인쇄 전에 기관명, 사람 이름, 수치, 연락처와 개인정보를 발행 기관에서 최종 확인해야 합니다.</p></section>
      <div className={styles.cta}><div className={styles.ctaText}>전체 원고와 자료, 예상 수량과 납품 일정을 전달하면 필요한 작업과 제작 가능 여부를 검토할 수 있습니다.</div><div className={styles.ctaBtns}><Link href="/business/booklet" className={styles.ctaBtn}>기관·기업 소책자 제작 서비스 보기</Link><Link href="/business/booklet#booklet-preview" className={styles.ctaBtnGhost}>소책자 제작 사례 보기</Link><Link href="/support/diagnosis" className={styles.ctaBtnGhost}>현재 자료로 제작 가능한지 상담하기</Link></div></div>
    </main>
  </div>
}
