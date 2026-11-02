/*
 * 계산 로직 — 화면과 분리해 테스트한다.
 * ※ 아래 타입 표는 구조를 보여 주는 예시 데이터다. 실제 애니모 타입 · 수치로 바꿔야 한다.
 */

export type Gender = 'male' | 'female' | 'none'
export type PlayStyle = 'attack' | 'defense' | 'balance'

export type Recommendation = {
  type: string
  description: string
  /** 0~10 */
  stats: { label: string; value: number }[]
}

const TABLE: Record<PlayStyle, Recommendation> = {
  attack: {
    type: '번개형',
    description: '빠른 선공으로 흐름을 잡는 타입',
    stats: [
      { label: '스피드', value: 8 },
      { label: '파워', value: 6 },
      { label: '내구', value: 3 },
    ],
  },
  defense: {
    type: '방패형',
    description: '버티면서 반격하는 타입',
    stats: [
      { label: '스피드', value: 3 },
      { label: '파워', value: 5 },
      { label: '내구', value: 9 },
    ],
  },
  balance: {
    type: '균형형',
    description: '상황에 맞춰 역할을 바꾸는 타입',
    stats: [
      { label: '스피드', value: 6 },
      { label: '파워', value: 6 },
      { label: '내구', value: 6 },
    ],
  },
}

/** 성별 보정 — 예시: 성별에 따라 한 능력치를 1 올린다(최대 10) */
const GENDER_BONUS: Record<Gender, string | null> = { male: '파워', female: '스피드', none: null }

export function recommend(gender: Gender, style: PlayStyle): Recommendation {
  const base = TABLE[style]
  const bonus = GENDER_BONUS[gender]
  return {
    ...base,
    stats: base.stats.map((s) =>
      s.label === bonus ? { ...s, value: Math.min(10, s.value + 1) } : s,
    ),
  }
}

export const GENDERS: readonly { value: Gender; label: string }[] = [
  { value: 'male', label: '남성' },
  { value: 'female', label: '여성' },
  { value: 'none', label: '선택 안 함' },
]

export const STYLES: readonly { value: PlayStyle; label: string }[] = [
  { value: 'attack', label: '공격형' },
  { value: 'defense', label: '수비형' },
  { value: 'balance', label: '균형형' },
]

/** 공유 링크의 값이 올바른지 — 주소 쿼리는 사용자가 고칠 수 있다 */
export function isGender(value: string | null): value is Gender {
  return GENDERS.some((g) => g.value === value)
}
export function isPlayStyle(value: string | null): value is PlayStyle {
  return STYLES.some((s) => s.value === value)
}
