# arcbit-fe

react-skeleton(pnpm 워크스페이스)에서 `scripts/new-project.sh` 로 찍어 낸 프로젝트. 앱은 `apps/arcbit-fe` · 부품 · 화면 틀 · 토큰을 보고 테스트하는 스토리집 `apps/storybook`, 패키지는 `packages/*`(스코프 `@arcbit`).

## 시작

```bash
pnpm install --no-frozen-lockfile   # 처음 한 번 — pnpm-lock.yaml 이 이 워크스페이스에 맞춰진다. 결과를 커밋한다
pnpm format                          # 처음 한 번 — 이름 · 스코프 바꾸기로 달라진 줄바꿈
pnpm dev                             # apps/arcbit-fe  http://localhost:5173 (백엔드 :8080 으로 /api/v1 프록시)
pnpm storybook                       # 스토리집 http://localhost:6006 (백엔드 없이 모든 부품 · Patterns · 토큰)
pnpm test:stories                    # 스토리의 play · 접근성을 진짜 브라우저(headless)에서 — 처음 한 번 `pnpm exec playwright install chromium`
pnpm lint && pnpm typecheck && pnpm test && pnpm format:check && pnpm build
pnpm tokens                          # packages/tokens/tokens.json → tokens.css
```

Node 24(또는 22.18+), pnpm 10.

## 패키지

| 패키지               | 설명                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | 자세히                          |
| -------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------- |
| `@arcbit/api-client` | 백엔드 REST 계약 클라이언트 — envelope · ApiError · 에러 코드 · traceparent · Idempotency-Key · 서버 시각 연결점                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | `packages/api-client/README.md` |
| `@arcbit/auth`       | 인증 · 계정 수명주기 — 토큰 갱신(single-flight · 회전 안전 · 탭 동기화) · 로그인/가입/메일 확인/비밀번호 재설정/링크 로그인/소셜 콜백/계정 설정 화면(방법은 설정으로 켜고 끈다) · 가드 · 선택 관리자 표(@arcbit/auth/admin) · API 키 화면(@arcbit/auth/api-keys)                                                                                                                                                                                                                                                                                                                    | `packages/auth/README.md`       |
| `@arcbit/legal`      | 법적 문서 · 동의 — 백엔드 modules/legal 짝: 문서 읽기(마크다운 · 판 · 효력일) · 가입 동의 체크리스트(필수/선택 · 전체 동의 · 문서 다이얼로그) · 첫 로그인 · 새 판 재동의 화면(403 LEGAL.RECONSENT_REQUIRED 를 api-client 계층에서 받아 동의 뒤 그 요청을 다시 보낸다) · 동의 설정(이력 · 선택 동의 철회). 문구는 모두 prop(ko/en 사전 포함), 문서 본문은 MarkdownView                                                                                                                                                                                                               | `packages/legal/README.md`      |
| `@arcbit/seo`        | 검색 · 공유 미리보기용 문서 머리(head) — 제목 템플릿 · 설명 · canonical · Open Graph · Twitter · JSON-LD · robots, SPA(effect)와 SSR(문자열)이 같은 규칙으로, 빌드 때 sitemap.xml · robots.txt 를 만드는 Vite 플러그인                                                                                                                                                                                                                                                                                                                                                              | `packages/seo/README.md`        |
| `@arcbit/theme`      | 화면 테마(system · light · dark) — 선택 저장소 · ThemeToggle · ThemedToaster · 첫 칠 전 스크립트(Vite 플러그인)                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | `packages/theme/README.md`      |
| `@arcbit/time`       | 글로벌 시간 처리(백엔드 modules:time 짝) — 시각 3종 포맷 · 서버 시각 보정 · 국가→시간대                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | `packages/time/README.md`       |
| `@arcbit/tokens`     | 디자인 토큰 정본(tokens.json) + 생성기(build.mjs) + 생성물(tokens.css, 라이트/다크)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | `packages/tokens/README.md`     |
| `@arcbit/ui`         | 중립 UI — base.css(리셋 + 요소 타이포) · Button · Input · Field · Select · Textarea · Checkbox · Switch · Tabs · Table · Pagination · EmptyState · Card · Dialog · Spinner · AppShell · PageHeader · Badge · Progress · FilePicker · Stat · SwitchRow · SectionCard · SectionIndex · RowMenu · Skeleton · Avatar · Breadcrumbs · Alert · CopyButton · Tooltip · Stepper · ConfirmDialog · InfiniteList · Combobox · DatePicker · DateRangePicker · MarkdownView · ErrorReference · ErrorBoundary · showApiError · toastPromise. 의미 토큰만 쓴다(@arcbit/tokens 의 tokens.css 필요) | `packages/ui/README.md`         |

패키지는 **내부를 고치지 않는다** — 바꾸고 싶은 것은 설정 · prop · `tokens.json` 값으로 바꾼다. 서로는 이름(`@arcbit/<이름>`)으로만 부른다(ESLint · `pnpm test` 가 막는다).

폴더는 있지만 앱이 아직 쓰지 않는 패키지: `@arcbit/seo`. 쓰기 시작할 때 `apps/arcbit-fe/package.json` 에 한 줄 — `"@arcbit/<이름>": "workspace:*"` — 을 더하고 `pnpm install`. 안 쓰는 패키지를 의존으로 선언하면 `pnpm test` 가 막고, 필요 없으면 `packages/<이름>` 폴더를 지운다.

## 기능 카탈로그

이 프로젝트에 무엇이 들어 있는지는 `capabilities.json`(정본 — 스키마 `docs/capabilities.schema.json`) · `docs/capabilities.md` · `llms.txt` 에 있다 — 스켈레톤의 카탈로그에서 **고른 것만** 걸러 왔고, 여기에 없는 기능은 스켈레톤의 `capabilities.json` 에서 찾는다. 폴더가 바뀌면 `pnpm capabilities`(생성) · `pnpm capabilities:check`(검사).

## 백엔드

kotlin-skeleton 계열 REST 백엔드(`/api/v1`)와 통신한다. 개발에서는 Vite 가 `/api/v1` 을 `http://localhost:8080` 으로 프록시하고, 다른 포트는 앱 폴더 `.env` 의 `VITE_API_BASE_URL`. 패키지별로 어느 백엔드 모듈과 짝인지는 각 `packages/<이름>/README.md`.
