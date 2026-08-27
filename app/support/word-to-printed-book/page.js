import LastMileGuidePage from '../components/LastMileGuidePage'
import styles from '../../reference/reference.module.css'

const path = '/support/word-to-printed-book'
const title = 'Word DOC·DOCX 원고를 종이책으로 만들 수 있나요? | 마이티북스'
const description = 'Microsoft Word DOC·DOCX 원고를 실제 단행본 판형, 문단·행간·여백과 쪽번호에 맞게 편집해 종이책으로 제작하는 방법을 안내합니다.'
export const metadata = { title, description, alternates: { canonical: path }, openGraph: { title, description, url: path, type: 'article' } }

const faqs = [
  ['Word 파일만 보내도 책을 만들 수 있나요?', '가능합니다. DOC·DOCX 원본과 확인용 PDF를 바탕으로 원고 상태와 단행본 편집 범위를 확인합니다.'],
  ['Word 문서를 그대로 인쇄하면 안 되나요?', '실제 판형, 여백, 글자와 페이지 번호가 인쇄 조건에 맞다면 가능하지만 일반 문서 설정이라면 단행본용 조정이 필요할 수 있습니다.'],
  ['DOCX 원본이 있으면 수정하기 쉬운가요?', 'PDF만 있는 경우보다 문장, 문단과 페이지 설정을 조정하기 수월합니다. 다만 표·각주·그림이 복잡하면 별도 확인이 필요합니다.'],
  ['Word에서 보던 줄바꿈이 달라질 수 있나요?', '사용 글꼴과 작업 환경, 판형 변경에 따라 줄바꿈과 페이지 수가 달라질 수 있으므로 확인용 PDF와 최종 출력 결과를 비교합니다.'],
  ['각주와 참고문헌이 많은 원고도 가능한가요?', '가능합니다. 각주 연결, 참고문헌 표기, 장 제목과 본문 스타일의 일관성을 확인해 편집 범위를 정합니다.'],
]

export default function WordToPrintedBookPage() {
  return <LastMileGuidePage path={path} title={title} description={description} breadcrumb="Word 원고 종이책 제작" eyebrow="Word to Printed Book" h1="Word DOC·DOCX 원고를 종이책으로 만들 수 있나요?" answer="가능합니다. Word 문서도 일반 문서 작성과 단행본 조판은 다르지만, DOC·DOCX 원본이 있다면 판형·여백·문단과 쪽번호를 비교적 효율적으로 재편집할 수 있습니다." faqs={faqs} related={[["A4 원고 단행본 판형 변경", "/support/a4-to-book-format"],["HWP 원고를 종이책으로 만들기", "/support/hwp-to-printed-book"],["인쇄 직전 PDF 점검", "/support/print-ready-pdf-check"]]}>
    <div className={styles.lead}>Word에서 이미 완성한 원고를 다시 작성할 필요는 없습니다. 현재 스타일과 구조를 확인하고 종이책 제작에 필요한 조판 요소만 정리합니다.</div>
    <section className={styles.section}><h2>결론부터: DOC·DOCX 원본은 재편집에 유리합니다</h2><p>Word 원본에서는 문장과 문단, 스타일, 각주와 페이지 설정을 직접 조정할 수 있습니다. PDF만 남은 경우보다 판형 변경과 오탈자 보완이 수월합니다.</p><p>다만 기본 문서 설정으로 작성한 파일은 실제 단행본의 안쪽·바깥쪽 여백, 장 시작, 쪽번호와 문단 폭을 고려하지 않은 경우가 많습니다.</p></section>
    <section className={styles.section}><h2>Word 원고에서 특히 확인할 부분</h2><div className={styles.list}>
      <div className={styles.listItem}><strong>스타일 사용 상태</strong><span>제목과 본문이 일관된 스타일인지, 수동 서식이 반복됐는지 확인합니다.</span></div>
      <div className={styles.listItem}><strong>표·그림·텍스트 상자</strong><span>판형이 작아질 때 배치가 흐트러지거나 페이지 밖으로 나가지 않는지 살핍니다.</span></div>
      <div className={styles.listItem}><strong>각주·미주·참고문헌</strong><span>번호 연결과 페이지 이동 후 표기가 올바른지 점검합니다.</span></div>
      <div className={styles.listItem}><strong>글꼴과 줄바꿈</strong><span>최종 제작 환경에서 글꼴 대체나 줄바꿈 변화가 없는지 PDF로 대조합니다.</span></div>
    </div></section>
    <section className={styles.section}><h2>판형을 바꾸면 페이지 수와 문단 흐름도 달라집니다</h2><p>A4에서 단행본 크기로 바꾸면 같은 글자 크기를 유지하기 어렵고, 한 페이지에 들어가는 문장 수가 달라집니다. 표와 이미지, 장 제목 위치까지 함께 조정해야 실제 책다운 흐름을 만들 수 있습니다.</p><blockquote className={styles.quote}>Word 원본을 활용하되, 문서 화면을 그대로 축소하는 대신 독자가 읽을 종이책의 크기에서 다시 확인합니다.</blockquote></section>
  </LastMileGuidePage>
}

