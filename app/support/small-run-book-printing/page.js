import LastMileGuidePage from '../components/LastMileGuidePage'
import styles from '../../reference/reference.module.css'
import Link from 'next/link'

const path = '/support/small-run-book-printing'
const title = '책을 10권·20권만 소량 제작할 수 있나요? | 마이티북스'
const description = '개인 책을 10권·20권 등 필요한 만큼 소량 제작할 때 수량 외에 판형, 페이지, 종이, 제본, 컬러와 파일 상태를 함께 확인하는 기준입니다.'
export const metadata = { title, description, alternates: { canonical: path }, openGraph: { title, description, url: path, type: 'article' } }

const faqs = [
  ['책을 10권만 만들어도 되나요?', '가능합니다. 개인 소장, 가족 증정과 검토용 등 필요한 수량을 기준으로 제작 사양을 확인합니다.'],
  ['20권 제작비는 수량만 알면 계산할 수 있나요?', '판형, 페이지 수, 컬러 여부, 종이, 제본과 파일 상태가 함께 필요하므로 수량만으로 확정할 수 없습니다.'],
  ['수량이 늘면 권당 가격은 내려가나요?', '제작 방식과 사양에 따라 권당 비용 구조가 달라질 수 있지만 전체 제작비는 수량 증가에 따라 함께 늘어납니다.'],
  ['30권부터는 제작 방식이 달라지나요?', '30권 전후부터 전체 비용 증가를 체감할 수 있어 사양과 수량을 다시 비교하지만, 특정 수량에 한 가지 방식이 자동 적용되는 것은 아닙니다.'],
  ['수백 권도 디지털 인쇄로 만들면 되나요?', '가능 여부와 별개로 수백 권이 필요하면 디지털 수량만 늘리기보다 옵셋 견적과 사양을 함께 비교하는 편이 합리적입니다.'],
]

export default function SmallRunBookPrintingPage() {
  return <LastMileGuidePage path={path} title={title} description={description} breadcrumb="10권·20권 소량 책 제작" eyebrow="Small Run Book Production" h1="책을 10권·20권만 소량 제작할 수 있나요?" answer="가능합니다. 다만 소량 책 제작비는 수량만으로 정해지지 않으며, 판형·페이지·종이·제본·컬러 여부와 현재 파일 상태를 함께 확인해야 합니다." faqs={faqs} related={[["개인 소장·기념용 책 제작", "/support/personal-keepsake-book"],["완성 PDF로 소량 책 제작", "/support/pdf-to-printed-book"],["디지털 인쇄와 옵셋 비교", "/support/digital-vs-offset-printing"]]}>
    <div className={styles.lead}>필요한 수량이 적다고 전체 편집을 다시 맡길 필요는 없습니다. 완성 파일 상태와 실제 제작 사양을 확인한 뒤 남은 공정만 구분합니다.</div>
    <section className={styles.section}><h2>결론부터: 필요한 만큼 소량 제작할 수 있습니다</h2><p>10권이나 20권처럼 가족·지인에게 나누거나 개인이 보관할 수량으로 제작할 수 있습니다. 파일이 인쇄 가능한 상태라면 점검 후 인쇄·제본 중심으로 진행할 가능성이 높습니다.</p><p>반대로 판형 변경, 텍스트 수정, 표지 책등 제작과 이미지 보완이 필요하면 해당 작업 범위가 추가됩니다.</p></section>
    <section className={styles.section}><h2>같은 10권이어도 비용이 달라지는 이유</h2><div className={styles.grid}>{[['판형','책 크기와 종이 사용 방식이 달라집니다.'],['페이지','본문 분량과 책등 폭에 영향을 줍니다.'],['컬러','흑백과 컬러 페이지 구성에 따라 제작 조건이 달라집니다.'],['종이','본문·표지 용지와 두께를 선택합니다.'],['제본','무선·양장 등 형태와 후가공을 확인합니다.'],['파일 상태','인쇄용 완성 파일인지 재편집이 필요한지 구분합니다.']].map(([name,text],i)=><article className={styles.card} key={name}><div className={styles.cardNum}>{String(i+1).padStart(2,'0')}</div><h3>{name}</h3><p>{text}</p></article>)}</div></section>
    <section className={styles.section}><h2>수량이 늘면 전체 제작비를 다시 비교합니다</h2><p>30권 전후부터는 수량 증가에 따른 전체 비용을 체감할 수 있어 꼭 필요한 부수인지, 사양을 조정할지 다시 검토합니다. 이는 업계의 고정 기준이 아니라 책 사양에 따라 달라지는 실무 판단입니다.</p><p>수백 권이 필요하다면 디지털 방식의 수량만 계속 늘리지 않고 옵셋 제작 견적도 함께 비교해야 합니다.</p><blockquote className={styles.quote}>소량 여부보다 먼저 현재 파일과 필요한 제작 사양을 확인해야 정확한 방향을 정할 수 있습니다.</blockquote></section>
    <section className={styles.section}><h2>실제 제작을 의뢰하려면</h2><p>한 권부터 필요한 수량만 제작하는 서비스의 파일 조건, 과정과 견적 요소는 <Link href="/business/small-printing">개인 책 소량 인쇄·제작 페이지</Link>에서 확인할 수 있습니다.</p></section>
  </LastMileGuidePage>
}
