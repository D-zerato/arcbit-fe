import { Link } from 'react-router-dom'
import glass from '../../styles/glass.module.css'
import styles from './NavCardGrid.module.css'

export type NavCardItem = {
  to: string
  eyebrow?: string
  title: string
  summary: string
  meta?: string
}

/** 카테고리 · 세부 카테고리로 들어가는 카드 묶음 */
export function NavCardGrid({ items, label }: { items: readonly NavCardItem[]; label: string }) {
  return (
    <ul className={styles.grid} aria-label={label}>
      {items.map((item) => (
        <li key={item.to}>
          <Link
            to={item.to}
            className={`${styles.card} ${glass.glass} ${glass.holoEdge} ${glass.interactive}`}
          >
            {item.eyebrow && <span className={styles.eyebrow}>{item.eyebrow}</span>}
            <span className={styles.title}>{item.title}</span>
            <span className={styles.summary}>{item.summary}</span>
            {item.meta && <span className={styles.meta}>{item.meta}</span>}
          </Link>
        </li>
      ))}
    </ul>
  )
}
