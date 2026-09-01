'use client'

import Image from 'next/image'
import Link from 'next/link'
import ServiceContactCta from '../components/ServiceContactCta'
import styles from '../autobiography/autobiography.module.css'

const pageUrl = 'https://mightybooks.kr/business/retirement-book'

const reasons = [
  ['경력을 한 흐름으로 정리', '직함과 연도만 나열하지 않고 중요한 선택, 일과 성과, 함께한 사람을 중심으로 한 사람의 경력을 정리합니다.'],
  ['행사 이후에도 남는 기록', '꽃과 기념품이 지나간 뒤에도 본인과 가족, 동료와 후배가 다시 펼쳐볼 수 있는 형태로 남깁니다.'],
  ['관계가 함께 담기는 책', '당사자의 목소리뿐 아니라 동료·제자·직원·가족의 글과 사진을 더해 함께한 시간을 기록할 수 있습니다.'],
]

const materials = [
  ['기존 원고', '회고문, 기고문, 수필과 메모를 책의 흐름에 맞춰 편집합니다.'],
  ['사진과 앨범', '재직 시절, 행사, 현장과 사람들의 사진을 선별해 배치합니다.'],
  ['이력·경력 자료', '근무 이력과 주요 전환점을 확인하는 기초 자료로 활용합니다.'],
  ['수상·활동 기록', '수상 내역, 프로젝트와 공적 자료를 맥락과 함께 정리합니다.'],
  ['강연·연구 자료', '강연문, 논문·저서 목록과 교육 자료에서 주요 메시지를 찾습니다.'],
  ['기사와 보도자료', '신문기사와 기관 기록을 사실관계와 시기를 확인하는 자료로 활용합니다.'],
  ['인터뷰·녹취', '본인의 말에서 경력의 의미와 중요한 장면을 찾아 원고로 구성합니다.'],
  ['축사·기고문', '행사 축사와 기존 기고문을 책의 목적에 맞는 위치에 배치합니다.'],
  ['동료·제자의 글', '함께 일하고 배운 사람들이 기억하는 장면을 별도 꼭지로 구성할 수 있습니다.'],
  ['가족의 글', '일 바깥의 모습과 퇴임 이후를 바라보는 가족의 마음을 더할 수 있습니다.'],
]

const organizers = [
  ['본인이 직접', '퇴임을 앞두고 자신의 경력과 다음 삶을 정리하려는 경우'],
  ['배우자·자녀', '부모님의 퇴임을 오래 남을 가족 선물로 준비하는 경우'],
  ['제자·동료·직원', '함께한 사람들의 글과 사진을 모아 감사의 기록을 만드는 경우'],
  ['회사·기관·학회·동문회', '공식 행사와 전달 일정에 맞춰 자료 취합과 확인 절차가 필요한 경우'],
]

const chapterIdeas = [
  ['지나온 경력', '모든 연도를 같은 비중으로 나열하지 않고 책의 목적에 필요한 흐름을 잡습니다.'],
  ['중요한 전환점', '진로를 정한 계기와 역할이 바뀐 순간처럼 경력의 방향을 만든 장면을 찾습니다.'],
  ['대표적인 일과 성과', '성과 자체뿐 아니라 그 일을 시작한 이유, 과정과 함께한 사람을 담습니다.'],
  ['함께한 사람들', '동료, 제자, 직원과 협력자 사이에서 남은 기억과 관계를 정리합니다.'],
  ['사진과 기록', '사진, 문서, 기사와 활동 자료가 본문을 설명하도록 맥락을 붙입니다.'],
  ['주변인의 글', '축사 모음에 그치지 않도록 책 전체의 흐름 속에서 배치합니다.'],
  ['앞으로의 삶', '퇴임을 끝으로만 다루지 않고 이후의 관심과 계획을 당사자의 말로 남깁니다.'],
]

const productionMethods = [
  ['완성 원고 기반', '준비된 원고를 교정·편집하고 표지와 내지를 디자인해 제작합니다.'],
  ['자료 기반 재구성', '경력자료, 기사, 사진과 기존 글을 검토해 목차와 원고 흐름을 잡습니다.'],
  ['인터뷰 기반', '원고가 없어도 질문을 설계하고 인터뷰한 내용을 바탕으로 원고를 구성할 수 있습니다.'],
  ['사진·기록물 중심', '사진과 기록이 많은 경우 이미지 선별, 설명과 배치 비중을 높여 구성합니다.'],
  ['소량 종이책', '가족, 동료와 행사 참석자에게 전달할 필요한 수량을 기준으로 인쇄 사양을 상담합니다.'],
  ['PDF·온라인 열람 연계', '교정·인쇄용 PDF를 확인하며, 열람용 PDF나 온라인 서가는 계약 범위와 상품·지역 혜택에 따라 별도로 협의합니다.'],
]

const processSteps = [
  ['01', '목적·일정 확인', '본인, 가족 또는 기관이 준비하는지와 퇴임식·전달 희망일을 확인합니다.'],
  ['02', '자료 검토', '원고, 사진, 경력자료와 주변인의 글을 살펴 필요한 작업 범위를 정합니다.'],
  ['03', '목차·인터뷰 설계', '경력의 중심축을 찾고 원고가 부족하면 인터뷰 질문과 횟수를 정합니다.'],
  ['04', '원고 편집', '당사자의 말과 확인 가능한 자료를 바탕으로 원고를 구성하고 다듬습니다.'],
  ['05', '디자인·교정', '표지와 내지를 디자인하고 본인 또는 지정 담당자가 교정본을 확인합니다.'],
  ['06', '인쇄·전달', '확정한 사양과 수량으로 제작하며 PDF·온라인 열람은 협의한 범위에 따라 연결합니다.'],
]

const faqs = [
  ['원고가 없어도 가능한가요?', '가능합니다. 먼저 이력과 사진, 기존 기록을 확인하고 필요한 경우 인터뷰 질문을 설계해 원고를 구성합니다. 인터뷰 횟수와 집필 범위는 자료량에 따라 달라집니다.'],
  ['사진과 경력자료만 있어도 시작할 수 있나요?', '상담은 시작할 수 있습니다. 사진과 경력자료로 기본 연표와 주요 장면을 찾고, 설명이 부족한 부분은 본인이나 가족·동료 인터뷰로 보완합니다.'],
  ['10부~30부 정도만 제작할 수 있나요?', '소량 제작을 상담할 수 있습니다. 실제 비용은 페이지 수, 판형, 컬러 여부, 용지, 제본과 파일 상태를 함께 확인해 정합니다.'],
  ['가족이 대신 의뢰할 수 있나요?', '배우자나 자녀가 먼저 상담할 수 있습니다. 다만 인터뷰, 원고 내용과 사진 공개 범위는 당사자 확인이 필요한 부분을 구분해 진행합니다.'],
  ['교수·교장·공무원 퇴임 책도 가능한가요?', '가능합니다. 교수·연구자, 교장·교사, 공무원뿐 아니라 기업 임원, 사업가, 전문직과 기관장의 경력도 실제 자료와 인터뷰를 바탕으로 구성할 수 있습니다.'],
  ['인터뷰부터 맡길 수 있나요?', '가능합니다. 사전 자료를 확인한 뒤 경력의 중요한 시기와 사람을 중심으로 질문을 설계합니다. 대면·비대면 방식과 횟수는 상담에서 정합니다.'],
  ['PDF나 온라인 열람본도 제공되나요?', '편집 과정에서는 교정·인쇄용 PDF를 확인합니다. 별도의 열람용 PDF 제공과 프라이빗 링크·온라인 서가 구성은 선택한 상품, 공개 범위와 지역 혜택에 따라 별도 확인이 필요합니다.'],
]

const structuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Service',
      name: '정년퇴임·은퇴 기념 책 제작',
      description: '퇴임·은퇴를 계기로 한 사람의 경력, 주요 기록과 주변인의 기억을 인터뷰·자료를 바탕으로 기념 책으로 제작하는 서비스',
      url: pageUrl,
      provider: { '@type': 'Organization', name: '마이티북스', url: 'https://mightybooks.kr' },
      areaServed: '대한민국',
      serviceType: ['정년퇴임 기념 책 제작', '은퇴 기념 책 제작', '퇴직 기념 도서 제작'],
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: '홈', item: 'https://mightybooks.kr/' },
        { '@type': 'ListItem', position: 2, name: '자서전·기념 도서 제작', item: 'https://mightybooks.kr/business/autobiography' },
        { '@type': 'ListItem', position: 3, name: '정년퇴임·은퇴 기념 책 제작', item: pageUrl },
      ],
    },
    {
      '@type': 'FAQPage',
      mainEntity: faqs.map(([name, text]) => ({
        '@type': 'Question',
        name,
        acceptedAnswer: { '@type': 'Answer', text },
      })),
    },
  ],
}

export default function RetirementBookPage() {
  return (
    <div className={styles.wrap}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, '\\u003c') }} />

      <section className={styles.hero}>
        <div className={styles.heroBg} />
        <div className={styles.heroOverlay} />
        <div className={styles.heroInner}>
          <div className={styles.heroContent}>
            <span className={styles.tag}>Retirement Memorial Book</span>
            <p className={styles.heroService}>퇴임 · 퇴직 · 은퇴를 기념하는 경력 기록</p>
            <h1 className={styles.heroTitle}>정년퇴임·은퇴<br /><span>기념 책 제작</span></h1>
            <div className={styles.heroLine} />
            <p className={styles.heroCopy}>한 사람의 경력과 사람들의 기억을, 퇴임 이후에도 남는 한 권의 책으로 만듭니다.</p>
            <p className={styles.heroSubcopy}>완성 원고가 없어도 사진, 이력과 경력자료, 인터뷰, 동료·제자·가족의 글에서 시작할 수 있습니다.</p>
            <div className={styles.heroBadges} aria-label="퇴임 기념 책 제작 특징">
              {['소량 종이책 제작 가능', '원고 없이 인터뷰부터 가능', '가족·동료·기관 모두 의뢰 가능', '자료 상태에 맞춘 1:1 구성'].map(item => <span key={item}>{item}</span>)}
            </div>
            <ServiceContactCta styles={styles} />
          </div>
          <div className={styles.heroVisual}>
            <div className={styles.heroVisualLabel}>Career · People · Memory</div>
            <Image src="/image/home/here003.jpg" alt="퇴임과 은퇴를 기념해 한 사람의 경력과 관계를 기록하는 책 제작" width={420} height={420} priority />
            <div className={styles.heroVisualNote}><strong>행사 기념품을 넘어 한 사람의 기록으로</strong><span>자료량, 인터뷰, 편집 범위, 인쇄 사양과 수량을 확인한 뒤 견적을 안내합니다.</span></div>
          </div>
        </div>
        <div className={styles.heroFloat}>retirement</div>
      </section>

      <section className={styles.section} aria-labelledby="why-heading">
        <div className={styles.sectionHeader}><span className={styles.tag}>Why a Book</span><h2 id="why-heading" className={styles.sectionTitle}>왜 퇴임을 <em>책으로 남길까요?</em></h2><p className={styles.sectionLead}>퇴임 기념 책은 직함과 공적만 모은 자료집이 아니라, 한 사람의 일과 선택, 함께한 관계를 다음 사람에게 전하는 기록물입니다.</p></div>
        <div className={styles.cardGrid}>{reasons.map(([title, text], index) => <article key={title} className={styles.infoCard}><span>{String(index + 1).padStart(2, '0')}</span><h3>{title}</h3><p className={styles.sectionLead}>{text}</p></article>)}</div>
      </section>

      <section className={styles.sectionAlt} aria-labelledby="materials-heading">
        <div className={styles.split}>
          <div><span className={styles.tag}>Source Materials</span><h2 id="materials-heading" className={styles.sectionTitle}>어떤 자료로<br /><em>만들 수 있나요?</em></h2><div className={styles.sectionLine} /><p className={styles.sectionDesc}>처음부터 완성된 원고가 있어야 하는 것은 아닙니다. 흩어진 자료에서 중요한 시기와 관계를 찾고, 부족한 맥락은 인터뷰와 추가 확인으로 보완합니다.</p><ServiceContactCta styles={styles} /></div>
          <div className={styles.materialGrid}>{materials.map(([title, text]) => <article key={title} className={styles.materialCard}><h3>{title}</h3><p>{text}</p></article>)}</div>
        </div>
      </section>

      <section className={styles.formatSection} aria-labelledby="organizer-heading">
        <div className={styles.sectionHeader}><span className={styles.tag}>Who Can Prepare</span><h2 id="organizer-heading" className={styles.sectionTitle}>누가 <em>준비할 수 있나요?</em></h2><p className={styles.sectionLead}>본인이 직접 시작할 수도 있고, 가족의 선물이나 동료·제자·기관의 공식 기념 사업으로 준비할 수도 있습니다.</p></div>
        <div className={styles.formatGrid}>{organizers.map(([title, text], index) => <article key={title} className={styles.formatCard}><span className={styles.formatNumber}>{String(index + 1).padStart(2, '0')}</span><h3>{title}</h3><p>{text}</p></article>)}</div>
      </section>

      <section className={styles.section} aria-labelledby="chapters-heading">
        <div className={styles.sectionHeader}><span className={styles.tag}>Narrative Design</span><h2 id="chapters-heading" className={styles.sectionTitle}>책의 구성은 <em>그 사람의 경력에서 시작합니다</em></h2><p className={styles.sectionLead}>아래 항목은 정해진 목차가 아니라 자료와 인터뷰를 살펴볼 때 사용하는 출발점입니다. 모든 사람의 경력을 같은 틀에 끼워 넣지 않습니다.</p></div>
        <div className={`${styles.materialGrid} ${styles.formatGrid}`}>{chapterIdeas.map(([title, text]) => <article key={title} className={styles.materialCard}><h3>{title}</h3><p>{text}</p></article>)}</div>
      </section>

      <section className={styles.sectionAlt} aria-labelledby="methods-heading">
        <div className={styles.sectionHeader}><span className={styles.tag}>Production Options</span><h2 id="methods-heading" className={styles.sectionTitle}>자료 상태와 목적에 맞는 <em>제작 방식</em></h2><p className={styles.sectionLead}>준비된 원고와 자료를 최대한 활용하고, 실제로 필요한 인터뷰·편집·디자인과 제작 범위만 정합니다.</p></div>
        <div className={styles.cardGrid}>{productionMethods.map(([title, text], index) => <article key={title} className={styles.infoCard}><span>{String(index + 1).padStart(2, '0')}</span><h3>{title}</h3><p className={styles.sectionLead}>{text}</p></article>)}</div>
      </section>

      <section className={styles.formatSection} aria-labelledby="difference-heading">
        <div className={styles.sectionHeader}><span className={styles.tag}>Retirement Book / Autobiography</span><h2 id="difference-heading" className={styles.sectionTitle}>퇴임 기념 책과 자서전은<br /><em>기록의 중심이 다릅니다</em></h2></div>
        <div className={styles.formatGrid}>
          <article className={styles.formatCard}><span className={styles.formatNumber}>01</span><h3>정년퇴임·은퇴 기념 책</h3><p>퇴임이라는 사건을 중심으로 주요 경력, 일과 성과, 함께한 사람들과 앞으로의 삶을 정리합니다. 행사 일정과 선물·배포 목적도 함께 고려합니다.</p></article>
          <article className={styles.formatCard}><span className={styles.formatNumber}>02</span><h3>개인 자서전·회고록</h3><p>유년기부터 가족, 일, 관계와 현재까지 생애 전체의 서사를 다룹니다. 퇴임 이후의 경력뿐 아니라 삶 전체를 기록하고 싶다면 자서전 제작을 참고하세요.</p><Link href="/business/autobiography" className={styles.libraryLink}>개인 자서전 제작 알아보기</Link></article>
        </div>
      </section>

      <section className={styles.section} aria-labelledby="process-heading">
        <div className={styles.sectionHeader}><span className={styles.tag}>Process</span><h2 id="process-heading" className={styles.sectionTitle}>퇴임 일정과 자료에 맞춘 <em>제작 과정</em></h2><p className={styles.sectionLead}>행사일이 있다면 문의 단계에서 알려 주세요. 자료량, 인터뷰와 확인 절차를 검토한 뒤 가능한 일정과 범위를 안내합니다.</p></div>
        <div className={styles.processGrid}>{processSteps.map(([number, title, text]) => <article key={number} className={styles.processCard}><span>{number}</span><h3>{title}</h3><p>{text}</p></article>)}</div>
        <div className={styles.midCta}><ServiceContactCta styles={styles} /></div>
      </section>

      <section className={styles.sectionAlt} aria-labelledby="faq-heading">
        <div className={styles.sectionHeader}><span className={styles.tag}>FAQ</span><h2 id="faq-heading" className={styles.sectionTitle}>자주 묻는 <em>질문</em></h2></div>
        <div className={`${styles.materialGrid} ${styles.formatGrid}`}>{faqs.map(([question, answer]) => <article key={question} className={styles.materialCard}><h3>{question}</h3><p>{answer}</p></article>)}</div>
      </section>

      <section className={styles.finalCta} aria-labelledby="retirement-cta-heading">
        <span className={styles.tag}>Start With Your Records</span><h2 id="retirement-cta-heading">흩어진 경력과 기억을<br /><em>한 권의 책으로 정리해 보세요</em></h2><p>퇴임 시기, 준비 주체, 가지고 있는 원고·사진·경력자료와 희망 수량을 알려 주시면 필요한 작업 범위를 안내합니다.</p><ServiceContactCta styles={styles} /><Link href="/tools/publishing-guide" className={styles.libraryLink}>출판 길라잡이 시작하기</Link>
      </section>
    </div>
  )
}
