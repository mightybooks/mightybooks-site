'use client'

import { useState } from 'react'
import { EMAIL_ADDRESS, KAKAO_URL, PhoneConsultModal } from '../components/ServiceContactCta'
import styles from './epub.module.css'

const formats = [
  { name: 'EPUB 전자책', label: 'REFLOWABLE', summary: '전자책 서점과 전용 뷰어에서 읽는 표준 전자책 형식입니다.', features: ['글자 크기 조절', '화면에 따른 본문 자동 재배치', '목차와 내부 링크', '모바일·태블릿·전자책 단말기 지원', '전자책 서점 유통용 파일 제작', '텍스트 중심 도서에 적합'], fit: '소설, 에세이, 시집, 실용서, 전문서적과 텍스트 중심 개인 저서', caution: '뷰어에 따라 줄바꿈과 페이지가 달라집니다. 복잡한 표·도표는 제작 가능 여부를 먼저 확인하며 서점 등록은 각 유통사 정책과 심사에 따릅니다.' },
  { name: 'PDF 전자책', label: 'FIXED LAYOUT', summary: '인쇄물의 판형과 디자인을 고정된 형태로 유지하는 전자 문서입니다.', features: ['표지와 내지 디자인 유지', '페이지 단위 고정 구성', '표·도표·사진 배치 유지', '다운로드와 직접 배포', '인쇄책과 병행 제작', '교재·워크북·자료집에 적합'], fit: '강의 교재, 워크북, 교육 자료, 기관 자료집, 사진집과 이미지 중심 실용서', caution: '모바일에서 글자가 작게 보일 수 있고 본문이 자동 재배치되지 않습니다. 복제와 화면 캡처를 완전히 차단할 수는 없습니다.' },
  { name: '웹북', label: 'RESPONSIVE WEB', summary: '파일을 내려받지 않고 웹브라우저에서 바로 읽는 디지털 책입니다.', features: ['모바일·태블릿·PC 지원', 'URL 접근과 반응형 독서 화면', '장·절, 목차와 이전·다음 이동', '이미지·영상·음원·링크', '내용 수정과 업데이트', '공개·비공개 확장 상담'], fit: '디지털 매거진, 연재형 콘텐츠, 온라인 교재, 멀티미디어 콘텐츠와 독립 웹 출판', caution: '회원·구매자 인증, 결제와 관리자 기능은 기본 제작이 아닌 별도 개발 범위입니다.' },
]
const recommendations = [
  ['EPUB이 적합한 경우', ['전자책 서점에서 판매', '글자 크기를 조절하며 열람', '소설·에세이·실용서 등 텍스트 중심', '전자책 단말기와 앱에서 열람']],
  ['PDF가 적합한 경우', ['인쇄책 디자인 유지', '표·도표·사진과 고정 레이아웃 중시', '교재·워크북·자료집 직접 배포', '인쇄용 도서와 전자 자료 병행']],
  ['웹북이 적합한 경우', ['다운로드 없이 브라우저에서 열람', '모바일·PC 반응형 화면', '영상·음원·링크 제공', '지속적인 내용 업데이트', '회원 전용 콘텐츠로 확장', '독립 디지털 출판 운영']],
]
const basicWebbook = ['공개형 웹페이지', '반응형 독서 화면', '표지 또는 시작 화면', '목차와 장·절 본문', '이전·다음 이동', '이미지와 캡션', '영상·음원·외부 링크 삽입', '기존 홈페이지 경로 게시', '기본 검색엔진 공개 설정', '모바일·태블릿·PC 대응']
const extendedWebbook = ['회원가입과 로그인', '구매자 인증과 결제 연동', '회원·구매자 전용 열람', '회차별·장별 공개 설정', '관리자 콘텐츠 등록 화면', '열람 권한과 이용 기록', '구독·진행률·검색', '북마크·메모·댓글', '다국어 기능', '별도 도메인과 독립 사이트', '콘텐츠 관리 시스템']
const sourceMaterials = ['한글·워드 원고', '인디자인 편집 파일', '인쇄용 PDF', '기존 종이책', '이미지와 사진 자료', '표와 도표', '기존 홈페이지 콘텐츠', '블로그나 연재 원고']
const scopes = [
  ['공통 작업', ['원고와 자료 검토', '형식 선택 상담', '목차와 본문 구조', '오탈자와 표기 확인', '이미지와 캡션', '내부 링크', '기기별 화면 확인', '최종 결과물 검수']],
  ['EPUB 제작', ['리플로어블 EPUB', '목차·내부 링크·장절 구조', '표지 이미지와 메타데이터', '전자책 뷰어 테스트', '유통용 파일 점검']],
  ['PDF 제작', ['고정형 페이지 구성', '표지·내지 디자인 유지', '열람용 용량 최적화', '링크 삽입', '인쇄용과 별도 출력', '배포용 파일 점검']],
  ['웹북 제작', ['반응형 독서 화면', '표지·목차·장절 페이지', '이전·다음 이동', '멀티미디어와 링크', '공개 범위 설정', '기존 사이트 경로 연결', '기기별 테스트']],
]
const extraScope = ['원고 신규 작성', '대량 윤문', '복잡한 표·수식 재구성', '대량 이미지 보정', '일러스트·영상·음원 제작', '전자책 유통 대행', 'DRM 적용', '회원·결제 시스템', '관리자 페이지', '별도 웹사이트 개발', '서버·도메인 비용', '지속적인 운영·유지보수']
const process = [['01','제작 상담','원고, 독자, 배포 방식, 판매 여부와 필요한 형식을 확인합니다.'],['02','원고·자료 검토','텍스트, 이미지, 표, 도표와 편집 파일 상태를 확인합니다.'],['03','형식과 범위 결정','EPUB, PDF, 웹북 중 적합한 형식과 기능을 정합니다.'],['04','견적·일정 확정','분량, 디자인, 멀티미디어, 웹 기능과 유통 범위로 확정합니다.'],['05','전자책·웹북 제작','본문 구조, 디자인, 링크와 독서 화면을 구성합니다.'],['06','검수와 수정','뷰어, PDF와 기기별 웹브라우저에서 결과물을 확인합니다.'],['07','납품 또는 웹 게시','파일을 납품하거나 계약한 홈페이지 경로에 웹북을 게시합니다.']]
const checklist = ['콘텐츠 종류와 원고 파일 형식', '원고 분량과 이미지·표·도표 수량', '원하는 제작 형식', '전자책 서점 유통·다운로드 배포 여부', '웹북 공개 범위와 기존 홈페이지 여부', '회원·구매자 인증 필요 여부', '영상·음원·외부 링크 포함 여부', '희망 완료일과 예상 예산', '참고 전자책 또는 웹사이트']
const faqs = [
  ['EPUB과 PDF는 무엇이 다른가요?', 'EPUB은 글자와 화면 크기에 따라 본문이 재배치됩니다. PDF는 인쇄책처럼 페이지 디자인과 배치를 고정합니다.'],
  ['웹북은 일반 홈페이지와 무엇이 다른가요?', '웹북은 표지, 목차, 장·절, 이전·다음 이동과 본문 화면을 책 읽는 흐름에 맞춘 웹 출판물입니다.'],
  ['기존 종이책을 전자책으로 만들 수 있나요?', '가능합니다. 원고나 편집 파일이 있으면 더 안정적이며, 종이책이나 인쇄용 PDF만 있으면 텍스트와 이미지 재정리가 필요할 수 있습니다.'],
  ['EPUB 파일을 전자책 서점에 등록할 수 있나요?', '유통 기준에 맞는 EPUB 제작이 가능합니다. 실제 등록과 판매 조건은 각 유통사의 정책과 심사에 따릅니다.'],
  ['PDF의 복사와 재배포를 막을 수 있나요?', '기본 보안 설정은 가능하지만 파일 복제와 화면 캡처를 완전히 차단할 수 없습니다. 강한 제한은 별도 인증 시스템을 검토해야 합니다.'],
  ['웹북을 회원에게만 공개할 수 있나요?', '가능하지만 회원가입, 로그인, 구매자 인증과 권한 관리는 별도 개발 범위입니다.'],
  ['웹북에 영상과 음원을 넣을 수 있나요?', '가능합니다. 직접 업로드 또는 외부 플랫폼 연결이 가능하며 용량, 저작권과 호스팅 방식을 확인해야 합니다.'],
  ['웹북 내용은 나중에 수정할 수 있나요?', '가능합니다. 다만 지속적인 수정과 운영은 계약 범위 또는 별도 유지보수 조건에 따릅니다.'],
  ['EPUB, PDF와 웹북을 모두 만들 수 있나요?', '가능합니다. 각 형식의 구조와 편집 방식이 달라 제작 범위와 비용은 별도로 산정합니다.'],
]
const breadcrumbJsonLd = { '@context':'https://schema.org','@type':'BreadcrumbList',itemListElement:[{'@type':'ListItem',position:1,name:'홈',item:'https://xn--hz2b41ezwf0zf9tq.com/'},{'@type':'ListItem',position:2,name:'출판서비스',item:'https://xn--hz2b41ezwf0zf9tq.com/business/epub'},{'@type':'ListItem',position:3,name:'전자책·웹북 제작',item:'https://xn--hz2b41ezwf0zf9tq.com/business/epub'}] }
const serviceJsonLd = { '@context':'https://schema.org','@type':'Service',name:'전자책·웹북 제작',provider:{'@type':'Organization',name:'마이티북스',url:'https://xn--hz2b41ezwf0zf9tq.com/'},areaServed:'대한민국',url:'https://xn--hz2b41ezwf0zf9tq.com/business/epub' }
const faqJsonLd = { '@context':'https://schema.org','@type':'FAQPage',mainEntity:faqs.map(([name,text])=>({'@type':'Question',name,acceptedAnswer:{'@type':'Answer',text}})) }

function ContactButtons() { const [open,setOpen]=useState(false); return <><div className={styles.contactRow}><a href={KAKAO_URL} target="_blank" rel="noopener noreferrer" className={styles.ctaBtn}>오픈채팅 문의</a><button type="button" className={styles.ctaBtnGhost} onClick={()=>setOpen(true)}>전화 문의</button><a href={`mailto:${EMAIL_ADDRESS}`} className={styles.ctaBtnGhost}>이메일 문의</a></div>{open&&<PhoneConsultModal styles={styles} onClose={()=>setOpen(false)}/>}</> }
function Header({ eyebrow,title,children }) { return <div className={styles.sectionHeader}><span>{eyebrow}</span><h2>{title}</h2>{children&&<p>{children}</p>}</div> }
function List({ items }) { return <ul className={styles.list}>{items.map(item=><li key={item}>{item}</li>)}</ul> }

export default function EpubPage(){return <main className={styles.wrap}>
  {[breadcrumbJsonLd,serviceJsonLd,faqJsonLd].map((data,i)=><script key={i} type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(data)}}/>)}
  <section className={styles.hero}><div className={styles.heroBg}/><div className={styles.heroOverlay}/><div className={styles.heroInner}><span className={styles.eyebrow}>Ebook / PDF / Web Book</span><p className={styles.heroService}>전자책 · 웹북 제작</p><h1>책을 파일로만 만들지 않고<br/><em>읽히는 방식까지 설계합니다.</em></h1><p className={styles.heroLead}>출간 목적과 독자의 이용 환경에 따라 EPUB 전자책, PDF 전자책, 웹브라우저에서 바로 읽는 웹북으로 제작합니다.</p><p className={styles.heroDesc}>전자책 서점 유통, 강의·교육 자료 배포, 독립 웹 출판과 회원 전용 콘텐츠 확장까지 목적에 맞는 제작 방식을 안내합니다.</p><div className={styles.badges}>{['EPUB 전자책 제작','PDF 전자책 제작','반응형 웹북 제작','전자책 유통용 파일','이미지·영상·링크 지원','회원·구매자 전용 열람 확장 상담'].map(x=><span key={x}>{x}</span>)}</div><ContactButtons/></div></section>

  <section id="formats" className={styles.section}><Header eyebrow="Three Formats" title={<>EPUB · PDF · 웹북을 <em>비교해 보세요</em></>}>원고의 목적과 이용 방식에 맞춰 EPUB, PDF, 웹북으로 제작합니다.</Header><div className={styles.formatGrid}>{formats.map(format=><article key={format.name}><span>{format.label}</span><h3>{format.name}</h3><p className={styles.summary}>{format.summary}</p><h4>주요 특징</h4><List items={format.features}/><h4>적합한 콘텐츠</h4><p>{format.fit}</p><div className={styles.caution}><strong>유의 사항</strong>{format.caution}</div>{format.name==='웹북'&&<p className={styles.webbookDefinition}>웹북은 책 내용을 웹페이지에 그대로 옮기는 작업이 아니라, 브라우저에서 편리하게 읽도록 목차, 본문 구조, 화면 흐름과 접근 방식을 설계하는 디지털 출판물입니다.</p>}</article>)}</div></section>

  <section className={styles.sectionAlt}><Header eyebrow="Format Guide" title={<>어떤 형식으로 <em>제작해야 할까요?</em></>}/><div className={styles.recommendGrid}>{recommendations.map(([title,items])=><article key={title}><h3>{title}</h3><List items={items}/></article>)}</div><p className={styles.centerNote}>하나의 책을 여러 형식으로 함께 제작할 수 있습니다. 각 형식은 구조와 편집 방식이 달라 단순 변환이 아닌 별도 작업이 필요할 수 있습니다.</p></section>

  <section className={styles.section}><Header eyebrow="Web Book Scope" title={<>웹북은 필요한 기능에 따라<br/><em>제작 범위가 달라집니다</em></>}/><div className={styles.twoCards}><article><span>기본 제작</span><h3>기본 웹북</h3><p>앱 설치나 다운로드 없이 브라우저에서 읽는 공개형 디지털 책입니다.</p><List items={basicWebbook}/></article><article className={styles.extended}><span>별도 개발·별도 견적</span><h3>확장형 웹북</h3><p>콘텐츠 접근 권한과 운영 기능이 필요한 프로젝트입니다.</p><List items={extendedWebbook}/></article></div><p className={styles.warning}>회원, 결제, 구매자 인증과 관리자 기능은 기본 웹북에 포함되지 않으며, 필요한 기능과 기존 홈페이지 구조를 확인한 뒤 별도 개발 견적을 안내합니다.</p></section>

  <section className={styles.sectionAlt}><div className={styles.split}><div><span className={styles.eyebrow}>Conversion</span><h2 className={styles.sectionTitle}>기존 원고와 종이책도<br/><em>전자책으로 만들 수 있습니다</em></h2><p>원본 편집 파일과 텍스트 원고가 있으면 더 안정적으로 제작할 수 있습니다. 인쇄용 PDF나 종이책만 있으면 텍스트 추출, 이미지 보정과 구조 재구성에 별도 비용이 발생할 수 있습니다.</p></div><div className={styles.chips}>{sourceMaterials.map(x=><span key={x}>{x}</span>)}</div></div></section>

  <section className={styles.section}><Header eyebrow="Production Scope" title={<>매체별 제작 범위를 <em>구분합니다</em></>}/><div className={styles.scopeGrid}>{scopes.map(([title,items])=><article key={title}><h3>{title}</h3><List items={items}/></article>)}</div><div className={styles.extra}><h3>별도 협의 작업</h3><div className={styles.chips}>{extraScope.map(x=><span key={x}>{x}</span>)}</div></div></section>

  <section className={styles.sectionAlt}><Header eyebrow="Process" title={<>전자책·웹북 제작 <em>7단계</em></>}/><div className={styles.processGrid}>{process.map(([n,t,d])=><article key={n}><span>{n}</span><h3>{t}</h3><p>{d}</p></article>)}</div></section>
  <section className={styles.section}><div className={styles.split}><div><span className={styles.eyebrow}>Before Inquiry</span><h2 className={styles.sectionTitle}>상담 전에<br/><em>알려 주세요</em></h2><p>원고 파일, 분량, 원하는 제작 형식과 이용 방식을 알려 주시면 적합한 제작 범위와 견적을 안내합니다.</p><ContactButtons/></div><List items={checklist}/></div></section>
  <section className={styles.sectionAlt}><Header eyebrow="FAQ" title={<>자주 묻는 <em>질문</em></>}/><div className={styles.faq}>{faqs.map(([q,a])=><details key={q}><summary>{q}</summary><p>{a}</p></details>)}</div></section>
  <section className={styles.finalCta}><h2>어떤 전자책 형식이 적합한지부터<br/><em>확인합니다</em></h2><p>원고의 종류, 독자의 이용 환경, 판매와 배포 방식에 맞는 EPUB, PDF 또는 웹북 제작 방식을 안내합니다.</p><ContactButtons/></section>
</main>}
