'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import {
  EMAIL_ADDRESS,
  KAKAO_URL,
  PhoneConsultModal,
} from '../components/ServiceContactCta'
import AutobiographyPlanFinder from './AutobiographyPlanFinder'
import BookPreviewTrigger from '../components/book-preview/BookPreviewTrigger'
import { autobiographyPreview } from '../components/book-preview/bookPreviews'
import styles from './autobiography.module.css'

const AUTOBIOGRAPHY_WEBBOOK_PRICE = '110만 원부터'

const PRIVATE_WEBBOOK_INCLUDED = [
  '고품질 플립북 제작',
  '저자 프로필 페이지 구성',
  '도서 상세 페이지 구성',
  '가족끼리 확인할 수 있는 프라이빗 링크',
  '모바일·PC 반응형 열람 환경',
  '기본 도서 등록',
  '첫해 프라이빗 링크 이용',
]

const heroBadges = [  
  '프로 작가 문수림 1:1 직접 진행',
  '대구·경북·경남 대면 상담',
  '전국 전화·화상·채팅 상담',
]

const fitCases = [
  '부모님의 생애사와 가족의 시간을 책으로 남기고 싶은 경우',
  '칠순 기념 책, 팔순 기념 책처럼 오래 남는 선물을 준비하는 경우',
  '부모님이 직접 글을 쓰지 못하시고 사진, 녹음, 메모만 있는 경우',
  '가족 사진과 부모님 생애 장면을 가족 기념 서적으로 정리하고 싶은 경우',
  '커플 기념 서적이나 결혼 기념 책처럼 두 사람의 이야기를 남기고 싶은 경우',
  '가족 소장용 책 또는 정식 출간용 책을 고민하는 경우',
]

const sourceMaterials = [
  ['노트 손글씨 원고', '정리되지 않은 기록도 묻고, 듣고, 흐름을 잡아 원고화합니다.'],
  ['휴대폰 녹음 파일', '구술 내용을 듣고 목차와 책의 문장 구조를 함께 설계합니다.'],
  ['가족 인터뷰 메모', '자녀와 가족이 기억하는 장면도 부모님 생애사 제작의 보충 자료가 됩니다.'],
  ['오래된 사진과 앨범', '부모님 생애 장면과 가족 사진을 선별해 책 안 배치를 상담합니다.'],
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
  '프라이빗 링크·웹북 제작',
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
  ['07', '웹북 공개 또는 인쇄·제본', '선택한 제작 방식에 따라 프라이빗 링크와 고화질 플립북을 공개하거나, 종이책 인쇄·제본 및 ISBN 출간 상담으로 마무리합니다.'],
]

const bookTypes = [
  '자서전',
  '회고록',
  '부모님 생애사 제작',
  '부모님 자서전',
  '칠순 기념 책',
  '팔순 기념 책',
  '가족 기념 서적',
  '커플 기념 서적',
  '결혼 기념 책',
  '퇴임·은퇴 기념 도서',
  '기업/대표자 브랜딩 도서',
  '가족 소장용 책',
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

const personalPlans = [
  {
    name: '웹북 플랜',
    price: AUTOBIOGRAPHY_WEBBOOK_PRICE,
    target: '최적화된 고품질 웹북 맞춤형 제작',
    interview: '인터뷰 2회 기준',
    writing: '원고 편집 및 웹북용 콘텐츠 최적화',
    design: '표지·내지 디자인 강화 및 페이지 수 증가에 따라 추가 견적이 발생할 수 있습니다.',
    printedBook: '종이책 인쇄 미포함',
    webbook: '가족끼리 확인할 수 있는 프라이빗 링크, 고화질 플립북, 기본 도서 등록, 공유 링크와 QR, 첫해 이용 포함',
    check: '공개 범위, 프라이빗 링크 설정, 디자인 필요 여부',
  },
  {
    name: '라이트 플랜',
    price: '150만 원부터',
    target: '완성 원고가 있는 가족 소장용·기념 도서',
    manuscript: '완성 원고 또는 짧은 원고 보유',
    interview: '인터뷰 2회 기준',
    writing: '윤문, 기본 교정, 내지 편집',
    design: '기본 표지와 내지 디자인',
    printedBook: '소량 종이책 제작, 인쇄비 별도 산정',
    webbook: '종이책 기본 범위와 별도이며, 웹북 상품 또는 지역 혜택 적용 여부 확인',
    check: '원고 분량, 사진 수, 희망 부수',
  },
  {
    name: '스탠다드 플랜',
    price: '220만 원부터',
    target: '메모·녹음·부분 원고를 책으로 정리하려는 경우',
    manuscript: '부분 원고, 녹취, 메모 자료',
    interview: '필요 시 전화·화상 상담',
    writing: '목차 구성, 원고 정리, 문장 다듬기',
    design: '사진 일부 포함 표지·내지 편집',
    printedBook: '무선 또는 양장 종이책, 인쇄비 별도 산정',
    webbook: '종이책 기본 범위와 별도이며, 웹북 상품 또는 지역 혜택 적용 여부 확인',
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
    printedBook: '양장·무선 등 목적에 맞는 종이책 제작, 인쇄비 별도',
    webbook: '종이책 기본 범위와 별도이며, 웹북 상품 또는 지역 혜택 적용 여부 확인',
    check: '인터뷰 횟수, 가족 보충 인터뷰, 자료 정리 범위',
  },
]

const businessPlan = {
  name: '비즈니스 플랜',
  price: '1,800만 원부터',
  target: '대표자·전문직·기관장 브랜딩 목적의 회고록',
  manuscript: '이력 자료, 강연 원고, 활동 기록',
  interview: '심화 인터뷰와 자료 검토',
  writing: '메시지 구조화, 장기 서사 설계, 편집 범위 확대',
  design: '브랜딩 목적의 표지·내지 맞춤 구성',
  printedBook: '고급 양장 또는 공식 출간 사양, 인쇄·유통 별도 상담',
  webbook: '전용 온라인 서가와 고화질 웹북 포함',
  royalty: '도서 유통 시 인세 45% 지급',
  libraryBenefit: '온라인 서가 첫해 이용 포함',
  check: '공개 범위, ISBN, 온라인서점 유통, 납품 일정',
}

const checklist = [
  '제작 목적: 부모님 생애사, 칠순·팔순 기념 선물, 가족 기념 서적, 커플 기념 서적 등',
  '원고 유무: 완성 원고, 손글씨, 녹음, 메모, 사진 자료, 가족의 기억 등',
  '인터뷰 가능 여부: 부모님 직접 인터뷰, 가족 보충 인터뷰, 전화·화상·대면 방식 등',
  '희망 결과물: 웹북만 제작, 종이책과 웹북 함께 제작, 아직 미정',
  '공개 범위: 전체 공개, 가족·지인용 프라이빗 링크, 아직 미정',
  '예상 부수: 웹북만 제작 또는 종이책 10부, 30부, 50부, 100부 등',
  '희망 제본: 무선, 양장, 아직 미정',
  '희망 일정과 대략적인 예산 범위',
  '대구·경북·경남 대면 상담 가능 여부',
]

const guideNotes = [
  '원고가 없어도 상담 가능합니다. 마이티북스가 묻고, 듣고, 정리합니다.',
  '부모님이 직접 글을 쓰지 못하셔도 인터뷰, 사진, 메모, 가족의 기억으로 시작할 수 있습니다.',
  '종이책을 인쇄하지 않고 가족끼리 확인할 수 있는 프라이빗 링크와 고화질 플립북으로만 제작할 수 있습니다.',
  '웹북 플랜은 지역과 관계없이 웹북 서비스의 첫해 이용이 상품에 포함됩니다.',
  '가족 소장용은 ISBN 없이 제작할 수 있습니다.',
  '칠순·팔순 기념 책, 가족 기념 서적, 커플 기념 서적도 제작 가능합니다.',
  '정식 출간을 원하면 ISBN과 온라인서점 유통도 상담 가능합니다.',
  '대구·경북·경남은 대면 상담, 그 외 지역은 비대면 진행이 가능합니다.',
  '개인 자료와 가족의 기억은 제작 목적 외 사용하지 않습니다.',
]

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: '홈', item: 'https://mightybooks.kr/' },
    { '@type': 'ListItem', position: 2, name: '출판서비스', item: 'https://mightybooks.kr/business/autobiography' },
    { '@type': 'ListItem', position: 3, name: '자서전·기념 도서 제작', item: 'https://mightybooks.kr/business/autobiography' },
  ],
}

function ContactButtons({ primaryLabel = '오픈채팅 문의' }) {
  const [isPhoneOpen, setIsPhoneOpen] = useState(false)

  return (
    <>
      <div className={styles.contactRow}>
        <a
          href={KAKAO_URL}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.ctaBtn}
          aria-label={`${primaryLabel} - 카카오톡 오픈채팅`}
        >
          {primaryLabel}
        </a>
        <button
          type="button"
          className={styles.ctaBtnGhost}
          onClick={() => setIsPhoneOpen(true)}
          aria-label="전화로 문의하기"
        >
          전화 문의
        </button>
        <a
          href={`mailto:${EMAIL_ADDRESS}`}
          className={styles.ctaBtnGhost}
          aria-label="이메일로 문의하기"
        >
          이메일 문의
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
            <p className={styles.heroService}>자서전 · 부모님 생애사 · 가족 기념 서적 제작</p>
            <h1 className={styles.heroTitle}>
              원고가 <span>없어도</span><br />
              괜찮습니다.
            </h1>
            <div className={styles.heroLine} />
            <p className={styles.heroCopy}>
              부모님의 생애와 가족의 시간을 인터뷰로 기록해 한 권의 책으로 만듭니다.
              마이티북스가 묻고, 듣고, 정리해 종이책 또는 공유 가능한 웹북으로 완성합니다.
            </p>
            <p className={styles.heroSubcopy}>
              부모님 자서전 · 칠순 기념 책 · 팔순 기념 책 · 커플 기념 서적 제작<br />
              1:1 맞춤형 출판 제작소, 대구·경북·경남 오프라인 상담, 전국 온라인 상담 가능
            </p>
            <div className={styles.heroBadges} aria-label="자서전 제작 상담 특징">
              {heroBadges.map(badge => <span key={badge}>{badge}</span>)}
            </div>
            <ContactButtons />
          </div>
          <div className={styles.heroVisual}>
            {/* TODO: 실제 자서전 원고, 사진, 제작 도서 이미지로 교체하기 쉽게 유지합니다. */}
            <div className={styles.heroVisualLabel}>원고 없이 인터뷰로도 진행 가능</div>
            <Image
              src="/image/home/here003.jpg"
              alt="책 제작 상담을 상징하는 마이티북스 도서 이미지"
              width={420}
              height={420}
              priority
            />
            <div className={styles.heroVisualNote}>
              <strong>프라이빗 링크 웹북 제작 {AUTOBIOGRAPHY_WEBBOOK_PRICE} · 종이책 150만 원부터</strong>
              <span>원고 분량, 디자인 범위, 인터뷰와 인쇄 여부에 따라 견적이 달라집니다.</span>
            </div>
            <p className={styles.heroVisualCaption}>
              꽃과 현수막은 지나가지만, 한 권의 책은 가족에게 오래 남습니다.
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
            자서전은 꼭 본인이 긴 원고를 써야만 시작되는 책이 아닙니다. 부모님 생애사 제작, 칠순·팔순 기념 책, 가족 소장용 책처럼 특별한 시점과 목적에 맞춰 제작할 수 있습니다.
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
              마이티북스는 완성 원고뿐 아니라 인터뷰, 사진, 메모, 가족의 기억을 확인한 뒤 책의 구조를 함께 잡습니다.
            </p>
            <ContactButtons />
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
            <h2 id="scope-heading" className={styles.sectionTitle}>프로 작가 문수림과 1:1<br /><em>맞춤형 진행</em></h2>
            <div className={styles.sectionLine} />
            <p className={styles.sectionDesc}>
              처음 전화를 받는 순간부터 인터뷰와 원고 정리, 편집·디자인 협의, 인쇄·발행 관리와 출간까지 문수림이 직접 담당합니다. 책의 목적과 독자를 먼저 확인하고, 필요한 작업 범위를 1:1로 맞춰 진행합니다.
              단순히 글만 옮기는 방식이 아니라, 책의 목적과 독자를 먼저 정하고 원고 정리, 편집, 디자인, 인쇄 상담까지 연결합니다.
              부모님이 직접 글을 쓰지 못하셔도 질문을 설계하고 이야기를 듣고 정리해, 가족이 읽기 좋은 책의 문장으로 다듬습니다.              
            </p>
            <div className={styles.scopeList}>
              {workScope.map(item => <span key={item}>{item}</span>)}
            </div>
          </div>
        </div>
      </section>

      <section className={styles.formatSection} ref={ref(3)} aria-labelledby="format-heading">
        <div className={styles.sectionHeader}>
          <span className={styles.tag}>Webbook / Printed Book</span>
          <h2 id="format-heading" className={styles.sectionTitle}>책은 종이로도,<br /><em>웹북으로도 남길 수 있습니다</em></h2>
          <p className={styles.sectionLead}>
            자서전과 기념도서는 종이책으로 제작할 수도 있고, 종이책을 인쇄하지 않고 프라이빗 링크와 고화질 플립북으로만 제작할 수도 있습니다.
            웹북 플랜은 가족과 지인이 확인할 수 있는 프라이빗 링크로 제공되며, 링크나 QR로 공유할 수 있습니다.
          </p>
        </div>
        <div className={styles.formatGrid}>
          <article className={styles.formatCard}>
            <span className={styles.formatNumber}>01</span>
            <h3>웹북으로만 제작</h3>
            <p>
              종이책을 인쇄하지 않고 저자 프로필, 도서 소개 페이지, 고화질 플립북과 공유 링크로 구성된 웹북을 제작합니다.
              준비된 원고를 웹용으로 최적화하고, 필요한 표지·내지 디자인 범위를 상담합니다.
            </p>
            <ul className={styles.formatList}>
              {[...PRIVATE_WEBBOOK_INCLUDED, '공유용 QR'].map(item => <li key={item}>{item}</li>)}
            </ul>
          </article>
          <article className={styles.formatCard}>
            <span className={styles.formatNumber}>02</span>
            <h3>종이책과 함께 제작</h3>
            <p>
              종이책 플랜은 인쇄할 책의 편집·디자인과 제작을 중심으로 구성합니다. 온라인 열람은 웹북 상품을 함께 선택했는지 또는 지역 혜택 대상인지에 따라 구분하며, 적용 범위는 상담에서 확인합니다.
            </p>
            <ul className={styles.formatList}>
              {['종이책 제작', '표지·내지 디자인', '인쇄 사양과 부수 협의', 'ISBN·유통 여부 상담', '온라인 열람은 상품·지역 혜택에 따라 구분'].map(item => <li key={item}>{item}</li>)}
            </ul>
          </article>
        </div>
        <Link className={styles.libraryLink} href="/library">웹북 샘플 보기</Link>
      </section>

      <section className={styles.localSection} ref={ref(4)} aria-labelledby="local-heading">
        <div className={styles.localInner}>
          <span className={styles.tag}>Nationwide Service</span>
          <h2 id="local-heading" className={styles.sectionTitle}>지역 기반 · <em>전국 진행 가능</em></h2>
          <p>
            마이티북스는 대구에 기반을 둔 1:1 출판 제작소입니다. 대구를 비롯해 인근 경북·경남 지역은 대면 상담이 가능하고,
            그 외 지역은 전화, 화상, 이메일, 카카오톡 자료 전달로 원고 없는 자서전 제작과 인터뷰 기반 자서전 제작을 진행합니다.
          </p>
          <p>
            대면 상담 가능 지역과는 별도로, 대구·경북에서 종이책 출간을 의뢰하고 결제한 고객에게는 완성된 책을 웹에서 열람할 수 있는 마이티북스 온라인 서가를 별도 제작비 없이 출간 후 1년간 제공합니다.
            프라이빗 링크를 가족이나 지인과 공유할 수 있으며, 별도의 EPUB·PDF 전자책을 제작하거나 판매용 공개 전자책을 제공하는 방식은 아닙니다. 종이책은 가족에게 나누고 멀리 있는 가족에게는 링크로 보여주고 싶을 때 활용할 수 있습니다.
          </p>
          <div className={styles.localKeywords}>
            {['대구 자서전 제작', '부모님 생애사 제작', '부모님 자서전', '칠순 기념 책', '팔순 기념 책', '가족 기념 서적', '커플 기념 서적', '결혼 기념 책', '가족 소장용 책', '원고 없는 자서전 제작', '인터뷰 기반 자서전 제작'].map(keyword => (
              <span key={keyword}>{keyword}</span>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.section} ref={ref(5)} aria-labelledby="process-heading">
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
          <ContactButtons />
        </div>
      </section>

      <section className={styles.sectionAlt} ref={ref(6)} aria-labelledby="types-heading">
        <div className={styles.sectionHeader}>
          <span className={styles.tag}>Book Types</span>
          <h2 id="types-heading" className={styles.sectionTitle}><em>다양한</em> 제작 형태</h2>
          <p className={styles.sectionLead}>
            부모님 생애사, 칠순·팔순 기념 책, 가족 기념 서적, 커플 기념 서적처럼 책을 만드는 이유는 다양합니다. 가족 소장용은 ISBN 없이도 제작할 수 있고, 정식 출간을 원하면 ISBN 등록과 온라인서점 유통 가능성도 함께 상담합니다.
          </p>
        </div>
        <div className={styles.typeGrid}>
          {bookTypes.map(type => <span key={type}>{type}</span>)}
        </div>
      </section>

      <section className={styles.gallerySection} ref={ref(7)} aria-labelledby="gallery-heading">
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

      <section className={styles.priceSection} ref={ref(8)} aria-labelledby="price-heading">
        <div className={styles.sectionHeader}>
          <span className={styles.tag}>Starting Price</span>
          <h2 id="price-heading" className={styles.sectionTitle}>원고 상태와 제작 방식에 맞는<br /><em>플랜을 선택할 수 있습니다</em></h2>
          <p className={styles.sectionLead}>
            종이책 없이 웹북으로만 제작하거나, 원고 정리와 인터뷰 범위에 따라 종이책 제작 플랜을 선택할 수 있습니다.
            아래 금액은 상담 전 참고용이며, 원고 분량, 사진 작업, 디자인 범위, 인터뷰 횟수, 인쇄 사양과 부수에 따라 최종 견적이 달라질 수 있습니다.
          </p>
        </div>
        <div className={styles.priceGrid}>
          {personalPlans.map(plan => (
            <article key={plan.name} className={styles.priceCard}>
              <h3>{plan.name}</h3>
              <div className={styles.price}>{plan.price}</div>
              <p>{plan.target}</p>
              {plan.condition && (
                <div className={styles.webbookCondition}>
                  {plan.condition.map(item => <strong key={item}>{item}</strong>)}
                </div>
              )}
              <dl>
                {plan.manuscript && <div><dt>원고 상태</dt><dd>{plan.manuscript}</dd></div>}
                <div><dt>인터뷰</dt><dd>{plan.interview}</dd></div>
                <div><dt>편집/집필</dt><dd>{plan.writing}</dd></div>
                <div><dt>디자인</dt><dd>{plan.design}</dd></div>
                <div><dt>종이책</dt><dd>{plan.printedBook}</dd></div>
                <div><dt>{plan.name === '웹북 플랜' || plan.name === '라이트 플랜' ? '웹북·프라이빗 링크' : '웹북·온라인 서가'}</dt><dd>{plan.webbook}</dd></div>
                <div><dt>상담 확인</dt><dd>{plan.check}</dd></div>
              </dl>
            </article>
          ))}
        </div>
        <aside className={styles.maintenanceNote}>
          <strong>웹북 상품과 대구·경북 종이책 출간 고객의 지역 혜택은 구분됩니다.</strong>
          <p>웹북 플랜과 비즈니스 플랜은 상품 구성으로 첫해 이용료가 포함됩니다. 대구·경북에서 종이책 출간을 결제한 고객은 지역 혜택으로 온라인 서가를 별도 제작비 없이 1년간 이용할 수 있습니다. 계속 유지할 경우 2년 차부터 연 99,000원의 이용료가 적용되며, 부가세 포함 금액입니다.</p>
        </aside>
        <p className={styles.priceNote}>
          웹북 플랜은 원고 편집과 웹북 최적화 범위를 확인하며, 표지·내지 디자인 강화 및 페이지 수 증가에 따라 추가 견적이 발생할 수 있습니다.
          종이책 플랜은 인쇄 부수와 제본 사양을 별도로 확인하며, 사진 정리, 추가 인터뷰, 장기 집필과 고급 제작이 필요한 경우 별도 범위가 적용될 수 있습니다.
        </p>
        <div className={styles.midCta}>
          <ContactButtons />
        </div>
      </section>

      <section className={styles.businessSection} ref={ref(9)} aria-labelledby="business-heading">
        <div className={styles.businessIntro}>
          <span className={styles.tag}>Business Publishing</span>
          <h2 id="business-heading" className={styles.sectionTitle}>대표자와 기관을 위한<br /><em>비즈니스 출판</em></h2>
          <p>{businessPlan.target}</p>
          <h3>{businessPlan.name}</h3>
          <div className={styles.businessPrice}>{businessPlan.price}</div>
          <p>대표자·전문직·기관장의 경험과 철학을 브랜드 자산으로 설계하는 회고록·전문서 출판입니다.</p>
          <ContactButtons primaryLabel="비즈니스 출판 상담" />
        </div>
        <div className={styles.businessDetails}>
          <h3>세부 제공 범위</h3>
          <dl>
            <div><dt>원고 상태</dt><dd>{businessPlan.manuscript}</dd></div>
            <div><dt>심층 인터뷰</dt><dd>{businessPlan.interview}</dd></div>
            <div><dt>서사 설계</dt><dd>{businessPlan.writing}</dd></div>
            <div><dt>브랜딩 디자인</dt><dd>{businessPlan.design}</dd></div>
            <div><dt>종이책</dt><dd>{businessPlan.printedBook}</dd></div>
            <div><dt>전용 온라인 서가와 웹북</dt><dd>{businessPlan.webbook}</dd></div>
            <div><dt>도서 유통</dt><dd>{businessPlan.royalty}</dd></div>
            <div><dt>온라인 서가 혜택</dt><dd>{businessPlan.libraryBenefit}</dd></div>
            <div><dt>상담 확인</dt><dd>{businessPlan.check}</dd></div>
          </dl>
        </div>
      </section>

      <section className={styles.sectionAlt} ref={ref(10)} aria-labelledby="checklist-heading">
        <div className={styles.split}>
          <div>
            <span className={styles.tag}>Before Contact</span>
            <h2 id="checklist-heading" className={styles.sectionTitle}>상담 전<br /><em>알려주시면 좋은 것</em></h2>
            <div className={styles.sectionLine} />
            <p className={styles.sectionDesc}>
              카톡이나 전화 문의 전에 누구의 이야기인지, 어떤 기념일에 맞추는지, 원고나 사진이 어느 정도 있는지 알려주시면 제작 방식과 예상 범위를 더 빠르게 안내할 수 있습니다.
            </p>
            <ContactButtons />
          </div>
          <ul className={styles.checkList}>
            {checklist.map(item => <li key={item}>{item}</li>)}
          </ul>
        </div>
      </section>

      <section className={styles.section} ref={ref(11)} aria-labelledby="guide-heading">
        <div className={styles.sectionHeader}>
          <span className={styles.tag}>Quick Guide</span>
          <h2 id="guide-heading" className={styles.sectionTitle}>많이 문의하시는 <em>핵심 안내</em></h2>
        </div>
        <div className={styles.guideGrid}>
          {guideNotes.map(note => <p key={note}>{note}</p>)}
        </div>
        <Link className={styles.textLink} href="/support/faq">더 자세한 공통 질문 보기</Link>
        <div className={styles.guideGrid}>
          {[
            ['자서전 제작 업체 선택 기준', '/reference/autobiography-gyeongsang', '지역과 제작 방식, 인터뷰·대필 범위를 기준으로 자서전 제작 업체를 비교하는 방법을 확인할 수 있습니다.', '자서전 제작 기준 확인하기'],
            ['마이티북스 출판 제작 레퍼런스', '/reference/mightybooks-publishing', '자서전 제작, 원고 정리, 편집, 디자인, 인쇄 제작 기준을 더 자세히 확인할 수 있습니다.', '자료 보기'],
            ['개인출판과 소량 책 제작 기준', '/reference/personal-publishing', '자서전 제작, 원고 정리, 편집, 디자인, 인쇄 제작 기준을 더 자세히 확인할 수 있습니다.', '자료 보기'],
          ].map(([title, href, description, linkLabel]) => (
            <p key={href}>
              <strong>{title}</strong><br />
              {description}
              <br />
              <Link className={styles.textLink} href={href}>{linkLabel}</Link>
            </p>
          ))}
        </div>
      </section>

      <section className={styles.privacyBox} ref={ref(12)} aria-label="개인정보와 비밀보장 안내">
        <h2>개인 자료는 제작 목적 안에서만 다룹니다</h2>
        <p>
          상담 내용과 전달받은 원고, 사진, 녹취 자료는 제작 목적 외 사용하지 않습니다.
          제작 사례 공개는 의뢰인의 동의가 있을 때만 진행하며, 비공개 가족 소장용 제작도 가능합니다.
        </p>
      </section>

      <section id="book-preview" className={styles.sectionAlt} ref={ref(13)} aria-label="실제 제작 자서전 내지 미리보기">
        <BookPreviewTrigger book={autobiographyPreview} />
      </section>

      <section className={styles.finderSection} ref={ref(14)} aria-labelledby="finder-heading">
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

      <section className={styles.finalCta} aria-labelledby="final-cta-heading">
        <span className={styles.tag}>Start Your Story</span>
        <h2 id="final-cta-heading">기억을 책으로 남기는 일을<br /><em>시작해 보세요</em></h2>
        <p>원고가 없어도 괜찮습니다. 현재 준비된 자료와 원하는 제작 방향을 확인한 뒤, 적합한 진행 방법부터 함께 정리합니다.</p>
        <ContactButtons primaryLabel="자서전 제작 문의하기" />
      </section>
    </div>
  )
}
