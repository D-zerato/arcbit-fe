import { AuthProvider, createAuthSession, createTokenStore, type AuthApi } from '@arcbit/auth'
import { renderToStaticMarkup } from 'react-dom/server'
import { MemoryRouter } from 'react-router-dom'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { RootLayout } from './RootLayout'

afterEach(() => vi.unstubAllGlobals())

const unused = async () => {
  throw new Error('unused')
}
const api: AuthApi = {
  login: async () => {
    throw new Error('unused')
  },
  socialLogin: async () => {
    throw new Error('unused')
  },
  me: async () => {
    throw new Error('unused')
  },
  refresh: unused,
  logout: unused,
  magicLinkRequest: unused,
  methods: async () => {
    throw new Error('unused')
  },
  magicLinkRedeem: unused,
  cancelDeletion: unused,
}

function render(path: string) {
  vi.stubGlobal('document', { documentElement: { dataset: {} } })
  return renderToStaticMarkup(
    <AuthProvider session={createAuthSession({ api, store: createTokenStore() })}>
      <MemoryRouter initialEntries={[path]}>
        <RootLayout />
      </MemoryRouter>
    </AuthProvider>,
  )
}

describe('RootLayout', () => {
  it('사이드바 하단에 테마와 로그인, 옆에 본문', () => {
    const html = render('/')
    expect(html).toMatch(/<aside[\s\S]*aria-label="Theme: system"[\s\S]*로그인[\s\S]*<\/aside>/)
    expect(html).toContain('<main')
  })

  it('좁은 화면용 메뉴 버튼이 사이드바를 가리키고 처음엔 닫혀 있다', () => {
    const html = render('/')
    expect(html).toMatch(/aria-expanded="false"[^>]*aria-controls="app-sidebar"/)
    expect(html).toContain('id="app-sidebar"')
    expect(html).not.toMatch(/<aside[^>]*data-open/)
  })

  it('사이드바는 지금 화면의 바로 아래 메뉴만 그린다', () => {
    const html = render('/game/animo/gender-type')
    expect(html).not.toMatch(/<aside[\s\S]*href="\/game"[\s\S]*<\/aside>/)
    expect(html).toMatch(
      /aria-current="page"[^>]*href="\/game\/animo\/gender-type"|href="\/game\/animo\/gender-type"[^>]*aria-current="page"/,
    )
  })
})
