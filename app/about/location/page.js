import styles from './location.module.css'

export const metadata = {
  title: '마이티북스 오시는 길 | 대구 동구 출판사 방문 상담 안내',
  description:
    '대구 동구에 위치한 마이티북스 오시는 길 안내. 출판 상담과 교육 상담은 사전 문의 및 예약 후 방문 가능합니다.',
}

const KAKAO_URL = 'https://open.kakao.com/me/mightybooks'
const EMAIL = 'novelstudylab@naver.com'

export default function LocationPage() {
  return (
    <div className={styles.wrap}>

      {/* HERO */}
      <div className={styles.hero}>
        <span className={styles.tag}>Location</span>
        <h1 className={styles.title}>
          마이티북스 <em>오시는 길</em>
        </h1>
        <div className={styles.line} />
      </div>

      {/* MAP */}
      <div className={styles.mapWrap}>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d12932.604697953577!2d128.7312856!3d35.869812!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x35660bd018037bfb%3A0x98282fe3d2c755c7!2z66eI7J207Yuw67aB7Iqk!5e0!3m2!1sko!2skr!4v1714057304297!5m2!1sko!2skr"
          className={styles.map}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="마이티북스 출판사 위치 지도"
        />
      </div>

      <section className={styles.seoSection}>
        <p>
          마이티북스는 대구 동구 안심역 인근에 위치한 출판사입니다.
          출판 상담, 제작 상담, 교육 상담은 모두 사전 문의 후 예약제로 진행합니다.
          예약 없이 방문하실 경우 상담이 어려울 수 있습니다.
        </p>
      </section>

      {/* INFO CARDS */}
      <div className={styles.infoGrid}>
        <div className={styles.infoCard}>
          <div className={styles.infoIcon}>📍</div>
          <div className={styles.infoLabel}>ADDRESS</div>
          <div className={styles.infoValue}>
            대구 동구 동호로7길 66<br />
            1층 102호
          </div>
        </div>

        <div className={styles.infoCard}>
          <div className={styles.infoIcon}>💬</div>
          <div className={styles.infoLabel}>KAKAO</div>
          <div className={styles.infoValue}>
            <a
              href={KAKAO_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              카카오 상담 바로가기
            </a>
          </div>
        </div>

        <div className={styles.infoCard}>
          <div className={styles.infoIcon}>✉️</div>
          <div className={styles.infoLabel}>E-MAIL</div>
          <div className={styles.infoValue}>
            <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
          </div>
        </div>

        <div className={styles.infoCard}>
          <div className={styles.infoIcon}>📅</div>
          <div className={styles.infoLabel}>VISIT</div>
          <div className={styles.infoValue}>
            방문 상담은<br />
            사전 예약제로 진행됩니다
          </div>
        </div>
      </div>

      {/* TRANSPORT */}
      <div className={styles.transport}>
        <div className={styles.transportItem}>
          <div className={styles.transportIcon}>🚇</div>
          <div>
            <div className={styles.transportTitle}>대중교통</div>
            <p className={styles.transportDesc}>
              대구 도시철도 1호선 <strong>안심역 3번 출구</strong>에서 도보 이동 가능합니다.<br />
              버스 이용 시 인근 정류장에서 하차 후 도보로 방문하실 수 있습니다.
            </p>
          </div>
        </div>

        <div className={styles.divider} />

        <div className={styles.transportItem}>
          <div className={styles.transportIcon}>🚗</div>
          <div>
            <div className={styles.transportTitle}>주차 안내</div>
            <p className={styles.transportDesc}>
              사무실 앞 골목이 협소하여 별도의 전용 주차장이 마련되어 있지 않습니다.<br />
              차량으로 방문하시는 경우, 예약 시 주차 가능 여부를 함께 문의해주세요.
            </p>
          </div>
        </div>

        <div className={styles.divider} />

        <div className={styles.transportItem}>
          <div className={styles.transportIcon}>⚠️</div>
          <div>
            <div className={styles.transportTitle}>방문 전 확인</div>
            <p className={styles.transportDesc}>
              마이티북스는 상시 방문 접수처가 아닙니다.<br />
              출판 상담, 원고 상담, 교육 상담은 사전 문의 후 일정이 확정된 경우에만 진행됩니다.
            </p>
          </div>
        </div>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'LocalBusiness',
            '@id': 'https://mightybooks.co.kr/#local',
            name: '마이티북스',
            image: 'https://mightybooks.co.kr/logo.png',
            url: 'https://mightybooks.co.kr',
            email: EMAIL,
            address: {
              '@type': 'PostalAddress',
              streetAddress: '동호로7길 66 1층 102호',
              addressLocality: '동구',
              addressRegion: '대구',
              addressCountry: 'KR',
            },
            geo: {
              '@type': 'GeoCoordinates',
              latitude: 35.869812,
              longitude: 128.7312856,
            },
            areaServed: 'KR',
            sameAs: [
              'https://surimstudio.com',
            ],
          }),
        }}
      />

    </div>
  )
}