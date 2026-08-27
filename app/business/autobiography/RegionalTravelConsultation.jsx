import {
  AUTOBIOGRAPHY_CONSULTATION_MODES,
  AUTOBIOGRAPHY_TRAVEL_CONSULTATION,
} from './consultationPolicy'
import styles from './regionalTravelConsultation.module.css'

export default function RegionalTravelConsultation({ regionName }) {
  const [office, travel, remote] = AUTOBIOGRAPHY_CONSULTATION_MODES

  return (
    <section className={styles.section} aria-labelledby={`travel-consultation-${regionName}`}>
      <span className={styles.eyebrow}>Autobiography Consultation</span>
      <h2 id={`travel-consultation-${regionName}`}>{regionName}에서도 출장상담이 가능합니다</h2>
      <p className={styles.intro}>
        <strong>대구·경북 출장상담 가능</strong> · 대구까지 방문하기 어렵거나 부모님과 가족이 사진·기록물·수기·녹취자료를 함께 검토해야 하는 경우, 예약제로 문수림이 직접 방문해 상담합니다.
      </p>
      <div className={styles.modeGrid} aria-label={`${regionName} 자서전 상담 방식`}>
        <article>
          <span>01</span>
          <h3>{office.title}</h3>
          <strong>{office.label}</strong>
          <p>{regionName}에서 대구 동구 안심역 인근 사무실로 방문해 상담하는 방식입니다.</p>
        </article>
        <article className={styles.featured}>
          <span>02</span>
          <h3>{regionName} 출장상담</h3>
          <strong>{travel.label}</strong>
          <p>{regionName}의 고객이 이동하기 어렵거나 여러 자료를 현장에서 함께 확인해야 할 때 문수림이 예약제로 직접 방문합니다.</p>
        </article>
        <article>
          <span>03</span>
          <h3>{remote.title}</h3>
          <strong>{remote.label}</strong>
          <p>방문하지 않고 전화·카카오톡으로 먼저 상담하고, 필요한 자료는 이메일 등 협의한 온라인 방식으로 전달합니다.</p>
        </article>
      </div>
      <div className={styles.policy}>
        <p><strong>출장상담료 안내</strong> {AUTOBIOGRAPHY_TRAVEL_CONSULTATION.priceGuide}</p>
        <p><strong>제작 계약 시</strong> {AUTOBIOGRAPHY_TRAVEL_CONSULTATION.contractCredit}</p>
      </div>
    </section>
  )
}
