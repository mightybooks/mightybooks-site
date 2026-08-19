import Link from 'next/link'
import { notFound, permanentRedirect } from 'next/navigation'
import { getPublishedLibraryAuthorRedirect } from '@/lib/library-content'
import { getPublishedAuthorAdoptionFeature } from '@/lib/author-feature'
import { sianAdoptionRabbits } from '@/lib/sian-adoption'
import SianAdoptionRabbitCard from '@/app/library/components/SianAdoptionRabbitCard'
import styles from '@/app/library/components/SianAdoption.module.css'
import { createAuthorMetadata } from '@/lib/library-author-metadata'

export const dynamic = 'force-dynamic'

export async function generateMetadata({ params }) {
  const { authorSlug } = await params
  const feature = await getPublishedAuthorAdoptionFeature(authorSlug)

  if (!feature?.enabled) return {}

  return createAuthorMetadata({
    author: feature,
    canonicalPath: `/${feature.slug}/adoption`,
    title: `${feature.displayName} 유기토끼 입양 홍보 | 마이티북스`,
    description: `${feature.displayName} 작가가 입양을 돕고 있는 유기토끼들의 프로필과 구조 정보를 소개합니다.`,
  })
}

export default async function AdoptionPage({ params }) {
  const { authorSlug } = await params
  let feature = await getPublishedAuthorAdoptionFeature(authorSlug)

  if (!feature) {
    const currentSlug = await getPublishedLibraryAuthorRedirect(authorSlug)

    if (currentSlug) {
      const currentFeature = await getPublishedAuthorAdoptionFeature(currentSlug)
      if (currentFeature?.enabled) permanentRedirect(`/${currentSlug}/adoption`)
    }

    notFound()
  }

  if (!feature.enabled) notFound()

  return (
    <main className={styles.page}>
      <section className={styles.adoptionPage}>
        <header className={styles.header}>
          <p className={styles.eyebrow}>Sian · Rabbit Adoption</p>
          <h1>가족을 기다리는 토끼들</h1>
          <p className={styles.intro}>
            {feature.displayName} 작가가 입양을 돕고 있는 유기토끼들의 정보를 모았습니다.
            각 아이의 구조 정보와 현재 소개 내용을 확인해 주세요.
          </p>
          <Link href={`/${feature.slug}`} className={styles.backLink}>← {feature.displayName}의 서가로 돌아가기</Link>
        </header>

        <div className={styles.rabbitList}>
          {sianAdoptionRabbits.map((rabbit) => (
            <SianAdoptionRabbitCard key={rabbit.id} rabbit={rabbit} />
          ))}
        </div>
      </section>
    </main>
  )
}
