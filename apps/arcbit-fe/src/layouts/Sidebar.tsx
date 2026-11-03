import { useAuth } from '@arcbit/auth'
import { ThemeToggle } from '@arcbit/theme'
import { Button } from '@arcbit/ui'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import { sidebarMenu } from '../catalog/sidebarMenu'
import styles from './Sidebar.module.css'

export function Brand() {
  return (
    <Link to="/" className={styles.brand}>
      <span className={styles.mark} aria-hidden="true" />
      <strong>Arcbit</strong>
    </Link>
  )
}

/** 로고 · 지금 화면의 바로 아래 메뉴 · 하단 테마와 로그인 */
export function Sidebar({ id }: { id: string }) {
  const { pathname } = useLocation()
  const menu = sidebarMenu(pathname)
  return (
    <div className={styles.sidebar} id={id}>
      <Brand />
      <nav className={styles.nav} aria-label="메뉴">
        {menu.back && (
          <Link to={menu.back.to} className={styles.back}>
            <span aria-hidden="true">‹</span> {menu.back.label}
          </Link>
        )}
        <p className={styles.heading} id={`${id}-heading`}>
          {menu.heading}
        </p>
        {menu.items.length > 0 ? (
          <ul className={styles.list} aria-labelledby={`${id}-heading`}>
            {menu.items.map((item) => (
              <li key={item.to}>
                <NavLink to={item.to} className={styles.link}>
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        ) : (
          <p className={styles.empty}>아직 준비 중이에요</p>
        )}
      </nav>
      <div className={styles.footer}>
        <ThemeToggle />
        <Account />
      </div>
    </div>
  )
}

function Account() {
  const { status, principal, logout } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  if (status !== 'authenticated')
    return (
      <Button
        size="sm"
        className={styles.login}
        onClick={() => navigate('/login', { state: { from: location } })}
      >
        로그인
      </Button>
    )
  return (
    <div className={styles.account}>
      <Link to="/account" className={styles.accountName}>
        {principal?.username || principal?.email || '내 계정'}
      </Link>
      <Button variant="ghost" size="sm" onClick={logout}>
        로그아웃
      </Button>
    </div>
  )
}
