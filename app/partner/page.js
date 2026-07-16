import Link from 'next/link'
import PartnerImage from './PartnerImage'
import styles from './partner.module.css'
import featureStyles from './partner-feature.module.css'

export const metadata = {
  title: '마이티북스 소개·파트너십 안내 | 출판·책 제작 제휴',
  description: '책 제작이 필요한 고객을 위한 소개 혜택과 사업자 파트너십 신청·승인 절차를 확인하세요.',
  alternates: { canonical: '/partner' },
  openGraph: { title: '마이티북스 소개·파트너십 안내 | 출판·책 제작 제휴', description: '좋은 책 제작이 필요한 분을 연결하는 마이티북스 사업자 파트너십을 안내합니다.', url: '/partner', type: 'website' },
}

const steps = ['파트너 회원가입','업체 정보 입력','사업자등록증 사본과 온라인 활동 정보 제출','마이티북스 검토','승인 후 고유 파트너 코드 발급','전용 링크와 홍보자료 제공']

export default function PartnerPage(){return <main className={styles.wrap}>
  <header className={styles.hero}><div className={styles.inner}><span className={styles.eyebrow}>Mighty Books Partnership</span><h1>마이티북스 <em>소개·파트너십 안내</em></h1><p className={styles.lead}>좋은 책 제작이 필요한 분을 소개해 주세요. 마이티북스는 기존 고객과 지인, 지역의 다양한 사업자와 함께 책 제작이 필요한 분을 연결하고 있습니다. 확인된 소개로 처음 문의한 신규 고객에게는 제작비 할인과 별도의 추가 혜택을 제공합니다.</p><div className={styles.actions}><Link href="/support/diagnosis" className={styles.primary}>책 제작 문의하기</Link><Link href="/partner/signup" className={styles.secondary}>파트너십 신청하기</Link><Link href="/partner/login" className={styles.secondary}>파트너 로그인</Link></div></div></header>

  <section className={styles.sectionAlt}><div className={styles.inner}><div className={featureStyles.featureIntro}><PartnerImage src="/image/home/partner00.webp" alt="마이티북스와 지역 사업자 파트너가 고객의 출판을 함께 안내하는 모습"/><div><span className={styles.eyebrow}>Business Partners</span><h2 className={styles.title}>고객의 중요한 순간을 함께 준비하는 <em>사업자 파트너십</em></h2><p className={styles.sectionLead}>환갑, 칠순, 팔순, 퇴임과 가족 기념일을 준비하는 꽃집, 떡·답례품 업체, 케이크 제작업체와 가족행사 관련 사업자를 우선적으로 찾고 있습니다. 이 업종에 한정하지 않으며 고객에게 책 제작이라는 선택지를 자연스럽게 안내할 수 있는 사업자라면 신청할 수 있습니다.</p></div></div><div className={styles.grid}><article className={styles.card}><h3>고객에게 제공되는 혜택</h3><p>확인된 파트너 소개로 처음 문의한 신규 고객에게 <strong className={featureStyles.discount}>제작비 10만원 할인</strong>과 계약 조건에 따른 혜택을 안내합니다.</p></article><article className={styles.card}><h3>계약 성사 시 소개료</h3><p>소개를 통해 신규 고객의 제작 계약이 성사되면 파트너 업체에 소개료를 지급하며 세부 조건은 승인 후 별도로 안내합니다.</p></article><article className={styles.card}><h3>승인 파트너 지원</h3><p>업체별 고유 코드, 영구 추천 링크, 전용 QR과 모바일 홍보 이미지를 순차적으로 제공합니다.</p></article></div></div></section>

  <section className={styles.section}><div className={styles.inner}><div className={`${featureStyles.featureIntro} ${featureStyles.featureIntroReverse}`}><div><span className={styles.eyebrow}>Simple Role</span><h2 className={styles.title}>파트너가 하는 일은 <em>간단합니다</em></h2><p className={styles.sectionLead}>책 제작이 필요한 고객에게 아래 방법 중 <strong className={featureStyles.choiceEmphasis}>가능한 한 가지만 선택해</strong> 마이티북스를 안내해 주세요. 상담·견적·계약·제작과 고객 응대는 마이티북스가 직접 담당합니다.</p></div><PartnerImage src="/image/home/partner01.webp" alt="파트너 업체가 고객에게 마이티북스 출판 서비스를 간단히 안내하는 과정"/></div><p className={featureStyles.choiceGuide}>다음 중 하나만 해주시면 됩니다.</p><div className={styles.grid}>{['전용 링크 전달','QR 안내','고객용 카드 전달','마이티북스 소개'].map(item=><article key={item} className={`${styles.card} ${featureStyles.choiceCard}`}><span className={featureStyles.choiceBadge}>선택 방법</span><h3>{item}</h3></article>)}</div></div></section>

  <section className={styles.sectionAlt}><div className={styles.inner}><span className={styles.eyebrow}>Partner Support</span><h2 className={styles.title}>승인 파트너에게 제공하는 <em>지원</em></h2><ul className={styles.list}>{['업체별 고유 파트너 코드와 영구 추천 링크','전용 QR과 모바일 전달용 홍보 이미지','고객용 안내 카드','필요 시 매장용 미니 배너','소개 실적 및 정산 안내 - 실시간으로 파트너 페이지 대시보드에서 확인, 정산은 다음 달 25일마다'].map(item=><li key={item}>{item}</li>)}</ul><div className={styles.notice}>오프라인 홍보물은 모든 가입자에게 자동 제공되지 않습니다. 업체의 운영 환경과 활용 방식을 확인한 뒤 협의하여 제작합니다.</div></div></section>

  <section className={styles.section}><div className={styles.inner}><span className={styles.eyebrow}>Application Process</span><h2 className={styles.title}>가입과 <em>승인 절차</em></h2><div className={styles.steps}>{steps.map((step,index)=><article key={step} className={styles.step}><span>{String(index+1).padStart(2,'0')}</span><h3>{step}</h3></article>)}</div><div className={styles.notice}><strong>사업자등록증은 홈페이지에 업로드하지 않습니다.</strong><br/>가입 후 사업자등록증 사본과 업체 홈페이지 또는 SNS, 네이버 플레이스·블로그·카카오채널 등 실제 운영을 확인할 수 있는 주소를 <a href="mailto:novelstudylab@naver.com">novelstudylab@naver.com</a>으로 보내 주세요.<br/><br/>메일 제목: [마이티북스 제휴 신청] 업체명 / 가입 이메일<br/><br/>파트너십 신청은 자동 승인되지 않습니다. 마이티북스가 실제 운영 여부, 고객층과 서비스 적합성을 검토한 뒤 승인합니다.</div><div className={styles.actions}><Link href="/partner/signup" className={styles.primary}>파트너 회원가입</Link><Link href="/partner/login" className={styles.secondary}>파트너 로그인</Link></div></div></section>

  <section className={styles.sectionAlt}><div className={styles.inner}><span className={styles.eyebrow}>Referral Principles</span><h2 className={styles.title}>소개가 인정되는 <em>기본 원칙</em></h2><ul className={styles.list}><li>마이티북스에 처음 문의하는 신규 고객을 대상으로 합니다.</li><li>최초 문의 과정에서 소개자 또는 파트너 업체가 확인되어야 합니다.</li><li>여러 소개가 중복되면 최초로 확인된 한 건을 기준으로 합니다.</li><li>기존 상담 고객이나 계약 뒤 확인된 소개는 혜택 적용이 제한될 수 있습니다.</li><li>취소·환불된 계약은 파트너 소개료 지급 대상에서 제외될 수 있습니다.</li><li>세부 조건은 개별 상담 또는 파트너 승인 후 안내합니다.</li></ul></div></section>

  <section className={styles.section}><div className={styles.inner}><span className={styles.eyebrow}>Customer Referral</span><h2 className={styles.title}>기존 고객·지인 <em>소개 혜택</em></h2><p className={styles.sectionLead}>기존 고객이나 지인의 적극적인 소개를 통해 처음 문의한 신규 고객에게는 소개 사실을 확인한 뒤 제작비 현금 할인과 현금 할인 외 추가 혜택 한 가지를 제공합니다. 추가 혜택은 제작 방식과 계약 조건에 따라 달라지며 상담 과정에서 안내합니다.</p><ul className={styles.list}><li>기존 고객과 지인은 별도 가입이나 추천 코드 없이 최초 문의 과정에서 소개 관계를 알려 주시면 됩니다.</li><li>기존에 상담 중인 고객이나 계약 이후 뒤늦게 확인된 소개는 혜택 적용이 제한될 수 있습니다.</li><li>소개자에게 현금이나 사례비를 지급하는 제도가 아닙니다.</li></ul></div></section>
</main>}
