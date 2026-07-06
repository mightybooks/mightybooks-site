import ReviewsGallery from './ReviewsGallery'
import styles from './reviews.module.css'

export const metadata = {
  title: '리뷰후기 – 마이티북스',
  description: '마이티북스를 통해 책을 만들고 상담한 저자들의 손편지, 상담 장면, 제작 현장, 원고와 소책자 기록을 모은 리뷰후기 갤러리입니다.',
  alternates: {
    canonical: '/portfolio/reviews',
  },
  openGraph: {
    title: '리뷰후기 – 마이티북스',
    description: '마이티북스를 통해 책을 만들고 상담한 저자들의 실제 흔적을 이미지로 모은 갤러리입니다.',
    images: ['/image/review/01review.webp'],
  },
}

export default function ReviewsPage() {
  return (
    <main className={styles.wrap}>
      <section className={styles.hero}>
        <span className={styles.tag}>Reviews</span>
        <h1 className={styles.title}>리뷰<em>후기</em></h1>
        <div className={styles.line} />
        <p className={styles.heroLead}>
          마이티북스를 통해 책을 만들고, 상담하고, 기록을 남긴 분들의 실제 흔적입니다.
          <br />
          손편지, 상담 장면, 제작 현장, 원고와 소책자까지 책이 완성되어 가는 과정을 이미지로 모았습니다.
        </p>
      </section>

      <ReviewsGallery />
    </main>
  )
}
