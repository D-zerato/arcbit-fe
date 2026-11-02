import type { Category } from './types'

/**
 * 카테고리 · 세부 카테고리 정의 — 사이트 지도의 정본.
 * 새 세부 카테고리는 여기 한 줄, 그 안의 도구는 `tools/<카테고리>/<세부>/<도구>/` 폴더로 더한다.
 * 순서가 화면 순서다.
 */
export const categories: readonly Category[] = [
  {
    id: 'game',
    title: '게임',
    summary: '공략, 계산기, 추천 도구',
    subcategories: [{ id: 'animo', title: '애니모', summary: '타입 추천, 조합 도구' }],
  },
]
