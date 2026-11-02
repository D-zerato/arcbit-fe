import { describe, expect, it } from 'vitest'
import { isGender, isPlayStyle, recommend } from './logic'

describe('recommend', () => {
  it('성향에 맞는 타입을 고른다', () => {
    expect(recommend('none', 'attack').type).toBe('번개형')
    expect(recommend('none', 'defense').type).toBe('방패형')
  })

  it('성별 보정은 한 능력치만 1 올리고 10을 넘지 않는다', () => {
    const base = recommend('none', 'attack').stats
    const female = recommend('female', 'attack').stats
    expect(female.find((s) => s.label === '스피드')?.value).toBe(9)
    expect(female.filter((s, i) => s.value !== base[i]?.value)).toHaveLength(1)
    for (const s of recommend('male', 'defense').stats) expect(s.value).toBeLessThanOrEqual(10)
  })
})

describe('공유 링크 값 검사', () => {
  it('모르는 값은 거절한다', () => {
    expect(isGender('female')).toBe(true)
    expect(isGender('robot')).toBe(false)
    expect(isPlayStyle(null)).toBe(false)
  })
})
