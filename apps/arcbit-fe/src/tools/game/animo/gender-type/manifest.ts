import type { ToolManifest } from '../../../../catalog/types'

export const manifest: ToolManifest = {
  id: 'gender-type',
  category: 'game',
  subcategory: 'animo',
  title: '내 성별 추천 타입',
  summary: '성별과 플레이 성향을 고르면 어울리는 타입을 골라 드려요',
  keywords: ['애니모', '추천', '타입', '성별', 'animo', 'type'],
  status: 'new',
  updatedAt: '2026-11-02',
  load: () => import('./Tool'),
}
