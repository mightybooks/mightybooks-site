import LastMileGuidePage from '../components/LastMileGuidePage'
import styles from '../../reference/reference.module.css'

const path = '/support/ebook-pdf-to-printed-book'
const title = '전자책 PDF를 종이책으로 만들 수 있을까요? | 마이티북스'
const description = '전자책 PDF를 10권 등 소량 종이책으로 만들 때 화면 비율과 단행본 판형, 글자 크기, 원본파일과 재편집 필요 여부를 판단하는 기준입니다.'
export const metadata = { title, description, alternates: { canonical: path }, openGraph: { title, description, url: path, type: 'article' } }

const faqs = [
  ['전자책 PDF만 있어도 종이책을 만들 수 있나요?', '가능할 수 있습니다. 먼저 현재 PDF의 페이지 비율과 희망 종이책 판형을 비교하고, 축소 후 글자 크기와 여백이 읽기에 적합한지 확인해야 합니다.'],
  ['전자책 PDF를 그대로 축소하면 안 되나요?', '비율이 비슷하고 글자가 충분히 크다면 활용할 수 있지만, 비율 차이가 크거나 글자가 작아지면 단순 축소보다 판형 변경 또는 재편집이 필요할 수 있습니다.'],
  ['전자책을 10권만 종이책으로 만들 수 있나요?', '소량 제작은 가능합니다. 실제 제작 방식과 비용은 페이지 수, 판형, 컬러 여부, 제본과 현재 PDF 상태를 함께 확인해 정합니다.'],
  ['HWP나 DOC 원본도 보내야 하나요?', '필수는 아니지만 원본이 있으면 글자 크기, 줄바꿈과 페이지 구성을 종이책 판형에 맞게 조정하기 훨씬 수월합니다.'],
  ['전자책 표지는 그대로 사용할 수 있나요?', '전자책은 앞표지 한 장만 사용하는 경우가 많지만 종이책에는 앞표지·책등·뒤표지가 연결된 인쇄용 펼침면이 필요합니다.'],
]

export default function EbookPdfToPrintedBookPage() {
  return <LastMileGuidePage path={path} title={title} description={description} breadcrumb="전자책 PDF 종이책 제작" eyebrow="Ebook PDF to Print" h1="전자책 PDF를 종이책으로 만들 수 있을까요?" answer="가능할 수 있습니다. 다만 화면용 페이지와 실제 단행본 판형의 비율이 다르면 단순 축소만으로는 읽기 좋은 종이책이 되지 않을 수 있어, 현재 비율과 희망 판형부터 비교해야 합니다." faqs={faqs} related={[["EPUB 전자책을 종이책으로 만드는 방법", "/support/epub-to-printed-book"],["완성 PDF로 소량 책 제작 기준", "/support/pdf-to-printed-book"],["A4 원고를 단행본 판형으로 바꾸는 방법", "/support/a4-to-book-format"]]}>
    <div className={styles.lead}>전자책으로 완성한 작업을 무조건 처음부터 다시 만들 필요는 없습니다. 현재 PDF를 종이책에 활용할 수 있는지 확인하고, 필요한 부분만 조정하는 것이 먼저입니다.</div>
    <section className={styles.section}><h2>결론부터: 페이지 비율과 글자 크기를 먼저 확인합니다</h2><p>전자책 PDF는 고정된 결과물이므로 가로와 세로를 독립적으로 자유롭게 바꿀 수 없습니다. 가로폭을 맞추면 세로가 판형을 넘을 수 있고, 세로를 맞추면 좌우 여백이 커질 수 있습니다.</p><p>전체를 단순 축소하면 모양은 유지되지만 본문 글자가 지나치게 작아질 수 있습니다. 희망 판형에서 실제 읽을 수 있는 크기인지가 제작 가능성을 가르는 기준입니다.</p></section>
    <section className={styles.section}><h2>현재 파일에 따라 제작 판단이 달라집니다</h2><div className={styles.list}>
      <div className={styles.listItem}><strong>PDF와 판형 비율이 비슷함</strong><span>여백과 글자 크기를 점검한 뒤 기존 모습을 활용할 가능성이 높습니다.</span></div>
      <div className={styles.listItem}><strong>비율이 다르지만 조정 가능</strong><span>여백이 늘어나거나 일부 페이지 위치를 보완하는 방식으로 검토합니다.</span></div>
      <div className={styles.listItem}><strong>비율 차이가 크고 글자가 작음</strong><span>다른 판형을 제안하거나 종이책답게 본문을 재편집해야 할 수 있습니다.</span></div>
      <div className={styles.listItem}><strong>HWP·DOC 원본 보유</strong><span>문장과 디자인 자산을 살리면서 판형에 맞게 줄바꿈과 페이지 구성을 다시 잡기 수월합니다.</span></div>
    </div></section>
    <section className={styles.section}><h2>EPUB 전자책과 PDF 전자책은 제작 출발점이 다릅니다</h2><div className={styles.list}>
      <div className={styles.listItem}><strong>EPUB</strong><span>본문 텍스트와 이미지를 다시 활용할 수 있어 종이책 판형에 맞게 재조판하기 쉬운 편입니다.</span></div>
      <div className={styles.listItem}><strong>PDF</strong><span>페이지가 고정된 결과물이므로 희망 판형과 기존 페이지의 비율, 수정 가능한 범위를 먼저 점검해야 합니다.</span></div>
    </div></section>
    <section className={styles.section}><h2>기존 모습을 유지할지, 종이책답게 재편집할지 정합니다</h2><p>전자책의 화면 구성을 그대로 보존하는 것이 중요하다면 현재 PDF에 맞는 판형을 찾는 방향이 적합할 수 있습니다. 휴대성과 일반적인 단행본 읽기 경험이 더 중요하다면 판형·글자·행간·여백을 새로 맞추는 재편집이 필요할 수 있습니다.</p><blockquote className={styles.quote}>PDF는 수정 가능한 원본이 아닙니다. 내용과 레이아웃 수정이 많아질수록 단순 제작이 아니라 별도 재편집 범위가 됩니다.</blockquote></section>
  </LastMileGuidePage>
}
