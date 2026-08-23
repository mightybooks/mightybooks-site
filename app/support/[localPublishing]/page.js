import Link from 'next/link'
import { notFound } from 'next/navigation'
import styles from '../../reference/reference.module.css'
import {
  commonScope,
  getLocalPublishingRegion,
  localPublishingRegions,
} from '../local-publishing-data'

const baseUrl = 'https://mightybooks.kr'

const knownRegionNames = {
  'local-publishing-gyeongsan': '경산',
  'local-publishing-gumi': '구미',
}

const process = [
  ['01', '목적과 자료 확인', '책을 읽을 사람과 활용 목적, 원고·사진·표·인터뷰 자료의 현재 상태를 확인합니다.'],
  ['02', '제작 범위 협의', '기획, 원고 정리, 교정, 디자인, 인쇄와 발행 가운데 필요한 공정과 사양을 정합니다.'],
  ['03', '편집·디자인', '합의한 목차와 방향에 따라 본문을 편집하고 표지·내지 시안을 제작합니다.'],
  ['04', '교정 확인', '저자나 담당자가 내용과 디자인을 확인하고 수정 의견을 한 차례씩 정리합니다.'],
  ['05', '인쇄·출간', '최종 승인한 파일로 책을 제작하고 협의한 경우 ISBN·유통·전자출판을 연결합니다.'],
]

const personalBookTypes = [
  ['시집·수필집·에세이', '완성한 작품을 선별하고 배열해 글의 분위기에 맞는 표지와 본문으로 개인 작품집을 만듭니다.'],
  ['자서전·회고록', '직접 쓴 원고뿐 아니라 메모, 사진과 인터뷰 자료를 바탕으로 한 사람의 생애와 경험을 정리합니다.'],
  ['전문서·실용서', '직업과 연구, 강의와 현장에서 쌓은 지식을 독자가 이해하고 활용할 수 있는 단행본으로 구성합니다.'],
  ['완성된 단행본 소설 원고', '구조적 개작 없이 제작 단계로 넘어갈 수 있는 완성 원고를 교정·교열하고 디자인·인쇄·출간합니다.'],
  ['소량 기념책·전자책', '가족과 지인에게 나눌 책, 개인 소장본과 PDF·EPUB·웹북 등 목적에 맞는 제작 방식을 검토합니다.'],
]

export const dynamicParams = false

export function generateStaticParams() {
  return localPublishingRegions.map(({ slug }) => ({ localPublishing: slug }))
}

export async function generateMetadata({ params }) {
  const { localPublishing } = await params
  const region = getLocalPublishingRegion(localPublishing)

  if (!region) return {}

  const pagePath = `/support/${region.slug}`

  return {
    title: region.title,
    description: region.description,
    alternates: { canonical: pagePath },
    openGraph: {
      title: region.title,
      description: region.description,
      url: pagePath,
      type: 'website',
    },
  }
}

function getRegionName(slug) {
  return getLocalPublishingRegion(slug)?.city || knownRegionNames[slug] || slug
}

function buildJsonLd(region) {
  const pageUrl = `${baseUrl}/support/${region.slug}`

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': `${pageUrl}#webpage`,
        url: pageUrl,
        name: region.title,
        description: region.description,
        inLanguage: 'ko-KR',
        about: [
          `${region.city} 개인 저서 출간`,
          `${region.city} 시집·수필집 제작`,
          `${region.city} 자서전·회고록 제작`,
          `${region.city} 전문서·실용서 출판`,
          ...region.books.map(([name]) => `${region.city} ${name}`),
        ],
        provider: { '@id': `${baseUrl}/#organization` },
      },
      {
        '@type': 'Service',
        '@id': `${pageUrl}#service`,
        name: `${region.city} 출판 제작 상담`,
        serviceType: '책 기획·편집·디자인·인쇄·발행·전자출판 상담',
        areaServed: { '@type': 'AdministrativeArea', name: region.city },
        provider: {
          '@type': 'Organization',
          '@id': `${baseUrl}/#organization`,
          name: '마이티북스',
          url: baseUrl,
        },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: '홈', item: `${baseUrl}/` },
          { '@type': 'ListItem', position: 2, name: '상담과 안내', item: `${baseUrl}/support/guide` },
          { '@type': 'ListItem', position: 3, name: `${region.city} 출판 안내`, item: pageUrl },
        ],
      },
    ],
  }
}

export default async function LocalPublishingRegionPage({ params }) {
  const { localPublishing } = await params
  const region = getLocalPublishingRegion(localPublishing)

  if (!region) notFound()

  const jsonLd = buildJsonLd(region)

  return (
    <div className={styles.wrap}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }}
      />

      <header className={styles.hero}>
        <nav className={styles.breadcrumb} aria-label="현재 위치">
          <Link href="/">홈</Link> &gt; 상담과 안내 &gt; {region.city} 출판 안내
        </nav>
        <span className={styles.tag}>{region.english} Publishing Guide</span>
        <h1 className={styles.title}>
          {region.h1}<br /><em>{region.h1Em}</em>
        </h1>
        <div className={styles.line} />
        <p className={styles.heroSub}>{region.intro}</p>
        <div className={styles.linkGrid}>
          <Link className={styles.linkCard} href="/support/diagnosis">내 책에 맞는 상담 경로 확인하기 →</Link>
          <Link className={styles.linkCard} href="/support/guide">상담과 제작 진행 방식 보기 →</Link>
        </div>
      </header>

      <main className={styles.content}>
        <div className={styles.lead}>
          {region.city}에서 개인 책을 만들 때 완성 원고가 반드시 필요한 것은 아닙니다. 시와 산문, 메모, 사진, 강의 자료처럼 지금 가진 콘텐츠에서 시작해 개인 저서의 목적과 독자를 정하고 필요한 제작 범위를 선택할 수 있습니다.
        </div>

        <section className={styles.section}>
          <h2>{region.accessHeading}</h2>
          <p className={styles.quote}>{region.accessQuote}</p>
          <div className={styles.list}>
            {region.accessDetails.map((detail, index) => (
              <div className={styles.listItem} key={detail}>
                <strong>{index === 0 ? '접근 기준' : '진행 방법'}</strong>
                <span>{detail}</span>
              </div>
            ))}
          </div>
        </section>

        <section className={styles.section}>
          <h2>{region.modeHeading}</h2>
          <p>
            상담은 방문과 비대면 중 편한 방식으로 시작할 수 있습니다. 방문을 원하면 대구 동구 동호로7길 66, 1층 102호의 안심역 인근 사무실을 사전 예약 후 이용할 수 있습니다.
            방문은 필수가 아니며 첫 상담부터 전화·카카오톡·이메일 등으로 진행하고, 원고와 자료 전달, 교정·디자인 시안 확인과 제작 협의도 원격으로 이어갈 수 있습니다.
          </p>
        </section>

        <section className={styles.section}>
          <h2>{region.city}에서 만들 수 있는 개인 저서</h2>
          <p>
            한 사람의 글과 경험이 주인공입니다. 판매용 출간인지 가족·지인 배포용인지, 종이책과 전자책 중 어떤 형태가 필요한지에 따라 편집과 제작 방법을 다르게 정합니다.
          </p>
          <div className={styles.grid}>
            {personalBookTypes.map(([title, description], index) => (
              <article className={styles.card} key={title}>
                <div className={styles.cardNum}>BOOK {index + 1}</div>
                <h3>{title}</h3>
                <p>{description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.section}>
          <h2>원고에서 출간까지 필요한 제작 범위</h2>
          <p>모든 공정을 일괄 적용하지 않습니다. 원고 상태와 책의 목적을 확인한 뒤 필요한 범위를 구분해 협의합니다.</p>
          <div className={styles.grid}>
            {commonScope.map(([title, description], index) => (
              <article className={styles.card} key={title}>
                <div className={styles.cardNum}>SCOPE {index + 1}</div>
                <h3>{title}</h3>
                <p>{description}</p>
              </article>
            ))}
          </div>
          <div className={styles.list}>
            {process.map(([number, title, description]) => (
              <div className={styles.listItem} key={number}>
                <strong>{number} · {title}</strong>
                <span>{description}</span>
              </div>
            ))}
          </div>
          <div className={styles.linkGrid}>
            <Link className={styles.linkCard} href="/business/autobiography">자서전·회고록 제작 서비스 →</Link>
            <Link className={styles.linkCard} href="/business/poetry">시집·문집·에세이 제작 서비스 →</Link>
            <Link className={styles.linkCard} href="/business/self-publishing">전문서·실용서 제작 서비스 →</Link>
            <Link className={styles.linkCard} href="/business/epub">전자책·웹북 제작 서비스 →</Link>
            <Link className={styles.linkCard} href="/support/guide">출판 제작 전체 과정 살펴보기 →</Link>
            <Link className={styles.linkCard} href="/reference/personal-publishing">개인출판·소량 책 제작 기준 →</Link>
          </div>
        </section>

        <section className={styles.section}>
          <h2>개인 저서 외에도, {region.city}의 이야기를 출판물로 남길 수 있습니다</h2>
          <p className={styles.quote}>{region.booksHeading}</p>
          <p>{region.booksIntro}</p>
          <div className={styles.grid}>
            {region.books.map(([title, description], index) => (
              <article className={styles.card} key={title}>
                <div className={styles.cardNum}>{String(index + 1).padStart(2, '0')}</div>
                <h3>{title}</h3>
                <p>{description}</p>
              </article>
            ))}
          </div>
          <div className={styles.subsection}>
            <h3>{region.localHeading}</h3>
            <p>{region.localText}</p>
          </div>
          <div className={styles.linkGrid}>
            <Link className={styles.linkCard} href="/business/booklet">기관·기업 책자 제작 서비스 →</Link>
            <Link className={styles.linkCard} href="/reference/institutional-booklet-production">기관·지역 기록물 제작 기준 →</Link>
          </div>
        </section>

        <section className={styles.section}>
          <h2>{region.city}에 이어서 살펴볼 지역 출판 안내</h2>
          <p>생활권이나 기록 주제가 맞닿은 지역의 제작 방향도 함께 비교해 보세요.</p>
          <div className={styles.linkGrid}>
            {region.related.map((slug) => (
              <Link className={styles.linkCard} href={`/support/${slug}`} key={slug}>
                {getRegionName(slug)} 출판 안내 →
              </Link>
            ))}
            <Link className={styles.linkCard} href="/support/local-publishing-daegu">대구 출판 안내 →</Link>
            <Link className={styles.linkCard} href="/support/local-publishing-gumi">구미 출판 안내 →</Link>
          </div>
        </section>

        <div className={styles.cta}>
          <div className={styles.ctaText}>{region.cta}</div>
          <div className={styles.ctaBtns}>
            <Link href="/support/diagnosis" className={styles.ctaBtn}>출판 제작 상담 시작하기</Link>
            <Link href="/support/guide" className={styles.ctaBtnGhost}>상담과 제작 진행 방식 보기</Link>
          </div>
        </div>
      </main>
    </div>
  )
}
