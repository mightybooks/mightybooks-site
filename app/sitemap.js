const baseUrl = 'https://xn--hz2b41ezwf0zf9tq.com'

const routes = [
  ['/', 1],
  ['/reference/mightybooks-publishing', 0.82],
  ['/reference/autobiography-gyeongsang', 0.8],
  ['/reference/personal-publishing', 0.78],
  ['/reference/poetry-publishing-daegu', 0.8],
  ['/reference/professional-book-publishing', 0.8],
  ['/reference/institutional-booklet-production', 0.8],
  ['/reference/ebook-webbook-guide', 0.8],
  ['/support/guide', 0.76],
  ['/support/autobiography-guide', 0.68],
  ['/support/poetry-book-guide', 0.62],
  ['/support/local-publishing-daegu', 0.62],
  ['/support/diagnosis', 0.72],
  ['/support/faq', 0.62],
  ['/support/submission', 0.56],
  ['/support/paid-consultation', 0.56],
  ['/business/autobiography', 0.82],
  ['/business/poetry', 0.72],
  ['/business/booklet', 0.7],
  ['/business/self-publishing', 0.68],
  ['/business/epub', 0.58],
  ['/business/planning', 0.58],
  ['/about/greeting', 0.58],
  ['/about/brand', 0.56],
  ['/about/location', 0.62],
  ['/portfolio/books', 0.64],
  ['/portfolio/reviews', 0.54],
  ['/portfolio/trailer', 0.5],
  ['/workshop/500-character-fiction', 0.52],
  ['/blog/500-fiction', 0.66],
  ['/support/education', 0.5],
  ['/support/personal-content-diagnosis', 0.5],
  ['/tools', 0.58],
  ['/tools/memoir-schedule', 0.68],
]

export default function sitemap() {
  return routes.map(([path, priority]) => ({
    url: `${baseUrl}${path}`,
    changeFrequency: path.startsWith('/reference') ? 'monthly' : 'weekly',
    priority,
  }))
}
