// app/page.js
import HeroSlider from '@/components/HeroSlider'
import StatsBar from '@/components/StatsBar'
import styles from './page.module.css'
import Link from 'next/link'

const books = [
  { num: '01', title: '500자 소설', author: '문수림 지음', genre: 'Fiction / Short Story', img: '/image/home/port001.jpg' },
  { num: '02', title: '토실토실 토끼를 안았습니다', author: '시안', genre: 'Essay / Animal', img: '/image/home/port002.jpg' },
  { num: '03', title: '나의 작은 스승들', author: '박샘 지음', genre: 'Education / Essay', img: '/image/home/port003.jpg' },
  { num: '04', title: '장르불문 관통하는 글쓰기', author: '문수림 지음', genre: 'Self-help / Writing', img: '/image/home/port004.jpg' },
  { num: '05', title: '내가 묻고, 산이 답하다', author: '정성교 지음', genre: 'Essay / Nature', img: '/image/home/port005.jpg' },
  { num: '06', title: '말의 비밀 - 프레임 전략', author: '이재연 지음', genre: 'Self-help / Talking', img: '/image/home/port006.jpg' },
]

const bizItems = [
  {
    icon: '🔎',
    name: '원고·출판 진단 유료상담',
    desc: '원고 상태와 출간 목적을 바탕으로 필요한 다음 단계를 점검합니다',
    img: '/image/home/main001.avif',
    href: '/support/diagnosis'
  },
  {
    icon: '✍️',
    name: '500자 글쓰기 워크숍',
    desc: '자기 경험과 원고, 브랜드를 500자로 압축해 설득하는 글쓰기 훈련입니다',
    img: '/image/home/main004.avif',
    href: '/workshop/500-character-fiction'
  },
  {
    icon: '📘',
    name: '목적형 도서 제작',
    desc: '자서전, 회고록, 기념 도서, 문집처럼 목적이 분명한 책을 제작합니다',
    img: '/image/home/main002.avif',
    href: '/business/autobiography'
  },
  {
    icon: '📚',
    name: '출간 사례와 포트폴리오',
    desc: '마이티북스가 만들어온 책과 제작 사례를 확인할 수 있습니다',
    img: '/image/home/main003.jpg',
    href: '/portfolio/books'
  },
]

export default function Home() {
  return (
    <>
      <HeroSlider />
      <StatsBar />

      {/* BRAND MOVIE */}
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

      {/* PORTFOLIO */}
      <section className={styles.portfolio} id="portfolio">
        <div className={styles.portfolioHeader}>
          <div className={styles.portfolioLeft}>
            <div className={styles.portfolioBig}>PORT<br/>FOLIO</div>
            <div>
              <span className={styles.tag}>출판 포트폴리오</span>
              <h2 className={styles.bigTitle} style={{textAlign:'left'}}>OUR <em>BOOKS</em></h2>
            </div>
          </div>
          <a href="/portfolio/books" className={styles.moreLink}>MORE →</a>
        </div>
        <div className={styles.bookGrid}>
          {books.map((b, i) => (
            <div key={i} className={styles.bookCard}>
              <div className={styles.bookImg}>
                <img src={b.img} alt={b.title} />
                <span className={styles.bookNum}>출판도서 {b.num}</span>
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

      {/* CONVERSION */}
      <section className={styles.business} id="business">
        <div className={styles.bizHeader}>
          <div>
            <span className={styles.tag}>Publishing Path</span>
            <h2 className={styles.bigTitle} style={{textAlign:'left'}}>마이티북스 <em>출판 서비스</em></h2>
          </div>
          <a href="/support/diagnosis" className={styles.moreLink}>원고 진단 유료상담 →</a>
        </div>
        <div className={styles.bizGrid}>
          {bizItems.map((b, i) => (
            <Link key={i} href={b.href ?? '#'} className={styles.bizCard} style={{ backgroundImage: `url(${b.img})` }}>
              <div className={styles.bizOverlay} />
              <div className={styles.bizContent}>
                <span className={styles.bizIcon}>{b.icon}</span>
                <div className={styles.bizName}>{b.name}</div>
                <div className={styles.bizDesc}>{b.desc}</div>
              </div>
              <div className={styles.bizArrow}>→</div>
            </Link>
          ))}
        </div>
      </section>

      {/* CONTACT */}
      <section className={styles.contact} id="contact">
        <div className={styles.contactLeft}>
          <span className={styles.contactBrand}>Mighty Books</span>
          <h2 className={styles.contactTitle}>Contact<br/>US</h2>
          <div className={styles.contactEmail}>novelstudylab@naver.com</div>
          <p className={styles.contactSub}>원고 검토와 출판 방향 상담은 유료상담 신청 후 순차적으로 안내합니다</p>
        </div>
        <div className={styles.contactRight}>
          {[
            [
              '검토 및 유료상담',
              <a key="diagnosis-contact" href="/support/diagnosis">
                상담 페이지 보기 →
              </a>
            ],
            ['상담시간', '월~금 09-17시 / 주말, 국·공휴일 휴무'],
            [
              '이메일',
              <a key="email-contact" href="mailto:novelstudylab@naver.com">
                원클릭 메일 발송 →
              </a>
            ],
            [
              '카카오 오픈톡',
              <a key="kakao-contact" href="https://open.kakao.com/me/mightybooks" target="_blank" rel="noopener noreferrer">
                지금 문의하기 →
              </a>
            ],
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
