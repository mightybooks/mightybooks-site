import styles from './trailer.module.css'

export const metadata = {
  title: '북트레일러 영상 | 마이티북스 출간 도서 소개',
  description: '마이티북스 출간 도서의 북트레일러 영상 모음 페이지',
}

const trailers = [
  {
    title: '문수림의『500자 소설』',
    subtitle: '',
    videoId: 'p9Ql9qqPrgo',
  },
  {
    title: '토실토실 토끼를 안았습니다',
    subtitle: '유기토끼가 나를 구조하다',
    videoId: 'XLT4U2KqxoE',
  },
  {
    title: '끄적? 끄덕!',
    subtitle: '',
    videoId: 'sGE7I2ooN0w',
  },
  {
    title: '말의 비밀',
    subtitle: '너 대화법으로 풀어내는 프레임 전략',
    videoId: '2AoESapRw18',
  },
  {
    title: '세일즈맨 불황탈출 마스터키',
    subtitle: '',
    videoId: '-5SbB6qR-ig',
  },
  {
    title: '장르불문 관통하는 글쓰기',
    subtitle: '',
    videoId: '3Mj-H_gsaBk',
  },
  {
    title: '내가 묻고, 산이 답하다',
    subtitle: '',
    videoId: 'bK9jbepDKGk',
  },
  {
    title: '육아가 자기 계발이 되는 윈윈육아',
    subtitle: '',
    videoId: '5JjEl_3kv3k',
  },
  {
    title: '허리디스크 탈출, 공감이 시작이다',
    subtitle: '',
    videoId: 'suQu8Zx9yfs',
  },
]

export default function TrailerPage() {
  return (
    <div className={styles.wrap}>

      {/* HERO */}
      <div className={styles.hero}>
        <span className={styles.tag}>Book Trailer</span>
        <h1 className={styles.title}>마이티북스 출간 도서 <em>북 트레일러</em></h1>
        <div className={styles.line} />
        <p className={styles.heroSub}>총 {trailers.length}편</p>
        <p className={styles.seoLine}>
          마이티북스에서 출간된 도서의 북트레일러 영상 모음입니다.
        </p>
      </div>

      {/* GRID */}
      <div className={styles.grid}>
        {trailers.map((t, i) => (
          <div key={i} className={styles.card}>
            <div className={styles.videoWrap}>
              <iframe
                src={`https://www.youtube.com/embed/${t.videoId}?rel=0&modestbranding=1`}
                title={t.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
            <div className={styles.info}>
              <div className={styles.label}>북트레일러</div>
              <div className={styles.bookTitle}>{t.title}</div>
              {t.subtitle && (
                <div className={styles.bookSub}>{t.subtitle}</div>
              )}
            </div>
          </div>
        ))}
      </div>

    </div>
  )
}