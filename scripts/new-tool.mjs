#!/usr/bin/env node
/*
 * 새 도구 폴더 뼈대 만들기.
 *   pnpm new:tool <카테고리> <세부> <도구> ["화면 제목"]
 *   예) pnpm new:tool game animo party-sim "조합 시뮬레이터"
 * 카테고리 · 세부 카테고리는 apps/arcbit-fe/src/catalog/categories.ts 에 먼저 있어야 한다.
 */
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const app = join(root, 'apps/arcbit-fe/src')
const [category, subcategory, id, title = id] = process.argv.slice(2)
const SLUG = /^[a-z0-9]+(-[a-z0-9]+)*$/

function fail(message) {
  console.error(`x ${message}`)
  process.exit(1)
}

if (!category || !subcategory || !id)
  fail('사용법: pnpm new:tool <카테고리> <세부> <도구> ["화면 제목"]')
for (const part of [category, subcategory, id])
  if (!SLUG.test(part)) fail(`"${part}": 소문자 · 숫자 · 하이픈만 쓴다`)

const categoriesSource = readFileSync(join(app, 'catalog/categories.ts'), 'utf8')
for (const part of [category, subcategory])
  if (!categoriesSource.includes(`id: '${part}'`))
    fail(`"${part}" 가 catalog/categories.ts 에 없다 — 카테고리 · 세부 카테고리를 먼저 더한다`)
// 여기서는 이름이 있는지만 본다. 세부 카테고리가 그 카테고리 아래 있는지는 catalog/registry.test.ts 가 최종 판정한다

const dir = join(app, 'tools', category, subcategory, id)
if (existsSync(dir)) fail(`이미 있다: ${dir}`)
mkdirSync(dir, { recursive: true })

const today = new Date().toISOString().slice(0, 10)
const quoted = JSON.stringify(title)

const files = {
  'manifest.ts': `import type { ToolManifest } from '../../../../catalog/types'

export const manifest: ToolManifest = {
  id: '${id}',
  category: '${category}',
  subcategory: '${subcategory}',
  title: ${quoted},
  summary: '한 줄 설명을 적는다',
  keywords: [],
  status: 'new',
  updatedAt: '${today}',
  load: () => import('./Tool'),
}
`,
  'logic.ts': `/** 계산 로직 — 화면과 분리해 logic.test.ts 로 검증한다 */
export function run(input: string): string {
  return input
}
`,
  'logic.test.ts': `import { describe, expect, it } from 'vitest'
import { run } from './logic'

describe('run', () => {
  it('입력을 결과로 바꾼다', () => {
    expect(run('a')).toBe('a')
  })
})
`,
  'Tool.tsx': `import { Card } from '@arcbit/ui'
import glass from '../../../../styles/glass.module.css'
import styles from './Tool.module.css'

export default function ToolScreen() {
  return (
    <Card className={glass.glass} title={${quoted}}>
      <p className={styles.hint}>여기에 도구 화면을 만든다.</p>
    </Card>
  )
}
`,
  'Tool.module.css': `.hint {
  margin: 0;
  color: var(--text-muted);
}
`,
  'README.md': `# ${title} (${category} › ${subcategory})

무엇을 하는 도구인지 한 문단.

- 로직: \`logic.ts\` — 화면과 분리, \`logic.test.ts\` 로 검증
- 입력 · 결과 · 공유 방식
`,
}
for (const [name, body] of Object.entries(files)) writeFileSync(join(dir, name), body)
console.log(`만들었다: apps/arcbit-fe/src/tools/${category}/${subcategory}/${id}/`)
console.log(`열기: http://localhost:5173/${category}/${subcategory}/${id}`)
