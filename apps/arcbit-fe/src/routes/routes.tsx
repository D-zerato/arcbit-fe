import type { RouteObject } from 'react-router-dom'
import { RootLayout } from '../layouts/RootLayout'
import { accountRoutes } from '../auth/routes'
import { LegalPage } from '../legal/LegalPage'
import { CategoryPage } from './CategoryPage'
import { HomePage } from './HomePage'
import { NotFoundPage } from './NotFoundPage'
import { RouteErrorPage } from './RouteErrorPage'
import { SubcategoryPage } from './SubcategoryPage'
import { ToolPage } from './ToolPage'

/**
 * 라우트 정의 — path → page 매핑은 여기.
 *
 * 새 페이지: 1) `src/routes/XxxPage.tsx` 2) 아래 `children` 에 한 줄.
 * 로그인해야 보이는 페이지는 `RequireAuth` 아래 `children` 에 둔다(비로그인은 `/login` 으로, 돌아올 위치를 기억한다).
 */
export const routes: RouteObject[] = [
  {
    element: <RootLayout />,
    // 화면을 그리다 난 오류(배포 뒤 옛 탭이 사라진 도구 파일을 부를 때 포함)는 라우터가 잡아 여기로 온다
    errorElement: <RouteErrorPage />,
    children: [
      { path: '/', element: <HomePage /> },
      // 로그인 · 가입 · 메일 확인 · 비밀번호 재설정 · 링크 로그인 · 계정 설정(/account 는 로그인한 사람만) — `auth/routes.tsx`
      ...accountRoutes,
      // 서버가 쥐는 약관 · 방침(백엔드 legal 모듈) — 가입 폼의 체크박스 · 재동의 화면의 「보기」가 이 문서를 연다
      { path: '/legal/:type', element: <LegalPage /> },
      // 카탈로그: 카테고리 › 세부 카테고리 › 기능 (catalog/categories.ts + tools/**/manifest.ts). 고정 경로가 먼저 맞는다
      { path: '/:categoryId', element: <CategoryPage /> },
      { path: '/:categoryId/:subcategoryId', element: <SubcategoryPage /> },
      { path: '/:categoryId/:subcategoryId/:toolId', element: <ToolPage /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
]
