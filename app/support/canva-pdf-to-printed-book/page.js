import LastMileGuidePage from '../components/LastMileGuidePage'
import styles from '../../reference/reference.module.css'

const path = '/support/canva-pdf-to-printed-book'
const title = 'Canva로 만든 PDF도 종이책으로 만들 수 있나요? | 마이티북스'
const description = 'Canva에서 만든 전자책·책 PDF를 종이책으로 제작할 때 판형, 재단, 이미지와 글꼴을 확인하고 수정이 필요할 때 가장 효율적인 진행 방법을 안내합니다.'
export const metadata = { title, description, alternates: { canonical: path }, openGraph: { title, description, url: path, type: 'article' } }

const faqs = [
  ['Canva로 만든 PDF도 책으로 인쇄할 수 있나요?', '가능할 수 있습니다. Canva에서 출력한 최종 PDF의 페이지 크기, 재단 여백, 이미지 해상도와 글꼴 상태를 먼저 확인합니다.'],
  ['오탈자를 출판사에서 바로 고칠 수 있나요?', 'PDF는 Canva 원본 객체가 아니므로 고객이 Canva 원본에서 수정하고 PDF를 다시 출력하는 방식이 가장 효율적입니다.'],
  ['Canva 공유 링크를 보내면 되나요?', '기본 제작은 Canva에서 출력한 최종 PDF를 기준으로 진행합니다. 수정이 남아 있다면 먼저 원본에서 반영한 뒤 새 PDF를 준비하는 편이 좋습니다.'],
  ['Canva 전자책 크기 그대로 종이책이 되나요?', '화면용 크기와 종이책 판형의 비율이 다를 수 있으므로 희망 판형에서 여백과 글자 크기가 적절한지 비교해야 합니다.'],
  ['수정이 많으면 어떻게 진행하나요?', '텍스트, 이미지와 레이아웃 수정이 많다면 단순 PDF 제작 범위를 넘어 별도 재편집 또는 전체 편집·디자인 작업으로 전환될 수 있습니다.'],
]

export default function CanvaPdfToPrintedBookPage() {
  return <LastMileGuidePage path={path} title={title} description={description} breadcrumb="Canva PDF 종이책 제작" eyebrow="Canva PDF to Print" h1="Canva로 만든 PDF도 종이책으로 만들 수 있나요?" answer="가능할 수 있습니다. 실제 제작에서는 Canva 화면이 아니라 Canva에서 출력한 최종 PDF를 확인하며, 수정이 남아 있다면 Canva 원본에서 고친 뒤 새 PDF를 출력하는 방식이 가장 효율적입니다." faqs={faqs} related={[["완성 PDF 소량 책 제작", "/support/pdf-to-printed-book"],["전자책 PDF를 종이책으로 만들기", "/support/ebook-pdf-to-printed-book"],["인쇄 직전 PDF 점검", "/support/print-ready-pdf-check"]]}>
    <div className={styles.lead}>Canva에서 이미 만든 디자인은 존중합니다. 다만 화면에서 완성돼 보이는 것과 종이책 인쇄에 필요한 PDF가 준비된 것은 다를 수 있어 최종 출력 파일을 기준으로 판단합니다.</div>
    <section className={styles.section}><h2>결론부터: 최종 PDF가 인쇄 조건에 맞는지 확인합니다</h2><p>페이지 크기와 희망 판형이 맞고, 재단될 가장자리의 안전 여백과 이미지 품질이 충분하며, 수정할 내용이 없다면 기존 PDF를 활용할 가능성이 높습니다.</p><p>전자책이나 프레젠테이션 크기로 만들었다면 종이책 판형으로 바꿀 때 여백과 글자 크기가 달라질 수 있습니다.</p></section>
    <section className={styles.section}><h2>수정은 Canva 원본에서 하는 것이 가장 효율적입니다</h2><div className={styles.list}>
      <div className={styles.listItem}><strong>오탈자·문장 수정</strong><span>고객이 Canva 원본에서 수정한 뒤 최종 PDF를 다시 출력합니다.</span></div>
      <div className={styles.listItem}><strong>사진·도형 위치 변경</strong><span>원본 객체가 있는 Canva에서 조정해야 품질과 작업 효율을 유지할 수 있습니다.</span></div>
      <div className={styles.listItem}><strong>PDF만 전달</strong><span>출판사는 PDF를 Canva 원본 객체처럼 세밀하게 편집할 수 없습니다.</span></div>
      <div className={styles.listItem}><strong>수정 범위가 큼</strong><span>별도 재편집 또는 전체 편집·디자인 범위와 비용을 먼저 확인합니다.</span></div>
    </div></section>
    <section className={styles.section}><h2>종이책에는 표지 펼침면이 따로 필요합니다</h2><p>Canva에서 만든 앞표지 한 장만으로는 책등과 뒤표지가 있는 종이책 표지가 완성되지 않습니다. 본문 페이지 수, 종이와 제본 사양을 정한 뒤 책등 폭을 계산해 앞표지·책등·뒤표지가 이어지는 펼침면을 준비해야 합니다.</p><blockquote className={styles.quote}>현재 디자인을 다시 처음부터 맡길 필요는 없지만, 인쇄 조건에 맞지 않는 부분은 최종 PDF를 만들기 전에 보완해야 합니다.</blockquote></section>
  </LastMileGuidePage>
}

