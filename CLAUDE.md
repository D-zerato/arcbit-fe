# arcbit-fe — Claude Code 컨텍스트

react-skeleton 에서 찍어 낸 pnpm 워크스페이스(React + TypeScript + Vite). 앱 `apps/arcbit-fe`, 패키지 8개(스코프 `@arcbit`).

## 만들기 전에 — 기능 카탈로그부터 (에이전트 필독)

무엇이든 새로 만들기 전에 `llms.txt` → `capabilities.json`(이 프로젝트에 **들어 있는** 기능: 한 줄 요약 · 진입점 · 따라 할 스토리 · 짝 백엔드 · 쓰지 않는 경우 · 한국어/영어 키워드)을 읽고, 이미 있는 패키지 · 부품 · Patterns 를 쓴다. 표 `docs/capabilities.md`. 카탈로그에 없는 기능은 이 프로젝트에 없다 — 스켈레톤(`react-skeleton`)의 `capabilities.json` 에 있는지 먼저 보고 그 패키지 폴더를 가져온다(앱 `package.json` 에 `"@arcbit/<이름>": "workspace:*"` 한 줄). 패키지 · 앱을 더하거나 지우면 `capabilities.json` 항목을 함께 고치고 `pnpm capabilities`(`tests/capabilities.test.ts` 가 어긋남을 막는다).

## UI 를 만들기 전에 (에이전트 필독 — 스토리가 정본이다)

화면을 짤 때마다 결과가 달라지지 않도록 **보고 따라 할 정본**이 있다 — Storybook(`pnpm storybook` → http://localhost:6006). 부품마다 스토리 하나가 「보이는 모습 · 정본 사용법 · 실행되는 테스트(`play`)」이고, 테스트가 돌기 때문에 낡지 않는다.

1. **부품을 쓰기 전에** `docs/ui-catalog.md` 에서 그 부품의 스토리 파일을 찾아 읽고, 거기 있는 사용법(`Field` 안에 `Input`, `Table` 의 `empty` …)을 그대로 따른다. 카탈로그에 없는 부품은 만들기 전에 있는 것으로 되는지부터 본다.
2. **새 화면은 `Patterns/…` 스토리에서 시작한다** — 가장 가까운 것을 복사해 문구 · 데이터 연결만 바꾼다(아래 표). 처음부터 짜지 않는다. 패키지가 자기 Patterns 를 들고 올 수도 있다(예: 공개 페이지용 `@arcbit/marketing` 의 랜딩 · 요금제 · 약관 · 404 — `docs/ui-catalog.md` 의 Patterns 표가 정본).
3. **날 요소 · 날값 금지** — `<button>` `<input>` `<select>` `<textarea>` `<dialog>` 대신 `@arcbit/ui` 의 `Button` `Input`(+`Field`) `Select` `Textarea` `Dialog`, 인라인 style 의 색 · 간격 · 모서리 날값 대신 의미 토큰(`var(--space-md)`). `apps/**` 에서 ESLint 가 메시지와 함께 막는다(`packages/ui` 안은 부품을 만드는 곳이라 제외).
4. **부품을 더하거나 바꾸면 스토리를 더하거나 고치고 `play` 로 동작을 검증한다**(클릭 · 키보드 · 라벨 연결 · 상태). `pnpm test:stories`(진짜 브라우저)가 통과해야 한다 — 접근성(a11y) 위반도 실패다. 규칙을 끄려면 그 스토리 옆에 이유를 적는다.
5. **스토리 파일을 더하거나 지우면** `docs/ui-catalog.md` 표에 한 줄을 더하거나 지운다(`tests/stories.test.ts` 가 어긋남을 막는다). `@arcbit/ui` 가 새로 export 하는 것은 `packages/ui/src/<폴더>/` 에 스토리(+`play` 하나 이상)가 있어야 한다.

| Patterns  | 파일                                                    | 복사하는 때                                                               |
| --------- | ------------------------------------------------------- | ------------------------------------------------------------------------- |
| 대시보드  | `apps/storybook/src/patterns/DashboardPage.stories.tsx` | 숫자 4칸 + 최근 항목 표 + 알림 카드 · 로딩 · 오류 · 첫 사용               |
| 목록      | `apps/storybook/src/patterns/ListPage.stories.tsx`      | 표 + 쪽 이동 + 빈 상태 + 로딩 + 오류                                      |
| 폼        | `apps/storybook/src/patterns/FormPage.stories.tsx`      | 입력 · 검증 오류 · 제출 중 · 성공 · 실패                                  |
| 상세      | `apps/storybook/src/patterns/DetailPage.stories.tsx`    | 제목 + 탭 + 위험 구역(삭제 확인) · 로딩 · 없음                            |
| 로그인    | `apps/storybook/src/patterns/LoginPage.stories.tsx`     | 이메일 · 비밀번호 · 제출 중 · 잘못된 계정 정보                            |
| 권한 없음 | `apps/storybook/src/patterns/ForbiddenPage.stories.tsx` | 403 화면                                                                  |
| 설정      | `apps/storybook/src/patterns/SettingsPage.stories.tsx`  | 목차 + 즉시 적용 스위치 + 저장 폼(실패 시 참조 번호) + ⋯ 메뉴 + 위험 구역 |

## 디렉토리 구조 (AI 참조용)

```
apps/
└── arcbit-fe/        # 앱 — 라우터 · AppShell · API 클라이언트 배선 · 보호 라우트 (starter 에서 이름만 바뀌었다)
└── storybook/     # 스토리집 — 설정(.storybook/) · Patterns(복사해서 시작하는 화면 틀) · 토큰 문서. 부품 스토리는 packages/*/src/**/*.stories.tsx
packages/
├── api-client        # 백엔드 REST 계약 클라이언트 — envelope · ApiError · 에러 코드 · traceparent · Idempotency-Key · 서버 시각 연결점
├── auth              # 인증 · 계정 수명주기 — 토큰 갱신(single-flight · 회전 안전 · 탭 동기화) · 로그인/가입/메일 확인/비밀번호 재설정/링크 로그인/소셜 콜백/계정 설정 화면(방법은 설정으로 켜고 끈다) · 가드 · 선택 관리자 표(@arcbit/auth/admin) · API 키 화면(@arcbit/auth/api-keys)
├── legal             # 법적 문서 · 동의 — 백엔드 modules/legal 짝: 문서 읽기(마크다운 · 판 · 효력일) · 가입 동의 체크리스트(필수/선택 · 전체 동의 · 문서 다이얼로그) · 첫 로그인 · 새 판 재동의 화면(403 LEGAL.RECONSENT_REQUIRED 를 api-client 계층에서 받아 동의 뒤 그 요청을 다시 보낸다) · 동의 설정(이력 · 선택 동의 철회). 문구는 모두 prop(ko/en 사전 포함), 문서 본문은 MarkdownView
├── seo               # 검색 · 공유 미리보기용 문서 머리(head) — 제목 템플릿 · 설명 · canonical · Open Graph · Twitter · JSON-LD · robots, SPA(effect)와 SSR(문자열)이 같은 규칙으로, 빌드 때 sitemap.xml · robots.txt 를 만드는 Vite 플러그인
├── theme             # 화면 테마(system · light · dark) — 선택 저장소 · ThemeToggle · ThemedToaster · 첫 칠 전 스크립트(Vite 플러그인)
├── time              # 글로벌 시간 처리(백엔드 modules:time 짝) — 시각 3종 포맷 · 서버 시각 보정 · 국가→시간대
├── tokens            # 디자인 토큰 정본(tokens.json) + 생성기(build.mjs) + 생성물(tokens.css, 라이트/다크)
├── ui                # 중립 UI — base.css(리셋 + 요소 타이포) · Button · Input · Field · Select · Textarea · Checkbox · Switch · Tabs · Table · Pagination · EmptyState · Card · Dialog · Spinner · AppShell · PageHeader · Badge · Progress · FilePicker · Stat · SwitchRow · SectionCard · SectionIndex · RowMenu · Skeleton · Avatar · Breadcrumbs · Alert · CopyButton · Tooltip · Stepper · ConfirmDialog · InfiniteList · Combobox · DatePicker · DateRangePicker · MarkdownView · ErrorReference · ErrorBoundary · showApiError · toastPromise. 의미 토큰만 쓴다(@arcbit/tokens 의 tokens.css 필요)
tests/            # 워크스페이스 가로지르는 테스트: stories(모든 부품에 스토리 + play · 카탈로그 일치) · eslint.uiOnly(날 요소 · 인라인 날값 금지) · usage · contrast · tokens.wiring · theme.names · workspace(의존 규칙) · eslint.boundaries
docs/design-tokens.md
docs/ui-catalog.md   # 부품 → 스토리 → 언제 쓰는가
```

## 핵심 컨벤션

- **패키지 안쪽 금지**: 다른 패키지는 이름(`@arcbit/<이름>`)과 `exports` 하위 경로(`/tokens.css` · `/vite` · `/base.css`)로만 쓴다. `@arcbit/*/src/**` · 폴더를 벗어나는 상대 import · 앱 import 는 ESLint(`eslint.config.js`) + `tests/workspace.test.ts` 가 막는다
- **의존 선언 = 실제 import**: 앱 · 패키지가 `package.json` 에 적은 `@arcbit/*` 는 소스가 import 하는 것과 정확히 같아야 한다(`workspace:*`). 패키지를 새로 쓰면 앱 `package.json` 에 한 줄 더한다. `starter` 는 워크벤치에 의존하지 않는다. 패키지가 외부 라이브러리를 쓰면 `dependencies`(또는 `peerDependencies`)에 선언한다 — 이것도 테스트가 확인
- **HTTP 엔드포인트: 모듈이 열면 그 경로가 기본값, 안 열면 경로를 설정으로**: 백엔드 모듈이 컨트롤러를 여는 패키지(`notifications` → `/notifications`, `storage` → `/storage/*`, `board` → `/boards`)는 그 경로가 기본값이고 `basePath` · `storageEndpoints(basePath)` 로 바꾼다(모듈이 막힌 앱이 자기 컨트롤러를 두는 경우). `payment` 의 장부 갈래(`createPaymentLedgerApi`)는 백엔드 `payment-jdbc` 가 여는 `/payments` 가 기본값이고 `basePath` 로 바꾼다. 모듈이 서비스 계약만 주는 경우(`captcha-turnstile`, `payment` 의 얇은 호출 `createPaymentApi`)는 기본 경로를 가정하지 않는다. 모듈 수준 계약만 겨냥한다 — 어느 Kotlin 파일의 어느 DTO 인지는 패키지 README 에
- **패키지를 만들거나 키울 때**: `package.json`(`exports` `.` = `{ types, default: ./src/index.ts }`, `test` · `typecheck` 스크립트) · `src/index.ts` barrel(공개 표면은 이것뿐) · 옆에 테스트 · `README.md`(API 표)를 갖춘다. 사용자에게 보이는 문구는 prop(기본 영어), 색은 의미 토큰만
- **SSR 안전**: 패키지는 import 할 때 브라우저 전역(`window` · `document` · `localStorage`)을 읽거나 쓰지 않는다 — 부수 효과는 명시적 호출(`@arcbit/theme` 의 `initTheme()` 을 앱이 시작할 때 부른다), 브라우저 API 는 effect · 핸들러 안에서만. 새 컴포넌트 · 훅을 export 하면 `tests/support/ssrFixtures.ts` 에 최소 props 한 줄을 더한다(안 하면 `tests/ssr.safety.test.ts` 가 실패, 일부러 브라우저 전용이면 `BROWSER_ONLY` 에 이유와 함께). 서버 렌더 앱 규칙(하이드레이션 일치 · 모듈 전역 금지 · 토큰은 브라우저에만)은 `apps/starter-ssr/README.md`
- **TypeScript strict**: `any` 금지. 필요하면 `unknown` + 타입 가드. 패키지 tsconfig 는 `types: []`(DOM 쓰는 UI 패키지만 `vite/client`)라 `import.meta.env` 를 쓰면 타입 에러
- **서버 상태는 TanStack Query로 일원화**: `useQuery`/`useMutation`. raw fetch 금지(실시간 스트림은 `@arcbit/realtime`)
- **공통 HTTP 는 `createApiClient`(axios 기반)**: baseUrl 은 `apiConfigFromEnv(import.meta.env)`(`VITE_API_BASE_URL` 또는 `/api/v1`). 에러는 `ApiRequestError` — 코드 분기는 `isErrorCode(error, ErrorCodes.AUTH_INVALID_CREDENTIALS)`, 코드는 백엔드 Kotlin enum 에 있는 것만 `packages/api-client/src/errorCodes.ts` 에 둔다
- **응답 DTO 표준화**: 단건은 `client.value<T>()`, 리스트는 `list<T>()`, 페이지는 `page<T>()`, 메타까지 필요하면 `response()`/`envelope()`
- **인증**: 토큰은 `@arcbit/auth` 의 `createTokenStore`(저장소 주입), 요청에는 `getAuthHeaders: createAuthHeadersProvider(store)`, 401 은 `onError: createUnauthorizedHandler({ store })`. 로그인한 사람만 보는 라우트는 `<RequireAuth />` 아래. dev-login/break-glass 헤더는 개발 · 점검용(`devLoginHeaders` · `breakGlassHeaders`)
- **디자인 토큰**: 색 · 그림자 · 서체 · 간격 · 모서리 · 글자 크기 값은 `packages/tokens/tokens.json` 에서만 정한다. 층은 둘 — 원시 `--p-*`(화면 CSS 에서 직접 사용 금지) → 의미 `--bg` `--text` …. 화면 CSS · 인라인 style 은 의미 토큰(`var(--…)`)만 쓴다(날 색 금지, `padding` · `margin` · `gap` · `border-radius` · `font-size` 의 px/rem/em 날값 금지 → `--space-*` · `--radius-*` · `--font-size-*`; 예외 앱은 `tests/support/layoutExempt.ts` 의 `apps/workbench` 뿐). 생성물 `packages/tokens/tokens.css` · `docs/design-tokens.md` 표 구역은 손으로 고치지 않고 `pnpm tokens`, CI 는 `pnpm tokens:check`. 라이트/다크는 `<html data-theme>`(`@arcbit/theme`), 글자/바탕 짝은 `tests/contrast.test.ts` 에 등록해 AA 를 지킨다. 부품(component) 층은 필요해질 때 추가(`docs/design-tokens.md`)
- **스토리가 부품의 정본이다**: 부품 스토리는 부품 옆(`packages/<이름>/src/<부품>/<부품>.stories.tsx`, CSF3 + `satisfies Meta` + `play`), 가짜(가짜 전송 · 받은편지함)는 그 패키지의 `src/stories/`. 스토리 파일과 `src/stories/` 는 테스트 쪽 파일로 세어 devDependencies 로 충분하다(`@arcbit/ui` 를 스토리에서만 쓰는 패키지는 devDependency 로 선언 + tsconfig `types: ["vite/client"]`). Patterns 는 `@arcbit/ui` · react · storybook 만 import 하고 도우미 파일을 두지 않는다. 합성 키 입력이 못 하는 브라우저 몫(`<dialog>` 의 Esc)은 `requestClose()` 로 같은 경로를 탄다. Storybook 도구는 모두 루트 devDependencies(패키지의 스토리도 거기서 푼다)
- **CSS Modules 우선**: 전역 CSS는 앱의 CSS 한 개(예: `apps/workbench/src/workbench.css`)와 `@arcbit/ui/base.css`(리셋 · 요소 타이포)에만. 필요해지면 Tailwind/shadcn 추가 검토
- **시각 3종** (`@arcbit/time`): ISO `...Z` 는 `formatInstant`, `YYYY-MM-DD` 는 `formatDate`(시간대 변환 금지), `ZonedMoment {local, zone, at}` 는 `formatDual`(이벤트 시간대 + 내 시간대). `new Date('YYYY-MM-DD')` 금지. 카운트다운은 `serverClock.now()`. 앱이 `getTimeZone: userTimeZone`, `onResponseDate` 로 연결하면 `X-Time-Zone` 이 자동으로 간다

## 백엔드와의 통신

Kotlin + Spring Boot 백엔드와 REST (`/api/v1/*`) 통신:

- **개발 기본값**: Vite dev(5173) → 백엔드(8080) proxy (각 앱 `vite.config.ts`, 목적지는 `API_PROXY_TARGET`). 백엔드와는 같은 작업 폴더에 `api` · `web` 으로 나란히 두고 백엔드 `scripts/dev.sh` 가 둘을 한 번에 띄운다(README 「백엔드와 나란히」)
- **개발 direct 검증**: `VITE_API_BASE_URL=http://localhost:<port>/api/v1` 로 다른 포트 백엔드에 직접 연결(앱 폴더 `.env`). 이때 백엔드 CORS를 켜야 한다.
- **프로덕션**: Caddy가 같은 origin으로 프론트 정적 번들 + 백엔드 프록시 합침 → CORS 불필요

### REST 응답 DTO

- 백엔드는 단건 `{ value, meta }`, 리스트 `{ values, meta }`, 페이지 `{ values, pagination, meta }`를 반환한다.
- `value<T>()` 는 단건 envelope를 검증하고 `value`만, `list<T>()` 는 `values`만, `page<T>()` 는 `values`·`pagination`·`meta` 전체를 반환한다.
- 표준 envelope 전체가 필요하면 `envelope<ApiValueResponse<T>>()` 처럼 명시한다.

### traceId 기반 디버깅

- `createApiClient` 가 요청마다 W3C `traceparent` 헤더 자동 부착
- 같은 작업 전체를 하나로 묶고 싶으면 같은 `traceId`를 `client.value('/path', { traceId })`로 넘김(실시간 클라이언트도 `traceId` 옵션)
- 백엔드(`TraceIdFilter`)가 traceId를 승계하고 현재 요청 spanId를 새로 생성
- 응답을 못 해석하면 클라이언트가 `CLIENT.HTTP_ERROR`(body 가 ApiError 계약 아님) · `CLIENT.NETWORK_ERROR`(status 0) 코드를 채운다 — 백엔드 코드가 아니다
- 에러 시 토스트(`showApiError`)에 traceId와 spanId 출력됨 → traceId로 전체 플로우 grep, spanId로 특정 요청 단계 좁히기
- TanStack Query DevTools (개발 모드 + `VITE_REACT_QUERY_DEVTOOLS=true`) 로 쿼리 상태 실시간 확인 가능

## 왜 Vite (Next.js 아님)

PoC 기동 속도 + AI 친화성. 정적 번들 출력이라 호스팅 자유도 높음. SSR/SEO 가 필요한 앱은 프레임워크로 옮기지 않고 같은 스택 위의 `apps/starter-ssr`(plain Vite SSR — Node 서버 + 하이드레이션, 새 런타임 의존 없음)로 시작한다(`new-project.sh --ssr`). 스트리밍 · 서버 컴포넌트 · 파일 라우팅이 필요해지면 그때 프레임워크를 검토한다.

## 새 페이지 추가 시 (앱 안)

1. `apps/<앱>/src/routes/XxxPage.tsx` 생성 (named export 함수형 컴포넌트)
2. `src/routes/routes.tsx` 의 `children` 배열에 `{ path: '/xxx', element: <XxxPage /> }` 추가 (로그인 필요하면 `RequireAuth` 아래 `children`)
3. 필요하면 `layouts/RootLayout.tsx` 에 네비게이션 링크 추가
4. 데이터 fetch는 TanStack Query 훅(`hooks/useHello.ts` 모양) + `apiClient.value<T>('/path')`
5. 화면 본문은 처음부터 짜지 않고 가장 가까운 `Patterns/…` 스토리를 복사해 시작한다(위 표). 쓰는 부품의 스토리를 열어 사용법을 확인한다

## 검증 명령

루트에서: `pnpm lint` · `pnpm tokens:check` · `pnpm typecheck`(모든 앱 · 패키지 `tsc` + 루트 tests) · `pnpm test`(각 앱 · 패키지 + 루트 `tests/`) · `pnpm format:check` · `pnpm build`(네 앱). CI(`.github/workflows/ci.yml`)가 같은 순서로 돈다. 한 곳만: `pnpm --filter @arcbit/auth test`. dev 서버: `pnpm dev`(starter) · `pnpm dev:ssr` · `pnpm dev:workbench`.

**멈춤 주의**: `vite build` · `vitest` 가 0% CPU 로 영원히 멈추는 rolldown 교착이 vite 8.0.x 에 있었다(vite ^8.3.2 에서 재현 안 됨 — 내리지 말 것). 오래 걸릴 수 있는 명령은 `node scripts/with-watchdog.mjs --wall 300 --retries 2 -- <명령>` 으로 돌린다(자세히는 README 「알려진 함정」). macOS 에는 `timeout` 이 없다.

스토리집: `pnpm storybook`(http://localhost:6006) · `pnpm storybook:build`(정적 빌드) · `pnpm test:stories`(진짜 브라우저 headless — 모든 스토리의 `play` + a11y. Playwright chromium 이 필요하다: `pnpm exec playwright install chromium`). `pnpm test` 는 빠른 단위 테스트만 돌린다. CI 는 `stories` 잡이 `test:stories` 를 따로 돈다.

## 변경 이력

`CHANGELOG.md` 에 기록. 새 기능은 `[Unreleased]` 섹션에 먼저 적고 릴리스 시 버전 섹션으로 승격.
