import LastMileGuidePage from '../components/LastMileGuidePage'
import styles from '../../reference/reference.module.css'

const path = '/support/epub-to-printed-book'
const title = 'EPUB 전자책을 종이책으로 만들 수 있나요? | 마이티북스'
const description = '리플로우형 EPUB의 본문과 이미지 자산을 활용해 종이책 판형에 맞게 다시 조판하고 소량 종이책으로 제작할 때 확인할 기준을 안내합니다.'
export const metadata = { title, description, alternates: { canonical: path }, openGraph: { title, description, url: path, type: 'article' } }

const faqs = [
  ['EPUB 파일만 있어도 종이책을 만들 수 있나요?', '일반적인 리플로우형 EPUB이라면 본문 텍스트와 이미지 자산을 추출해 종이책용 조판에 활용할 수 있습니다. 다만 파일 구조와 이미지 상태를 먼저 확인해야 합니다.'],
  ['EPUB을 HWP나 Word로 다시 작성해야 하나요?', '대부분 처음부터 다시 입력할 필요는 없습니다. EPUB 안의 원고를 활용해 HWP·DOCX 원본을 받은 경우와 비슷하게 종이책 판형에 맞춰 재조판합니다.'],
  ['EPUB 전자책과 종이책의 페이지 수는 같나요?', '같지 않을 수 있습니다. EPUB은 화면 크기에 따라 내용이 흐르는 형식이고, 종이책은 판형·글자 크기·행간·여백을 고정하므로 새 조판 결과에 따라 페이지 수가 정해집니다.'],
  ['EPUB 안의 사진도 종이책에 다시 사용할 수 있나요?', '이미지 파일이 정상적으로 포함되어 있다면 다시 배치할 수 있습니다. 인쇄 크기에 필요한 해상도와 색상, 누락 여부는 별도로 확인합니다.'],
  ['전자책 표지를 그대로 종이책 표지로 사용할 수 있나요?', '전자책 표지는 보통 앞표지 중심입니다. 종이책에는 앞표지뿐 아니라 페이지 수에 맞춘 책등과 뒷표지가 포함된 인쇄용 펼침면이 필요할 수 있습니다.'],
  ['EPUB 전자책을 10권만 종이책으로 만들 수도 있나요?', '가능합니다. 원고와 이미지 상태가 깨끗하면 재조판 뒤 비교적 빠르게 소량 제작으로 연결할 수 있으며, 사양과 비용은 판형·페이지 수·컬러 여부·제본에 따라 정해집니다.'],
]

export default function EpubToPrintedBookPage() {
  return <LastMileGuidePage path={path} title={title} description={description} breadcrumb="EPUB 종이책 제작" eyebrow="EPUB to Printed Book" h1="EPUB 전자책을 종이책으로 만들 수 있나요?" answer="가능합니다. 일반적인 리플로우형 EPUB은 본문 텍스트와 이미지 자산을 다시 활용할 수 있어 HWP·DOCX 원본을 받은 경우와 비슷하게 종이책용으로 재조판하기 비교적 수월합니다." faqs={faqs} related={[["전자책 PDF를 종이책으로 만드는 기준", "/support/ebook-pdf-to-printed-book"],["HWP 원고를 종이책으로 만드는 방법", "/support/hwp-to-printed-book"],["10권부터 시작하는 소량 책 제작", "/support/small-run-book-printing"]]}>
    <div className={styles.lead}>EPUB 화면을 그대로 인쇄하는 것이 아닙니다. EPUB 안의 원고와 이미지를 활용해 실제 종이책 판형에 맞는 읽기 흐름과 페이지를 새로 만듭니다.</div>
    <section className={styles.section}><h2>결론부터: EPUB의 원고와 이미지를 종이책 조판에 다시 활용합니다</h2><p>일반적인 리플로우형 EPUB은 화면 크기와 글자 설정에 따라 본문이 유동적으로 흐릅니다. 페이지가 고정된 PDF와 달리 텍스트와 이미지 자산을 다시 사용할 수 있어, 원고 상태가 깨끗하고 이미지가 정상적이면 비교적 빠른 소량 종이책 제작으로 이어질 수 있습니다.</p><p>다만 EPUB에 보이는 화면을 캡처하거나 그대로 인쇄하지는 않습니다. 추출한 원고와 자산을 실제 종이책 사양에 맞춰 새로 조판합니다.</p></section>
    <section className={styles.section}><h2>종이책 판형에 맞춰 읽기 조건을 새로 설정합니다</h2><div className={styles.grid}>{[['판형과 여백','완성할 책 크기와 안쪽·바깥쪽 여백을 인쇄와 제본 조건에 맞춥니다.'],['글자와 행간','종이에서 편하게 읽히도록 글자 크기, 행간과 문단 폭을 다시 정합니다.'],['장과 페이지','장 시작 위치와 쪽번호를 정하고 새 조판 결과에 따라 전체 페이지 수를 산출합니다.'],['이미지 배치','EPUB의 이미지 자산을 확인해 인쇄 해상도와 본문 흐름에 맞춰 다시 배치합니다.'],['본문 페이지 수','화면에 따라 흐르는 전자책과 고정 판형의 종이책은 페이지 수가 같지 않을 수 있습니다.'],['표지 펼침면','앞표지 중심인 전자책 표지에 책등과 뒷표지를 더해 인쇄용 표지를 준비합니다.']].map(([name,text],i)=><article className={styles.card} key={name}><div className={styles.cardNum}>{String(i+1).padStart(2,'0')}</div><h3>{name}</h3><p>{text}</p></article>)}</div></section>
    <section className={styles.section}><h2>리플로우형 EPUB과 고정형 EPUB은 확인 방법이 다릅니다</h2><p>리플로우형 EPUB은 본문과 이미지가 화면에 맞춰 다시 흐르므로 원고 자산을 활용한 종이책 재조판에 유리한 편입니다. fixed-layout EPUB은 전자책 안에서 페이지와 요소의 위치가 고정되어 있어 파일 구조와 실제 레이아웃, 추출 가능한 자산을 별도로 확인해야 합니다.</p><blockquote className={styles.quote}>fixed-layout EPUB이라고 제작할 수 없는 것은 아닙니다. 다만 일반적인 리플로우형 EPUB과 같은 방식으로 바로 판단하지 않고, 파일을 열어 구조와 레이아웃부터 점검합니다.</blockquote></section>
    <section className={styles.section}><h2>EPUB과 PDF는 종이책 제작의 출발점이 다릅니다</h2><div className={styles.list}>
      <div className={styles.listItem}><strong>EPUB</strong><span>본문 텍스트와 이미지를 다시 활용할 수 있어 종이책 판형에 맞게 재조판하기 쉬운 편입니다.</span></div>
      <div className={styles.listItem}><strong>PDF</strong><span>페이지가 고정된 결과물이므로 희망 판형과 기존 페이지의 비율, 수정 가능한 범위를 먼저 점검해야 합니다.</span></div>
    </div></section>
  </LastMileGuidePage>
}

