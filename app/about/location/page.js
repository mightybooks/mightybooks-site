import styles from './location.module.css'

export const metadata = {
  title: '마이티북스 위치 안내 | 대구 기획출판·자비출판 출판사',
  description: '대구 동구에 위치한 마이티북스 출판사 오시는 길 안내. 기획출판, 자비출판 상담 가능.',
}

export default function LocationPage() {
  return (
    <div className={styles.wrap}>

      {/* HERO */}
      <div className={styles.hero}>
        <span className={styles.tag}>Location</span>
        <h1 className={styles.title}>출판사 마이티북스 <em>위치 </em>안내</h1>
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
          마이티북스는 대구 동구에 위치한 출판사로,
          자비출판과 기획출판을 중심으로 책 출간 상담을 진행하고 있습니다.
          방문 상담은 사전 예약을 통해 가능합니다.
        </p>
      </section>

      {/* INFO CARDS */}
      <div className={styles.infoGrid}>
        <div className={styles.infoCard}>
          <div className={styles.infoIcon}>📍</div>
          <div className={styles.infoLabel}>ADDRESS</div>
          <div className={styles.infoValue}>대구 동구 동호로7길 66<br />1층 102호</div>
        </div>
        <div className={styles.infoCard}>
          <div className={styles.infoIcon}>📞</div>
          <div className={styles.infoLabel}>TEL</div>
          <div className={styles.infoValue}>
            <a href="tel:010-5148-9433">010-5148-9433</a>
          </div>
        </div>
        <div className={styles.infoCard}>
          <div className={styles.infoIcon}>🖨️</div>
          <div className={styles.infoLabel}>FAX</div>
          <div className={styles.infoValue}>0504-173-9433</div>
        </div>
        <div className={styles.infoCard}>
          <div className={styles.infoIcon}>✉️</div>
          <div className={styles.infoLabel}>E-MAIL</div>
          <div className={styles.infoValue}>
            <a href="mailto:novelstudylab@naver.com">novelstudylab@naver.com</a>
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
              대구 지하철 1호선 <strong>안심역 3번 출구</strong>에서 250M, 약 3분 거리.<br />
              또는 518번, 518-1번 버스 탑승 시 <strong>'송정삼거리2'</strong> 정류장에서 하차
            </p>
          </div>
        </div>
        <div className={styles.divider} />
        <div className={styles.transportItem}>
          <div className={styles.transportIcon}>🚗</div>
          <div>
            <div className={styles.transportTitle}>주차시설</div>
            <p className={styles.transportDesc}>
              사무실 앞은 골목이 협소하여 별도의 주차장이 마련되어 있지 않습니다.<br />
              방문 전 전화 주시면, 주차 장소를 확보해 드립니다.
            </p>
          </div>
        </div>
      </div>
    
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          "@id": "https://mightybooks.co.kr/#local",
          "name": "마이티북스",
          "image": "https://mightybooks.co.kr/logo.png",
          "url": "https://mightybooks.co.kr",
          "telephone": "010-5148-9433",
          "email": "novelstudylab@naver.com",
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "동호로7길 66 1층 102호",
            "addressLocality": "동구",
            "addressRegion": "대구",
            "postalCode": "41000",
            "addressCountry": "KR"
          },
          "geo": {
            "@type": "GeoCoordinates",
            "latitude": 35.869812,
            "longitude": 128.7312856
          },
          "areaServed": "KR",
          "sameAs": [
            "https://surimstudio.com"
          ]
        })
      }}
    />

    </div>
  )
}