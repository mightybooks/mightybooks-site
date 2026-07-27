import Image from 'next/image'
import Link from 'next/link'
import styles from './libraryBookshelf.module.css'

const DESKTOP_BOOKS_PER_SHELF = 4
const MOBILE_BOOKS_PER_SHELF = 2
const DESKTOP_SHELF_COUNT = 3
const MAX_BOOK_COUNT = DESKTOP_BOOKS_PER_SHELF * DESKTOP_SHELF_COUNT

function groupBooks(books, booksPerShelf, minimumShelfCount) {
  const shelfCount = Math.max(minimumShelfCount, Math.ceil(books.length / booksPerShelf))

  return Array.from({ length: shelfCount }, (_, shelfIndex) =>
    books.slice(shelfIndex * booksPerShelf, (shelfIndex + 1) * booksPerShelf)
  )
}

function BookLink({ book }) {
  return (
    <div className={styles.bookSlot} role="listitem">
      <Link
        className={styles.book}
        href={`/library/books/${book.slug}`}
        aria-label={`${book.title} 도서 상세 보기`}
        title={book.title}
      >
        <span className={styles.coverWrap}>
          <Image
            className={styles.cover}
            src={book.coverImage}
            width={book.coverWidth}
            height={book.coverHeight}
            sizes="(max-width: 920px) 100px, 110px"
            alt={`${book.title} 표지`}
          />
        </span>
        <span className={styles.bookTitle}>{book.title}</span>
      </Link>
    </div>
  )
}

function ShelfRows({ groups, className }) {
  return (
    <div className={className}>
      {groups.map((books, shelfIndex) => (
        <div className={styles.shelfRow} key={shelfIndex}>
          <div className={styles.bookLine} role="list" aria-label={`${shelfIndex + 1}번째 선반`}>
            {books.map((book) => <BookLink book={book} key={book.slug} />)}
          </div>
          <div className={styles.shelfBoard} aria-hidden="true" />
        </div>
      ))}
    </div>
  )
}

export default function LibraryBookshelf({ books }) {
  const visibleBooks = books.slice(0, MAX_BOOK_COUNT)
  const desktopGroups = groupBooks(
    visibleBooks,
    DESKTOP_BOOKS_PER_SHELF,
    DESKTOP_SHELF_COUNT
  )
  const mobileGroups = groupBooks(
    visibleBooks,
    MOBILE_BOOKS_PER_SHELF,
    DESKTOP_SHELF_COUNT
  )

  return (
    <div className={styles.bookshelf}>
      <ShelfRows groups={desktopGroups} className={styles.desktopShelves} />
      <ShelfRows groups={mobileGroups} className={styles.mobileShelves} />
    </div>
  )
}
