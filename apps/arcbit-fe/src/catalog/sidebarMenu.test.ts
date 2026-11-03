import { describe, expect, it } from 'vitest'
import { categories } from './categories'
import { sidebarMenu } from './sidebarMenu'

const labels = (pathname: string) => sidebarMenu(pathname).items.map((i) => i.label)
const categoryTitles = categories.map((c) => c.title)

describe('사이드바 메뉴 — 지금 화면의 바로 아래 단계만', () => {
  it('홈은 카테고리만, 위로 가는 링크 없음', () => {
    const menu = sidebarMenu('/')
    expect(menu.back).toBeUndefined()
    expect(labels('/')).toEqual(categoryTitles)
  })

  it('카탈로그 밖 화면(로그인 · 계정 · 약관)도 카테고리', () => {
    for (const path of ['/login', '/account', '/legal/terms'])
      expect(labels(path)).toEqual(categoryTitles)
  })

  it('카테고리는 세부 카테고리만 — 도구 · 다른 카테고리는 없다', () => {
    const menu = sidebarMenu('/game')
    expect(menu.back).toEqual({ to: '/', label: '홈' })
    expect(menu.heading).toBe('게임')
    expect(menu.items).toContainEqual({ to: '/game/animo', label: '애니모' })
    expect(menu.items.every((i) => i.to.split('/').length === 3)).toBe(true)
  })

  it('세부 카테고리는 그 안의 도구만 — 카테고리 · 세부는 없다', () => {
    const menu = sidebarMenu('/game/animo')
    expect(menu.back).toEqual({ to: '/game', label: '게임' })
    expect(menu.heading).toBe('애니모')
    expect(menu.items).toContainEqual({ to: '/game/animo/gender-type', label: '내 성별 추천 타입' })
    expect(menu.items.every((i) => i.to.startsWith('/game/animo/'))).toBe(true)
  })

  it('도구 화면은 세부 카테고리와 같은 메뉴', () => {
    expect(sidebarMenu('/game/animo/gender-type')).toEqual(sidebarMenu('/game/animo'))
  })

  it('없는 세부 카테고리는 카테고리 단계까지만 따라간다', () => {
    expect(sidebarMenu('/game/nope')).toEqual(sidebarMenu('/game'))
  })
})
