'use client'

import { useState } from 'react'
import styles from './personal-content-diagnosis.module.css'

const KAKAO_URL = 'https://open.kakao.com/me/mightybooks'
const EMAIL = 'novelstudylab@naver.com'
const PHONE_NUMBER = '010-5148-9433'

export default function PersonalContentDiagnosisCta() {
  const [isPhoneOpen, setIsPhoneOpen] = useState(false)

  return (
    <>
      <div className={styles.ctaBtns}>
        <a href={`mailto:${EMAIL}`} className={styles.ctaBtn}>
          이메일 문의 →
        </a>
        <a
          href={KAKAO_URL}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.ctaBtnGhost}
        >
          카카오톡 문의 →
        </a>
        <button
          type="button"
          className={styles.ctaBtnGhost}
          onClick={() => setIsPhoneOpen(true)}
        >
          전화 문의 →
        </button>
      </div>

      {isPhoneOpen && (
        <div
          className={styles.phonePopupOverlay}
          role="presentation"
          onClick={() => setIsPhoneOpen(false)}
        >
          <div
            className={styles.phonePopup}
            role="dialog"
            aria-modal="true"
            aria-labelledby="personal-content-phone-popup-title"
            onClick={e => e.stopPropagation()}
          >
            <button
              type="button"
              className={styles.phonePopupClose}
              aria-label="전화 문의 연락처 닫기"
              onClick={() => setIsPhoneOpen(false)}
            >
              ×
            </button>
            <div id="personal-content-phone-popup-title" className={styles.phonePopupTitle}>
              전화 문의
            </div>
            <a href={`tel:${PHONE_NUMBER}`} className={styles.phonePopupNumber}>
              {PHONE_NUMBER}
            </a>
            <p className={styles.phonePopupDesc}>월~금 09-17시 / 주말, 국·공휴일 휴무</p>
          </div>
        </div>
      )}
    </>
  )
}
