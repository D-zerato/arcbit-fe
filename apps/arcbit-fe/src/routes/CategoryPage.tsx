import { PageHeader } from '@arcbit/ui'
import { useParams } from 'react-router-dom'
import { CatalogBreadcrumbs } from '../catalog/components/CatalogBreadcrumbs'
import { NavCardGrid } from '../catalog/components/NavCardGrid'
import { findCategory, toolsIn } from '../catalog/registry'
import styles from './CatalogPage.module.css'
import { NotFoundPage } from './NotFoundPage'

export function CategoryPage() {
  const { categoryId } = useParams()
  const category = findCategory(categoryId)
  if (!category) return <NotFoundPage />
  const items = category.subcategories.map((s) => ({
    to: `/${category.id}/${s.id}`,
    eyebrow: category.title,
    title: s.title,
    summary: s.summary,
    meta: `기능 ${toolsIn(category.id, s.id).length}`,
  }))
  return (
    <div className={styles.page}>
      <CatalogBreadcrumbs items={[{ label: category.title }]} />
      <PageHeader title={category.title} description={category.summary} />
      <NavCardGrid items={items} label={`${category.title} 세부 카테고리`} />
    </div>
  )
}
