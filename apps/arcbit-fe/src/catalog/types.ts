import type { ComponentType, LazyExoticComponent } from 'react'

/** 도구의 상태 — 목록과 카드에 배지로 보인다 */
export type ToolStatus = 'new' | 'beta' | 'stable'

/** 세부 카테고리 — 카테고리 아래 묶음 (예: 게임 › 애니모) */
export type Subcategory = {
  /** 주소 조각. 소문자 · 숫자 · 하이픈 */
  id: string
  title: string
  summary: string
}

/** 카테고리 — 사이트 맨 위 묶음 (예: 게임) */
export type Category = {
  id: string
  title: string
  summary: string
  subcategories: readonly Subcategory[]
}

/**
 * 도구 하나의 정보 — `tools/<카테고리>/<세부>/<도구>/manifest.ts` 가 `export const manifest` 로 내보낸다.
 * 등록표(registry.ts)가 폴더를 훑어 자동으로 모으므로 중앙 파일을 고치지 않는다.
 */
export type ToolManifest = {
  /** 폴더 이름과 같다. 소문자 · 숫자 · 하이픈 */
  id: string
  /** 폴더 경로의 카테고리 · 세부 카테고리와 같다 */
  category: string
  subcategory: string
  title: string
  /** 목록에 한 줄로 보이는 설명 */
  summary: string
  /** 검색에 쓰는 말 (한국어 · 영어) */
  keywords?: readonly string[]
  status: ToolStatus
  /** 마지막으로 바꾼 날 `YYYY-MM-DD` */
  updatedAt: string
  /** 화면은 열 때 불러온다 — `() => import('./Tool')` */
  load: () => Promise<{ default: ComponentType }>
}

/** 등록표가 경로를 붙여 돌려주는 도구 */
export type RegisteredTool = ToolManifest & {
  /** `/<카테고리>/<세부>/<도구>` */
  path: string
  /** 열 때 불러오는 화면 — 등록할 때 한 번 만들어 둔다 */
  Component: LazyExoticComponent<ComponentType>
}
