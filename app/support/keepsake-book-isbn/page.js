import LastMileGuidePage from '../components/LastMileGuidePage'
import styles from '../../reference/reference.module.css'

const path = '/support/keepsake-book-isbn'
const title = '개인 소장용·기념책에도 ISBN이 꼭 필요한가요? | 마이티북스'
const description = '가족사, 개인 기록과 기념책을 만들 때 책 제작과 정식 출간·유통을 구분하고 ISBN과 공개 범위를 먼저 판단하는 일반적인 기준입니다.'
export const metadata = { title, description, alternates: { canonical: path }, openGraph: { title, description, url: path, type: 'article' } }

const faqs = [
  ['기념책에도 ISBN이 꼭 필요한가요?', '모든 기념책에 ISBN이 필요한 것은 아닙니다. 개인 소장과 제한된 증정이 목적이라면 제작과 정식 출간을 구분해 판단할 수 있습니다.'],
  ['ISBN 없이도 책 모양으로 제작할 수 있나요?', '가능합니다. 판형, 표지, 본문과 제본을 갖춘 책을 제작하는 일과 ISBN을 사용해 발행·유통하는 일은 별개의 선택입니다.'],
  ['가족 이야기라면 ISBN을 받지 않는 편이 좋은가요?', '내용의 사적 성격, 공개 범위와 유통 목적을 먼저 살펴야 합니다. 불특정 독자에게 공개할 필요가 없다면 정식 등록이 필요한지 신중히 판단합니다.'],
  ['ISBN을 받으면 어떤 정보가 공개되나요?', '정식 출간·서지정보 등록·납본·유통 과정의 공개 정보는 발행 방식과 현재 절차에 따라 확인해야 하므로, 진행 시 국립중앙도서관 등 공식 안내를 기준으로 검토합니다.'],
  ['나중에 서점 유통으로 바꿀 수 있나요?', '처음부터 유통 가능성을 고려하면 원고·표지·발행 정보의 준비 범위가 달라질 수 있으므로 향후 계획을 상담 단계에서 함께 알려주는 것이 좋습니다.'],
]

export default function KeepsakeBookIsbnPage() {
  return <LastMileGuidePage path={path} title={title} description={description} breadcrumb="기념책 ISBN 판단 기준" eyebrow="ISBN for Keepsake Books" h1="개인 소장용·기념책에도 ISBN이 꼭 필요한가요?" answer="꼭 그렇지는 않습니다. 책을 물리적으로 제작하는 일과 정식 출간·서지정보 등록·유통을 진행하는 일은 같은 선택이 아니므로, 공개 범위와 사용 목적부터 정해야 합니다." faqs={faqs} related={[["개인 소장·기념용 책 제작", "/support/personal-keepsake-book"],["10권·20권 소량 책 제작", "/support/small-run-book-printing"],["개인출판과 소량 제작 기준", "/reference/personal-publishing"]]}>
    <div className={styles.lead}>ISBN을 무조건 추가하거나 피하는 것이 답은 아닙니다. 누구에게 보여줄 책인지, 판매·배포할 것인지, 개인적인 정보가 얼마나 포함되는지를 먼저 확인합니다.</div>
    <section className={styles.section}><h2>결론부터: 책 제작과 정식 출간은 구분할 수 있습니다</h2><p>가족에게 나눌 회고록, 부모님 기념책, 퇴임 기념집과 내부 기록은 ISBN 없이 필요한 수량만 제작하는 선택이 가능합니다. 반대로 공개 판매와 정식 유통이 목적이라면 발행 정보와 유통 구조를 함께 준비해야 합니다.</p></section>
    <section className={styles.section}><h2>ISBN보다 먼저 확인할 세 가지</h2><div className={styles.grid}>{[['독자','가족과 지인만 볼지 불특정 독자에게 판매할지 정합니다.'],['공개 범위','개인 사진, 연락처와 사적인 기록의 노출 범위를 확인합니다.'],['사용 목적','소장·증정·내부 배포인지 정식 유통·판매인지 구분합니다.']].map(([name,text],i)=><article className={styles.card} key={name}><div className={styles.cardNum}>{String(i+1).padStart(2,'0')}</div><h3>{name}</h3><p>{text}</p></article>)}</div></section>
    <section className={styles.section}><h2>등록·납본·유통 절차는 공식 안내를 기준으로 확인합니다</h2><p>ISBN, 서지정보 등록, 납본과 유통 과정에서 필요한 절차와 외부에 표시되는 정보는 발행 형태와 현재 제도에 따라 달라질 수 있습니다. 진행이 필요할 때는 국립중앙도서관 등 공식 안내와 실제 발행 방식을 기준으로 확인해야 합니다.</p><blockquote className={styles.quote}>ISBN을 받는 순간 모든 상황에 동일한 의무가 생긴다고 단순화하지 않고, 정식 출간 방식 전체를 함께 검토합니다.</blockquote></section>
  </LastMileGuidePage>
}

