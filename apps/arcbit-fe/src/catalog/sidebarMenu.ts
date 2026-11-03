import { allCategories, findCategory, findSubcategory, toolsIn } from './registry'

export type SidebarLink = { to: string; label: string }

/** 사이드바에 그릴 메뉴 — 지금 화면의 바로 아래 단계만 담는다 */
export type SidebarMenu = {
  /** 한 단계 위로 가는 링크 (홈 단계에는 없다) */
  back?: SidebarLink
  /** 목록 제목 — 지금 단계의 이름 */
  heading: string
  items: readonly SidebarLink[]
}

/**
 * 주소로 사이드바 메뉴를 고른다.
 * 홈 · 카탈로그 밖 화면 → 카테고리, 카테고리 → 세부 카테고리, 세부 카테고리 · 도구 → 그 세부의 도구.
 * 위 단계 목록은 섞지 않는다. 없는 id 는 맞는 데까지만 따라간다.
 */
export function sidebarMenu(pathname: string): SidebarMenu {
  const [categoryId, subcategoryId] = pathname.split('/').filter(Boolean)
  const category = findCategory(categoryId)
  if (!category)
    return {
      heading: '카테고리',
      items: allCategories().map((c) => ({ to: `/${c.id}`, label: c.title })),
    }

  const subcategory = findSubcategory(category, subcategoryId)
  if (!subcategory)
    return {
      back: { to: '/', label: '홈' },
      heading: category.title,
      items: category.subcategories.map((s) => ({
        to: `/${category.id}/${s.id}`,
        label: s.title,
      })),
    }

  return {
    back: { to: `/${category.id}`, label: category.title },
    heading: subcategory.title,
    // 등록표는 최근 바뀐 순이라 메뉴 자리가 흔들린다 — 사이드바는 제목 순으로 고정한다
    items: [...toolsIn(category.id, subcategory.id)]
      .sort((a, b) => a.title.localeCompare(b.title, 'ko'))
      .map((t) => ({ to: t.path, label: t.title })),
  }
}
