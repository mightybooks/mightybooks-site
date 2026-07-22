import HeroSlider from '@/components/HeroSlider'
import ContactPhoneButton from '@/components/ContactPhoneButton'
import HomeProductionCases from './HomeProductionCases'
import styles from './page.module.css'
import Link from 'next/link'

export const metadata = {
  title: '마이티북스｜대구 출판사·자서전·시집·전문서 제작',
  description:
    '마이티북스는 대구를 기반으로 자서전, 회고록, 시집, 문집, 전문서, 실용서, 기관 소책자, 전자책·웹북의 기획·편집·디자인·인쇄 제작을 진행합니다.',
  alternates: { canonical: '/' },
  openGraph: {
    title: '마이티북스｜대구 출판사·자서전·시집·전문서 제작',
    description:
      '대구에서 전국까지 자서전, 시집, 전문서, 기관 소책자와 전자책의 기획·편집·디자인·제작을 진행합니다.',
    url: '/',
    type: 'website',
  },
}

const services = [
  { name: '자서전·회고록·기념도서', desc: '개인의 생애 기록부터 부모님 자서전, 기업·단체의 기념도서까지 인터뷰와 원고 정리부터 제작합니다.', href: '/business/autobiography', img: '/image/home/main002.avif' },
  { name: '시집·문집·에세이', desc: '개인 시집, 동인 문집, 수필집 등 원고의 성격과 분량에 맞춰 편집과 디자인을 진행합니다.', href: '/business/poetry', img: '/image/home/main003.jpg' },
  { name: '전문서·실용서·개인 출판', desc: '전문 지식, 교육 자료, 연구 성과와 실무 경험을 정식 단행본으로 제작합니다.', href: '/business/self-publishing', img: '/image/home/main001.avif' },
  { name: '기관·기업 소책자', desc: '기관 보고서, 사업 기록, 교육자료, 홍보책자와 성과집의 편집·디자인·인쇄를 진행합니다.', href: '/business/booklet', img: '/image/home/main005.png' },
  { name: '전자책·웹북', desc: '종이책 원고를 전자책이나 웹에서 읽을 수 있는 디지털 콘텐츠로 제작합니다.', href: '/business/epub', img: '/image/home/surimji_cover3d.png' },
]

const process = [
  ['01', '상담 및 원고 확인', '원고 분량과 상태, 제작 목적, 희망 일정을 확인합니다.'],
  ['02', '제작 범위와 견적 확정', '필요한 편집·디자인·인쇄 공정을 정하고 견적을 안내합니다.'],
  ['03', '원고 편집 및 디자인', '윤문, 교정, 내지 편집, 표지 디자인 등 합의된 작업을 진행합니다.'],
  ['04', '교정·수정', '시안을 확인하며 오탈자와 디자인 수정 사항을 반영합니다.'],
  ['05', '인쇄 및 납품, 유통', '최종 확인 후 인쇄하거나 전자책 파일을 제작해 결과물을 전달하고, 판매 유통을 체크해 드립니다.'],
]

const homeBreadcrumbJsonLd = {
  '@context': 'https://schema.org', '@type': 'BreadcrumbList',
  itemListElement: [{ '@type': 'ListItem', position: 1, name: '홈', item: 'https://xn--hz2b41ezwf0zf9tq.com/' }],
}

export default function Home() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(homeBreadcrumbJsonLd) }} />
      <HeroSlider />

      <section className={styles.intro} aria-labelledby="intro-title">
        <span className={styles.tag}>Mighty Books · Daegu</span>
        <h2 id="intro-title" className={styles.bigTitle}>마이티북스가 <em>하는 일</em></h2>
        <p className={styles.introLead}>마이티북스는 대구를 기반으로 운영되는 출판사이자 출판 제작업체입니다.</p>
        <p className={styles.introText}>자서전·회고록, 시집·문집, 전문서·실용서, 기관·기업 소책자의 기획과 원고 편집, 윤문, 교정, 표지 디자인, 내지 디자인, 인쇄 제작까지 진행합니다. 대구·경북·경남 지역은 방문 상담이 가능하며, 그 외 지역은 전국 비대면으로 출판 제작을 진행합니다.</p>
      </section>

      <section className={styles.business} id="business" aria-labelledby="services-title">
        <div className={styles.bizHeader}>
          <div><span className={styles.tag}>Publishing Service</span><h2 id="services-title" className={styles.bigTitle}>주요 <em>출판서비스</em></h2></div>
          <Link href="/support/diagnosis" className={styles.moreLink}>제작 상담 →</Link>
        </div>
        <div className={styles.bizGrid}>
          {services.map(item => (
            <Link key={item.href} href={item.href} className={styles.bizCard} style={{ backgroundImage: `url(${item.img})` }}>
              <div className={styles.bizOverlay} /><div className={styles.bizContent}><h3 className={styles.bizName}>{item.name}</h3><p className={styles.bizDesc}>{item.desc}</p><span className={styles.cardLink}>제작 안내 보기</span></div><span className={styles.bizArrow}>→</span>
            </Link>
          ))}
        </div>
      </section>

      <section className={styles.method} aria-labelledby="method-title">
        <div className={styles.sectionHeader}><span className={styles.tag}>How We Work</span><h2 id="method-title" className={styles.bigTitle}>원고와 상황에 맞춰 <em>필요한 공정만 선택합니다</em></h2><p className={styles.methodIntro}>처음부터 끝까지 맡길 수도 있고, 편집·디자인·인쇄 가운데 필요한 단계만 의뢰할 수도 있습니다.</p></div>
        <div className={styles.methodGrid}>
          <div><div className={styles.methodLead}>정해진 패키지를<br />일괄 적용하지 않습니다</div><p className={styles.methodCopy}>원고가 완성되어 있다면 디자인과 인쇄만, 원고 정리가 필요하다면 윤문과 교정부터 진행할 수 있습니다. 의뢰 목적과 직접 처리할 수 있는 범위를 먼저 확인해 실제로 필요한 작업을 정합니다.</p></div>
          <ul className={styles.methodList}>
            <li>원고의 완성도와 의뢰인이 직접 처리할 수 있는 범위를 먼저 확인합니다.</li>
            <li>기획, 원고 정리, 윤문, 교정, 표지 디자인, 내지 디자인, 인쇄 중 필요한 공정만 선택할 수 있습니다.</li>
            <li>일괄 제작도 가능하지만 모든 원고에 동일한 패키지를 적용하지 않습니다.</li>
            <li>개인 저자는 부족한 단계만, 출판사·기관·기업은 자체 출판사명과 ISBN을 유지하며 제작 실무만 의뢰할 수 있습니다.</li>
            <li>소량 제작, 정식 출판, 기존 원고 재편집 등 목적에 따라 범위를 다르게 구성합니다.</li>
            <li>대구·경북·경남 방문 상담 또는 전국 비대면 협의로 수정 사항을 세부적으로 반영합니다.</li>
          </ul>
        </div>
      </section>

      <section className={styles.portfolio} id="portfolio" aria-labelledby="cases-title">
        <div className={styles.portfolioHeader}><div className={styles.portfolioLeft}><div className={styles.portfolioBig}>WORK<br />CASE</div><div><span className={styles.tag}>Reference</span><h2 id="cases-title" className={styles.bigTitle}>실제 <em>제작 사례</em></h2></div></div><Link href="/portfolio/books" className={styles.moreLink}>출간 도서 전체 보기 →</Link></div>
        <HomeProductionCases />
      </section>

      <section className={styles.process} aria-labelledby="process-title">
        <div className={styles.sectionHeader}><span className={styles.tag}>Production Process</span><h2 id="process-title" className={styles.bigTitle}>상담부터 납품, 유통까지 <em>제작 진행 과정</em></h2></div>
        <ol className={styles.processGrid}>{process.map(([num, title, desc]) => <li key={num} className={styles.processItem}><span>{num}</span><h3>{title}</h3><p>{desc}</p></li>)}</ol>
      </section>

      <section className={styles.movie} id="about">
        <div className={styles.sectionHeader}>
          <span className={styles.tag}>Brand Film</span>
          <h2 className={styles.bigTitle}>BRAND <em>MOVIE</em></h2>
          <div className={styles.line} />
        </div>
        <div className={styles.videoWrap}>
          <div className={styles.videoDeco}>MIGHTY</div>
          <div className={styles.videoBox}>
            <iframe
              src="https://www.youtube.com/embed/videoseries?si=5aFOttsEYlzKqqgp&controls=0&showinfo=0&autoplay=1&loop=1&list=PLKkJY8RvI3dZqHgaXZ6GmUlJDuaU3culS"
              title="마이티북스 브랜드 영상"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      </section>

      <section className={styles.inquiry} id="contact" aria-labelledby="contact-title">
        <span className={styles.contactBrand}>Publishing Inquiry</span><h2 id="contact-title" className={styles.contactTitle}>제작할 책이 있다면<br /><em>원고 상태부터 확인해 드립니다</em></h2><p className={styles.contactSub}>자서전·시집·전문서·소책자 제작을 상담해 보세요. 원고 분량과 제작 목적을 알려주시면 필요한 공정을 안내합니다.</p><Link href="/support/diagnosis" className={styles.primaryButton}>출판 제작 문의하기 →</Link>
      </section>

      <section className={styles.contact} aria-labelledby="company-contact-title">
        <div className={styles.contactLeft}>
          <span className={styles.contactBrand}>Mighty Books</span>
          <h2 id="company-contact-title" className={styles.contactTitle}><em>Contact<br />US</em></h2>
          <div className={styles.contactEmail}>novelstudylab@naver.com</div>
          <p className={styles.contactSub}>
            대구 본사 방문상담 가능 · 전국 비대면 상담 가능<br />
            자서전 제작, 시집 제작, 문집 제작, 개인 출간 상담은 사전 문의 후 진행합니다.
          </p>
        </div>
        <div className={styles.contactRight}>
          {[
            ['상담 안내', <a key="diagnosis-contact" href="/support/diagnosis">출판상담 페이지 보기 →</a>],
            ['상담 방식', '대구 본사 방문상담 / 전국 비대면 상담'],
            ['상담시간', '월-금 09:00-17:00 / 주말, 공휴일 휴무'],
            ['연락처', <ContactPhoneButton key="phone-contact" styles={styles} />],
            ['이메일', <a key="email-contact" href="mailto:novelstudylab@naver.com">메일 보내기 →</a>],
            ['카카오톡', <a key="kakao-contact" href="https://open.kakao.com/me/mightybooks" target="_blank" rel="noopener noreferrer">문의하기 →</a>],
          ].map(([key, value]) => (
            <div key={key} className={styles.contactRow}>
              <div className={styles.contactKey}>{key}</div>
              <div className={styles.contactVal}>{value}</div>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}
