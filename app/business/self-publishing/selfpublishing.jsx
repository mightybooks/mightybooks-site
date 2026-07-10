'use client'

import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { EMAIL_ADDRESS, KAKAO_URL, PhoneConsultModal } from '../components/ServiceContactCta'
import { categories, checklist, durationFactors, faqs, fitCases, interviewSteps, manuscriptWork, process, scopes, sourceContents, uses } from './professionalBookData'
import styles from './self-publishing.module.css'

const badges = ['완성 원고 기반 제작', '자체 콘텐츠 인터뷰 제작', '평균 제작 기간 약 2개월', '필요한 출간 일정에 맞춤 진행', '편집·디자인·인쇄·출간 통합 지원', '전국 온라인 상담', '대구·경북·경남 오프라인 상담']
const breadcrumbJsonLd = { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [
  { '@type': 'ListItem', position: 1, name: '홈', item: 'https://xn--hz2b41ezwf0zf9tq.com/' },
  { '@type': 'ListItem', position: 2, name: '출판서비스', item: 'https://xn--hz2b41ezwf0zf9tq.com/business/self-publishing' },
  { '@type': 'ListItem', position: 3, name: '전문서적·전문가 브랜딩 도서·실용서·교재 제작', item: 'https://xn--hz2b41ezwf0zf9tq.com/business/self-publishing' },
] }
const serviceJsonLd = { '@context': 'https://schema.org', '@type': 'Service', name: '전문서적·전문가 브랜딩 도서·실용서·교재 제작', provider: { '@type': 'Organization', name: '마이티북스', url: 'https://xn--hz2b41ezwf0zf9tq.com/' }, areaServed: '대한민국', url: 'https://xn--hz2b41ezwf0zf9tq.com/business/self-publishing', description: '전문 지식, 강의 자료와 현장 노하우를 목적과 독자에 맞는 전문서적, 실용서와 교재로 기획·제작합니다.' }
const faqJsonLd = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: faqs.map(([name, text]) => ({ '@type': 'Question', name, acceptedAnswer: { '@type': 'Answer', text } })) }

function ContactButtons() {
  const [phoneOpen, setPhoneOpen] = useState(false)
  return <><div className={styles.contactRow}>
    <a href={KAKAO_URL} target="_blank" rel="noopener noreferrer" className={styles.ctaBtn}>오픈채팅 문의</a>
    <button type="button" className={styles.ctaBtnGhost} onClick={() => setPhoneOpen(true)}>전화 문의</button>
    <a href={`mailto:${EMAIL_ADDRESS}`} className={styles.ctaBtnGhost}>이메일 문의</a>
  </div>{phoneOpen && <PhoneConsultModal styles={styles} onClose={() => setPhoneOpen(false)} />}</>
}
function SectionHeader({ eyebrow, title, children }) { return <div className={styles.sectionHeader}><span className={styles.tag}>{eyebrow}</span><h2 className={styles.sectionTitle}>{title}</h2>{children && <p className={styles.sectionLead}>{children}</p>}</div> }
function CheckList({ items }) { return <ul className={styles.checkList}>{items.map(item => <li key={item}>{item}</li>)}</ul> }
function ProcessGrid() { return <div className={styles.processGrid}>{process.map(([num,title,text]) => <article className={styles.processCard} key={num}><span>{num}</span><h3>{title}</h3><p>{text}</p></article>)}</div> }
function FaqList() { return <div className={styles.faqList}>{faqs.map(([q,a]) => <details key={q}><summary>{q}</summary><p>{a}</p></details>)}</div> }

export default function SelfPublishingPage() {
  const refs = useRef([])
  useEffect(() => { const observer = new IntersectionObserver(entries => entries.forEach(entry => entry.isIntersecting && entry.target.classList.add(styles.visible)), { threshold: .08 }); refs.current.forEach(el => el && observer.observe(el)); return () => observer.disconnect() }, [])
  const reveal = index => el => { refs.current[index] = el }
  return <main className={styles.wrap}>
    {[breadcrumbJsonLd, serviceJsonLd, faqJsonLd].map((data,index) => <script key={index} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />)}

    <section className={styles.hero}>
      <div className={styles.heroBg} /><div className={styles.heroOverlay} />
      <div className={styles.heroInner}><div className={styles.heroContent}>
        <span className={styles.tag}>Professional Book / Practical Guide / Textbook</span>
        <p className={styles.heroService}>전문 분야 저서 · 전문가 브랜딩 도서 · 실용서 · 강의 교재</p>
        <h1 className={styles.heroTitle}>전문성과 경험을<br /><span>읽히는 책으로</span><br />만듭니다.</h1>
        <p className={styles.heroCopy}>전문 분야의 지식과 현장 경험, 강의 자료와 축적된 콘텐츠를 독자가 이해할 수 있는 한 권의 책으로 구성합니다.</p>
        <p className={styles.heroSubcopy}>완성 원고가 있다면 편집과 디자인부터 진행하고, 원고가 없더라도 자체 콘텐츠가 있다면 인터뷰로 목차와 원고를 만들 수 있습니다.</p>
        <div className={styles.badges}>{badges.map(item => <span key={item}>{item}</span>)}</div><ContactButtons />
      </div><div className={styles.heroVisual}>
        <div className={styles.indexSheet}><span>CONTENTS</span><b>01</b><p>KNOWLEDGE</p><b>02</b><p>EXPERIENCE</p><b>03</b><p>METHOD</p></div>
        <Image src="/image/home/main0052.png" alt="전문 지식과 강의 자료를 책으로 구성하는 전문서적 제작" width={620} height={420} priority />
        <div className={styles.quoteBox}><strong>원고가 없더라도 가능합니다</strong><span>인터뷰를 기반으로 시작할 수 있습니다.</span></div>
      </div></div>
    </section>

    <section className={styles.section} ref={reveal(0)}><SectionHeader eyebrow="Four Categories" title={<>어떤 전문 콘텐츠를 <em>책으로 만드나요?</em></>}>전문 분야 저서 출판, 전문가 브랜딩 도서, 실용서 출판과 강의·교육용 교재 제작을 목적에 맞게 설계합니다.</SectionHeader><div className={styles.categoryGrid}>{categories.map(([num,title,text,items]) => <article className={styles.categoryCard} key={num}><span>{num}</span><h3>{title}</h3><p>{text}</p><div>{items.map(item => <b key={item}>{item}</b>)}</div></article>)}</div></section>

    <section className={styles.duration} ref={reveal(1)}><div><span className={styles.tag}>Average Timeline</span><h2 className={styles.sectionTitle}>평균 제작 기간은<br /><em>약 2개월입니다</em></h2><p>완성 원고를 기준으로 원고 검토, 교정, 편집, 표지·내지 디자인, 교정 확인과 인쇄까지 일반적으로 약 2개월이 필요합니다.</p><strong>평균 2개월을 기준으로 진행하되, 실제 필요한 출간 일정에 맞춰 제작 계획을 조정합니다.</strong></div><div><CheckList items={durationFactors} /><p className={styles.notice}>행사, 강의 개강일, 기관 납품일 등 필요한 시점이 있다면 상담 단계에서 알려 주세요. 촉박한 일정은 원고 상태와 범위를 확인한 뒤 가능 여부를 판단합니다.</p></div></section>

    <section className={styles.sectionAlt} ref={reveal(2)}><div className={styles.split}><div><span className={styles.tag}>Completed Manuscript</span><h2 className={styles.sectionTitle}>완성된 원고가 있다면<br /><em>제작에 집중합니다</em></h2><p className={styles.sectionDesc}>저자가 작성한 내용과 구성을 존중하면서 교정, 편집, 디자인과 출간을 진행합니다.</p><p className={styles.notice}>전문 용어와 사실관계, 법률·의학·기술적 정확성은 저자가 최종 확인해야 합니다.</p></div><CheckList items={manuscriptWork} /></div></section>

    <section className={styles.section} ref={reveal(3)}><SectionHeader eyebrow="Interview Production" title={<>원고가 없어도 <em>자체 콘텐츠가 있다면</em><br />시작할 수 있습니다</>}>강의 자료, 업무 경험, 사례, 블로그 글, 영상, 연구 자료와 고유한 방법론을 인터뷰로 구조화합니다. 아무 자료 없이 주제를 임의로 만드는 대필 서비스는 아닙니다.</SectionHeader><div className={styles.split}><div><h3 className={styles.subTitle}>진행 가능한 자료</h3><div className={styles.chips}>{sourceContents.map(item => <span key={item}>{item}</span>)}</div></div><div><h3 className={styles.subTitle}>인터뷰 제작의 기본 흐름</h3><ol className={styles.numberList}>{interviewSteps.map(item => <li key={item}>{item}</li>)}</ol></div></div><div className={styles.compare}><p><strong>자서전 인터뷰</strong>삶과 기억을 중심으로 구성</p><p><strong>전문서적 인터뷰</strong>지식, 사례, 방법론과 실무 콘텐츠를 중심으로 구성</p></div><p className={styles.centerNote}>인터뷰 제작은 별도의 작업 범위와 비용이 발생할 수 있습니다.</p></section>

    <section className={styles.sectionAlt} ref={reveal(4)}><SectionHeader eyebrow="Purpose First" title={<>책을 어디에 활용할지부터 <em>설계합니다</em></>}>같은 원고라도 판매용 책, 강의 교재, 고객 배포용 책은 분량, 판형, 디자인과 인쇄 방식이 달라집니다.</SectionHeader><div className={styles.useGrid}>{uses.map((item,index) => <article key={item}><span>{String(index+1).padStart(2,'0')}</span><h3>{item}</h3></article>)}</div></section>

    <section className={styles.section} ref={reveal(5)}><SectionHeader eyebrow="Production Scope" title={<>필요한 범위만 <em>연결합니다</em></>}>기획부터 전문서적 출판, 소량 제작과 ISBN 서점 유통 상담까지 계약 범위에 맞춰 진행합니다.</SectionHeader><div className={styles.scopeGrid}>{scopes.map(([title,items],index) => <article key={title}><span>0{index+1}</span><h3>{title}</h3><CheckList items={items} /></article>)}</div><div className={styles.midCta}><ContactButtons /></div></section>

    <section id="process" className={styles.sectionAlt} ref={reveal(6)}><SectionHeader eyebrow="Process" title={<>전문서적 제작 <em>9단계</em></>}>프로젝트의 목적과 자료부터 확인하고, 저자의 전문 내용 검토를 거쳐 디자인과 출간으로 이어갑니다.</SectionHeader><ProcessGrid /></section>

    <section className={styles.section} ref={reveal(7)}><SectionHeader eyebrow="Good Fit" title={<>이런 분에게 <em>적합합니다</em></>} /><div className={styles.fitGrid}>{fitCases.map(item => <p key={item}>{item}</p>)}</div></section>

    <section className={styles.sectionAlt} ref={reveal(12)} aria-labelledby="produced-books-heading"><div className={styles.split}><div><span className={styles.tag}>Produced Books</span><h2 id="produced-books-heading" className={styles.sectionTitle}>마이티북스가 제작한<br /><em>전문·실용 도서</em></h2><p className={styles.sectionDesc}>전문 지식, 교육 콘텐츠와 현장 경험을 책의 목적과 독자에 맞춰 서로 다른 표지와 본문 구성으로 제작합니다.</p></div><div className={styles.mapFrame}><Image src="/image/home/here008.png" alt="마이티북스가 제작한 전문서적 전문가 브랜딩 도서 실용서와 교재" width={1536} height={1024} /></div></div></section>

    <section className={styles.localSection} ref={reveal(8)}><div><span className={styles.tag}>Daegu · Nationwide</span><h2 className={styles.sectionTitle}>대구에서 전국으로<br /><em>이어지는 출판 상담</em></h2><p>마이티북스는 대구를 기반으로 전문서적, 전문가 브랜딩 도서, 실용서와 강의 교재를 제작합니다. 대구·경북·경남은 오프라인 상담이 가능하며, 그 외 지역은 전화, 이메일, 카카오톡과 화상 상담으로 전국 비대면 진행합니다.</p></div><div className={styles.mapFrame}><Image src="/image/home/here009.png" alt="대구 마이티북스 본사에서 전국으로 이어지는 온오프라인 출판 상담 안내" width={1448} height={1086} /></div></section>

    <section className={styles.sectionAlt} ref={reveal(9)}><div className={styles.split}><div><span className={styles.tag}>Before Consultation</span><h2 className={styles.sectionTitle}>상담 전에<br /><em>준비해 주세요</em></h2><p className={styles.sectionDesc}>미정인 항목은 그대로 알려 주셔도 됩니다. 자료와 목표가 구체적일수록 제작 범위, 맞춤 견적과 일정을 빠르게 안내할 수 있습니다.</p><ContactButtons /></div><CheckList items={checklist} /></div></section>

    <section className={styles.section} ref={reveal(10)}><SectionHeader eyebrow="FAQ" title={<>자주 묻는 <em>질문</em></>} /><FaqList /></section>
    <section className={styles.finalCta}><span className={styles.tag}>Build Your Authority, Clearly</span><h2>축적한 전문성과 콘텐츠를<br /><em>독자가 활용할 수 있는 책으로</em></h2><p>대구 전문서적 제작부터 경북 오프라인 상담, 전국 비대면 출판 상담까지 목적과 일정에 맞춰 안내합니다.</p><ContactButtons /></section>
  </main>
}
