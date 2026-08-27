import LastMileGuidePage from '../components/LastMileGuidePage'
import styles from '../../reference/reference.module.css'

const path = '/support/book-proof-vs-final-print'
const title = '책 가본과 최종 인쇄본이 다르게 보이는 이유 | 마이티북스'
const description = '책 가본으로 판형, 레이아웃, 오탈자, 종이와 제본을 확인하는 방법과 디지털 가본·옵셋 본 인쇄에서 색상과 명암이 달라질 수 있는 이유를 설명합니다.'
export const metadata = { title, description, alternates: { canonical: path }, openGraph: { title, description, url: path, type: 'article' } }

const faqs = [
  ['책 가본은 무엇을 확인하는 용도인가요?', '판형, 레이아웃, 오탈자, 실제 글자 크기, 종이 질감과 제본 형태를 최종 제작 전에 확인하는 데 주로 사용합니다.'],
  ['가본 색상과 본 인쇄 색상이 같아야 하나요?', '같은 장비와 조건이 아니라면 차이가 날 수 있습니다. 특히 디지털 가본과 옵셋 본 인쇄는 출력 방식이 달라 색상과 명암이 다르게 느껴질 수 있습니다.'],
  ['가본이 최종 컬러 교정쇄인가요?', '항상 그렇지는 않습니다. 마이티북스의 일부 제작 사례에서 가본은 구조와 물성을 확인하는 목적이며 최종 옵셋 색상을 완벽하게 재현하는 교정쇄와는 구분됩니다.'],
  ['가본에서 오탈자를 발견하면 고칠 수 있나요?', '최종 승인 전이라면 수정 범위와 일정을 확인해 반영할 수 있습니다. 수정 후 페이지 흐름과 표지 책등 폭이 달라지는지도 확인해야 합니다.'],
  ['모든 책이 디지털 가본 후 옵셋 인쇄되나요?', '아닙니다. 수량과 사양에 따라 제작 방식이 달라지며, 가본과 본 인쇄 방식이 같은 경우도 있고 다른 경우도 있습니다.'],
]

export default function BookProofVsFinalPrintPage() {
  return <LastMileGuidePage path={path} title={title} description={description} breadcrumb="책 가본과 최종 인쇄본 차이" eyebrow="Proof and Final Print" h1="책 가본과 최종 인쇄본은 왜 다르게 보일 수 있나요?" answer="가본과 본 인쇄의 장비·용지·출력 방식이 다르면 색상과 명암이 달라질 수 있습니다. 가본은 먼저 판형, 레이아웃, 오탈자, 종이와 제본을 확인하는 실물 점검본으로 이해하는 것이 좋습니다." faqs={faqs} related={[["인쇄 직전 PDF 점검", "/support/print-ready-pdf-check"],["디지털 인쇄와 옵셋 비교", "/support/digital-vs-offset-printing"],["완성 PDF 소량 책 제작", "/support/pdf-to-printed-book"]]}>
    <div className={styles.lead}>가본의 목적을 분명히 해야 무엇을 수정하고 무엇을 제작 방식의 차이로 이해할지 판단할 수 있습니다.</div>
    <section className={styles.section}><h2>결론부터: 가본은 책의 구조와 물성을 확인합니다</h2><p>화면 교정만으로 알기 어려운 실제 책 크기, 글자 크기, 여백, 페이지 순서, 종이 질감과 제본 형태를 확인하는 것이 핵심입니다. 오탈자나 이미지 위치처럼 최종 인쇄 전에 고쳐야 할 문제도 찾습니다.</p><blockquote className={styles.quote}>가본을 최종 옵셋 인쇄의 완벽한 컬러 교정쇄로 생각해서는 안 되는 제작 사례도 있습니다.</blockquote></section>
    <section className={styles.section}><h2>가본에서 우선 확인할 다섯 가지</h2><div className={styles.grid}>{[['판형','손에 잡히는 크기와 책의 비율을 확인합니다.'],['레이아웃','글자·이미지·여백과 장 시작 위치를 봅니다.'],['오탈자','화면에서 놓친 문장과 페이지 번호를 확인합니다.'],['종이','두께, 비침, 질감과 이미지 표현을 살핍니다.'],['제본','책 펼침, 책등과 표지 마감 상태를 확인합니다.']].map(([name,text],i)=><article className={styles.card} key={name}><div className={styles.cardNum}>{String(i+1).padStart(2,'0')}</div><h3>{name}</h3><p>{text}</p></article>)}</div></section>
    <section className={styles.section}><h2>디지털 가본과 옵셋 본 인쇄는 색이 다를 수 있습니다</h2><p>마이티북스가 디지털 출력으로 가본을 만들고 옵셋 방식으로 본 인쇄하는 사례에서는 장비, 잉크와 인쇄 조건이 달라 같은 데이터도 색상과 명암이 다르게 느껴질 수 있습니다.</p><p>이는 모든 책의 보편적인 제작 순서가 아닙니다. 가본과 최종본의 출력 방식이 무엇인지 먼저 확인한 뒤 색상 판단 기준을 정해야 합니다.</p></section>
  </LastMileGuidePage>
}

