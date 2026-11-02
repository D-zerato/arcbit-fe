import { Breadcrumbs, type BreadcrumbItem } from '@arcbit/ui'
import { Link } from 'react-router-dom'

/** 카테고리 › 세부 카테고리 › 기능 경로 — 앱 라우터 링크로 그린다 */
export function CatalogBreadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  return (
    <Breadcrumbs
      label="현재 위치"
      items={[{ label: '홈', href: '/' }, ...items]}
      renderLink={(item, children) => <Link to={item.href ?? '/'}>{children}</Link>}
    />
  )
}
