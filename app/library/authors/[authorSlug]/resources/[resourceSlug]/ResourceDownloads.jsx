import styles from './page.module.css'

export default function ResourceDownloads({ materials }) {
  return (
    <div className={styles.downloadGrid}>
      {materials.map((material) => (
        <article className={styles.downloadCard} key={material.title}>
          <div>
            <p className={styles.pdfLabel}>PDF MATERIAL</p>
            <h3>{material.title}</h3>
            <p>{material.description}</p>
          </div>
          <a
            className={styles.downloadButton}
            href={material.href}
            download={material.download}
          >
            {material.buttonLabel}
            <span aria-hidden="true">↓</span>
          </a>
        </article>
      ))}
    </div>
  )
}
