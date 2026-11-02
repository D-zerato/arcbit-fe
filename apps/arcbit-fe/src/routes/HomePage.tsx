import { PageHeader } from '@arcbit/ui'
import { NavCardGrid } from '../catalog/components/NavCardGrid'
import { ToolList } from '../catalog/components/ToolList'
import { allCategories, allTools, toolsIn } from '../catalog/registry'
import styles from './CatalogPage.module.css'

export function HomePage() {
  const categories = allCategories().map((c) => ({
    to: `/${c.id}`,
    eyebrow: 'Category',
    title: c.title,
    summary: c.summary,
    meta: `세부 ${c.subcategories.length} · 기능 ${toolsIn(c.id).length}`,
  }))
  return (
    <div className={styles.page}>
      <PageHeader
        title="Arcbit"
        description="관심사별로 모아 둔 작은 도구들. 고르면 바로 쓸 수 있어요."
      />
      <section className={styles.section} aria-labelledby="home-categories">
        <h2 id="home-categories">카테고리</h2>
        <NavCardGrid items={categories} label="카테고리" />
      </section>
      <section className={styles.section} aria-labelledby="home-recent">
        <h2 id="home-recent">최근 업데이트</h2>
        <ToolList tools={allTools().slice(0, 6)} label="최근 업데이트된 기능" />
      </section>
    </div>
  )
}
