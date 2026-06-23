'use client'

import { useState } from 'react'

const PHONE_NUMBER = '010-5148-9433'

export default function ContactPhoneButton({ styles }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <button
        type="button"
        className={styles.contactPhoneButton}
        onClick={() => setIsOpen(true)}
      >
        {PHONE_NUMBER}
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
            aria-labelledby="home-phone-popup-title"
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
            <div id="home-phone-popup-title" className={styles.phonePopupTitle}>
              1:1 전화 상담
            </div>
            <a href={`tel:${PHONE_NUMBER}`} className={styles.phonePopupNumber}>
              {PHONE_NUMBER}
            </a>
            <p className={styles.phonePopupDesc}>
              월-금 09:00-17:00 / 주말, 공휴일 휴무
            </p>
          </div>
        </div>
      )}
    </>
  )
}
