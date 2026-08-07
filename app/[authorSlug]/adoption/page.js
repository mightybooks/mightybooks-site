import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getPublishedLibraryAuthorPage } from '@/lib/library-content'
import { sianAdoptionRabbits } from '@/lib/sian-adoption'
import SianAdoptionRabbitCard from '@/app/library/components/SianAdoptionRabbitCard'
import styles from '@/app/library/library.module.css'

export const dynamic = 'force-dynamic'

export async function generateMetadata({ params }) {
  const { authorSlug } = await params
  if (authorSlug !== 'sian') return {}

  return {
    title: '유기토끼 입양 홍보 | 시안 | 마이티북스',
    description: '시안 작가가 입양을 돕고 있는 유기토끼들의 프로필과 구조 정보를 소개합니다.',
    alternates: {
      canonical: '/sian/adoption',
    },
  }
}

export default async function SianAdoptionPage({ params }) {
  const { authorSlug } = await params
  if (authorSlug !== 'sian') notFound()

  const result = await getPublishedLibraryAuthorPage(authorSlug)
  if (!result) notFound()

  return (
    <main className={styles.page}>
      <section className={styles.adoptionPage}>
        <header className={styles.adoptionHeader}>
          <p className={styles.eyebrow}>Sian · Rabbit Adoption</p>
          <h1>가족을 기다리는 토끼들</h1>
          <p>
            시안 작가가 입양을 돕고 있는 유기토끼들의 정보를 모았습니다.
            각 아이의 구조 정보와 현재 소개 내용을 확인해 주세요.
          </p>
          <Link href="/sian" className={styles.adoptionAuthorLink}>
            ← 시안의 서가로 돌아가기
          </Link>
        </header>

        <div className={styles.adoptionRabbitList}>
          {sianAdoptionRabbits.map((rabbit) => (
            <SianAdoptionRabbitCard key={rabbit.id} rabbit={rabbit} />
          ))}
        </div>
      </section>
    </main>
  )
}
