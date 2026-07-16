'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import BookPreviewTrigger from '../components/book-preview/BookPreviewTrigger'
import { companyBookletPreview } from '../components/book-preview/bookPreviews'
import { EMAIL_ADDRESS, KAKAO_URL, PhoneConsultModal } from '../components/ServiceContactCta'
import styles from './booklet.module.css'

const products = [
  ['기관·기업 사례집', '사업 성과와 현장 사례를 읽기 쉬운 자료집으로 정리합니다.'],
  ['사업 결과보고서', '사업 과정과 주요 결과를 표, 사진과 함께 체계적으로 구성합니다.'],
  ['행사 자료집', '세미나, 포럼과 행사의 순서와 발표 자료를 한 권으로 묶습니다.'],
  ['교육·안내 소책자', '교육 과정, 이용 방법과 사업 정보를 목적에 맞게 제작합니다.'],
  ['기념 책자', '기관의 역사, 행사와 주요 기록을 기념 간행물로 구성합니다.'],
  ['프로그램북', '공연, 전시와 행사 프로그램 정보를 보기 좋게 편집합니다.'],
  ['백서·기록집', '사업의 배경, 과정과 성과를 보존할 기록물로 정리합니다.'],
  ['협회·단체 간행물', '회원과 관계자에게 공유할 정기·비정기 간행물을 제작합니다.'],
]
const basicScope = ['원고와 자료 확인', '목차 및 페이지 구성', '기본 오탈자·표기 교정', '표·사진·도표 배치', '표지 디자인', '내지 편집디자인', '인쇄 사양 상담', '인쇄와 납품']
const extraScope = ['전체 기획', '현장 취재', '관계자 인터뷰', '원고 신규 작성', '대량의 원고 재구성', '복잡한 표와 도표 재작성', '대량 사진 보정', '일러스트 제작', '촬영·번역', '긴급 제작', '추가 수정']
const conditions = ['최종 담당자 1인 지정', '원고와 이미지 자료 일괄 전달', '수정 의견 취합 후 전달', '계약 단계에서 수정 횟수 확정', '최종 승인 이후 추가 수정은 별도 비용', '인쇄 승인 이후 변경 시 일정과 비용 재협의', '행사일·납품일이 있다면 원고 마감일 준수', '기관 내부 결재 기간을 전체 일정에 포함', '긴급 제작은 원고 확인 후 가능 여부 판단']
const process = [
  ['01', '제작 문의', '책자의 종류, 목적, 예상 페이지, 부수, 납품일과 예산을 확인합니다.'],
  ['02', '원고·자료 검토', '원고, 사진, 표, 로고와 참고 자료의 상태를 검토합니다.'],
  ['03', '범위·견적 확정', '편집, 디자인, 인쇄, 납품과 별도 작업 범위를 확정합니다.'],
  ['04', '편집·디자인', '원고를 정리하고 목적에 맞는 표지와 내지를 디자인합니다.'],
  ['05', '교정·승인', '담당자가 PDF 교정본을 확인하고 취합한 수정 의견을 전달합니다.'],
  ['06', '인쇄·납품', '최종 승인 후 인쇄하고 계약한 장소와 일정에 맞춰 납품합니다.'],
]
const checklist = ['제작하려는 책자의 종류와 사용 목적', '원고 파일 형식과 분량 또는 예상 페이지', '사진·표·도표의 수량', '희망 제작 부수와 판형', '희망 납품일과 납품 지역', '예상 예산', '기획·취재·원고 작성 필요 여부', '참고 디자인 또는 기존 간행물']
const faqs = [
  ['완성된 원고가 있어야 하나요?', '기본적으로 정리된 원고와 자료를 바탕으로 제작합니다. 기획, 취재, 인터뷰와 원고 작성이 필요하면 별도 범위와 비용을 협의합니다.'],
  ['납품 일정이 정해져 있어도 제작할 수 있나요?', '원고 상태, 페이지 수, 수정 일정과 인쇄 사양을 확인한 뒤 가능 여부를 안내합니다. 행사일이나 납품일은 문의 단계에서 먼저 알려 주세요.'],
  ['수정은 몇 번까지 가능한가요?', '수정 횟수는 계약 단계에서 확정합니다. 기관 내부 의견은 담당자가 취합해 전달하며, 확정 횟수를 초과하면 별도 비용이 발생할 수 있습니다.'],
  ['사진과 표가 많아도 가능한가요?', '가능합니다. 다만 사진 보정, 복잡한 도표 재작성과 대량의 표 편집은 작업량에 따라 별도 견적이 발생할 수 있습니다.'],
  ['인쇄와 납품까지 맡길 수 있나요?', '가능합니다. 페이지 수, 부수, 용지, 제본, 후가공과 납품지를 확인한 뒤 비용을 안내합니다.'],
  ['예산에 맞춰 제작할 수 있나요?', '예산 범위에서 판형, 페이지, 용지, 제본과 부수를 조정할 수 있습니다. 필요한 작업량과 맞지 않으면 진행 가능한 범위를 별도로 안내합니다.'],
]
const breadcrumbJsonLd = { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [
  { '@type': 'ListItem', position: 1, name: '홈', item: 'https://xn--hz2b41ezwf0zf9tq.com/' },
  { '@type': 'ListItem', position: 2, name: '출판서비스', item: 'https://xn--hz2b41ezwf0zf9tq.com/business/booklet' },
  { '@type': 'ListItem', position: 3, name: '기관·기업 소책자 제작', item: 'https://xn--hz2b41ezwf0zf9tq.com/business/booklet' },
] }
const faqJsonLd = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: faqs.map(([name,text]) => ({ '@type': 'Question', name, acceptedAnswer: { '@type': 'Answer', text } })) }

function ContactButtons() {
  const [phoneOpen, setPhoneOpen] = useState(false)
  return <><div className={styles.contactRow}>
    <a href={KAKAO_URL} target="_blank" rel="noopener noreferrer" className={styles.ctaBtn}>오픈채팅 문의</a>
    <button type="button" className={styles.ctaBtnGhost} onClick={() => setPhoneOpen(true)}>전화 문의</button>
    <a href={`mailto:${EMAIL_ADDRESS}`} className={styles.ctaBtnGhost}>이메일 문의</a>
  </div>{phoneOpen && <PhoneConsultModal styles={styles} onClose={() => setPhoneOpen(false)} />}</>
}
function SectionHeader({ eyebrow, title, children }) { return <div className={styles.sectionHeader}><span>{eyebrow}</span><h2>{title}</h2>{children && <p>{children}</p>}</div> }
function ItemList({ items }) { return <ul className={styles.itemList}>{items.map(item => <li key={item}>{item}</li>)}</ul> }
function FaqList() { return <div className={styles.faqList}>{faqs.map(([q,a]) => <details key={q}><summary>{q}</summary><p>{a}</p></details>)}<details><summary>기관·기업 소책자 제작 업체를 선택할 때 무엇을 확인해야 하나요?</summary><p>기관·기업 소책자는 디자인뿐 아니라 원고 취합, 수정 의견 관리, 내부 승인, 인쇄와 최종 납품 일정을 함께 확인해야 합니다. 여러 부서의 자료를 하나의 책자로 정리해야 한다면 편집과 디자인을 함께 진행할 수 있는 제작사를 비교하는 것이 좋습니다. <Link href="/reference/institutional-booklet-production" className={styles.textLink}>기관·기업 소책자 제작 기준 보기</Link></p></details></div> }

export default function BookletPage() {
  return <main className={styles.wrap}>
    {[breadcrumbJsonLd, faqJsonLd].map((data,index) => <script key={index} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />)}
    <section className={styles.hero}><div className={styles.heroBg} /><div className={styles.heroOverlay} /><div className={styles.heroInner}>
      <span className={styles.eyebrow}>Booklet / Report / Publication</span><p className={styles.heroService}>기관 · 기업 · 단체 소책자 제작</p>
      <h1>기관과 단체의 기록을<br /><em>목적에 맞는 책자로</em> 만듭니다.</h1>
      <p className={styles.heroLead}>사례집, 자료집, 기념 책자, 교육 소책자와 행사 간행물을 원고 정리부터 편집디자인, 인쇄와 납품까지 제작합니다.</p>
      <p className={styles.heroDesc}>기관이 보유한 원고와 자료를 기준으로 작업하며, 기획·취재·인터뷰·원고 작성이 필요한 경우 별도로 협의합니다.</p>
      <div className={styles.badges}>{['기관·기업·단체 간행물', '완성 원고·자료 기반 제작', '편집디자인·인쇄·납품', '일정과 예산에 따른 맞춤 견적'].map(item => <span key={item}>{item}</span>)}</div><ContactButtons />
    </div></section>

    <section className={styles.section}><SectionHeader eyebrow="What We Make" title={<>제작 가능한 <em>기관 간행물</em></>}>기업 사례집 제작, 사업 자료집 제작, 교육 소책자 제작과 기념 책자 제작 등 목적에 맞는 책자를 안내합니다.</SectionHeader><div className={styles.productGrid}>{products.map(([title,text]) => <article key={title}><h3>{title}</h3><p>{text}</p></article>)}</div></section>

    <section className={styles.sectionAlt}><div className={styles.twoColumn}><div><span className={styles.eyebrow}>Production Scope</span><h2 className={styles.sectionTitle}>기본 제작 범위와<br /><em>별도 작업을 구분합니다</em></h2><p className={styles.sectionDesc}>기관이 정리한 원고와 자료를 받아 기업 책자 디자인, 인쇄와 납품까지 진행하는 것이 기본입니다.</p></div><div className={styles.scopeGrid}><article><h3>기본 제작 범위</h3><ItemList items={basicScope} /></article><article className={styles.extraCard}><h3>별도 협의 작업</h3><ItemList items={extraScope} /></article></div></div></section>

    <section className={styles.conditions}><div><span className={styles.eyebrow}>Working Conditions</span><h2 className={styles.sectionTitle}>원활한 제작을 위해<br /><em>필요한 조건</em></h2><p>기관·기업 제작은 여러 부서가 참여할 수 있습니다. 일정 지연과 수정 누락을 줄이기 위해 최종 담당자를 한 명으로 지정하고 내부 의견을 취합해 전달해 주세요.</p></div><ItemList items={conditions} /></section>

    <section className={styles.section}><SectionHeader eyebrow="Process" title={<>간결한 <em>6단계 제작 과정</em></>} /><div className={styles.processGrid}>{process.map(([num,title,text]) => <article key={num}><span>{num}</span><h3>{title}</h3><p>{text}</p></article>)}</div></section>

    <section className={styles.portfolio}>
      <div>
        <span className={styles.eyebrow}>Production Portfolio</span>
        <h2 className={styles.sectionTitle}>기존 제작 경험을<br /><em>목적에 맞게 적용합니다</em></h2>
        <p>자료집, 교육자료와 행사 소책자 등 실제 제작 경험을 바탕으로 정보 구조와 인쇄 사양을 상담합니다.</p>
      </div>
      <Image src="/image/home/smallbook.png" alt="기관 기업 소책자와 자료집 제작 사례" width={1800} height={1000} />
    </section>

    <section className={styles.sectionAlt}><div className={styles.twoColumn}><div><span className={styles.eyebrow}>Before Inquiry</span><h2 className={styles.sectionTitle}>견적 문의 전에<br /><em>알려 주세요</em></h2><p className={styles.sectionDesc}>원고 분량, 예상 페이지 수, 인쇄 부수, 납품일과 예산을 알려 주시면 진행 가능 여부와 견적을 안내합니다.</p><ContactButtons /></div><ItemList items={checklist} /></div></section>

    <section className={styles.section}><SectionHeader eyebrow="FAQ" title={<>자주 묻는 <em>질문</em></>} /><FaqList /></section>
    <section id="booklet-preview" className={styles.sectionAlt} aria-label="실제 제작 소책자 내지 미리보기"><BookPreviewTrigger book={companyBookletPreview} /></section>
    <section className={styles.finalCta}><h2>제작 범위와 예산을<br /><em>먼저 확인합니다</em></h2><p>원고 분량, 페이지 수, 인쇄 부수, 납품일과 예산을 알려 주시면 작업 범위와 진행 가능 여부를 안내합니다.</p><ContactButtons /></section>
  </main>
}
