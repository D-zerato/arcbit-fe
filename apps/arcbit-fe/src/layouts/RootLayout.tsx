import { Button } from '@arcbit/ui'
import { useEffect, useRef, useState, type MouseEvent } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { Brand, Sidebar } from './Sidebar'
import styles from './RootLayout.module.css'

const SIDEBAR_ID = 'app-sidebar'
/** RootLayout.module.css 의 서랍 경계와 같다 */
const WIDE = '(min-width: 769px)'

/** 왼쪽 사이드바 + 본문. 좁은 화면에서는 위쪽 줄의 ☰ 로 사이드바를 서랍처럼 연다 */
export function RootLayout() {
  const location = useLocation()
  const [open, setOpen] = useState(false)
  const topbar = useRef<HTMLElement>(null)
  const aside = useRef<HTMLElement>(null)
  // 배경을 누르면 포커스가 먼저 body 로 빠진다 — 그때도 닫힌 뒤 ☰ 로 돌려주려고 표시해 둔다
  const backdropClosed = useRef(false)

  // 주소가 바뀌면(뒤로 가기 포함) 닫는다 — effect 없이 이전 값과 비교
  const [seenKey, setSeenKey] = useState(location.key)
  if (seenKey !== location.key) {
    setSeenKey(location.key)
    setOpen(false)
  }

  useEffect(() => {
    if (!open) return
    const panel = aside.current
    const opener = topbar.current?.querySelector<HTMLElement>(`[aria-controls="${SIDEBAR_ID}"]`)
    // 열면 서랍 첫 링크로, 닫힐 때 포커스가 서랍 안이었으면 ☰ 로 돌려준다
    panel?.querySelector<HTMLElement>('a[href]')?.focus()
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    // 서랍을 연 채 창을 넓히면 닫는다(다시 좁혔을 때 저절로 열려 있지 않게)
    const wide = window.matchMedia(WIDE)
    const onWide = () => wide.matches && setOpen(false)
    document.addEventListener('keydown', onKey)
    wide.addEventListener('change', onWide)
    return () => {
      document.removeEventListener('keydown', onKey)
      wide.removeEventListener('change', onWide)
      // 닫힌 뒤(위쪽 줄의 inert 가 풀린 뒤)라야 ☰ 에 포커스가 들어간다
      if (backdropClosed.current || panel?.contains(document.activeElement)) opener?.focus()
      backdropClosed.current = false
    }
  }, [open])

  const closeFromBackdrop = () => {
    backdropClosed.current = true
    setOpen(false)
  }

  // 서랍 안 링크는 지금 화면을 가리켜도(주소가 안 바뀌어도) 누르면 닫는다
  const closeOnLink = (e: MouseEvent) => {
    if (e.target instanceof Element && e.target.closest('a')) setOpen(false)
  }

  return (
    <div className={styles.shell}>
      <header ref={topbar} className={styles.topbar} inert={open}>
        <Button
          variant="ghost"
          size="sm"
          aria-label="메뉴 열기"
          aria-expanded={open}
          aria-controls={SIDEBAR_ID}
          onClick={() => setOpen(true)}
        >
          <span aria-hidden="true">☰</span>
        </Button>
        <Brand />
      </header>
      <aside
        ref={aside}
        className={styles.aside}
        data-open={open || undefined}
        onClick={closeOnLink}
      >
        <Sidebar id={SIDEBAR_ID} />
      </aside>
      {open && <div className={styles.backdrop} aria-hidden="true" onClick={closeFromBackdrop} />}
      <main className={styles.main} inert={open}>
        <Outlet />
      </main>
    </div>
  )
}
