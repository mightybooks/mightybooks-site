'use client'

import { useState } from 'react'
import styles from './500-character-fiction.module.css'

const PHONE_NUMBER = '010-5148-9433'

export default function PhoneConsultButton() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <button
        type="button"
        className={styles.ctaBtn}
        onClick={() => setIsOpen(true)}
      >
        전화로 확인 상담하기 →
      </button>

      {isOpen && (
        <div
          className={styles.phonePopupOverlay}
          role="presentation"
          onClick={() => setIsOpen(false)}
        >
          <div
            className={styles.phonePopup}
            role="dialog"
            aria-modal="true"
            aria-labelledby="workshop-phone-popup-title"
            onClick={e => e.stopPropagation()}
          >
            <button
              type="button"
              className={styles.phonePopupClose}
              aria-label="전화 상담 연락처 닫기"
              onClick={() => setIsOpen(false)}
            >
              ×
            </button>
            <div id="workshop-phone-popup-title" className={styles.phonePopupTitle}>
              전화 확인 상담
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
