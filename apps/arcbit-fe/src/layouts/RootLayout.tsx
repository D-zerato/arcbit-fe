import { useAuth } from '@arcbit/auth'
import { ThemeToggle } from '@arcbit/theme'
import { AppShell, Button } from '@arcbit/ui'
import { Link, Outlet } from 'react-router-dom'

export function RootLayout() {
  const { status, logout } = useAuth()
  return (
    <AppShell
      brand={
        <Link to="/">
          <strong>arcbit-fe</strong>
        </Link>
      }
      nav={
        <>
          <Link to="/">홈</Link>
          <Link to="/account">계정</Link>
        </>
      }
      actions={
        <>
          {status === 'authenticated' && (
            <Button variant="ghost" size="sm" onClick={logout}>
              로그아웃
            </Button>
          )}
          <ThemeToggle />
        </>
      }
    >
      <Outlet />
    </AppShell>
  )
}
