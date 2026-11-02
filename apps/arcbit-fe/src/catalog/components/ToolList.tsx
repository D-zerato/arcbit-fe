import { Badge } from '@arcbit/ui'
import { Link } from 'react-router-dom'
import type { RegisteredTool, ToolStatus } from '../types'
import styles from './ToolList.module.css'

const STATUS: Record<ToolStatus, { tone: 'info' | 'warning'; label: string } | null> = {
  new: { tone: 'info', label: 'NEW' },
  beta: { tone: 'warning', label: 'BETA' },
  stable: null,
}

/** 기능 목록 — 세부 카테고리 페이지와 홈의 「최근 업데이트」 */
export function ToolList({ tools, label }: { tools: readonly RegisteredTool[]; label: string }) {
  return (
    <ul className={styles.list} aria-label={label}>
      {tools.map((tool) => {
        const status = STATUS[tool.status]
        return (
          <li key={tool.path}>
            <Link to={tool.path} className={styles.row}>
              <span className={styles.main}>
                <span className={styles.title}>
                  {tool.title}
                  {status && <Badge tone={status.tone}>{status.label}</Badge>}
                </span>
                <span className={styles.summary}>{tool.summary}</span>
              </span>
              <span className={styles.date}>{tool.updatedAt}</span>
              <span className={styles.arrow} aria-hidden="true">
                →
              </span>
            </Link>
          </li>
        )
      })}
    </ul>
  )
}
