'use client'

import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import {
  EMAIL_ADDRESS,
  KAKAO_URL,
  PhoneConsultModal,
} from '../components/ServiceContactCta'
import AutobiographyPlanFinder from './AutobiographyPlanFinder'
import styles from './autobiography.module.css'

const heroBadges = [
  '원고 없어도 상담 가능',
  '대표 직접 상담',
  '대구·경북· 대면 상담',
  '전국 전화·화상·채팅 상담',
]

const fitCases = [
  '부모님의 삶을 책으로 남기고 싶은 경우',
  '칠순·팔순·퇴임 기념 선물을 준비하는 경우',
  '손글씨 노트, 녹음, 메모만 있는 경우',
  '가족사와 오래된 사진을 정리하고 싶은 경우',
  '완성된 원고를 제대로 된 책으로 만들고 싶은 경우',
  '가족 소장용 또는 정식 출간용을 고민하는 경우',
]

const sourceMaterials = [
  ['노트 손글씨 원고', '정리되지 않은 기록도 흐름을 잡아 원고화합니다.'],
  ['휴대폰 녹음 파일', '구술 내용을 듣고 목차와 문장 구조를 함께 설계합니다.'],
  ['가족 인터뷰 메모', '자녀나 지인이 기억하는 장면도 보충 자료가 됩니다.'],
  ['오래된 사진과 앨범', '사진 선별과 기본 보정, 책 안 배치를 상담합니다.'],
  ['카카오톡 메모', '짧게 남겨둔 문장도 생애 연표와 함께 정리할 수 있습니다.'],
  ['수필, 일기, 강연 원고', '기존 글을 책의 목적에 맞게 편집합니다.'],
  ['출생·결혼·창업·은퇴 연표', '사건의 순서를 잡아 회고록의 뼈대를 만듭니다.'],
]

const workScope = [
  '상담 및 방향 설정',
  '목차 구성',
  '인터뷰 질문 설계',
  '원고 정리 및 편집',
  '문장 다듬기',
  '사진 선별 및 기본 보정',
  '표지·내지 디자인',
  '인쇄 사양 상담',
  'ISBN 및 온라인서점 유통 여부 상담',
]

const processSteps = [
  ['01', '문의 및 1차 상담', '제작 목적, 원고 유무, 일정과 예산 범위를 먼저 확인합니다.'],
  ['02', '자료 확인 및 방향 설정', '원고, 녹음, 사진, 연표를 살펴보고 책의 독자와 형태를 정합니다.'],
  ['03', '인터뷰 또는 원고 정리', '필요하면 전화·화상·대면 인터뷰로 생애 흐름을 보충합니다.'],
  ['04', '목차·원고 편집', '자료를 책의 구조로 묶고 문장을 읽기 좋게 다듬습니다.'],
  ['05', '표지·내지 디자인', '목적과 독자에 맞춰 표지, 본문, 사진 배치를 설계합니다.'],
  ['06', '교정 확인', '의뢰인과 가족이 확인할 수 있도록 교정본을 안내합니다.'],
  ['07', '인쇄·제본·출간', '가족 소장용 제작 또는 ISBN 등록과 유통 상담으로 마무리합니다.'],
]

const bookTypes = [
  '자서전',
  '회고록',
  '부모님 생애 기록',
  '가족사 기록집',
  '칠순·팔순 기념 도서',
  '퇴임·은퇴 기념 도서',
  '기업/대표자 브랜딩 도서',
  '가족 소장용 비공개 책',
  'ISBN 등록 정식 출간 도서',
]

const galleryItems = [
  {
    title: '표지 디자인 예시',
    text: '개인 저자, 시집, 에세이, 단행본 제작 경험을 바탕으로 표지를 설계합니다.',
    image: '/image/home/porta001.jpg',
    alt: '마이티북스 제작 도서 표지 디자인 예시',
  },
  {
    title: '내지 편집 예시',
    text: '본문 흐름, 장 구분, 여백과 가독성을 고려해 책의 형태로 정리합니다.',
    image: '/image/home/porta002.jpg',
    alt: '책 내지 편집과 출판 제작 예시',
  },
  {
    title: '사진 포함 구성',
    text: '사진이 들어가는 기념 도서는 이미지 선별과 기본 보정 범위를 함께 상담합니다.',
    image: '/image/home/recover001.jpg',
    alt: '기념 도서에 사용할 오래된 사진 자료 예시',
  },
]

const pricePlans = [
  {
    name: '라이트 플랜',
    price: '100만 원부터',
    target: '완성 원고가 있는 가족 소장용·기념 도서',
    manuscript: '완성 원고 또는 짧은 원고 보유',
    interview: '기본 상담 중심',
    writing: '윤문, 기본 교정, 내지 편집',
    design: '기본 표지와 내지 디자인',
    print: '인쇄비 별도 산정',
    binding: '10권 미만 소량, 무선 또는 양장',
    check: '원고 분량, 사진 수, 희망 부수',
  },
  {
    name: '스탠다드 플랜',
    price: '200만 원부터',
    target: '메모·녹음·부분 원고를 책으로 정리하려는 경우',
    manuscript: '부분 원고, 녹취, 메모 자료',
    interview: '필요 시 전화·화상 상담',
    writing: '목차 구성, 원고 정리, 문장 다듬기',
    design: '사진 일부 포함 편집 가능',
    print: '인쇄비 별도 산정',
    binding: '무선 또는 양장, 선물포장',
    check: '녹취 분량, 사진 작업량, 가족 확인 절차',
  },
  {
    name: '프리미엄 플랜',
    price: '660만 원부터',
    target: '원고 없이 인터뷰 기반으로 생애 기록을 만들려는 경우',
    manuscript: '원고 없음 또는 자료가 흩어진 상태',
    interview: '인터뷰 기반 구성',
    writing: '생애 흐름 설계, 집필 보조, 편집 범위 확대',
    design: '표지·내지 맞춤 구성',
    print: '사양과 부수에 따라 별도 산정',
    binding: '양장, 무선, 선물용 제작 상담',
    check: '인터뷰 횟수, 가족 보충 인터뷰, 자료 정리 범위',
  },
  {
    name: '비즈니스 플랜',
    price: '1,800만 원부터',
    target: '대표자·전문직·기관장 브랜딩 목적의 회고록',
    manuscript: '이력 자료, 강연 원고, 활동 기록',
    interview: '심화 인터뷰와 자료 검토',
    writing: '메시지 구조화, 장기 서사 설계, 편집 범위 확대',
    design: '브랜딩 목적 표지·내지 구성',
    print: '대량 인쇄 및 유통 별도 상담',
    binding: '고급 양장 또는 공식 출간 사양',
    check: '공개 범위, ISBN, 온라인서점 유통, 납품 일정',
  },
]

const checklist = [
  '제작 목적: 부모님 선물, 퇴임 기념, 가족 소장용, 정식 출간 등',
  '원고 유무: 완성 원고, 손글씨, 녹음, 메모, 사진 자료 등',
  '예상 부수: 10부, 30부, 50부, 100부 등',
  '희망 제본: 무선, 양장, 아직 미정',
  '희망 일정과 대략적인 예산 범위',
  '대구·경북·경남 대면 상담 가능 여부',
]

const guideNotes = [
  '원고가 없어도 상담 가능합니다.',
  '손글씨 노트나 녹음 파일만 있어도 시작할 수 있습니다.',
  '가족 소장용은 ISBN 없이 제작할 수 있습니다.',
  '정식 출간을 원하면 ISBN과 온라인서점 유통도 상담 가능합니다.',
  '대구·경북·경남은 대면 상담, 그 외 지역은 비대면 진행이 가능합니다.',
  '민감한 가족사와 개인 자료는 제작 목적 외 사용하지 않습니다.',
]

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: '홈', item: 'https://xn--hz2b41ezwf0zf9tq.com/' },
    { '@type': 'ListItem', position: 2, name: '출판서비스', item: 'https://xn--hz2b41ezwf0zf9tq.com/business/autobiography' },
    { '@type': 'ListItem', position: 3, name: '자서전·기념 도서 제작', item: 'https://xn--hz2b41ezwf0zf9tq.com/business/autobiography' },
  ],
}

function ContactButtons({ secondary = '전화 상담하기' }) {
  const [isPhoneOpen, setIsPhoneOpen] = useState(false)

  return (
    <>
      <div className={styles.contactRow}>
        <a
          href={KAKAO_URL}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.ctaBtn}
          aria-label="카카오톡으로 자서전 제작 상담하기"
        >
          카톡으로 자서전 상담하기
        </a>
        <button
          type="button"
          className={styles.ctaBtnGhost}
          onClick={() => setIsPhoneOpen(true)}
          aria-label="마이티북스 전화 상담 연락처 확인하기"
        >
          {secondary}
        </button>
        <a
          href={`mailto:${EMAIL_ADDRESS}`}
          className={styles.ctaBtnGhost}
          aria-label="이메일로 자서전 제작 문의하기"
        >
          이메일 문의하기
        </a>
      </div>
      {isPhoneOpen && (
        <PhoneConsultModal
          styles={styles}
          onClose={() => setIsPhoneOpen(false)}
        />
      )}
    </>
  )
}

export default function AutobiographyPage() {
  const revealRefs = useRef([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add(styles.visible)
      }),
      { threshold: 0.12 }
    )

    revealRefs.current.forEach(el => {
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  const ref = index => el => {
    revealRefs.current[index] = el
  }

  return (
    <div className={styles.wrap}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <section className={styles.hero}>
        <div className={styles.heroBg} />
        <div className={styles.heroOverlay} />
        <div className={styles.heroInner}>
          <div className={styles.heroContent}>
            <span className={styles.tag}>Autobiography / Memoir</span>
            <p className={styles.heroService}>자서전 · 회고록 · 부모님 생애 기록 제작</p>
            <h1 className={styles.heroTitle}>
              원고가 <span>없어도</span><br />
              괜찮습니다.
            </h1>
            <div className={styles.heroLine} />
            <p className={styles.heroCopy}>
              손글씨 노트, 녹음 파일, 사진 자료를 바탕으로 한 사람의 삶을 책의 형태로 정리합니다.
            </p>
            <p className={styles.heroSubcopy}>
              자서전 · 회고록 · 부모님 생애 기록 · 퇴임 기념 도서 제작<br />
              1:1 맞춤형 출판 제작소, 대구·경북·경남 오프라인 상담, 전국 온라인 상담 가능
            </p>
            <div className={styles.heroBadges} aria-label="자서전 제작 상담 특징">
              {heroBadges.map(badge => <span key={badge}>{badge}</span>)}
            </div>
            <ContactButtons secondary="제작 방식 먼저 알아보기" />
          </div>
          <div className={styles.heroVisual}>
            {/* TODO: 실제 자서전 원고, 사진, 제작 도서 이미지로 교체하기 쉽게 유지합니다. */}
            <div className={styles.heroVisualLabel}>출판사 대표가 직접 인터뷰 진행</div>
            <Image
              src="/image/home/here009.jpg"
              alt="책 제작 상담을 상징하는 마이티북스 도서 이미지"
              width={420}
              height={420}
              priority
            />
            <div className={styles.heroVisualNote}>
              <strong>100만 원대부터 상담 가능</strong>
              <span>원고 상태, 인터뷰 범위, 인쇄 사양에 따라 견적이 달라집니다.</span>
            </div>
            <p className={styles.heroVisualCaption}>
              출판 제작 경험을 바탕으로 자서전·기념 도서 제작을 1:1로 진행합니다.
            </p>
          </div>
        </div>
        <div className={styles.heroFloat}>memoir</div>
      </section>

      <section className={styles.section} ref={ref(0)} aria-labelledby="fit-heading">
        <div className={styles.sectionHeader}>
          <span className={styles.tag}>Good Fit</span>
          <h2 id="fit-heading" className={styles.sectionTitle}>이런 경우에 <em>적합합니다</em></h2>
          <p className={styles.sectionLead}>
            자서전에도 다양한 형태가 있습니다. 부모님 생애 기록, 가족 기록집, 퇴임 기념 도서처럼 목적에 맞게 맞춤 제작해 드립니다.
          </p>
        </div>
        <div className={styles.cardGrid}>
          {fitCases.map((item, index) => (
            <article key={item} className={styles.infoCard}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <h3>{item}</h3>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.sectionAlt} ref={ref(1)} aria-labelledby="materials-heading">
        <div className={styles.split}>
          <div>
            <span className={styles.tag}>Source Materials</span>
            <h2 id="materials-heading" className={styles.sectionTitle}>어떤 자료에서<br /><em>시작할 수 있나요?</em></h2>
            <div className={styles.sectionLine} />
            <p className={styles.sectionDesc}>
              자서전 제작이나 회고록 제작 문의에서 가장 많이 나오는 질문은 “원고가 없는데 가능한가요?”입니다.
              마이티북스는 완성 원고뿐 아니라 흩어진 자료를 확인한 뒤 책의 구조를 함께 잡습니다.
            </p>
            <ContactButtons secondary="원고 없이 가능한지 물어보기" />
          </div>
          <div className={styles.materialGrid}>
            {sourceMaterials.map(([title, text]) => (
              <article key={title} className={styles.materialCard}>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.section} ref={ref(2)} aria-labelledby="scope-heading">
        <div className={styles.split}>
          <div className={styles.imagePanel}>
            {/* TODO: 실제 편집·디자인 작업 사진으로 교체 예정입니다. */}
            <Image
              src="/image/home/main0051.png"
              alt="출판 제작 과정에서 활용할 책과 원고 이미지"
              width={620}
              height={420}
            />
          </div>
          <div>
            <span className={styles.tag}>1:1 Publishing Studio</span>
            <h2 id="scope-heading" className={styles.sectionTitle}>마이티북스가<br /><em>함께 보는 일</em></h2>
            <div className={styles.sectionLine} />
            <p className={styles.sectionDesc}>
              단순히 글만 옮기는 방식이 아니라, 책의 목적과 독자를 먼저 정하고 원고 정리, 편집, 디자인, 인쇄 상담까지 연결합니다.
              AI 자동 생성형 서비스처럼 보이기보다 사람이 직접 구조를 잡는 1:1 맞춤 제작을 지향합니다.
            </p>
            <div className={styles.scopeList}>
              {workScope.map(item => <span key={item}>{item}</span>)}
            </div>
          </div>
        </div>
      </section>

      <section className={styles.localSection} ref={ref(3)} aria-labelledby="local-heading">
        <div className={styles.localInner}>
          <span className={styles.tag}>Nationwide Serivece</span>
          <h2 id="local-heading" className={styles.sectionTitle}>지역 기반 · <em>전국 진행 가능</em></h2>
          <p>
            마이티북스는 대구에 기반을 둔 1:1 출판 제작소입니다. 대구를 비롯해 인근 경북·경남 지역은 대면 상담이 가능하고,
            그 외 지역은 전화, 화상, 이메일, 카카오톡 자료 전달로 진행합니다.
          </p>
          <div className={styles.localKeywords}>
            {['자서전 제작', '회고록 제작', '부모님 자서전', '퇴임 기념 도서', '가족사 책 제작', '손글씨 원고 책 만들기', '녹음 자서전 제작', '소량 자서전 제작'].map(keyword => (
              <span key={keyword}>{keyword}</span>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.section} ref={ref(4)} aria-labelledby="process-heading">
        <div className={styles.sectionHeader}>
          <span className={styles.tag}>Process</span>
          <h2 id="process-heading" className={styles.sectionTitle}>제작 <em>과정</em></h2>
          <p className={styles.sectionLead}>
            완성 원고가 있으면 비교적 짧은 기간 안에 진행할 수 있고, 녹음·메모·인터뷰 기반 제작은 자료량과 인터뷰 횟수에 따라 일정이 달라집니다. 인쇄·제본 기간은 사양과 수량을 확인한 뒤 별도 산정합니다.
          </p>
        </div>
        <div className={styles.processGrid}>
          {processSteps.map(([num, title, desc]) => (
            <article key={num} className={styles.processCard}>
              <span>{num}</span>
              <h3>{title}</h3>
              <p>{desc}</p>
            </article>
          ))}
        </div>
        <div className={styles.midCta}>
          <ContactButtons secondary="본사 방문 상담 문의하기" />
        </div>
      </section>

      <section className={styles.sectionAlt} ref={ref(5)} aria-labelledby="types-heading">
        <div className={styles.sectionHeader}>
          <span className={styles.tag}>Book Types</span>
          <h2 id="types-heading" className={styles.sectionTitle}>제작 형태는 <em>넓게 볼 수 있습니다</em></h2>
          <p className={styles.sectionLead}>
            가족 소장용은 ISBN 없이도 제작할 수 있습니다. 정식 출간을 원하면 ISBN 등록과 온라인서점 유통 가능성도 함께 상담합니다.
          </p>
        </div>
        <div className={styles.typeGrid}>
          {bookTypes.map(type => <span key={type}>{type}</span>)}
        </div>
      </section>

      <section className={styles.gallerySection} ref={ref(6)} aria-labelledby="gallery-heading">
        <div className={styles.sectionHeader}>
          <span className={styles.tag}>Portfolio Mood</span>
          <h2 id="gallery-heading" className={styles.sectionTitle}>제작 도서와 <em>출판 경험</em></h2>
          <p className={styles.sectionLead}>
            자서전 전용 사례로만 단정하지 않습니다. 마이티북스는 개인 저자, 시집, 에세이, 단행본 제작 경험을 바탕으로 자서전과 기념 도서 제작을 맞춤형 1:1 방식으로 진행합니다.
          </p>
        </div>
        <div className={styles.galleryGrid}>
          {galleryItems.map(item => (
            <article key={item.title} className={styles.galleryCard}>
              {/* TODO: 자서전·기념 도서 실제 공개 동의 이미지 확보 후 교체합니다. */}
              <Image src={item.image} alt={item.alt} width={520} height={390} />
              <div>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.priceSection} ref={ref(7)} aria-labelledby="price-heading">
        <div className={styles.sectionHeader}>
          <span className={styles.tag}>Starting Price</span>
          <h2 id="price-heading" className={styles.sectionTitle}>가격은 <em>플랜 별 기준</em>에 따라 상세 금액이 달라집니다</h2>
          <p className={styles.sectionLead}>
            아래 금액은 상담 전 참고용입니다. 인쇄비, 제본 사양, 사진 작업, 인터뷰 횟수, 집필 범위, 부수에 따라 최종 견적은 달라질 수 있습니다.
          </p>
        </div>
        <div className={styles.priceGrid}>
          {pricePlans.map(plan => (
            <article key={plan.name} className={styles.priceCard}>
              <h3>{plan.name}</h3>
              <div className={styles.price}>{plan.price}</div>
              <p>{plan.target}</p>
              <dl>
                <div><dt>원고 상태</dt><dd>{plan.manuscript}</dd></div>
                <div><dt>인터뷰</dt><dd>{plan.interview}</dd></div>
                <div><dt>편집/집필</dt><dd>{plan.writing}</dd></div>
                <div><dt>디자인</dt><dd>{plan.design}</dd></div>
                <div><dt>인쇄비</dt><dd>{plan.print}</dd></div>
                <div><dt>제본</dt><dd>{plan.binding}</dd></div>
                <div><dt>상담 확인</dt><dd>{plan.check}</dd></div>
              </dl>
            </article>
          ))}
        </div>
        <p className={styles.priceNote}>
          고가 플랜은 장기 인터뷰, 가족·지인 보충 인터뷰, 대량 사진 정리, 생애 연표 구성, 전문 집필 범위 확대,
          고급 양장 제작, 브랜딩 목적 구성, 다수 인쇄처럼 확인해야 할 범위가 넓을 때 적용될 수 있습니다.
        </p>
        <div className={styles.midCta}>
          <ContactButtons secondary="예상 견적 상담하기" />
        </div>
      </section>

      <section className={styles.sectionAlt} ref={ref(8)} aria-labelledby="checklist-heading">
        <div className={styles.split}>
          <div>
            <span className={styles.tag}>Before Contact</span>
            <h2 id="checklist-heading" className={styles.sectionTitle}>상담 전<br /><em>알려주시면 좋은 것</em></h2>
            <div className={styles.sectionLine} />
            <p className={styles.sectionDesc}>
              카톡이나 전화 문의 전에 아래 내용을 간단히 알려주시면 제작 방식과 예상 범위를 더 빠르게 안내할 수 있습니다.
            </p>
            <ContactButtons />
          </div>
          <ul className={styles.checkList}>
            {checklist.map(item => <li key={item}>{item}</li>)}
          </ul>
        </div>
      </section>

      <section className={styles.section} ref={ref(9)} aria-labelledby="guide-heading">
        <div className={styles.sectionHeader}>
          <span className={styles.tag}>Quick Guide</span>
          <h2 id="guide-heading" className={styles.sectionTitle}>많이 문의하시는 <em>핵심 안내</em></h2>
        </div>
        <div className={styles.guideGrid}>
          {guideNotes.map(note => <p key={note}>{note}</p>)}
        </div>
        <a className={styles.textLink} href="/support/faq">더 자세한 공통 질문 보기</a>
        <div className={styles.guideGrid}>
          {[
            ['대구·경북·경남 자서전 제작 기준', '/reference/autobiography-gyeongsang'],
            ['마이티북스 출판 제작 레퍼런스', '/reference/mightybooks-publishing'],
            ['개인출판과 소량 책 제작 기준', '/reference/personal-publishing'],
          ].map(([title, href]) => (
            <p key={href}>
              <strong>{title}</strong><br />
              자서전 제작, 원고 정리, 편집, 디자인, 인쇄 제작 기준을 더 자세히 확인할 수 있습니다.
              <br />
              <a className={styles.textLink} href={href}>자료 보기</a>
            </p>
          ))}
        </div>
      </section>

      <section className={styles.privacyBox} ref={ref(10)} aria-label="개인정보와 비밀보장 안내">
        <h2>개인 자료는 제작 목적 안에서만 다룹니다</h2>
        <p>
          상담 내용과 전달받은 원고, 사진, 녹취 자료는 제작 목적 외 사용하지 않습니다.
          제작 사례 공개는 의뢰인의 동의가 있을 때만 진행하며, 비공개 가족 소장용 제작도 가능합니다.
        </p>
      </section>

      <section className={styles.finderSection} ref={ref(11)} aria-labelledby="finder-heading">
        <div className={styles.sectionHeader}>
          <span className={styles.tag}>Plan Finder</span>
          <h2 id="finder-heading" className={styles.sectionTitle}>내게 맞는<br /><em>플랜 찾기</em></h2>
          <p className={styles.sectionLead}>
            몇 가지 질문에 답하면 현재 상황에 가까운 예상 플랜과 상담 시 확인할 항목을 볼 수 있습니다.
            이 결과는 확정 견적이 아니라 상담 전 참고용입니다.
          </p>
        </div>
        <AutobiographyPlanFinder />
      </section>
    </div>
  )
}
