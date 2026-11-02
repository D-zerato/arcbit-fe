import { lazy } from 'react'
import { categories } from './categories'
import type { Category, RegisteredTool, Subcategory, ToolManifest } from './types'

/*
 * 도구 등록표 — `tools/<카테고리>/<세부>/<도구>/manifest.ts` 를 빌드 때 모두 모은다.
 * 화면(Tool.tsx)은 manifest 의 `load()` 로 열 때 불러오므로 도구가 늘어도 첫 화면 번들은 커지지 않는다.
 */
const modules = import.meta.glob<{ manifest: ToolManifest }>('../tools/*/*/*/manifest.ts', {
  eager: true,
})

/** 폴더 경로(`../tools/game/animo/gender-type/manifest.ts`)를 등록 정보와 맞춰 본다 — 어긋나면 개발 중에 바로 알 수 있게 던진다 */
function register(file: string, manifest: ToolManifest): RegisteredTool {
  const [, category, subcategory, id] =
    /^\.\.\/tools\/([^/]+)\/([^/]+)\/([^/]+)\/manifest\.ts$/.exec(file) ?? []
  if (manifest.category !== category || manifest.subcategory !== subcategory || manifest.id !== id)
    throw new Error(
      `${file}: manifest 의 category/subcategory/id 가 폴더 경로(${category}/${subcategory}/${id})와 다르다`,
    )
  return { ...manifest, path: `/${category}/${subcategory}/${id}`, Component: lazy(manifest.load) }
}

const tools: readonly RegisteredTool[] = Object.entries(modules)
  .map(([file, mod]) => register(file, mod.manifest))
  .sort((a, b) => b.updatedAt.localeCompare(a.updatedAt))

export function allCategories(): readonly Category[] {
  return categories
}

export function findCategory(categoryId: string | undefined): Category | undefined {
  return categories.find((c) => c.id === categoryId)
}

export function findSubcategory(
  category: Category | undefined,
  subcategoryId: string | undefined,
): Subcategory | undefined {
  return category?.subcategories.find((s) => s.id === subcategoryId)
}

/** 최근에 바뀐 순서 */
export function allTools(): readonly RegisteredTool[] {
  return tools
}

export function toolsIn(categoryId: string, subcategoryId?: string): readonly RegisteredTool[] {
  return tools.filter(
    (t) =>
      t.category === categoryId && (subcategoryId === undefined || t.subcategory === subcategoryId),
  )
}

export function findTool(
  categoryId: string | undefined,
  subcategoryId: string | undefined,
  toolId: string | undefined,
): RegisteredTool | undefined {
  return tools.find(
    (t) => t.category === categoryId && t.subcategory === subcategoryId && t.id === toolId,
  )
}

/** 제목 · 설명 · 키워드에서 찾는다 (대소문자 무시) */
export function searchTools(query: string): readonly RegisteredTool[] {
  const q = query.trim().toLowerCase()
  if (!q) return tools
  return tools.filter((t) =>
    [t.title, t.summary, ...(t.keywords ?? [])].some((text) => text.toLowerCase().includes(q)),
  )
}
