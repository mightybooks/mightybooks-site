import Image from 'next/image'
import Link from 'next/link'
import LibraryBookshelf from './LibraryBookshelf'
import styles from '../library.module.css'

export default function LibraryAuthorPage({ author, books }) {
  const channelNames = { homepage: '홈페이지', instagram: '인스타그램', blog: '블로그', youtube: '유튜브', facebook: '페이스북', threads: '스레드', x: 'X', brunch: '브런치', other: '외부 채널' }
  const pressPath = `/library/authors/${author.slug}/press`
  const adoptionPath = author.slug === 'sian' ? '/sian/adoption' : null
  const externalLinks = author.externalLinks?.filter((link) => {
    if (!author.pressEnabled) return true
    try { return new URL(link.url).pathname.replace(/\/$/, '') !== pressPath } catch { return true }
  })
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
          {author.socialLinks?.length > 0 && (
            <div className={styles.socialLinks}>
              {author.socialLinks.map((link) => (
                <a key={`${link.type}-${link.url}`} href={link.url} target="_blank" rel="noopener noreferrer"
                  aria-label={channelNames[link.type]} title={channelNames[link.type]}>
                  <SocialIcon type={link.type} />
                </a>
              ))}
            </div>
          )}
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
          {author.bio?.length > 0 && (
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
          {(adoptionPath || author.pressEnabled || externalLinks?.length > 0) && (
            <div className={styles.externalLinks}>
              {adoptionPath && (
                <Link href={adoptionPath} className={styles.externalLinkCard}>
                  <span><strong>유기토끼 입양 홍보</strong><small>가족을 기다리는 토끼들을 소개합니다.</small></span><b>→</b>
                </Link>
              )}
              {author.pressEnabled && (
                <Link href={pressPath} className={styles.externalLinkCard}>
                  <span><strong>언론 보도</strong><small>보도와 인터뷰를 확인합니다.</small></span><b>→</b>
                </Link>
              )}
              {externalLinks?.map((link) => (
                <a key={link.url} href={link.url} target="_blank" rel="noopener noreferrer" className={styles.externalLinkCard}>
                  <span><strong>{link.title}</strong>{link.description && <small>{link.description}</small>}</span><b>↗</b>
                </a>
              ))}
            </div>
          )}
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
      <div className={styles.authorBackRow}>
        <Link href="/library" className={styles.backLink}>← 저자 목록으로</Link>
      </div>
    </main>
  )
}

function SocialIcon({ type }) {
  const common = { width: 17, height: 17, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.8, strokeLinecap: 'round', strokeLinejoin: 'round', 'aria-hidden': true, focusable: 'false' }

  if (type === 'homepage') return <svg {...common}><path d="m3 11 9-8 9 8"/><path d="M5 10v10h14V10"/><path d="M9 20v-6h6v6"/></svg>
  if (type === 'instagram') return <svg {...common}><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.4" cy="6.6" r=".8" fill="currentColor" stroke="none"/></svg>
  if (type === 'youtube') return <svg {...common}><path d="M21 8.2a3 3 0 0 0-2.1-2.1C17 5.6 12 5.6 12 5.6s-5 0-6.9.5A3 3 0 0 0 3 8.2 31 31 0 0 0 2.6 12 31 31 0 0 0 3 15.8a3 3 0 0 0 2.1 2.1c1.9.5 6.9.5 6.9.5s5 0 6.9-.5a3 3 0 0 0 2.1-2.1 31 31 0 0 0 .4-3.8 31 31 0 0 0-.4-3.8Z"/><path d="m10 9 5 3-5 3Z" fill="currentColor" stroke="none"/></svg>
  if (type === 'facebook') return <svg {...common}><path d="M14 8h3V4h-3c-3 0-5 2-5 5v3H6v4h3v5h4v-5h3l1-4h-4V9c0-.6.4-1 1-1Z" fill="currentColor" stroke="none"/></svg>
  if (type === 'threads') return <svg {...common}><circle cx="12" cy="12" r="3.5"/><path d="M15.5 12v1.5a2.5 2.5 0 0 0 5 0V12a8.5 8.5 0 1 0-3.1 6.6"/></svg>
  if (type === 'x') return <svg {...common}><path d="M5 4l14 16M19 4 5 20"/></svg>
  if (type === 'other') return <svg {...common}><path d="M15 4h5v5"/><path d="m10 14 10-10"/><path d="M18 13v6a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h6"/></svg>
  return <svg {...common}><path d="M5 4h11a3 3 0 0 1 3 3v13H8a3 3 0 0 1-3-3Z"/><path d="M8 20a3 3 0 0 1 0-6h11M9 8h6M9 11h4"/></svg>
}
