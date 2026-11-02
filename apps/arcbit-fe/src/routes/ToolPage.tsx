import { PageHeader, Spinner } from '@arcbit/ui'
import { Suspense } from 'react'
import { useParams } from 'react-router-dom'
import { CatalogBreadcrumbs } from '../catalog/components/CatalogBreadcrumbs'
import { findCategory, findSubcategory, findTool } from '../catalog/registry'
import styles from './CatalogPage.module.css'
import { NotFoundPage } from './NotFoundPage'

/** 도구 페이지 — 머리(경로 · 제목)는 공용, 본문은 도구 폴더의 Tool.tsx 를 열 때 불러온다 */
export function ToolPage() {
  const { categoryId, subcategoryId, toolId } = useParams()
  const category = findCategory(categoryId)
  const subcategory = findSubcategory(category, subcategoryId)
  const tool = findTool(categoryId, subcategoryId, toolId)
  if (!category || !subcategory || !tool) return <NotFoundPage />
  const Tool = tool.Component
  return (
    <div className={styles.page}>
      <CatalogBreadcrumbs
        items={[
          { label: category.title, href: `/${category.id}` },
          { label: subcategory.title, href: `/${category.id}/${subcategory.id}` },
          { label: tool.title },
        ]}
      />
      <PageHeader title={tool.title} description={tool.summary} />
      <Suspense fallback={<Spinner label="불러오는 중" />}>
        <Tool />
      </Suspense>
    </div>
  )
}
