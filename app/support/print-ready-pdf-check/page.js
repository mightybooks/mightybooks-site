import LastMileGuidePage from '../components/LastMileGuidePage'
import styles from '../../reference/reference.module.css'

const path = '/support/print-ready-pdf-check'
const title = '책 PDF를 인쇄 전에 무엇부터 확인해야 하나요? | 마이티북스'
const description = '인쇄 직전 PDF의 판형, 재단 영역, 여백, 이미지 해상도, 컬러·흑백 데이터, 글자와 페이지 번호를 확인하는 실무 점검 기준입니다.'
export const metadata = { title, description, alternates: { canonical: path }, openGraph: { title, description, url: path, type: 'article' } }

const faqs = [
  ['PDF가 인쇄용인지 어떻게 확인하나요?', '희망 판형과 파일 크기, 재단과 안전 여백, 글꼴·이미지, 페이지 순서, 표지 펼침면과 컬러 데이터를 함께 확인합니다.'],
  ['화면에서 괜찮으면 인쇄도 괜찮은가요?', '화면은 재단 위치, 실제 글자 크기, 이미지 해상도와 출력 데이터 문제를 모두 보여주지 않으므로 인쇄 사양과 함께 점검해야 합니다.'],
  ['흑백으로 보이는 PDF는 흑백 인쇄 데이터인가요?', '항상 그렇지는 않습니다. 흑백처럼 보이는 이미지도 CMYK 여러 채널의 데이터를 포함할 수 있어 먹1도 인쇄가 필요하면 별도 확인이 필요합니다.'],
  ['컬러 이미지를 흑백으로 한꺼번에 바꿀 수 있나요?', '일괄 변환은 가능할 수 있지만 이미지에 따라 계조, 명암과 디테일이 손실될 수 있어 결과를 페이지별로 확인해야 합니다.'],
  ['PDF의 글자나 이미지를 조금 수정할 수 있나요?', '간단한 보완 가능성을 확인할 수 있지만 PDF는 원본파일이 아니므로 수정이 많으면 원본 확보나 별도 재편집이 필요할 수 있습니다.'],
]

export default function PrintReadyPdfCheckPage() {
  return <LastMileGuidePage path={path} title={title} description={description} breadcrumb="인쇄 직전 PDF 점검" eyebrow="Print-ready PDF Check" h1="책 PDF를 인쇄 전에 무엇부터 확인해야 하나요?" answer="화면에서 잘 보이는지만 확인해서는 부족합니다. 실제 제작 판형과 파일 크기, 재단·여백, 이미지, 컬러 데이터, 글자와 페이지 위치를 인쇄 사양과 함께 점검해야 합니다." faqs={faqs} related={[["완성 PDF로 소량 책 제작", "/support/pdf-to-printed-book"],["책 가본과 최종 인쇄본 차이", "/support/book-proof-vs-final-print"],["A4 원고 단행본 판형 변경", "/support/a4-to-book-format"]]}>
    <div className={styles.lead}>인쇄 직전 점검은 원고를 다시 편집하는 일이 아니라, 이미 완성한 PDF가 실제 제작 사고 없이 출력될 수 있는지 확인하는 과정입니다.</div>
    <section className={styles.section}><h2>결론부터: 파일과 제작 사양이 일치해야 합니다</h2><p>같은 PDF도 어떤 크기와 종이, 제본, 컬러 방식으로 제작하느냐에 따라 점검 기준이 달라집니다. PDF 페이지 크기와 주문한 판형이 다르면 여백이나 재단 결과가 예상과 달라질 수 있습니다.</p></section>
    <section className={styles.section}><h2>인쇄 직전 실제로 확인하는 항목</h2><div className={styles.grid}>{[['판형','PDF 페이지 크기와 최종 제작 크기가 일치하는지 봅니다.'],['재단·여백','잘릴 영역과 글자·이미지의 안전 거리를 확인합니다.'],['이미지','확대 시 품질과 실제 출력 해상도를 살핍니다.'],['컬러·흑백','제작 방식에 맞는 색상 채널과 데이터인지 확인합니다.'],['글자·위치','글꼴 문제, 잘림과 페이지 요소의 이동 여부를 봅니다.'],['페이지 번호','순서, 누락, 중복과 의도한 빈 페이지를 확인합니다.']].map(([name,text],i)=><article className={styles.card} key={name}><div className={styles.cardNum}>{String(i+1).padStart(2,'0')}</div><h3>{name}</h3><p>{text}</p></article>)}</div></section>
    <section className={styles.section}><h2>화면상 흑백과 먹1도 데이터는 다를 수 있습니다</h2><p>이미지가 회색으로 보여도 실제 PDF 안에서는 C·M·Y·K 여러 채널을 사용할 수 있습니다. 흑백 먹1도 인쇄가 필요한 경우 이미지 데이터 변환이나 점검이 필요할 수 있습니다.</p><p>일괄 변환은 빠르지만 사진과 도판에 따라 계조, 명암과 세부 표현이 달라질 수 있으므로 변환 결과를 다시 확인해야 합니다.</p><blockquote className={styles.quote}>빠른 자동 변환이 모든 이미지에서 같은 품질을 보장하지는 않습니다.</blockquote></section>
  </LastMileGuidePage>
}

