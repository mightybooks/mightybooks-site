import LastMileGuidePage from '../components/LastMileGuidePage'
import styles from '../../reference/reference.module.css'

const path = '/support/personal-keepsake-book'
const title = '개인 소장용·가족 기념용 책만 만들 수 있나요? | 마이티북스'
const description = '개인 소장, 가족 증정, 부모님·퇴임 기념책을 필요한 만큼 제작할 때 기존 PDF·HWP·Word 활용, ISBN과 공개 범위를 판단하는 기준입니다.'
export const metadata = { title, description, alternates: { canonical: path }, openGraph: { title, description, url: path, type: 'article' } }

const faqs = [
  ['서점에 판매하지 않아도 책을 만들 수 있나요?', '가능합니다. 개인 소장과 가족·지인 증정 목적이라면 정식 서점 유통과 별개로 필요한 수량을 제작할 수 있습니다.'],
  ['가족 기념책에도 ISBN이 필요한가요?', '모든 소장·기념용 책에 ISBN이 필요한 것은 아닙니다. 공개와 유통 목적을 먼저 정한 뒤 등록 여부를 판단합니다.'],
  ['이미 만든 PDF를 사용할 수 있나요?', '인쇄 가능한 판형, 여백과 이미지 상태라면 활용할 수 있습니다. 수정이 많거나 판형이 다르면 원본 또는 재편집 범위를 확인합니다.'],
  ['HWP나 Word 원고도 기념책으로 만들 수 있나요?', '가능합니다. 원본 문서를 실제 책 판형, 문단·여백과 쪽번호에 맞게 조정한 뒤 제작할 수 있습니다.'],
  ['부모님이나 퇴임 기념책을 몇 권만 만들 수 있나요?', '필요한 소장·증정 수량을 기준으로 상담할 수 있으며 페이지, 제본과 파일 상태를 함께 확인합니다.'],
]

export default function PersonalKeepsakeBookPage() {
  return <LastMileGuidePage path={path} title={title} description={description} breadcrumb="개인 소장·기념용 책 제작" eyebrow="Private and Keepsake Books" h1="개인 소장용·가족 기념용 책만 만들 수 있나요?" answer="가능합니다. 책을 제작하는 것과 정식으로 유통하는 것은 같은 일이 아닙니다. 개인 소장·가족 증정·퇴임 기념 목적이라면 공개 범위와 필요한 수량을 먼저 정할 수 있습니다." faqs={faqs} related={[["기념책에 ISBN이 필요한지 확인", "/support/keepsake-book-isbn"],["10권·20권 소량 책 제작", "/support/small-run-book-printing"],["완성 PDF 소량 종이책 제작", "/support/pdf-to-printed-book"]]}>
    <div className={styles.lead}>이미 준비한 원고와 디자인을 활용할 수 있습니다. 정식 출간을 전제로 모든 공정을 추가하기보다 소장과 증정 목적에 필요한 제작 범위만 확인합니다.</div>
    <section className={styles.section}><h2>결론부터: 제작과 정식 유통은 별개로 선택할 수 있습니다</h2><p>가족사, 개인 기록, 부모님 기념 책과 퇴임 기념 책은 가까운 사람에게 나누거나 내부에서 보관하는 것만으로 목적이 충분할 수 있습니다. 이 경우 필요한 부수와 사양을 정해 책으로 제작할 수 있습니다.</p><p>서점 판매나 공개적인 도서 등록을 원할 때는 ISBN, 발행 정보와 유통 범위를 별도로 검토합니다.</p></section>
    <section className={styles.section}><h2>현재 가지고 있는 파일에서 시작합니다</h2><div className={styles.list}><div className={styles.listItem}><strong>완성 PDF</strong><span>판형·여백·표지와 이미지가 인쇄 조건에 맞는지 확인합니다.</span></div><div className={styles.listItem}><strong>HWP·HWPX 원고</strong><span>기존 내용을 살리고 단행본 판형과 맞쪽 구성에 필요한 부분만 조정합니다.</span></div><div className={styles.listItem}><strong>DOC·DOCX 원고</strong><span>문단·스타일·표와 각주 상태를 확인해 종이책용으로 재편집합니다.</span></div><div className={styles.listItem}><strong>Canva PDF</strong><span>최종 PDF를 점검하고 수정은 가능하면 Canva 원본에서 반영합니다.</span></div></div></section>
    <section className={styles.section}><h2>개인적인 내용일수록 공개 범위를 먼저 정합니다</h2><p>가족 연락처, 사적인 사진, 건강과 재산 이야기처럼 공개를 제한하고 싶은 내용이 많다면 정식 유통과 등록이 정말 필요한지 먼저 판단해야 합니다.</p><blockquote className={styles.quote}>한 권의 형태로 만드는 것과 불특정 독자에게 공개·판매하는 것은 서로 다른 결정입니다.</blockquote></section>
  </LastMileGuidePage>
}

