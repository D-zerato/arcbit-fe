import type { RouteObject } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import { routes } from '../routes/routes'
import { categories } from './categories'
import { allTools } from './registry'

const SLUG = /^[a-z0-9]+(-[a-z0-9]+)*$/

/** 앱의 고정 경로(`/login` · `/account` …)의 첫 조각 — 카테고리 주소와 겹치면 안 된다 */
function staticTopSegments(list: RouteObject[]): string[] {
  return list.flatMap((r) => {
    const own = r.path?.replace(/^\//, '').split('/')[0]
    const mine = own && !own.startsWith(':') && own !== '*' ? [own] : []
    return [...mine, ...staticTopSegments(r.children ?? [])]
  })
}

describe('카테고리 정의', () => {
  it('id 는 주소 조각 모양이고 겹치지 않는다', () => {
    const ids = categories.map((c) => c.id)
    expect(new Set(ids).size).toBe(ids.length)
    for (const c of categories) {
      expect(c.id, c.id).toMatch(SLUG)
      const subs = c.subcategories.map((s) => s.id)
      expect(new Set(subs).size, c.id).toBe(subs.length)
      for (const s of subs) expect(s, `${c.id}/${s}`).toMatch(SLUG)
    }
  })

  it('카테고리 주소가 앱의 고정 경로와 겹치지 않는다', () => {
    const reserved = new Set(staticTopSegments(routes))
    for (const c of categories) expect(reserved.has(c.id), `${c.id} 는 이미 쓰는 경로`).toBe(false)
  })
})

describe('도구 등록표', () => {
  it('모든 도구가 있는 카테고리 · 세부 카테고리에 속한다', () => {
    for (const t of allTools()) {
      const category = categories.find((c) => c.id === t.category)
      expect(category, t.path).toBeDefined()
      expect(
        category?.subcategories.some((s) => s.id === t.subcategory),
        t.path,
      ).toBe(true)
    }
  })

  it('경로가 겹치지 않고 정보 칸이 모양에 맞는다', () => {
    const paths = allTools().map((t) => t.path)
    expect(new Set(paths).size).toBe(paths.length)
    for (const t of allTools()) {
      expect(t.id, t.path).toMatch(SLUG)
      expect(t.updatedAt, t.path).toMatch(/^\d{4}-\d{2}-\d{2}$/)
      expect(['new', 'beta', 'stable'], t.path).toContain(t.status)
      expect(t.title.trim(), t.path).not.toBe('')
      expect(t.summary.trim(), t.path).not.toBe('')
    }
  })
})
