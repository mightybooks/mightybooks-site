'use client'

import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { EMAIL_ADDRESS, KAKAO_URL, PhoneConsultModal } from '../components/ServiceContactCta'
import styles from './poetry.module.css'

const badges = ['완성 원고 기반 제작', '한 권부터 소량 인쇄 가능', '에세이·산문 윤문 선택 가능', '맞춤형 표지·내지 디자인', 'ISBN·서점 유통 지원']
const bookTypes = ['개인 시집', '개인 작품집', '에세이집', '수필집', '산문집', '문학회 문집', '동호회 문집', '학교·기관 작품집', '공동 저자 문집', '가족 문집', '추모 문집', '독립출판물 형태의 개인 저서']
const manuscripts = ['한글 또는 워드로 작성한 원고', 'PDF로 정리된 원고', '문학회 회원별로 취합한 원고', '블로그나 브런치 등에 게시한 산문', '기존 회보나 소식지에 발표한 작품', '사진, 삽화, 캘리그래피가 포함된 원고']
const proofreading = ['오탈자 확인', '맞춤법과 띄어쓰기 확인', '문장부호와 표기 방식 통일', '제목, 목차, 저자명 등 서지 정보 확인', '공동 문집의 필자별 형식 통일']
const polishing = ['어색한 문장 정리', '반복 표현 정리', '문단 흐름 개선', '문체와 서술 시점 통일', '글 전체의 가독성 개선']
const smallPrint = ['개인 소장용 1권 제작', '가족·지인 증정용 소량 제작', '행사·전시용 소량 제작', '문학회 회원 배포용 제작', '온라인 판매용 제작', '서점 유통용 정식 출간']
const designs = ['정갈하고 전통적인 시집 디자인', '사진을 활용한 감성적인 표지', '일러스트레이션 중심의 표지', '캘리그래피를 활용한 디자인', '여백과 타이포그래피를 강조한 독립출판물 스타일', '특수지, 별색, 박, 형압 등 후가공 디자인', '판형과 제본 방식을 달리한 실험적인 책']

const plans = [
  { name: '베이직', price: '120만 원부터', criteria: '한 권부터 소량 제작 가능', intro: '완성된 원고를 가장 기본적인 출판 사양으로 제작하는 플랜입니다.', fit: '완성된 원고를 기본 사양의 책으로 제작하고 싶은 개인 저자에게 적합합니다.', included: ['완성 원고 확인', '기본 오탈자 및 표기 교정', '목차와 작품 순서 반영', '기본 내지 편집디자인', '기본 표지 디자인', '총 3회의 교정 및 수정', '인쇄용 최종 파일 제작', '출간 및 인쇄 제작 진행'], extra: ['에세이·산문 윤문', '사진·삽화 보정', '복잡한 도표나 특수 편집', '특수 용지 및 후가공', '추가 수정', 'ISBN 발급 및 서점 유통'] },
  { name: '스탠다드', price: '330만 원부터', criteria: '100권 이상 제작', intro: '디자인 완성도와 인쇄 품질을 높이고, 일정 수량 이상을 제작하는 플랜입니다.', fit: '독립출판물처럼 개성 있는 디자인과 더 높은 제작 완성도를 원하는 저자에게 적합합니다.', included: ['베이직 플랜의 기본 작업', '작품과 콘셉트에 맞춘 디자인 방향 설계', '필요에 따라 표지 디자인 전문 외주 인력 고용', '맞춤형 표지 디자인', '내지 레이아웃 세부 조정', '인쇄 용지와 제본 사양 상담', '인쇄 감리 및 제작 관리', '100권 이상 인쇄 제작'], extra: ['에세이·산문 윤문', '전문 일러스트레이터 고용', '사진 촬영', '특수 후가공', 'ISBN 발급 및 서점 유통', '홍보물 제작'] },
  { name: '프리미엄', price: '660만 원부터', criteria: '500부 이상 제작', intro: '대량 제작과 정식 출간, 서점 유통과 홍보 지원까지 포함하는 플랜입니다.', fit: '정식 출판물로 500부 이상 제작하고 ISBN, 서점 유통, 출간 홍보까지 함께 진행하려는 저자와 단체에 적합합니다.', included: ['스탠다드 플랜의 제작 범위', '500부 이상 인쇄 제작', 'ISBN 발급', '국립중앙도서관 및 국회도서관 납본', '국내 온라인서점 유통 등록 지원', '도서 정보 및 판매 정보 정리', '언론 보도자료 작성 및 배포 지원', '홍보용 카드뉴스 제작 지원', '온라인 판매용 도서 상세페이지 제작 지원', '출간·홍보 일정 관리'], extra: [] },
]

const process = [
  ['01', '제작 상담', '책의 종류, 원고 분량, 제작 목적, 희망 부수와 일정을 확인합니다.'], ['02', '원고 검토', '완성도, 예상 페이지, 이미지와 교정·윤문 필요 여부를 확인합니다.'], ['03', '플랜 및 견적 확정', '제작 목적에 맞는 플랜과 작업 범위를 정합니다.'], ['04', '계약 및 선금 결제', '작업 범위, 수정 횟수, 일정과 납품 조건을 계약서로 확정합니다.'], ['05', '원고 교정 및 정리', '오탈자와 표기를 교정하고 목차, 작품 배열, 필자 정보를 정리합니다.'], ['06', '표지·내지 디자인', '책의 성격과 선택한 플랜에 따라 표지와 내지를 디자인합니다.'], ['07', '교정 및 수정', '저자 또는 문집 대표자가 PDF 교정본을 확인하고 수정 요청을 전달합니다.'], ['08', '인쇄 및 출간', '승인 후 인쇄하고 플랜에 따라 ISBN, 납본, 유통, 홍보를 진행합니다.'],
]
const checklist = ['제작하려는 책의 종류', '개인 저서 또는 공동 문집 여부', '공동 문집 참여자 수', '원고 파일 형식', '원고 글자 수 또는 파일 페이지 수', '사진·삽화·캘리그래피 포함 여부', '희망 판형과 제작 부수', 'ISBN 및 서점 유통 필요 여부', '희망 제작 일정과 예상 예산', '에세이·산문 윤문 필요 여부', '선호하는 디자인 참고 자료']
const faqs = [
  ['원고가 완성되지 않아도 상담할 수 있나요?', '상담은 가능하지만, 시집·문집·에세이 제작은 완성된 원고를 기준으로 견적과 작업 일정을 확정합니다. 집필 중이라면 예상 분량과 완성 예정일을 알려 주세요.'],
  ['시를 출판사에서 고쳐 주나요?', '오탈자와 표기는 확인하지만, 시어와 행갈이 등 작품 표현은 저자의 동의 없이 수정하지 않습니다.'],
  ['에세이 문장을 다듬어 줄 수 있나요?', '가능합니다. 에세이와 산문은 희망에 따라 윤문을 추가할 수 있으며, 원고 상태와 분량에 따라 별도 견적을 안내합니다.'],
  ['한 권만 만들 수 있나요?', '가능합니다. 개인 소장이나 선물용으로 단 한 권부터 제작할 수 있습니다. 다만 소량 제작은 권당 인쇄 단가가 높아질 수 있습니다.'],
  ['독립출판물처럼 디자인할 수 있나요?', '가능합니다. 판형, 타이포그래피, 사진, 일러스트, 용지와 후가공을 조합해 맞춤형 디자인을 진행할 수 있습니다.'],
  ['여러 명이 참여하는 문집도 가능한가요?', '가능합니다. 원고 취합 상태와 인원수, 필자별 교정 방식에 따라 제작 범위와 비용을 정합니다.'],
  ['ISBN 없이도 책을 만들 수 있나요?', '가능합니다. 개인 소장이나 비매품은 ISBN 없이 제작할 수 있습니다. 서점 유통을 위해서는 ISBN 발급이 필요합니다.'],
  ['서점 유통을 하면 판매가 보장되나요?', '보장되지 않습니다. 서점 유통은 도서를 판매할 수 있는 상태로 등록하는 작업이며, 판매량과 노출은 별개의 문제입니다.'],
]

const breadcrumbJsonLd = { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [
  { '@type': 'ListItem', position: 1, name: '홈', item: 'https://xn--hz2b41ezwf0zf9tq.com/' },
  { '@type': 'ListItem', position: 2, name: '출판서비스', item: 'https://xn--hz2b41ezwf0zf9tq.com/business/poetry' },
  { '@type': 'ListItem', position: 3, name: '시집·문집·에세이 제작', item: 'https://xn--hz2b41ezwf0zf9tq.com/business/poetry' },
] }
const faqJsonLd = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: faqs.map(([name, text]) => ({ '@type': 'Question', name, acceptedAnswer: { '@type': 'Answer', text } })) }

function ContactButtons() {
  const [phoneOpen, setPhoneOpen] = useState(false)
  return <><div className={styles.contactRow}>
    <a href={KAKAO_URL} target="_blank" rel="noopener noreferrer" className={styles.ctaBtn}>오픈채팅 문의</a>
    <button type="button" className={styles.ctaBtnGhost} onClick={() => setPhoneOpen(true)}>전화 문의</button>
    <a href={`mailto:${EMAIL_ADDRESS}`} className={styles.ctaBtnGhost}>이메일 문의</a>
  </div>{phoneOpen && <PhoneConsultModal styles={styles} onClose={() => setPhoneOpen(false)} />}</>
}

function List({ items }) { return <ul className={styles.list}>{items.map(item => <li key={item}>{item}</li>)}</ul> }

export default function PoetryPage() {
  const revealRefs = useRef([])
  useEffect(() => {
    const observer = new IntersectionObserver(entries => entries.forEach(entry => entry.isIntersecting && entry.target.classList.add(styles.visible)), { threshold: .08 })
    revealRefs.current.forEach(el => el && observer.observe(el))
    return () => observer.disconnect()
  }, [])
  const reveal = index => el => { revealRefs.current[index] = el }

  return <main className={styles.wrap}>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

    <section className={styles.hero}>
      <div className={styles.heroBg} /><div className={styles.heroOverlay} />
      <div className={styles.heroInner}>
        <div className={styles.heroContent}>
          <span className={styles.tag}>Poetry · Anthology · Essay</span>
          <p className={styles.heroService}>시집 · 문집 · 에세이 제작</p>
          <h1 className={styles.heroTitle}>써온 글을<br /><span>한 권의 책으로</span><br />만듭니다.</h1>
          <p className={styles.heroCopy}>완성된 시와 산문 원고를 바탕으로 작품의 순서와 호흡, 여백을 정리하고 표지와 내지를 디자인해 한 권의 책으로 제작합니다.</p>
          <p className={styles.heroSubcopy}>개인 시집과 에세이집부터 문학회·동호회 공동 문집까지, 단 한 권의 소량 인쇄부터 정식 출간과 서점 유통까지 안내합니다. 대구·경북·경남은 대면 상담, 그 외 지역은 전국 비대면 상담이 가능합니다.</p>
          <div className={styles.badges}>{badges.map(item => <span key={item}>{item}</span>)}</div>
          <ContactButtons />
        </div>
        <div className={styles.heroVisual}>
          <div className={styles.heroVisualLabel}>나만의 작품집을 세상에 선보이다</div>
          <Image src="/image/home/here004.png" alt="마이티북스 시집과 문집 제작 도서" width={430} height={430} priority />
          <div className={styles.priceNote}><strong>기본 제작비 120만 원부터</strong><span>원고 분량, 판형, 페이지 수, 디자인 난이도, 인쇄 부수와 후가공에 따라 최종 견적이 달라집니다.</span></div>
          <p className={styles.heroVisualCaption}>써온 글의 호흡과 표정을 살려, 오래 남을 한 권의 책으로 만듭니다.</p>
        </div>
      </div>
    </section>

    <section className={styles.section} ref={reveal(0)}><Header tag="Book Types" title={<>어떤 글을 <em>책으로 만드나요?</em></>} desc="개인 시집 출판, 에세이 출판, 수필집 제작부터 여러 필자의 문집 제작과 개인 저서 제작까지 완성 원고를 책의 형태로 정리합니다." /><div className={`${styles.chipGrid} ${styles.bookTypeGrid}`}>{bookTypes.map(item => <span key={item}>{item}</span>)}</div></section>

    <section className={styles.sectionAlt} ref={reveal(1)}><div className={styles.split}><div><span className={styles.tag}>Completed Manuscript</span><h2 className={styles.sectionTitle}>완성된 원고에서<br /><em>시작합니다</em></h2><p className={styles.sectionDesc}>작품 선정, 배열, 목차 구성, 표기 통일, 교정, 편집디자인과 인쇄를 지원합니다. 인터뷰를 통해 처음부터 원고를 대신 쓰는 서비스는 아닙니다.</p><p className={styles.note}>손글씨 원고나 파일 변환이 필요한 자료는 상태와 분량을 확인한 뒤 별도로 견적을 안내합니다.</p></div><div className={styles.card}><h3>접수 가능한 원고</h3><List items={manuscripts} /></div></div></section>

    <section className={styles.section} ref={reveal(2)}><Header tag="Proofreading & Polishing" title={<>작품의 표현을 <em>존중합니다</em></>} desc="교정과 윤문의 범위를 분명히 나눕니다. 시어, 문장, 행갈이, 연 구분처럼 작품 표현에 영향을 주는 부분은 임의로 수정하지 않습니다." /><div className={styles.twoCards}><article className={styles.card}><h3>기본 교정</h3><p>저자의 표현을 유지하며 표기와 서지 정보를 점검합니다.</p><List items={proofreading} /></article><article className={`${styles.card} ${styles.accentCard}`}><h3>에세이·산문 윤문 선택 가능</h3><p>저자의 희망에 따라 추가하며, 원고 상태와 분량을 검토해 별도 견적을 안내합니다.</p><List items={polishing} /></article></div></section>

    <section className={styles.highlight} ref={reveal(3)}><div><span className={styles.tag}>From One Copy</span><h2 className={styles.sectionTitle}>단 한 권부터<br /><em>제작할 수 있습니다</em></h2><p className={styles.sectionDesc}>판매 목적이 아니어도 개인 소장, 가족 증정, 기념용 한 권 책 제작이 가능합니다. 제작 부수가 적을수록 권당 인쇄 단가는 높아질 수 있습니다.</p></div><div className={styles.chipGrid}>{smallPrint.map(item => <span key={item}>{item}</span>)}</div></section>

    <section className={styles.sectionAlt} ref={reveal(4)}><div className={styles.split}><div className={styles.imagePanel}><Image src="/image/home/here005.png" alt="맞춤형 표지와 내지 디자인 제작 사례" width={620} height={420} /></div><div><span className={styles.tag}>Custom Design</span><h2 className={styles.sectionTitle}>책마다 다른<br /><em>표정이 필요합니다</em></h2><p className={styles.sectionDesc}>작품과 취향에 따라 독립출판 디자인처럼 개성 있는 표지와 내지를 맞춤 제작합니다.</p><List items={designs} /><p className={styles.note}>디자인 난이도, 외부 디자이너 참여, 후가공 방식에 따라 추가 비용이 발생할 수 있습니다.</p></div></div></section>

    <section id="plans" className={styles.planSection} ref={reveal(5)}><Header tag="Production Plans" title={<>세 가지 <em>제작 플랜</em></>} desc="가격은 부가세 포함이며, 원고와 제작 사양을 검토한 뒤 최종 견적을 확정합니다." /><div className={styles.planGrid}>{plans.map((plan, i) => <article className={`${styles.planCard} ${i === 1 ? styles.featured : ''}`} key={plan.name}>{i === 1 && <span className={styles.recommend}>DESIGN FOCUS</span>}<h3>{plan.name}</h3><div className={styles.price}>{plan.price}</div><strong className={styles.criteria}>{plan.criteria}</strong><p>{plan.intro}</p><h4>포함 항목</h4><List items={plan.included} /><h4>{plan.extra.length ? '별도 협의 항목' : '유의 사항'}</h4>{plan.extra.length ? <List items={plan.extra} /> : <List items={['서점 입점과 판매량을 보장하지 않습니다.', '보도자료 배포가 기사 게재를 보장하지 않습니다.', '유통 등록 조건은 각 유통사 정책에 따라 달라집니다.', '오프라인 서점 진열은 기본 범위가 아닙니다.', '별도 광고비는 사전 협의합니다.']} />}<p className={styles.fit}>{plan.fit}</p></article>)}</div><div className={styles.centerCta}><ContactButtons /></div></section>

    <section className={styles.gallerySection} ref={reveal(6)}><Header tag="Publishing Experience" title={<>제작 도서와 <em>출판 경험</em></>} desc="현재 페이지의 실제 제작 도서 이미지를 바탕으로 표지와 내지의 다양한 방향을 상담합니다." /><div className={styles.gallery}><Image src="/image/home/here0061.png" alt="마이티북스 제작 도서 표지 사례" width={520} height={390} /><Image src="/image/home/here007.png" alt="마이티북스 시집과 에세이 제작 사례" width={520} height={390} /></div></section>

    <section className={styles.section} ref={reveal(7)}><Header tag="Process" title={<>책이 완성되는 <em>8단계</em></>} desc="원고 검토부터 디자인, 교정, 인쇄와 출간까지 각 단계의 승인 범위를 분명히 안내합니다." /><div className={styles.processGrid}>{process.map(([num, title, desc]) => <article className={styles.processCard} key={num}><span>{num}</span><h3>{title}</h3><p>{desc}</p></article>)}</div></section>

    <section className={styles.local} ref={reveal(8)}><span className={styles.tag}>Daegu · Nationwide</span><h2 className={styles.sectionTitle}>대구를 기반으로<br /><em>전국에서 함께합니다</em></h2><p>마이티북스는 대구를 기반으로 시집, 문집, 에세이와 개인 저서를 제작합니다. 대구·경북·경남은 대면 상담이 가능하며, 그 외 지역은 전화, 이메일, 카카오톡과 화상 상담을 통해 전국 비대면으로 진행합니다.</p></section>

    <section className={styles.sectionAlt} ref={reveal(9)}><div className={styles.split}><div><span className={styles.tag}>Before Consultation</span><h2 className={styles.sectionTitle}>상담 전에<br /><em>준비해 주세요</em></h2><p className={styles.sectionDesc}>아직 정하지 못한 항목은 ‘미정’으로 알려 주셔도 됩니다. 원고와 참고 자료가 구체적일수록 제작 범위와 견적을 빠르게 확인할 수 있습니다.</p><ContactButtons /></div><List items={checklist} /></div></section>

    <section className={styles.section} ref={reveal(10)}><Header tag="FAQ" title={<>자주 묻는 <em>질문</em></>} /><div className={styles.faq}>{faqs.map(([question, answer]) => <details key={question}><summary>{question}</summary><p>{answer}</p></details>)}</div></section>

    <section className={styles.finalCta}><span className={styles.tag}>Start Your Book</span><h2 className={styles.ctaTitle}>써온 글을 이제<br /><em>한 권의 책으로 만나보세요</em></h2><p>대구 시집 제작부터 전국 소량 책 제작, ISBN 서점 유통까지 원고와 목적에 맞춰 상담합니다.</p><ContactButtons /></section>
  </main>
}

function Header({ tag, title, desc }) { return <div className={styles.sectionHeader}><span className={styles.tag}>{tag}</span><h2 className={styles.sectionTitle}>{title}</h2>{desc && <p className={styles.sectionLead}>{desc}</p>}</div> }
