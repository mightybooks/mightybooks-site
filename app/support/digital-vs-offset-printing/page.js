import LastMileGuidePage from '../components/LastMileGuidePage'
import styles from '../../reference/reference.module.css'

const path = '/support/digital-vs-offset-printing'
const title = '책은 몇 권부터 옵셋 인쇄가 유리할까요? | 마이티북스'
const description = '책 300권·500권 등 수백 권을 제작할 때 디지털 인쇄와 옵셋 견적을 비교하고 판형, 페이지, 컬러, 제본과 용지에 따라 기준이 달라지는 이유를 설명합니다.'
export const metadata = { title, description, alternates: { canonical: path }, openGraph: { title, description, url: path, type: 'article' } }

const faqs = [
  ['옵셋 인쇄는 몇 부부터 유리한가요?', '고정된 업계 기준은 없습니다. 판형, 페이지, 컬러, 용지와 제본에 따라 손익분기점이 달라지므로 실제 사양으로 비교해야 합니다.'],
  ['300권이면 무조건 옵셋으로 해야 하나요?', '무조건은 아닙니다. 다만 마이티북스는 300권 이상이 필요한 작업에서 옵셋과 500부 기준 견적을 적극적으로 함께 비교합니다.'],
  ['디지털 인쇄는 소량에만 가능한가요?', '디지털 제작은 초소량에 유연하지만 수량이 커질수록 전체 비용을 다시 검토해야 합니다. 제작 가능 여부와 경제성은 별개입니다.'],
  ['500권 견적을 같이 보는 이유는 무엇인가요?', '옵셋은 초기 제작 조건과 수량에 따른 비용 구조가 달라 300권과 500권의 전체 견적 차이를 함께 보면 필요한 부수를 합리적으로 판단하기 좋습니다.'],
  ['컬러 책도 같은 수량 기준을 적용하나요?', '아닙니다. 컬러 비중, 페이지, 종이와 후가공에 따라 비교 결과가 크게 달라질 수 있어 동일한 수량 기준을 일괄 적용하지 않습니다.'],
]

export default function DigitalVsOffsetPrintingPage() {
  return <LastMileGuidePage path={path} title={title} description={description} breadcrumb="디지털·옵셋 인쇄 비교" eyebrow="Digital vs Offset Printing" h1="책은 몇 권부터 옵셋 인쇄가 유리할까요?" answer="정해진 한 숫자로 답할 수 없습니다. 판형, 페이지, 컬러, 제본과 용지에 따라 기준이 달라지므로 수백 권이 필요하다면 디지털 인쇄 수량만 늘리지 말고 옵셋 견적을 함께 비교해야 합니다." faqs={faqs} related={[["10권·20권 소량 책 제작", "/support/small-run-book-printing"],["책 가본과 최종 인쇄본 차이", "/support/book-proof-vs-final-print"],["인쇄 직전 PDF 점검", "/support/print-ready-pdf-check"]]}>
    <div className={styles.lead}>수량만 보고 인쇄 방식을 단정하지 않습니다. 실제 책 사양과 필요한 부수, 예비 수량과 전체 제작비를 함께 비교합니다.</div>
    <section className={styles.section}><h2>결론부터: 수백 권이면 두 방식을 함께 비교합니다</h2><p>초소량에서는 필요한 만큼 유연하게 제작하는 디지털 방식이 적합할 수 있습니다. 수량이 늘면 전체 제작원가가 단계적으로 커지므로 어느 시점부터는 옵셋 견적을 함께 받아야 합니다.</p><p>마이티북스 내부 운영에서는 300권 이상이 필요한 작업이라면 옵셋과 500부 기준 견적을 적극적으로 비교합니다. 이는 업계의 절대 법칙이 아니라 실제 사양별 판단 기준입니다.</p></section>
    <section className={styles.section}><h2>손익분기점이 책마다 다른 이유</h2><div className={styles.grid}>{[['판형','종이 배치와 인쇄 효율이 달라집니다.'],['페이지','인쇄 면수와 제본 조건에 영향을 줍니다.'],['컬러','흑백·부분 컬러·전체 컬러에 따라 비용 구조가 달라집니다.'],['용지','종류, 평량과 조달 조건을 확인합니다.'],['제본','무선·양장과 후가공에 따라 공정이 달라집니다.'],['수량','필요 부수와 예비분을 포함해 전체 비용을 비교합니다.']].map(([name,text],i)=><article className={styles.card} key={name}><div className={styles.cardNum}>{String(i+1).padStart(2,'0')}</div><h3>{name}</h3><p>{text}</p></article>)}</div></section>
    <section className={styles.section}><h2>300권과 500권 견적을 함께 보는 이유</h2><p>옵셋은 준비 공정이 있어 일정 수량을 넘어가면 부수 증가에 따른 비용 변화가 디지털 방식과 다르게 나타날 수 있습니다. 300권만 필요한 경우에도 500부 견적과 차이를 비교하면 예비분과 향후 사용량을 포함한 합리적인 결정을 할 수 있습니다.</p><blockquote className={styles.quote}>특정 수량이면 무조건 한 방식이라고 정하지 않고, 같은 사양으로 두 견적을 비교합니다.</blockquote></section>
  </LastMileGuidePage>
}

