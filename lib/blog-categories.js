export const BLOG_CATEGORIES = Object.freeze({
  PUBLISHING_BUSINESS: 'business',
  PUBLISHED_BOOKS: 'books',
  FIVE_HUNDRED_FICTION: 'five_hundred_fiction',
})

export const BLOG_CATEGORY_LABELS = Object.freeze({
  [BLOG_CATEGORIES.PUBLISHING_BUSINESS]: '출판 비즈니스',
  [BLOG_CATEGORIES.PUBLISHED_BOOKS]: '출간 도서',
  [BLOG_CATEGORIES.FIVE_HUNDRED_FICTION]: '500자 소설',
})

export const BLOG_CATEGORY_OPTIONS = Object.freeze(
  Object.entries(BLOG_CATEGORY_LABELS).map(([value, label]) => ({ value, label }))
)

export const COMMERCIAL_BLOG_CATEGORIES = Object.freeze([
  BLOG_CATEGORIES.PUBLISHING_BUSINESS,
  BLOG_CATEGORIES.PUBLISHED_BOOKS,
])

export const isBlogCategory = (value) =>
  Object.prototype.hasOwnProperty.call(BLOG_CATEGORY_LABELS, value)
