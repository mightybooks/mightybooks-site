import styles from './books.module.css'

export const metadata = {
  title: '기획 출간 도서 및 자비출판 사례 | 마이티북스 출판 포트폴리오',
  description: '마이티북스의 기획출판 및 자비출판 도서 목록. 실제 출간 사례를 통해 책 제작 과정과 결과를 확인할 수 있습니다.',
}

const books = [  
  {
    title: '500자 소설',
    subtitle: '',
    author: '문수림',
    status: '2026년 3월 출간',
    cover: '/image/list/list001.jpg',
    brand: '수림 스튜디오',
  },
  {
    title: '글루공부',
    subtitle: '',
    author: '',
    status: '2026년 3월 출간',
    cover: '/image/list/list002.jpg',
    brand: '마이티북스',
  },
  {
    title: '프네우마',
    subtitle: '선악과를 먹은 인공지능',
    author: '',
    status: '2026년 12월 출간예정',
    cover: null,
    brand: '수림 스튜디오',
  },  
  {
    title: '토실토실 토끼를 안았습니다',
    subtitle: '유기토끼가 나를 구조하다',
    author: '시안',
    status: '2025년 10월 출간',
    cover: '/image/list/list003.jpg',
    brand: '사이의 순간들',
  },
  {
    title: '말의 비밀',
    subtitle: '너 대화법으로 풀어내는 프레임 전략',
    author: '이재연',
    status: '2025년 8월 출간',
    cover: '/image/list/list004.jpg',
    brand: '마이티북스',
  },
  {
    title: '장르불문 관통하는 글쓰기',
    subtitle: '교보문고 MD의 선택, 예스24 글쓰기 Top 100 연속 7주',
    author: '문수림',
    status: '2024년 10월 출간',
    cover: '/image/list/list005.jpg',
    brand: '마이티북스',
  },
  {
    title: '나의 작은 스승들',
    subtitle: '예스24 감성/가족 에세이 top20 3주',
    author: '박샘',
    status: '2025년 5월 출간',
    cover: '/image/list/list006.jpg',
    brand: '사이의 순간들',
  },
  {
    title: '세일즈맨 불황탈출 마스터키',
    subtitle: 'KASH를 잡아야 CASH도 잡힌다!',
    author: '서운화, 문수림',
    status: '2025년 6월 출간',
    cover: '/image/list/list007.jpg',
    brand: '마이티북스',
  },
  {
    title: '끄적? 끄덕!',
    subtitle: '교보문고 시/에세이 분야 Top 100. 증쇄 확정',
    author: '정성교',
    status: '2025년 9월 출간',
    cover: '/image/list/list008.jpg',    
    brand: '마이티북스',
  },  
  {
    title: '소설 상림월',
    subtitle: '사색하는 숲에 뜬 달',
    author: '민진',
    status: '2025년 9월 출간',
    cover: '/image/list/list009.jpg',
    brand: '장미와 여우',
  },
  {
    title: '문수림의 20에서 30까지',
    subtitle: 'Epub전자책',
    author: '문수림',
    status: '2025년 2월 출간',
    cover: '/image/list/list010.jpg',
    brand: '장미와 여우',
  },
  {
    title: '내가 묻고 산이 답하다',
    subtitle: '《SBS 일요특선 다큐멘터리》에 저자 출연',
    author: '정성교',
    status: '2024년 8월 출간',
    cover: '/image/list/list011.jpg',
    brand: '마이티북스',
  },
  {
    title: '주왕산 사계',
    subtitle: '숨은 비경, 숨겨진 전설의 실체',
    author: '',
    status: '2025년 3월 출간',
    cover: '/image/list/list012.jpg',
    brand: '마이티북스',
  },
  {
    title: '녹색 황금을 찾아 떠나는 대만차 기행',
    subtitle: '대만 여행에세이 분야 스테디셀러',
    author: '산우 이은주',
    status: '2025년 1월 출간',
    cover: '/image/list/list013.jpg',
    brand: '마이티북스',
  },
  {
    title: '육아가 자기 계발이 되는 원원육아',
    subtitle: '유튜브 채널 <김교수의 세가지>에 저자 출연',
    author: '도키코치 황선희',
    status: '2023년 9월 출간',
    cover: '/image/list/list014.jpg',
    brand: '마이티북스',
  },  
  {
    title: '나는 청각장애인이다',
    subtitle: '스테디셀러',
    author: '오재훈',
    status: '2023년 7월 출간',
    cover: '/image/list/list015.jpg',
    brand: '마이티피플',
  },

  {
    title: '동성로 낭만 다이어리',
    subtitle: '시인 김사람 시집',
    author: '김사람',
    status: '2025년 1월 출간',
    cover: '/image/list/list016.jpg',
    brand: '장미와 여우',
  },
  {
    title: '마하의 시간을 살다',
    subtitle: '배수 시인 시집',
    author: '배수',
    status: '2024년 11월 출간',
    cover: '/image/list/list017.jpg',
    brand: '장미와 여우',
  },
  {
    title: '새들이 울었던 자리가 있다 (개정판)',
    subtitle: '스테디셀러 시집',
    author: '주희',
    status: '2023년 5월 출간',
    cover: '/image/list/list018.jpg',
    brand: '장미와 여우',
  },
  {
    title: '허리디스크 탈출, 공감이 시작이다',
    subtitle: '예스24 건강분야 Top 100 연속 2주',
    author: '이수호',
    status: '2022년 9월 출간',
    cover: '/image/list/list019.jpg',
    brand: '마이티북스',
  },
  {
    title: '마음받침',
    subtitle: '퇴근길에 만난 안데르센',
    author: '윤지영',
    status: '2022년 5월 출간',
    cover: '/image/list/list020.jpg',
    brand: '마이티북스',
  },
  {
    title: '이야기를 담은 평창의 옛 풍경',
    subtitle: '평창 지역민이 쓴 평창의 역사',
    author: '김인섭',
    status: '2024년 5월 출간',
    cover: '/image/list/list021.jpg',
    brand: '마이티북스',
  },
  {
    title: '오십에 식당',
    subtitle: '빈자에게도 공정한 전쟁 — 완판 품절',
    author: '이경태',
    status: '2023년 12월 출간',
    cover: '/image/list/list022.jpg',
    brand: '마이티피플',
  },
  {
    title: '동방의 별',
    subtitle: '22대 국회의원 출마자 자서전',
    author: '박경철',
    status: '2023년 11월 출간',
    cover: '/image/list/list023.jpg',
    brand: '마이티피플',
  },
  {
    title: '도시탈출 비근로소득의 시작',
    subtitle: '경제 에세이 서적',
    author: '유장수',
    status: '2024년 1월 출간',
    cover: '/image/list/list024.jpg',
    brand: '마이티북스',
  },
]

const brandColors = {
  '마이티북스': '#e8001e',
  '마이티피플': '#c0392b',
  '장미와 여우': '#8e44ad',
  '사이의 순간들': '#2980b9',
  '수림 스튜디오': '#27ae60',
}

export default function BooksPage() {
  return (
    <div className={styles.wrap}>

      {/* HERO */}
      <div className={styles.hero}>
        <span className={styles.tag}>Portfolio</span>
        <h1 className={styles.title}>마이티북스 <em>출간 도서</em><br/></h1>
        <div className={styles.line} />
        <p className={styles.heroSub}>총 {books.length}권</p>
      </div>
        <section className={styles.seoIntro}>
          <p>
            마이티북스는 기획출판과 자비출판을 통해 다양한 분야의 도서를 출간해온 출판사입니다.<br/>
            아래는 실제 책 출간 사례로, 원고 기획, 편집, 디자인, 제작까지 진행된 포트폴리오입니다.
          </p>
        </section>

      {/* GRID */}
      <div className={styles.grid}>
        {books.map((book, i) => (
          <div key={i} className={styles.card}>
            {/* 표지 */}
            <div
              className={styles.cover}
              style={{ '--brand-color': brandColors[book.brand] ?? '#e8001e' }}
            >
              {book.cover ? (
                <img src={book.cover} alt={book.title} />
              ) : (
                <div className={styles.coverPlaceholder}>
                  <div className={styles.placeholderTitle}>{book.title}</div>
                  {book.status && (
                    <div className={styles.placeholderStatus}>{book.status}</div>
                  )}
                </div>
              )}
              {/* 브랜드 뱃지 */}
              <div
                className={styles.brandBadge}
                style={{ background: brandColors[book.brand] ?? '#e8001e' }}
              >
                {book.brand}
              </div>
            </div>

            {/* 정보 */}
            <div className={styles.info}>
              <div className={styles.bookTitle}>{book.title}</div>
              {book.subtitle && (
                <div className={styles.bookSub}>{book.subtitle}</div>
              )}
              {book.author && (
                <div className={styles.bookAuthor}>{book.author} 지음</div>
              )}
              {book.status && (
                <div className={styles.bookStatus}>{book.status}</div>
              )}
            </div>
          </div>
        ))}
      </div>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ItemList",
              "name": "마이티북스 출간 도서 목록",
              "itemListElement": books.map((book, i) => ({
                "@type": "Book",
                "position": i + 1,
                "name": book.title,
                "author": book.author || "미상",
                "publisher": "마이티북스"
              }))
            })
          }}
        />
    </div>
  )
}