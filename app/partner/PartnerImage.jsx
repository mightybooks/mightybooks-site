'use client'

import { useState } from 'react'
import Image from 'next/image'
import styles from './partner-feature.module.css'

export default function PartnerImage({ src, alt }) {
  const [hasError, setHasError] = useState(false)

  return <div className={styles.partnerImage}>
    {!hasError ? <Image
      src={src}
      alt={alt}
      fill
      sizes="(max-width: 640px) 100vw, (max-width: 1120px) 45vw, 520px"
      className={styles.partnerImageAsset}
      onError={() => setHasError(true)}
    /> : <div className={styles.partnerImageFallback} aria-hidden="true"><span>MIGHTY BOOKS PARTNERSHIP</span></div>}
  </div>
}
