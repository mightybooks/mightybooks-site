import LastMileGuidePage from '../components/LastMileGuidePage'
import styles from '../../reference/reference.module.css'

const path = '/support/a4-to-book-format'
const title = 'A4 원고를 단행본 책 크기로 바꿀 수 있나요? | 마이티북스'
const description = 'A4 HWP·Word·PDF 원고를 작은 단행본 판형으로 바꿀 때 글자 크기, 행간, 여백, 표·이미지와 페이지 수가 달라지는 이유를 안내합니다.'
export const metadata = { title, description, alternates: { canonical: path }, openGraph: { title, description, url: path, type: 'article' } }

const faqs = [
  ['A4 원고를 책 크기로 줄이기만 하면 되나요?', '단순 축소는 가능할 수 있지만 글자와 이미지도 함께 작아져 읽기 어려울 수 있습니다. 실제 판형에 맞춘 재편집과는 다른 작업입니다.'],
  ['A4 PDF도 단행본 판형으로 바꿀 수 있나요?', '현재 PDF와 목표 판형의 비율을 비교해야 합니다. 비율 차이가 크거나 수정이 필요하면 HWP·DOC 원본 또는 별도 재편집이 필요할 수 있습니다.'],
  ['판형을 바꾸면 페이지 수가 늘어나나요?', '작은 판형에서는 한 페이지에 들어가는 글이 줄어들어 페이지 수가 늘어날 수 있습니다. 글자·행간·여백 설정에 따라 결과가 달라집니다.'],
  ['표와 사진은 그대로 유지되나요?', '폭이 넓은 표와 이미지는 작은 지면에서 축소, 회전, 분할 또는 재배치가 필요할 수 있습니다.'],
  ['어떤 책 크기가 적합한가요?', '원고의 글자량, 표와 이미지 비중, 휴대성, 독자 연령과 제본 사양을 함께 보고 판형을 정합니다.'],
]

export default function A4ToBookFormatPage() {
  return <LastMileGuidePage path={path} title={title} description={description} breadcrumb="A4 원고 단행본 판형 변경" eyebrow="A4 to Book Format" h1="A4 원고를 단행본 책 크기로 바꿀 수 있나요?" answer="가능합니다. 하지만 A4 페이지를 통째로 축소하는 것과 글자·행간·여백을 실제 책 크기에 맞게 다시 편집하는 것은 다른 작업입니다." faqs={faqs} related={[["HWP 원고를 종이책으로 만들기", "/support/hwp-to-printed-book"],["Word 원고를 종이책으로 만들기", "/support/word-to-printed-book"],["전자책 PDF를 종이책으로 만들기", "/support/ebook-pdf-to-printed-book"]]}>
    <div className={styles.lead}>A4에서 보기 좋았던 설정을 무조건 버릴 필요는 없습니다. 목표 판형에서 읽기 어려워지는 요소를 먼저 찾고 필요한 부분만 다시 조정합니다.</div>
    <section className={styles.section}><h2>결론부터: 단순 축소와 단행본 재편집은 다릅니다</h2><p>A4 전체를 비례 축소하면 글자, 행간, 표와 사진도 모두 작아집니다. 페이지 모양은 유지되지만 실제 독자가 읽기에는 글자가 작거나 여백이 어색할 수 있습니다.</p><p>단행본 재편집은 목표 판형에서 글자와 행간을 다시 정하고, 문단 폭·여백·장 시작·표와 이미지를 재배치하는 과정입니다.</p></section>
    <section className={styles.section}><h2>A4에서 달라질 수 있는 여섯 가지</h2><div className={styles.grid}>{[['글자 크기','같은 크기를 유지하면 한 페이지에 들어가는 문장이 줄어듭니다.'],['행간','작은 판형에서 답답하거나 지나치게 벌어지지 않게 다시 맞춥니다.'],['문단 폭','한 줄이 짧아져 줄바꿈과 문단 길이가 달라집니다.'],['여백','제본되는 안쪽과 바깥쪽 여백을 서로 다르게 고려합니다.'],['표와 이미지','가로폭에 맞춰 축소·회전·분할 또는 재배치합니다.'],['페이지 수','판형과 조판 설정에 따라 전체 분량이 늘거나 줄 수 있습니다.']].map(([name,text],i)=><article className={styles.card} key={name}><div className={styles.cardNum}>{String(i+1).padStart(2,'0')}</div><h3>{name}</h3><p>{text}</p></article>)}</div></section>
    <section className={styles.section}><h2>원본파일 유무에 따라 작업 범위가 달라집니다</h2><div className={styles.list}><div className={styles.listItem}><strong>HWP·DOC 원본 있음</strong><span>글자·문단·표를 직접 조정할 수 있어 판형에 맞춘 재편집이 비교적 수월합니다.</span></div><div className={styles.listItem}><strong>PDF만 있음</strong><span>비례 축소 가능성과 현재 레이아웃을 먼저 확인하며, 대규모 수정은 재구성이 필요할 수 있습니다.</span></div><div className={styles.listItem}><strong>판형 선택이 미정</strong><span>원고 특성과 희망 독서 경험을 기준으로 기존 비율과 가까운 판형부터 비교합니다.</span></div></div></section>
  </LastMileGuidePage>
}

