import { redirect } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { getPublishedLibraryBookCardsBySlugs } from '@/lib/library-content'
import { getCurrentUserBooks } from '@/lib/library-access'
import { createSupabaseServerClient } from '@/lib/supabase-server'
import AccountLogoutButton from './AccountLogoutButton'
import styles from './account.module.css'

export const metadata = {
  title: '내 계정 | 마이티북스',
  robots: {
    index: false,
    follow: false,
  },
}

const statusLabels = {
  active: '이용 중',
  suspended: '이용 정지',
  withdrawn: '탈퇴 처리',
}

export default async function AccountPage() {
  const { user, books } = await getCurrentUserBooks()

  if (!user) {
    redirect('/account/login?next=/account')
  }

  const supabase = await createSupabaseServerClient()
  const { data: profile, error: profileError } = await supabase
    .from('profiles')
    .select('display_name,account_status')
    .eq('user_id', user.id)
    .maybeSingle()

  if (profileError) {
    console.error('[Account page] Profile lookup failed', {
      code: profileError.code,
      message: profileError.message,
    })

    throw new Error('계정 정보를 확인하지 못했습니다.')
  }

  const displayName =
    profile?.display_name ||
    user.user_metadata?.display_name ||
    '마이티북스 회원'
  const accountStatus = profile?.account_status || 'unknown'
  const bookContents = await getPublishedLibraryBookCardsBySlugs(
    books.map((book) => book.slug)
  )
  const contentBySlug = new Map(
    bookContents.map((content) => [content.slug, content])
  )
  const libraryEntries = books.map((book) => ({
    ...book,
    content: contentBySlug.get(book.slug) || null,
  }))

  return (
    <main className={styles.accountPage}>
      <div className={styles.accountShell}>
        <header className={styles.pageHeader}>
          <span className={styles.eyebrow}>My Page</span>
          <h1 className={styles.title}>내 계정</h1>
          <p className={styles.pageIntro}>
            {displayName}님의 계정과 이용 가능한 도서를 확인합니다.
          </p>
        </header>

        <section className={styles.accountPanel} aria-labelledby="account-info-title">
          <h2 id="account-info-title" className={styles.sectionTitle}>
            계정 정보
          </h2>

          <dl className={styles.details}>
            <div className={styles.detailRow}>
              <dt>표시 이름</dt>
              <dd>{displayName}</dd>
            </div>
            <div className={styles.detailRow}>
              <dt>로그인 이메일</dt>
              <dd>{user.email}</dd>
            </div>
            <div className={styles.detailRow}>
              <dt>계정 상태</dt>
              <dd className={styles.status}>
                {statusLabels[accountStatus] || '확인 필요'}
              </dd>
            </div>
          </dl>

          <div className={styles.accountActions}>
            <Link href="/" className={styles.secondaryAction}>
              홈으로
            </Link>
            <AccountLogoutButton />
          </div>
        </section>

        <section className={styles.librarySection} aria-labelledby="my-library-title">
          <div className={styles.sectionHeader}>
            <h2 id="my-library-title" className={styles.sectionTitle}>
              내 서재
            </h2>
            <p>저자로 연결되었거나 이용권이 등록된 도서입니다.</p>
          </div>

          {libraryEntries.length > 0 ? (
            <div className={styles.libraryGrid}>
              {libraryEntries.map((book) => {
                const content = book.content
                const title = content?.title || book.title
                const authorName = content?.authorName || '저자 정보 준비 중'

                return (
                  <article key={book.id} className={styles.bookCard}>
                    <div className={styles.coverFrame}>
                      {content?.coverImage ? (
                        <Image
                          src={content.coverImage}
                          alt={`${title} 표지`}
                          fill
                          sizes="(max-width: 600px) calc(100vw - 76px), (max-width: 900px) 42vw, 240px"
                          className={styles.bookCover}
                        />
                      ) : (
                        <div className={styles.coverPlaceholder}>
                          <span>표지 준비 중</span>
                        </div>
                      )}
                    </div>

                    <div className={styles.bookCardBody}>
                      <div className={styles.bookLabels}>
                        <span className={styles.accessBadge}>
                          {book.accessType === 'author' ? '저자 도서' : '이용 도서'}
                        </span>
                        {book.status === 'archived' && (
                          <span className={styles.archivedLabel}>보관된 도서</span>
                        )}
                      </div>

                      <h3>{title}</h3>
                      <p className={styles.bookAuthor}>{authorName}</p>
                      {content?.shortDescription && (
                        <p className={styles.bookDescription}>
                          {content.shortDescription}
                        </p>
                      )}

                      <Link
                        href={`/library/books/${book.slug}`}
                        className={styles.bookAction}
                      >
                        도서 보기
                      </Link>
                    </div>
                  </article>
                )
              })}
            </div>
          ) : (
            <div className={styles.emptyLibrary}>
              <p>아직 내 서재에 등록된 도서가 없습니다.</p>
              <p>
                도서 이용권이 등록되거나 저자 계정으로 연결되면 이곳에 표시됩니다.
              </p>
              <Link href="/library" className={styles.bookAction}>
                온라인 서가 둘러보기
              </Link>
            </div>
          )}
        </section>
      </div>
    </main>
  )
}
