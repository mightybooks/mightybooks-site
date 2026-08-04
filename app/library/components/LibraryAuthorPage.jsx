import Image from 'next/image'
import Link from 'next/link'
import LibraryBookshelf from './LibraryBookshelf'
import styles from '../library.module.css'

export default function LibraryAuthorPage({ author, books }) {
  return (
    <main className={styles.page}>
      <section className={styles.authorLibrary}>
        <aside className={styles.authorProfile}>
          <Image
            className={styles.profileImage}
            src={author.profileImage}
            width={600}
            height={600}
            sizes="(max-width: 720px) 72vw, 32vw"
            alt={`${author.displayName} 프로필`}
            priority
          />
          <p className={styles.eyebrow}>Author Library</p>
          <h1>{author.displayName}</h1>
          {author.penName && <p className={styles.penName}>필명 {author.penName}</p>}
          {author.occupation && <p className={styles.role}>{author.occupation}</p>}
          {(author.careerSections?.length > 0 || author.career?.length > 0) && (
            <div className={styles.profileBlock}>
              <h2>주요 이력</h2>
              {author.careerSections?.length > 0 ? (
                <div className={styles.careerSections}>
                  {author.careerSections.map((section) => (
                    <section className={styles.careerSection} key={section.title}>
                      <h3>{section.title}</h3>
                      <ul>
                        {section.items.map((item) => (
                          typeof item === 'string' ? (
                            <li key={item}>{item}</li>
                          ) : (
                            <li className={styles.careerPublication} key={item.work}>
                              <span>{item.organization}</span>
                              <span>{item.work}</span>
                              <span>{item.period}</span>
                            </li>
                          )
                        ))}
                      </ul>
                    </section>
                  ))}
                </div>
              ) : (
                <ul>{author.career.map((item) => <li key={item}>{item}</li>)}</ul>
              )}
            </div>
          )}
          {author.bio && (
            <div className={styles.profileBlock}>
              <h2>저자 소개</h2>
              {Array.isArray(author.bio) ? (
                <div className={styles.authorBio}>
                  {author.bio.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                </div>
              ) : (
                <p>{author.bio}</p>
              )}
            </div>
          )}
          <Link href="/library" className={styles.backLink}>← 저자 목록으로</Link>
        </aside>

        <div className={styles.shelfArea}>
          <header className={styles.shelfHeader}>
            <p className={styles.sectionKicker}>Books by {author.penName || author.displayName}</p>
            <h2>{author.displayName}의 서가</h2>
            <p>표지를 선택하면 책 소개와 샘플 열람 페이지로 이동합니다.</p>
          </header>
          <LibraryBookshelf books={books} />
        </div>
      </section>
    </main>
  )
}
