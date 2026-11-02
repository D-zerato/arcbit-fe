import { EmptyState, PageHeader } from '@arcbit/ui'
import { useParams } from 'react-router-dom'
import { CatalogBreadcrumbs } from '../catalog/components/CatalogBreadcrumbs'
import { ToolList } from '../catalog/components/ToolList'
import { findCategory, findSubcategory, toolsIn } from '../catalog/registry'
import styles from './CatalogPage.module.css'
import { NotFoundPage } from './NotFoundPage'

export function SubcategoryPage() {
  const { categoryId, subcategoryId } = useParams()
  const category = findCategory(categoryId)
  const subcategory = findSubcategory(category, subcategoryId)
  if (!category || !subcategory) return <NotFoundPage />
  const tools = toolsIn(category.id, subcategory.id)
  return (
    <div className={styles.page}>
      <CatalogBreadcrumbs
        items={[{ label: category.title, href: `/${category.id}` }, { label: subcategory.title }]}
      />
      <PageHeader title={subcategory.title} description={subcategory.summary} />
      {tools.length > 0 ? (
        <ToolList tools={tools} label={`${subcategory.title} 기능`} />
      ) : (
        <EmptyState title="아직 기능이 없어요" description="준비 중이에요." />
      )}
    </div>
  )
}
