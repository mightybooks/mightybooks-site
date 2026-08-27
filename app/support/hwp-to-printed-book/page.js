import LastMileGuidePage from '../components/LastMileGuidePage'
import styles from '../../reference/reference.module.css'

const path = '/support/hwp-to-printed-book'
const title = '한글 HWP·HWPX 파일을 종이책으로 만들 수 있나요? | 마이티북스'
const description = '한글 HWP·HWPX 원고를 단행본 판형과 맞쪽 여백, 글자·행간·쪽번호에 맞게 재편집해 소량 종이책으로 만드는 기준을 안내합니다.'
export const metadata = { title, description, alternates: { canonical: path }, openGraph: { title, description, url: path, type: 'article' } }

const faqs = [
  ['한글 파일 그대로 책을 인쇄하면 안 되나요?', '문서가 실제 판형, 맞쪽 여백과 페이지 번호까지 인쇄 조건에 맞게 설정됐다면 활용할 수 있지만 일반 A4 문서는 단행본 조판 점검이 필요합니다.'],
  ['HWP와 HWPX 중 어떤 파일을 보내야 하나요?', '현재 편집 가능한 원본 형식과 확인용 PDF를 함께 준비하면 글꼴·줄바꿈 차이를 비교하기 좋습니다.'],
  ['한글 원고가 있으면 PDF만 있을 때보다 쉬운가요?', '네. 문장, 문단과 페이지 설정을 직접 조정할 수 있어 판형 변경과 오탈자 수정이 비교적 빠르고 효율적입니다.'],
  ['A4 원고는 책 크기로 자동 변환되나요?', '자동 축소만으로는 글자 크기, 행간, 문단 폭과 페이지 구성이 적절해지지 않으므로 단행본 판형에 맞춘 재편집이 필요할 수 있습니다.'],
  ['사진과 표가 많은 HWP도 가능한가요?', '가능하지만 작은 판형에서 표와 이미지가 읽히는지, 페이지를 넘거나 품질이 떨어지지 않는지 별도로 확인해야 합니다.'],
]

export default function HwpToPrintedBookPage() {
  return <LastMileGuidePage path={path} title={title} description={description} breadcrumb="HWP 원고 종이책 제작" eyebrow="HWP to Printed Book" h1="한글 HWP·HWPX 파일을 종이책으로 만들 수 있나요?" answer="가능합니다. 한글에서 원고를 완성한 것과 종이책 조판이 완성된 것은 다르지만, HWP·HWPX 원본이 있으면 PDF만 있는 경우보다 빠르고 효율적으로 단행본에 맞게 재편집할 수 있습니다." faqs={faqs} related={[["A4 원고를 단행본 판형으로 바꾸기", "/support/a4-to-book-format"],["완성 PDF로 소량 책 제작", "/support/pdf-to-printed-book"],["Word 원고를 종이책으로 만들기", "/support/word-to-printed-book"]]}>
    <div className={styles.lead}>이미 작성한 문장과 구성은 그대로 활용합니다. 종이책에 필요한 판형·여백·행간·쪽번호만 확인해 필요한 범위를 구분합니다.</div>
    <section className={styles.section}><h2>결론부터: 원고 완성과 책 조판 완성은 다릅니다</h2><p>일반 사용자가 작성한 한글 문서는 A4, 기본 여백, 10~12pt 글자, 단순 행간과 한쪽 기준 쪽번호인 경우가 많습니다. 문서로 읽을 때는 문제가 없어도 작은 단행본에서는 문단 폭과 페이지 흐름이 달라집니다.</p><p>오래된 문서 설정이나 다른 환경에서 작성한 파일은 글꼴과 줄바꿈도 달라질 수 있어 원본과 확인용 PDF를 함께 비교하는 것이 안전합니다.</p></section>
    <section className={styles.section}><h2>종이책으로 바꿀 때 확인하는 항목</h2><div className={styles.grid}>{[['판형과 여백','A4가 아닌 실제 책 크기와 안쪽·바깥쪽 여백을 정합니다.'],['글자와 행간','작은 지면에서 읽기 좋은 글자 크기와 줄 간격을 다시 맞춥니다.'],['맞쪽과 쪽번호','왼쪽·오른쪽 페이지의 안쪽 여백과 쪽번호 위치를 구분합니다.'],['표와 이미지','폭이 좁아졌을 때 표·사진·캡션이 읽히는지 확인합니다.'],['장 시작과 빈 면','새 장의 시작 위치와 의도한 빈 페이지를 정리합니다.'],['글꼴과 출력','사용 글꼴, 줄바꿈과 최종 PDF 출력 결과를 대조합니다.']].map(([name,text],i)=><article className={styles.card} key={name}><div className={styles.cardNum}>{String(i+1).padStart(2,'0')}</div><h3>{name}</h3><p>{text}</p></article>)}</div></section>
    <section className={styles.section}><h2>원본이 있으므로 필요한 부분만 고칠 수 있습니다</h2><p>HWP·HWPX 원본에서는 문단, 스타일, 표와 이미지 배치를 직접 조정할 수 있습니다. 이미 잘 정리된 원고와 디자인까지 다시 처음부터 맡기기보다 실제 책 제작에 맞지 않는 부분만 재편집할 수 있습니다.</p><blockquote className={styles.quote}>원본파일이 있다는 것은 자동 인쇄가 가능하다는 뜻이 아니라, 필요한 수정만 효율적으로 할 수 있다는 뜻입니다.</blockquote></section>
  </LastMileGuidePage>
}

