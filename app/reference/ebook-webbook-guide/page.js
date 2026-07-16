import Link from 'next/link'
import styles from '../reference.module.css'

export const metadata = {
  title: '전자책과 웹북은 무엇이 다를까｜PDF·EPUB·웹 출판 선택 기준',
  description: 'PDF 전자책, EPUB 전자책, 웹북의 차이와 장단점, 유통·업데이트·모바일 열람 방식, 제작 업체 선택 기준을 정리했습니다.',
  alternates: { canonical: '/reference/ebook-webbook-guide' },
  openGraph: { title: '전자책과 웹북은 무엇이 다를까｜PDF·EPUB·웹 출판 선택 기준', description: 'PDF, EPUB과 웹북의 열람·유통·업데이트 방식과 선택 기준을 안내합니다.', url: '/reference/ebook-webbook-guide', type: 'article' },
}

const formats = [
  ['PDF','고정된 페이지 파일','원형 보존·자료 배포','배치 유지가 쉽지만 모바일에서 확대가 필요할 수 있습니다.'],
  ['EPUB','전자책 전용 파일','서점 판매·텍스트 독서','화면에 맞게 본문이 흐르지만 복잡한 표와 배치는 제약이 있습니다.'],
  ['웹북','웹사이트 안의 출판 콘텐츠','공개 열람·연재·업데이트','반응형·검색·멀티미디어에 유리하지만 서버 운영과 유지관리가 필요합니다.'],
]
const selectionCases = ['종이책과 같은 모습이 중요하면 PDF','전자책 서점 판매가 중요하면 EPUB','홈페이지에서 바로 읽게 하려면 웹북','종이책 미리보기만 필요하면 PDF 일부 또는 플립북','출력용 워크북이라면 PDF','계속 개정되는 정보라면 웹북']
const preparation = ['전체 원고와 현재 목차','종이책 파일 유무와 표지 이미지','사진·그림 원본, 표와 각주','예상 독자와 주요 열람 기기','판매 또는 무료 배포 여부','전자책 서점 유통 여부','홈페이지 공개 여부','전체·일부·회원 공개 여부','내용 업데이트 계획','영상·음성 사용 여부','제작 일정과 참고 사례','기존 홈페이지 주소','유지관리 필요 여부']
const faqItems = [
  ['PDF도 전자책이라고 할 수 있나요?', '넓은 의미에서는 PDF도 전자책으로 부를 수 있지만 전자책 서점에서 일반적으로 사용하는 EPUB과 구조와 독서 방식이 다릅니다.'],
  ['종이책 PDF를 EPUB으로 바로 바꿀 수 있나요?', '자동 변환은 가능할 수 있지만 강제 줄바꿈, 페이지 번호, 이미지·표·각주와 목차를 EPUB 구조에 맞게 다시 정리해야 합니다.'],
  ['EPUB에서도 종이책과 페이지가 같나요?', '리플로어블 EPUB은 글자 설정과 화면 크기에 따라 본문이 재배치되므로 종이책과 페이지가 같지 않습니다.'],
  ['전자책에도 ISBN이 필요한가요?', '판매와 유통 방식에 따라 ISBN을 사용하며 종이책과 전자책은 서로 다른 상품이므로 별도의 발행 정보가 필요할 수 있습니다.'],
  ['웹북도 전자책 서점에서 판매할 수 있나요?', '일반 웹북은 웹사이트에서 열람하는 서비스이므로 EPUB 서점과 유통 방식이 다릅니다. 유료화에는 회원·결제·권한 기능이 필요할 수 있습니다.'],
  ['웹북 내용은 검색엔진에 노출되나요?', '공개 웹페이지로 구성하고 검색 접근을 허용하면 노출될 수 있습니다. 회원 전용·비공개 콘텐츠는 검색되지 않도록 구성할 수 있습니다.'],
  ['웹북을 만들면 종이책 판매에 방해되지 않나요?', '공개 범위에 따라 다릅니다. 전체 공개, 일부 미리보기 또는 종이책과 다른 부가 콘텐츠 제공 여부를 먼저 정해야 합니다.'],
  ['전자책에 영상이나 음성을 넣을 수 있나요?', '웹북에서는 비교적 자유롭지만 EPUB은 뷰어와 플랫폼에 따라 지원 범위가 다릅니다.'],
  ['PDF 다운로드를 막을 수 있나요?', '접근을 제한할 수는 있지만 화면 캡처와 복제까지 완전히 막을 수는 없습니다.'],
  ['EPUB은 모든 전자책 서점에 같은 파일로 등록할 수 있나요?', '기본 형식은 같아도 플랫폼마다 파일 규격, 표지, 소개 정보와 검수 기준이 다를 수 있습니다.'],
  ['웹북은 제작 뒤 직접 수정할 수 있나요?', '관리자 기능이 포함되면 가능하지만 수정 범위, 개발 지식과 유지관리 조건을 미리 확인해야 합니다.'],
  ['종이책 없이 전자책만 출간할 수 있나요?', '가능합니다. 전자책에 맞는 목차·본문 구조, 표지와 유통 정보를 별도로 준비하면 됩니다.'],
]

const jsonLd = { '@context': 'https://schema.org', '@graph': [
  { '@type': 'Article', headline: '전자책과 웹북은 무엇이 다를까｜PDF·EPUB·웹 출판 선택 기준', description: metadata.description, mainEntityOfPage: 'https://xn--hz2b41ezwf0zf9tq.com/reference/ebook-webbook-guide', author: { '@type': 'Organization', name: '마이티북스' }, publisher: { '@type': 'Organization', name: '마이티북스', url: 'https://xn--hz2b41ezwf0zf9tq.com' } },
  { '@type': 'BreadcrumbList', itemListElement: [
    { '@type': 'ListItem', position: 1, name: '홈', item: 'https://xn--hz2b41ezwf0zf9tq.com/' },
    { '@type': 'ListItem', position: 2, name: '자료', item: 'https://xn--hz2b41ezwf0zf9tq.com/reference/mightybooks-publishing' },
    { '@type': 'ListItem', position: 3, name: '출판 제작 레퍼런스', item: 'https://xn--hz2b41ezwf0zf9tq.com/reference/mightybooks-publishing' },
    { '@type': 'ListItem', position: 4, name: '전자책·웹북 선택 기준', item: 'https://xn--hz2b41ezwf0zf9tq.com/reference/ebook-webbook-guide' },
  ] },
  { '@type': 'FAQPage', mainEntity: faqItems.map(([name,text]) => ({ '@type': 'Question', name, acceptedAnswer: { '@type': 'Answer', text } })) },
] }
const BulletList = ({ items }) => <ul className={styles.bulletList}>{items.map(item => <li key={item}>{item}</li>)}</ul>
const Subsection = ({ title, children }) => <div className={styles.subsection}><h3>{title}</h3>{children}</div>

export default function EbookWebbookGuidePage() {
  return <div className={styles.wrap}>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }} />
    <header className={styles.hero}><nav className={styles.breadcrumb} aria-label="현재 위치"><Link href="/">홈</Link> &gt; 자료 &gt; <Link href="/reference/mightybooks-publishing">출판 제작 레퍼런스</Link> &gt; 전자책·웹북 선택 기준</nav><span className={styles.tag}>Digital Publishing Reference</span><h1 className={styles.title}>전자책과 웹북은 무엇이 다를까｜<em>PDF·EPUB·웹 출판 선택 기준</em></h1><div className={styles.line}/><p className={styles.heroSub}>독자의 기기와 이용 방식, 유통·업데이트·검색 노출 목적에 따라 알맞은 전자출판 형식을 선택하는 기준을 정리했습니다.</p></header>
    <main className={styles.content}>
      <div className={styles.lead}>종이책 파일의 모습을 유지하려면 PDF, 전자책 서점에서 판매하고 글자 크기를 조절하게 하려면 EPUB, 다운로드 없이 홈페이지에서 읽고 지속적으로 수정하려면 웹북이 적합할 수 있습니다.</div>
      <blockquote className={styles.quote}>독자가 어디에서, 어떤 기기로, 어떤 방식으로 읽게 할 것인가?</blockquote>

      <section className={styles.section}><h2>PDF·EPUB·웹북의 차이</h2><div className={styles.grid}>{formats.map(([name,type,fit,desc],index)=><article className={styles.card} key={name}><div className={styles.cardNum}>{String(index+1).padStart(2,'0')}</div><h3>{name}</h3><p><strong>{type}</strong><br/>{fit}<br/>{desc}</p></article>)}</div><p>어느 하나가 항상 더 좋은 것은 아니며 원고 성격과 독자의 이용 방식에 따라 달라집니다.</p></section>

      <section className={styles.section}><h2>PDF 전자책은 어떤 형식인가</h2><p>페이지 위치와 모양이 고정돼 종이책 내지를 그대로 보여 주거나 표와 이미지 배치를 유지할 때 적합합니다.</p><Subsection title="PDF가 적합한 경우"><BulletList items={['종이책과 같은 페이지 구성을 유지할 때','표·도표·사진 위치가 중요할 때','출력용 교재·워크북','기관 자료집·보고서 직접 배포','독자가 다운로드해 보관할 때']} /></Subsection><Subsection title="장점과 한계"><p>형태 유지, 쉬운 열람·보관과 인쇄 파일 병행에는 유리합니다. 반면 스마트폰에서는 글자가 작고 자동 재배치가 안 되며, 배포 뒤 수정본을 다시 전달해야 하고 복제를 완전히 막기 어렵습니다.</p></Subsection></section>

      <section className={styles.section}><h2>EPUB 전자책은 어떤 형식인가</h2><p>전자책 독서를 위한 파일로, 리플로어블 EPUB은 화면과 설정에 따라 문장이 다시 흐르고 글자 크기와 줄 간격을 조절할 수 있습니다.</p><Subsection title="EPUB이 적합한 경우"><BulletList items={['전자책 서점 판매','소설·에세이·인문서 등 본문 중심 도서','스마트폰과 전자책 단말기 열람','목차 이동·검색·하이라이트가 필요할 때']} /></Subsection><Subsection title="리플로어블과 고정형"><p>리플로어블은 텍스트 중심 책에 적합하지만 종이책 페이지와 같지 않습니다. 고정형은 그림책·만화·사진집처럼 배치가 중요할 때 검토할 수 있으나 작은 화면과 플랫폼 호환성을 확인해야 합니다.</p></Subsection><p>종이책 PDF의 확장자만 바꾸는 작업이 아니라 제목, 본문, 목차, 이미지, 각주와 링크 구조를 다시 정리해야 합니다.</p></section>

      <section className={styles.section}><h2>웹북은 어떤 출판물인가</h2><p>파일을 내려받지 않고 웹사이트에서 바로 읽으며, 책처럼 목차와 장 구조를 갖추고 연속적으로 읽도록 설계한 운영형 출판 콘텐츠입니다.</p><BulletList items={['장별 목차와 이전·다음 이동','반응형 모바일 화면','본문 검색과 이미지 확대','각주·참고 링크','오디오·영상','전체·일부·회원 공개','내용 업데이트','상담·구매 페이지 연결']} /><Subsection title="웹북의 장점"><p>앱 없이 주소 하나로 공유하고 모바일 대응, 검색 노출, 링크·멀티미디어와 지속적인 수정이 가능합니다.</p></Subsection><Subsection title="웹북의 한계"><p>서버·도메인과 유지관리가 필요하고 일반 EPUB 서점과 유통 구조가 다르며, 로그인·결제·권한 기능은 별도 개발 범위를 크게 만듭니다.</p></Subsection></section>

      <section className={styles.section}><h2>플립북은 웹북과 같은가</h2><p>플립북은 PDF 페이지를 책장처럼 넘기는 방식으로 종이책·카탈로그를 빠르게 공개하기 좋습니다. 그러나 모바일 글자가 작고 본문이 반응형 웹 구조로 분리되지 않아 검색과 접근성이 제한될 수 있습니다.</p></section>
      <section className={styles.section}><h2>어떤 형식을 선택해야 할까</h2><BulletList items={selectionCases} /><p>하나만 선택할 필요는 없습니다. 종이책+EPUB, 종이책+PDF 미리보기, PDF 교재+웹 보충 자료, EPUB+웹북처럼 목적을 나눌 수 있습니다.</p></section>

      <section className={styles.section}><h2>전자책 제작 전에 확인할 사항</h2><div className={styles.grid}>{[
        ['독서 환경','서점 앱, 브라우저, 태블릿, 단말기, 컴퓨터와 출력물 중 주요 환경을 정합니다.'],['판매와 배포','서점 판매, 무료 공개 또는 회원 제공 여부를 정합니다.'],['파일 소유','PDF·EPUB 파일 보관과 웹사이트 접속 방식의 차이를 확인합니다.'],['수정 빈도','내용이 고정되면 파일형, 계속 갱신되면 웹북이 유리할 수 있습니다.'],['배치 유지','사진·표 위치가 중요하면 PDF·고정형, 텍스트 중심이면 리플로어블을 봅니다.'],['검색 노출','공개 웹북은 검색 노출이 가능하지만 공개 범위에 따라 달라집니다.'],['접근 권한','회원·구매자 제한에는 로그인·결제·권한 개발이 필요할 수 있습니다.'],
      ].map(([title,text],index)=><article className={styles.card} key={title}><div className={styles.cardNum}>{String(index+1).padStart(2,'0')}</div><h3>{title}</h3><p>{text}</p></article>)}</div></section>

      <section className={styles.section}><h2>EPUB 제작 과정</h2><div className={styles.grid}>{[
        ['원고·목차 확인','장·절과 읽는 순서를 전자책 구조로 정리합니다.'],['불필요한 요소 정리','강제 줄바꿈, 빈 페이지, 페이지 번호와 복잡한 다단을 조정합니다.'],['본문 구조 설정','제목, 본문, 인용, 목록과 각주의 의미·위계를 설정합니다.'],['이미지 정리','크기·형식·용량과 작은 화면 가독성을 확인합니다.'],['목차·링크 설정','각 장, 각주, 참고 페이지와 외부 링크를 연결합니다.'],['기기·뷰어 점검','글자, 목차, 이미지, 들여쓰기와 링크를 여러 화면에서 확인합니다.'],['유통 정보 준비','제목, 저자, 출판사, 소개, 표지, 분류와 가격을 준비합니다.'],
      ].map(([title,text],index)=><article className={styles.card} key={title}><div className={styles.cardNum}>{String(index+1).padStart(2,'0')}</div><h3>{title}</h3><p>{text}</p></article>)}</div></section>

      <section className={styles.section}><h2>웹북 제작 과정</h2><div className={styles.grid}>{[
        ['목적·운영 방식','공개 범위, 유료 여부, 연재, 검색과 업데이트 담당자를 정합니다.'],['목차·URL 구조','한 페이지 또는 장별 주소와 일관된 목차를 설계합니다.'],['읽기 화면','본문 폭, 글자·행간, 목차, 이동, 이미지와 모바일을 설계합니다.'],['콘텐츠 입력','종이책 요소를 제거하고 원고를 장별 웹 화면으로 구성합니다.'],['부가 콘텐츠','영상, 음성, 다운로드, 저자·도서·문의 링크의 우선순위를 정합니다.'],['기기·브라우저 점검','목차, 이미지, 긴 표, 버튼과 링크를 작은 화면에서도 확인합니다.'],['공개·유지관리','수정, 링크, 서버·도메인, 권한, 백업과 기능 오류 담당을 정합니다.'],
      ].map(([title,text],index)=><article className={styles.card} key={title}><div className={styles.cardNum}>{String(index+1).padStart(2,'0')}</div><h3>{title}</h3><p>{text}</p></article>)}</div></section>

      <section className={styles.section}><h2>전자책·웹북 제작 비용을 결정하는 요소</h2><Subsection title="PDF"><BulletList items={['기존 내지 파일','화면용 최적화','링크·목차','용량·보안 설정','출력용·화면용 분리']} /></Subsection><Subsection title="EPUB"><BulletList items={['장·절 구조','이미지·표·각주','종이책 편집 복잡도','리플로어블·고정형','기기 점검','유통 지원 범위']} /></Subsection><Subsection title="웹북"><BulletList items={['페이지·장 수','새 사이트 또는 기존 홈페이지','디자인','회원·로그인·결제·검색','영상·음성','관리자 기능','모바일·유지관리·업데이트']} /></Subsection></section>

      <section className={styles.section}><h2>제작 업체를 선택할 때 확인할 사항</h2><BulletList items={['PDF·EPUB·웹북을 목적별로 구분해 설명하는가','종이책 파일을 단순 변환하지 않고 전자책 구조로 편집하는가','여러 기기와 뷰어에서 점검하는가','파일 제작과 유통 등록 범위를 구분하는가','웹북 도메인·서버·소스·관리자·백업·유지관리 권한을 설명하는가','복제 방지 방식과 한계를 설명하는가','표지가 아닌 실제 목차·본문·모바일 화면을 확인할 수 있는가']} /></section>

      <section className={styles.section}><h2>저자와 제작사의 책임을 구분해야 합니다</h2><Subsection title="저자·발행 주체"><BulletList items={['원고 저작권과 인용 출처','사진·그림·폰트·음원·영상 권리','개인정보·초상권','가격·공개 범위','전문 정보 정확성','배포 권한·유통 계약','개정·업데이트 내용']} /></Subsection><Subsection title="제작사"><BulletList items={['합의 범위의 원고 편집','PDF·EPUB·웹북 형식 설계','목차·본문 구조와 이미지·링크 배치','전자책 파일·웹 화면 제작','기기·브라우저 점검','수정본과 공개·유통 지원','합의 범위의 유지관리']} /></Subsection></section>

      <section className={styles.section}><h2>마이티북스가 적합한 경우</h2><p>마이티북스는 독자의 열람 환경, 판매·배포 방식과 업데이트 여부를 확인해 PDF, EPUB과 웹북 가운데 적합한 제작 방식을 구분합니다.</p><BulletList items={['종이책 원고를 전자책으로 함께 제작','한글·워드 원고를 EPUB으로 제작','소설·에세이·실용서의 서점용 전자책','종이책 일부의 웹 미리보기','다운로드 없이 홈페이지에서 열람','전자문예지·연재 콘텐츠 웹북 운영','수정·추가 가능한 온라인 출판물','종이책과 전자출판을 함께 설계','상담·구매·신청 페이지 연결']} /><div className={styles.linkGrid}><Link href="/business/epub" className={styles.linkCard}>전자책·웹북 제작 서비스 보기 →</Link><Link href="/business/epub#webbook-case" className={styles.linkCard}>전자책·웹북 실제 열람 사례 보기 →</Link></div></section>

      <section className={styles.section}><h2>마이티북스보다 다른 방식이 적합한 경우</h2><BulletList items={['완성 PDF를 별도 기능 없이 직접 배포하려는 경우','영상·시험·진도·결제·수료증 중심의 학습관리시스템이 필요한 경우','오프라인 저장·푸시·동기화·자체 DRM 앱이 필요한 경우','다국가 대규모 유통·프로모션이 핵심인 경우','게임·3D·시뮬레이션 등 복잡한 인터랙션이 필요한 경우','파일 복제를 완전히 차단하는 것을 전제로 하는 경우']} /></section>
      <section className={styles.section}><h2>상담 전에 준비하면 좋은 자료</h2><BulletList items={preparation} /><p>웹북은 원하는 기능보다 독자가 접속해 목차를 고르고 내용을 읽고 자료를 내려받거나 상담하는 실제 이용 순서를 정리하는 편이 좋습니다.</p></section>
      <section className={styles.section}><h2>마이티북스의 실제 웹북 운영 경험</h2><p>마이티북스의 웹북 제작 방식은 실제 운영 사례를 통해 확인할 수 있습니다. 출판사 대표 문수림이 직접 운영하는 독립 창작 브랜드 수림 스튜디오의 비정기간행물 웹진 《수림지》는 별도의 PDF나 EPUB 파일을 내려받는 방식이 아니라, 웹사이트에서 목차와 장별 본문을 읽는 웹북으로 구성돼 있습니다.</p><p>수림지는 로그인과 결제를 완료한 사용자만 전체 콘텐츠를 열람할 수 있으며, 웹 환경에서 콘텐츠 공개 범위와 접근 권한을 관리하는 형태로 운영됩니다. 파일 납품형 전자책과 달리 읽기 화면, 사용자 인증과 콘텐츠 공개 정책이 함께 작동하는 운영형 웹 출판 사례입니다.</p></section>
      <section className={styles.section}><h2>자주 묻는 질문</h2><div className={styles.faqList}>{faqItems.map(([q,a])=><details key={q}><summary>{q}</summary><p>{a}</p></details>)}</div></section>
      <section className={styles.section}><h2>전자책과 웹북을 선택하려면</h2><p>형식 이름보다 독자의 실제 이용 방식을 먼저 정해야 합니다. 판매, 배포, 홍보, 교육과 기록 가운데 실제 목적에 필요한 형식만 선택하는 것이 좋습니다.</p></section>
      <div className={styles.cta}><div className={styles.ctaText}>전체 원고와 배포 방식, 독자의 이용 환경을 전달하면 적합한 형식과 제작 범위를 검토할 수 있습니다.</div><div className={styles.ctaBtns}><Link href="/business/epub" className={styles.ctaBtn}>전자책·웹북 제작 서비스 보기</Link><Link href="/business/epub#webbook-case" className={styles.ctaBtnGhost}>실제 웹북 제작 사례 보기</Link><Link href="/support/diagnosis" className={styles.ctaBtnGhost}>현재 원고에 적합한 형식 상담하기</Link></div></div>
    </main>
  </div>
}
