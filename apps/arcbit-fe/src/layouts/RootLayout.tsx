import { useAuth } from '@arcbit/auth'
import { ThemeToggle } from '@arcbit/theme'
import { AppShell, Button } from '@arcbit/ui'
import { Link, NavLink, Outlet } from 'react-router-dom'
import { allCategories } from '../catalog/registry'
import styles from './RootLayout.module.css'

export function RootLayout() {
  const { status, logout } = useAuth()
  return (
    <AppShell
      brand={
        <Link to="/" className={styles.brand}>
          <span className={styles.mark} aria-hidden="true" />
          <strong>Arcbit</strong>
        </Link>
      }
      nav={
        <>
          {allCategories().map((c) => (
            <NavLink key={c.id} to={`/${c.id}`}>
              {c.title}
            </NavLink>
          ))}
          <NavLink to="/account">계정</NavLink>
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
