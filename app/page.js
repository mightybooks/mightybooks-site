import HeroSlider from '@/components/HeroSlider'
import StatsBar from '@/components/StatsBar'
import ContactPhoneButton from '@/components/ContactPhoneButton'
import styles from './page.module.css'
import Link from 'next/link'

export const metadata = {
  title: '마이티북스 | 대구 자서전·시집·문집 제작 출판사',
  description:
    '대구 동구에 위치한 마이티북스는 자서전, 회고록, 시집, 문집 제작과 출판 상담을 진행하는 출판사입니다. 원고 정리, 편집, 디자인, 인쇄, 출간 상담을 함께합니다.',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: '마이티북스 | 대구 자서전·시집·문집 제작 출판사',
    description:
      '대구 동구에 위치한 마이티북스는 자서전, 회고록, 시집, 문집 제작과 출판 상담을 진행하는 출판사입니다.',
    url: '/',
    type: 'website',
  },
}

const books = [
  { num: '01', title: '500자소설', author: '문수림 지음', genre: 'Fiction / Short Story', img: '/image/home/port001.jpg' },
  { num: '02', title: '토실토실 토끼를 안았습니다', author: '시안 지음', genre: 'Essay', img: '/image/home/port002.jpg' },
  { num: '03', title: '나의 작은 스승들', author: '박쌤 지음', genre: 'Education / Essay', img: '/image/home/port003.jpg' },
  { num: '04', title: '장르불문 관통하는 글쓰기', author: '문수림 지음', genre: 'Writing', img: '/image/home/port004.jpg' },
  { num: '05', title: '내가 묻고, 산이 답하다', author: '정성교 지음', genre: 'Essay / Nature', img: '/image/home/port005.jpg' },
  { num: '06', title: '말의 비밀', author: '이재연 지음', genre: 'Self-help', img: '/image/home/port006.jpg' },
]

const ctaItems = [
  {
    name: '출판상담 받기',
    desc: '원고 상태, 출간 목적, 제작 방식, 비용 구조를 먼저 점검합니다.',
    img: '/image/home/main001.avif',
    href: '/support/diagnosis',
  },
  {
    name: '자서전·기념 도서 제작',
    desc: '부모님 자서전, 회고록, 퇴임기념집, 가족에게 남기는 책을 만듭니다.',
    img: '/image/home/main002.avif',
    href: '/business/autobiography',
  },
  {
    name: '시집·문집 제작',
    desc: '개인 시집, 동호회 문집, 가족 문집, 추모 문집 제작을 상담합니다.',
    img: '/image/home/main003.jpg',
    href: '/business/poetry',
  },
]

const subItems = [
  {
    name: '출간 도서 보기',
    desc: '마이티북스가 만든 책과 포트폴리오를 확인합니다.',
    href: '/portfolio/books',
    img: '/image/home/main005.png',
  },
  {
    name: '출판 가이드',
    desc: '책을 만들기 전 확인해야 할 기준을 정리했습니다.',
    href: '/support/guide',
    img: '/image/home/hero006.avif',
  },
  {
    name: '블로그',
    desc: '출판, 글쓰기, 책 제작 관련 글을 읽어볼 수 있습니다.',
    href: '/blog',
    img: '/image/home/hero004.avif',
  },
]

const homeBreadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    {
      '@type': 'ListItem',
      position: 1,
      name: '홈',
      item: 'https://xn--hz2b41ezwf0zf9tq.com/',
    },
  ],
}

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homeBreadcrumbJsonLd) }}
      />
      <HeroSlider />
      <StatsBar />

      <section className={styles.business} id="business">
        <div className={styles.bizHeader}>
          <div>
            <span className={styles.tag}>Publishing Service</span>
            <h2 className={styles.bigTitle} style={{ textAlign: 'left' }}>
              어떤 기록을 <em>책으로 만들까요</em>
            </h2>
            <p className={styles.contactSub}>
              자서전, 시집, 문집, 기념 도서를 기획부터 편집, 디자인, 제작까지 함께합니다.
            </p>
          </div>
          <a href="/support/diagnosis" className={styles.moreLink}>상담 안내 →</a>
        </div>
        <div className={styles.bizGrid}>
          {ctaItems.map((item) => (
            <Link key={item.href} href={item.href} className={styles.bizCard} style={{ backgroundImage: `url(${item.img})` }}>
              <div className={styles.bizOverlay} />
              <div className={styles.bizContent}>
                <div className={styles.bizName}>{item.name}</div>
                <div className={styles.bizDesc}>{item.desc}</div>
              </div>
              <div className={styles.bizArrow}>→</div>
            </Link>
          ))}
        </div>
      </section>

      <section className={styles.business} aria-labelledby="support-links">
        <div className={styles.bizHeader}>
          <div>
            <span className={styles.tag}>Reference</span>
            <h2 id="support-links" className={styles.bigTitle} style={{ textAlign: 'left' }}>
              도서·포트폴리오·블로그
            </h2>
          </div>
        </div>
        <div className={styles.bizGrid}>
          {subItems.map((item) => (
            <Link key={item.href} href={item.href} className={styles.bizCard} style={{ backgroundImage: `url(${item.img})` }}>
              <div className={styles.bizOverlay} />
              <div className={styles.bizContent}>
                <div className={styles.bizName}>{item.name}</div>
                <div className={styles.bizDesc}>{item.desc}</div>
              </div>
              <div className={styles.bizArrow}>→</div>
            </Link>
          ))}
        </div>
      </section>

      <section className={styles.portfolio} id="portfolio">
        <div className={styles.portfolioHeader}>
          <div className={styles.portfolioLeft}>
            <div className={styles.portfolioBig}>PORT<br />FOLIO</div>
            <div>
              <span className={styles.tag}>출간 도서</span>
              <h2 className={styles.bigTitle} style={{ textAlign: 'left' }}>OUR <em>BOOKS</em></h2>
            </div>
          </div>
          <a href="/portfolio/books" className={styles.moreLink}>MORE →</a>
        </div>
        <div className={styles.bookGrid}>
          {books.map((b) => (
            <div key={b.num} className={styles.bookCard}>
              <div className={styles.bookImg}>
                <img src={b.img} alt={b.title} />
                <span className={styles.bookNum}>출간도서 {b.num}</span>
              </div>
              <div className={styles.bookInfo}>
                <div className={styles.bookGenre}>{b.genre}</div>
                <div className={styles.bookTitle}>{b.title}</div>
                <div className={styles.bookAuthor}>{b.author}</div>
              </div>
            </div>
          ))}
        </div>
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

      <section className={styles.contact} id="contact">
        <div className={styles.contactLeft}>
          <span className={styles.contactBrand}>Mighty Books</span>
          <h2 className={styles.contactTitle}>Contact<br />US</h2>
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
          ].map(([k, v]) => (
            <div key={k} className={styles.contactRow}>
              <div className={styles.contactKey}>{k}</div>
              <div className={styles.contactVal}>{v}</div>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}
