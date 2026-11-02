<!-- 생성물 — capabilities.json 에서 `pnpm capabilities` 가 만든다. 손으로 고치지 않는다 -->

# 기능 카탈로그 — arcbit-fe

arcbit-fe — react-skeleton 에서 찍은 프로젝트. 이 프로젝트에 들어 있는 기능만 적었다.

정본은 `capabilities.json`(스키마 `docs/capabilities.schema.json`)이고 이 문서 · `llms.txt` 는 거기서 만든다. 항목마다 한 줄 요약 · 켜는 법 · 짝 백엔드 · 진입점 · 따라 할 스토리 · 쓰지 않는 경우 · 한국어/영어 키워드가 있다.

이 프로젝트는 `react-skeleton` 1.1.0 에서 찍혔다. 아래는 **이 프로젝트에 들어 있는 것**뿐이다 — 여기에 없는 기능은 스켈레톤에서 찾는다: 형제 레포 react-skeleton 의 capabilities.json (전체 카탈로그)

## 전체 목록

### 패키지 (`packages/*`)

| id | 무엇을 주는가 | 켜는 법 | 백엔드 | 상태 | 키워드 (ko / en) |
|---|---|---|---|---|---|
| `api-client` | 백엔드 REST 호출 한 곳 — 응답 envelope 벗기기 · 표준 에러(ApiRequestError · 에러 코드) · traceparent · 멱등 키 · 서버 시각 연결점을 갖춘 클라이언트. | 선택됨 | platform | stable | API 호출, 백엔드 연결, 에러 처리, 에러 코드, 멱등 키, traceId / api client, rest, http client, error codes, idempotency key, trace id |
| `auth` | 로그인 · 계정 수명주기 — 토큰 갱신(401 → 갱신 한 번 → 재시도, 회전 안전 · 탭 락) · 가입(닉네임 칸: 끔 · 선택 · 필수) · 메일 인증 · 비밀번호 재설정 · 링크 로그인 · 소셜 · 계정 설정(비밀번호 · 계정 이메일 · 연락받을 이메일 · 로그인 수단 · 세션 · 삭제) · 이메일을 필수로 켠 앱의 「이메일을 등록해 주세요」 전면 화면(주소 없는 계정이 앱 대신 본다 — 받는 시점은 로그인 직후 또는 쓰기 때, 쓰기 때는 `useEmailBeforeWrite` 와 「나중에 하기」) · 로그인 아이디(서버가 켠 앱만 — 가입의 아이디 칸과 실시간 확인 · 「아이디 또는 이메일」 로그인 · 아이디 찾기 `/forgot-id` · 아이디 없는 계정의 「아이디를 정해 주세요」 막 · 설정의 아이디 줄 · 관리자 표의 아이디 열과 찾기, 키가 없으면 화면은 예전 그대로) · 탈퇴 유예 중 로그인의 「탈퇴를 취소할까요?」 화면과 라우트 한 벌, 방법은 설정으로 켜고 끈다. | 선택됨 | auth | stable | 로그인, 로그아웃, 인증, 토큰, JWT, 보호 라우트 / login, logout, auth, authentication, jwt, token |
| `seo` | 검색 · 공유 미리보기 — 제목 · 설명 · canonical · OG/Twitter · hreflang · JSON-LD 를 SPA(effect)와 SSR(문자열)에서 같은 규칙으로, 빌드 때 sitemap.xml · robots.txt 까지. | 선택됨 | — | stable | 검색 노출, SEO, 메타 태그, OG 이미지, 링크 미리보기, 사이트맵 / seo, meta tags, open graph, twitter card, canonical, sitemap |
| `legal` | 법적 문서 · 동의 — 서버의 약관 읽기(마크다운 · 판 · 효력일) · 가입 동의 체크리스트(필수/선택 · 전체 동의 · 문서 다이얼로그) · 첫 로그인과 새 판 재동의(403 LEGAL.RECONSENT_REQUIRED 를 api-client 계층에서 받아 동의 뒤 막힌 호출을 다시 보낸다) · 동의 설정(이력 · 선택 동의 철회). | 선택됨 | legal, legal-jdbc | stable | 약관 동의, 가입 동의 체크박스, 재동의, 개인정보 동의, 마케팅 수신 동의, 동의 철회 / terms consent, sign-up consent checkbox, re-consent, privacy consent, marketing opt-in, withdraw consent |
| `time` | 글로벌 시간 — 순간 · 달력 날짜 · 현지+내 시간대 3종 포맷, 서버 시각 보정(카운트다운), 국가→시간대, 오늘의 날짜. | 선택됨 | time | stable | 시간, 날짜 표시, 시간대, 타임존, 서버 시각, 카운트다운 / time, date format, timezone, server clock, countdown, relative time |
| `theme` | 라이트/다크/시스템 테마 — 토글 · 토스트 테마 · 첫 칠 전 스크립트(깜빡임 방지) · Vite 플러그인. | 선택됨 | — | stable | 다크 모드, 테마, 라이트 모드, 다크 테마 / dark mode, theme, light mode, color scheme |
| `tokens` | 디자인 토큰 — 색 · 간격 · 모서리 · 글자 크기의 단일 정본(tokens.json)과 생성기 → tokens.css(라이트/다크), 날값 검출 테스트 도구. | 선택됨 | — | stable | 디자인 토큰, 색상, 브랜드 색, 간격, 디자인 시스템, 색 바꾸기 / design tokens, colors, brand color, spacing, design system, css variables |
| `ui` | 화면 부품 — Button · Input/Field · Select · Table · Pagination · Dialog · Tabs · AppShell · Combobox · DatePicker · MarkdownView 등, 모두 스토리 + play + 접근성 테스트. | 선택됨 | — | stable | 버튼, 입력창, 폼, 표, 테이블, 모달 / button, input, form, table, modal, dialog |

### 앱 (`apps/*`)

| id | 무엇을 주는가 | 켜는 법 | 백엔드 | 상태 | 키워드 (ko / en) |
|---|---|---|---|---|---|
| `app-arcbit-fe` | SPA 스타터 — 라우터 · AppShell · 테마 토글 · API 클라이언트 · 로그인 · 보호 라우트가 이어진 출발점(새 프로젝트의 앱이 된다). | 선택됨 | account, account-jdbc, alert, auth, auth-session, auth-session-jdbc, auth-social, captcha-turnstile, db-postgresql, idempotency, job-queue-jdbc, legal, legal-jdbc, migration, migration-flyway, notification-mail, persistence-jdbc, platform, time | stable | 스타터, SPA, 시작 템플릿, 새 앱, 프런트 시작 / starter, spa, boilerplate, vite react, frontend start |
| `app-storybook` | 스토리집 — 모든 부품 · 복사해 시작하는 화면 틀(Patterns) · 토큰을 백엔드 없이 보고, 진짜 브라우저로 동작 · 접근성을 테스트한다. | 선택됨 | — | stable | 스토리북, 스토리집, 화면 틀, 컴포넌트 카탈로그, 접근성 테스트, 컴포넌트 문서 / storybook, component catalog, patterns, a11y test, component docs |

### 패턴 (패키지 안의 한 기능 · 화면 틀)

| id | 무엇을 주는가 | 켜는 법 | 백엔드 | 상태 | 키워드 (ko / en) |
|---|---|---|---|---|---|
| `social-login` | 소셜 로그인의 프런트 절반 — GET /auth/methods 가 알려 준 제공자 · authorize 주소 · scope · pkce/nonce 로 인가 주소 만들기(Google · LINE · X · Kakao · Naver, PKCE S256 · nonce 는 시도마다), state 검증(탭에 묶임 · 한 번만) · 콜백의 code 를 백엔드로 보내 로그인 처리, 로그인한 계정에 제공자를 더하는 연결 흐름(createSocialLinkFlow), 제공자 마크 · 문구. 버튼 · 콜백 화면은 SignInScreen · createAuthRoutes 가 그린다. | 선택됨 | auth-social | stable | 소셜 로그인, 구글 로그인, 카카오 로그인, 네이버 로그인, 간편 로그인, OAuth / social login, google login, kakao login, naver login, oauth, sso |
| `account-lifecycle` | 계정 수명주기 화면 한 벌 — 가입(서버 정책 힌트 · 캡차 · 동의 슬롯 · 메일로 받은 6자리 인증번호를 같은 화면에서 입력하면 바로 로그인) · 비밀번호 재설정 · 링크 로그인 도착 · 로그인(방법은 백엔드가 알려 준다) · 계정 설정(이메일 변경 · 첫 비밀번호 · 소셜 연결/해제 · 삭제의 다시 인증은 비밀번호 · 메일 인증번호(그 자리에서 입력) · 제공자 동의 중 계정에 맞는 하나, 이메일 변경 대기는 서버가 말해 준다) · 오래된 메일 링크 안내 · 정지/차단 안내. createAuthRoutes 가 라우트까지 한 번에. | 선택됨 | account, account-jdbc, auth-session, auth-session-jdbc | stable | 회원가입, 가입 화면, 이메일 인증, 메일 확인, 비밀번호 재설정, 비밀번호 찾기 / sign up, registration screen, verify email, check your email, reset password, forgot password |
| `session-refresh` | 액세스 토큰 자동 갱신 — 401 이면 갱신을 한 번으로 합쳐(single-flight) 요청을 한 번만 다시 보낸다. 회전하는 리프레시 토큰을 안전하게 저장하고 탭 사이를 락 · storage 이벤트로 맞추며, 재사용 · 만료 때는 깨끗이 로그아웃. body · cookie 모드. | 선택됨 | auth-session, auth-session-jdbc | stable | 토큰 갱신, 리프레시 토큰, 자동 로그인 유지, 세션 만료, 탭 동기화 / token refresh, refresh token, silent refresh, session expiry, cross-tab sync |
| `magic-link-login` | 이메일 링크 로그인 — 로그인 화면의 「링크 받기」 · 메일 확인 안내 · 링크를 열면 로그인되는 도착 화면. 비밀번호 없이 쓰거나 비밀번호와 나란히 켠다. | 선택됨 | auth-magic-link | stable | 링크 로그인, 매직링크, 비밀번호 없는 로그인, 이메일 로그인 / magic link, passwordless, email sign in |
| `account-admin` | 운영자 계정 표(선택 내보내기 @arcbit/auth/admin) — 검색 · 상태 필터 · 정지 · 해제 · 삭제 유예 복구 · 역할 부여/회수. 역할 관리 화면(AdminRoles — 만들기 · 권한 고르기 · 고치기 · 지우기)은 백엔드 authz 모듈이 있을 때. | 선택됨 | account | stable | 운영자 도구, 계정 관리, 계정 정지, 관리자 화면 / admin tools, account management, suspend account, admin panel |
| `api-keys` | API 키 화면(선택 내보내기 @arcbit/auth/api-keys) — 설정 구역 ApiKeysSection: 내 키 목록(상태 ACTIVE · EXPIRED · REVOKED, 운영자가 회수한 키 표시) · 만들기 대화상자(이름 · 앱이 선언한 범위 체크 · 만료 30/90/365일/없음 · 다시 인증) → 토큰을 한 번만 보여 주고 복사 · 회수 확인. 운영자용 AdminApiKeys(@arcbit/auth/admin): 전체 키 표 · 주인/상태 필터 · 커서 · 사유 필수 회수. TanStack Query 훅 포함(선택 peer). | 선택됨 | api-key, api-key-jdbc | stable | API 키, 액세스 토큰 발급, 개인 액세스 토큰, 키 회수, 범위 선택, 외부 연동 키 / api key, personal access token, api token, revoke key, key scopes, developer settings |
| `screen-patterns` | 제품 화면 틀 — 대시보드 · 목록 · 폼 · 상세 · 로그인 · 권한 없음 · 설정을 Patterns/… 스토리에서 복사해 문구 · 데이터 연결만 바꿔 시작한다. | 선택됨 | — | stable | 대시보드, 목록 화면, 폼 화면, 상세 화면, 설정 화면, 관리자 화면 / dashboard, list page, form page, detail page, settings page, admin screen |

### 스크립트 (`scripts/*`)

| id | 무엇을 주는가 | 켜는 법 | 백엔드 | 상태 | 키워드 (ko / en) |
|---|---|---|---|---|---|
| `script-with-watchdog` | 0% CPU 로 멈추는 빌드 · 테스트(rolldown 교착)를 시간으로 끊고 다시 돌리는 감시자 — 명령 앞에 붙인다. | 선택됨 | — | stable | 빌드 멈춤, 워치독, 교착, 멈춘 테스트 재시도 / watchdog, hang, stall, retry build, timeout |
| `script-build-capabilities` | capabilities.json 에서 docs/capabilities.md · llms.txt 를 생성하고(--check 로 어긋남 검사) 같은 가드를 돌린다. | 선택됨 | — | stable | 기능 카탈로그, 카탈로그 생성, 카탈로그 점검, 기능 목록 / capabilities catalog, generate docs, catalog check, feature list |

## 항목 상세

### `api-client` — 백엔드 REST 호출 한 곳 — 응답 envelope 벗기기 · 표준 에러(ApiRequestError · 에러 코드) · traceparent · 멱등 키 · 서버 시각 연결점을 갖춘 클라이언트.

- 종류 · 상태: package · stable
- 위치: `@arcbit/api-client` (`packages/api-client`)
- 켜는 법: 이 프로젝트를 찍을 때 골라 들어 있다
- 백엔드: 모듈 `platform` · 경로 `/api/v1`
- 주요 진입점: `createApiClient` · `apiConfigFromEnv` · `ApiRequestError` · `isErrorCode` · `ErrorCodes` · `newIdempotencyKey` · `createTraceContext`
- 문서: `packages/api-client/README.md`
- 쓰지 않는 경우: 실시간 스트림(SSE · WebSocket) → realtime / 페이지 · 컴포넌트에서 fetch/axios 를 직접 부르지 않는다 — 앱의 api/client.ts 인스턴스를 훅(useQuery)으로 쓴다
- 키워드: API 호출, 백엔드 연결, 에러 처리, 에러 코드, 멱등 키, traceId, 응답 형식 / api client, rest, http client, error codes, idempotency key, trace id, axios

### `auth` — 로그인 · 계정 수명주기 — 토큰 갱신(401 → 갱신 한 번 → 재시도, 회전 안전 · 탭 락) · 가입(닉네임 칸: 끔 · 선택 · 필수) · 메일 인증 · 비밀번호 재설정 · 링크 로그인 · 소셜 · 계정 설정(비밀번호 · 계정 이메일 · 연락받을 이메일 · 로그인 수단 · 세션 · 삭제) · 이메일을 필수로 켠 앱의 「이메일을 등록해 주세요」 전면 화면(주소 없는 계정이 앱 대신 본다 — 받는 시점은 로그인 직후 또는 쓰기 때, 쓰기 때는 `useEmailBeforeWrite` 와 「나중에 하기」) · 로그인 아이디(서버가 켠 앱만 — 가입의 아이디 칸과 실시간 확인 · 「아이디 또는 이메일」 로그인 · 아이디 찾기 `/forgot-id` · 아이디 없는 계정의 「아이디를 정해 주세요」 막 · 설정의 아이디 줄 · 관리자 표의 아이디 열과 찾기, 키가 없으면 화면은 예전 그대로) · 탈퇴 유예 중 로그인의 「탈퇴를 취소할까요?」 화면과 라우트 한 벌, 방법은 설정으로 켜고 끈다.

- 종류 · 상태: package · stable
- 위치: `@arcbit/auth` (`packages/auth`)
- 켜는 법: 이 프로젝트를 찍을 때 골라 들어 있다
- 필요한 것: `api-client` · `ui`
- 백엔드: 모듈 `auth` · 있으면 더 켜지는 `account` · `account-jdbc` · `auth-session` · `auth-session-jdbc` · `auth-magic-link` · 경로 `/api/v1/auth` · `/api/v1/account`
- 주요 진입점: `createTokenStore` · `createRefreshStore` · `createAuthApi` · `createAuthSession` · `createSessionRefresher` · `createAccountApi` · `createAuthRoutes` · `AuthProvider` · `useAuth` · `RequireAuth` · `RequireRole` · `RequirePermission` · `useCan` · `SignInScreen` · `SignUpScreen` · `AccountSettings` · `createAuthHeadersProvider` · `createUnauthorizedHandler`
- 보고 따라 할 스토리: `packages/auth/src/RequireAuth.stories.tsx` · `packages/auth/src/RequirePermission.stories.tsx`
- 복사해 시작할 Patterns: `apps/storybook/src/patterns/LoginPage.stories.tsx` · `apps/storybook/src/patterns/ForbiddenPage.stories.tsx` · `packages/auth/src/patterns/SignIn.stories.tsx` · `packages/auth/src/patterns/SignUp.stories.tsx` · `packages/auth/src/patterns/MailLinkLandings.stories.tsx` · `packages/auth/src/patterns/DeletionPending.stories.tsx` · `packages/auth/src/patterns/SocialEmailConflict.stories.tsx` · `packages/auth/src/patterns/EmailRequired.stories.tsx` · `packages/auth/src/patterns/LoginIdField.stories.tsx` · `packages/auth/src/patterns/LoginIdRequired.stories.tsx` · `packages/auth/src/patterns/AccountSettings.stories.tsx`
- 문서: `packages/auth/README.md`
- 쓰지 않는 경우: 권한(roles) 정책 자체는 백엔드 — 이 패키지는 토큰 · 라우트 가드(RequireAuth · RequireRole · RequirePermission)만 - 권한 문자열은 백엔드 GET /auth/me 가 주고 화면은 숨길 뿐이다 / 약관 동의 저장은 없다 — 가입 화면의 동의 슬롯은 체크한 판을 콜백으로 보고할 뿐(문서 · 저장은 @arcbit/legal) / 로그인 화면의 모양(색 · 로고 · 문구 톤)은 앱의 몫 — 문구는 labels prop(기본 영어, koAuthLabels 한국어)
- 키워드: 로그인, 로그아웃, 인증, 토큰, JWT, 보호 라우트, 로그인 상태, 세션, 회원가입, 가입, 이메일 인증, 비밀번호 재설정, 비밀번호 찾기, 계정 설정, 계정 삭제, 탈퇴 취소, 탈퇴 유예, 토큰 갱신, 리프레시 토큰, 세션 목록, 닉네임, 표시 이름, 로그인 아이디, 아이디 찾기, 이메일 쓰기 때 받기 / login, logout, auth, authentication, jwt, token, session, protected route, sign in, sign up, registration, email verification, password reset, forgot password, account settings, delete account, cancel deletion, deletion grace, refresh token, token refresh, active sessions, nickname, display name, login id, username login, find my id, email on write

### `seo` — 검색 · 공유 미리보기 — 제목 · 설명 · canonical · OG/Twitter · hreflang · JSON-LD 를 SPA(effect)와 SSR(문자열)에서 같은 규칙으로, 빌드 때 sitemap.xml · robots.txt 까지.

- 종류 · 상태: package · stable
- 위치: `@arcbit/seo` (`packages/seo`)
- 켜는 법: 이 프로젝트를 찍을 때 골라 들어 있다
- 백엔드: 없음(프런트만)
- 주요 진입점: `buildHeadSpec` · `renderHeadHtml` · `useSeo` · `Seo` · `SeoProvider` · `applyHead` · `sitemapXml` · `robotsTxt` · `faqLd` · `breadcrumbLd` · `@arcbit/seo/vite#seoFiles`
- 보고 따라 할 스토리: `packages/seo/src/Seo.stories.tsx`
- 문서: `packages/seo/README.md`
- 쓰지 않는 경우: 분석 · 추적 코드는 없다 / SPA 는 첫 HTML 이 비어 링크 미리보기 크롤러가 머리를 못 읽는다 — 노출이 중요하면 서버 렌더 앱(app-starter-ssr)
- 키워드: 검색 노출, SEO, 메타 태그, OG 이미지, 링크 미리보기, 사이트맵, 구조화 데이터 / seo, meta tags, open graph, twitter card, canonical, sitemap, robots.txt, json-ld

### `legal` — 법적 문서 · 동의 — 서버의 약관 읽기(마크다운 · 판 · 효력일) · 가입 동의 체크리스트(필수/선택 · 전체 동의 · 문서 다이얼로그) · 첫 로그인과 새 판 재동의(403 LEGAL.RECONSENT_REQUIRED 를 api-client 계층에서 받아 동의 뒤 막힌 호출을 다시 보낸다) · 동의 설정(이력 · 선택 동의 철회).

- 종류 · 상태: package · stable
- 위치: `@arcbit/legal` (`packages/legal`)
- 켜는 법: 이 프로젝트를 찍을 때 골라 들어 있다
- 필요한 것: `api-client` · `ui`
- 백엔드: 모듈 `legal` · `legal-jdbc` · 경로 `/api/v1/legal`
- 주요 진입점: `createLegalApi` · `createReconsentController` · `ReconsentGate` · `SignUpConsents` · `ConsentChecklist` · `ConsentSettings` · `ApiLegalDocumentPage` · `DocumentDialog` · `useLegalDocuments` · `useMyConsents`
- 보고 따라 할 스토리: `packages/legal/src/ConsentChecklist.stories.tsx` · `packages/legal/src/SignUpConsents.stories.tsx` · `packages/legal/src/ReconsentGate.stories.tsx` · `packages/legal/src/ConsentSettings.stories.tsx` · `packages/legal/src/ApiLegalDocumentPage.stories.tsx`
- 문서: `packages/legal/README.md`
- 쓰지 않는 경우: 백엔드가 없거나 legal 모듈이 없는 사이트의 정적 약관은 marketing 의 LegalDocumentPage 를 쓴다 / 문서 본문 · 사실(회사명 …) · 검토 상태는 백엔드 소관이다 — 이 패키지는 서버가 준 마크다운을 그린다 / 쿠키 · 추적 동의는 marketing 의 ConsentBanner(브라우저 저장)
- 키워드: 약관 동의, 가입 동의 체크박스, 재동의, 개인정보 동의, 마케팅 수신 동의, 동의 철회, 약관 개정 / terms consent, sign-up consent checkbox, re-consent, privacy consent, marketing opt-in, withdraw consent, terms update

### `time` — 글로벌 시간 — 순간 · 달력 날짜 · 현지+내 시간대 3종 포맷, 서버 시각 보정(카운트다운), 국가→시간대, 오늘의 날짜.

- 종류 · 상태: package · stable
- 위치: `@arcbit/time` (`packages/time`)
- 켜는 법: 이 프로젝트를 찍을 때 골라 들어 있다
- 백엔드: 모듈 `time` · HTTP 를 열지 않는다(앱이 컨트롤러를 둔다)
- 주요 진입점: `formatInstant` · `formatDate` · `formatDual` · `formatRelative` · `todayInZone` · `createServerClock` · `userTimeZone`
- 보고 따라 할 스토리: `packages/time/src/formats.stories.tsx`
- 문서: `packages/time/README.md`
- 쓰지 않는 경우: 문구 번역 → i18n / new Date('YYYY-MM-DD') 로 달력 날짜를 만들지 않는다 — formatDate
- 키워드: 시간, 날짜 표시, 시간대, 타임존, 서버 시각, 카운트다운, 상대 시간 / time, date format, timezone, server clock, countdown, relative time

### `theme` — 라이트/다크/시스템 테마 — 토글 · 토스트 테마 · 첫 칠 전 스크립트(깜빡임 방지) · Vite 플러그인.

- 종류 · 상태: package · stable
- 위치: `@arcbit/theme` (`packages/theme`)
- 켜는 법: 이 프로젝트를 찍을 때 골라 들어 있다
- 백엔드: 없음(프런트만)
- 주요 진입점: `initTheme` · `useTheme` · `setTheme` · `ThemeToggle` · `ThemedToaster` · `PRE_PAINT_SCRIPT` · `@arcbit/theme/vite#themePrePaint`
- 보고 따라 할 스토리: `packages/theme/src/ThemeToggle.stories.tsx` · `packages/theme/src/ThemedToaster.stories.tsx`
- 문서: `packages/theme/README.md`
- 쓰지 않는 경우: 색 값을 정하는 곳이 아니다 → tokens (theme 는 data-theme 전환만)
- 키워드: 다크 모드, 테마, 라이트 모드, 다크 테마 / dark mode, theme, light mode, color scheme

### `tokens` — 디자인 토큰 — 색 · 간격 · 모서리 · 글자 크기의 단일 정본(tokens.json)과 생성기 → tokens.css(라이트/다크), 날값 검출 테스트 도구.

- 종류 · 상태: package · stable
- 위치: `@arcbit/tokens` (`packages/tokens`)
- 켜는 법: 이 프로젝트를 찍을 때 골라 들어 있다
- 백엔드: 없음(프런트만)
- 주요 진입점: `findRawColors` · `findRawLayout` · `contrast` · `themeVars`
- 보고 따라 할 스토리: `apps/storybook/src/tokens/Tokens.stories.tsx`
- 문서: `packages/tokens/README.md` · `docs/design-tokens.md`
- 쓰지 않는 경우: 화면 CSS 에 색 · 간격 날값을 쓰지 않는다 — var(--…) 의미 토큰 / 생성물(tokens.css · docs/design-tokens.md 표)을 손으로 고치지 않는다 — pnpm tokens
- 키워드: 디자인 토큰, 색상, 브랜드 색, 간격, 디자인 시스템, 색 바꾸기 / design tokens, colors, brand color, spacing, design system, css variables

### `ui` — 화면 부품 — Button · Input/Field · Select · Table · Pagination · Dialog · Tabs · AppShell · Combobox · DatePicker · MarkdownView 등, 모두 스토리 + play + 접근성 테스트.

- 종류 · 상태: package · stable
- 위치: `@arcbit/ui` (`packages/ui`)
- 켜는 법: 이 프로젝트를 찍을 때 골라 들어 있다
- 필요한 것: `api-client` · `time`
- 백엔드: 없음(프런트만)
- 주요 진입점: `Button` · `Input` · `Field` · `FormProblems` · `Select` · `Table` · `Pagination` · `Dialog` · `Tabs` · `AppShell` · `PageHeader` · `EmptyState` · `showApiError` · `toastPromise`
- 보고 따라 할 스토리: `packages/ui/src/Button/Button.stories.tsx` · `packages/ui/src/Field/Field.stories.tsx` · `packages/ui/src/Table/Table.stories.tsx` · `packages/ui/src/Dialog/Dialog.stories.tsx` · `packages/ui/src/AppShell/AppShell.stories.tsx`
- 복사해 시작할 Patterns: `apps/storybook/src/patterns/DashboardPage.stories.tsx` · `apps/storybook/src/patterns/ListPage.stories.tsx` · `apps/storybook/src/patterns/FormPage.stories.tsx` · `apps/storybook/src/patterns/DetailPage.stories.tsx` · `apps/storybook/src/patterns/LoginPage.stories.tsx` · `apps/storybook/src/patterns/SettingsPage.stories.tsx`
- 문서: `packages/ui/README.md` · `docs/ui-catalog.md`
- 쓰지 않는 경우: 날 <button> · <input> · <select> · <textarea> · <dialog> 를 쓰지 않는다 — ESLint 가 막는다 / 부품이 API 를 부르지 않는다(props 만) · 사용자에게 보이는 문구는 prop
- 키워드: 버튼, 입력창, 폼, 표, 테이블, 모달, 다이얼로그, 탭, 페이지네이션, 레이아웃, 컴포넌트, 드롭다운, 토스트, 날짜 선택 / button, input, form, table, modal, dialog, tabs, pagination, layout, components, dropdown, toast, date picker

### `app-arcbit-fe` — SPA 스타터 — 라우터 · AppShell · 테마 토글 · API 클라이언트 · 로그인 · 보호 라우트가 이어진 출발점(새 프로젝트의 앱이 된다).

- 종류 · 상태: app · stable
- 위치: `arcbit-fe` (`apps/arcbit-fe`)
- 켜는 법: 이 프로젝트를 찍을 때 골라 들어 있다
- 필요한 것: `api-client` · `auth` · `theme` · `time` · `tokens` · `ui`
- 백엔드: 모듈 `account` · `account-jdbc` · `alert` · `auth` · `auth-session` · `auth-session-jdbc` · `auth-social` · `captcha-turnstile` · `db-postgresql` · `idempotency` · `job-queue-jdbc` · `legal` · `legal-jdbc` · `migration` · `migration-flyway` · `notification-mail` · `persistence-jdbc` · `platform` · `time` · 경로 `/api/v1` · `/api/v1/project-hello` · 짝 앱 `apps/api`
- 주요 진입점: `apps/arcbit-fe/src/main.tsx` · `apps/arcbit-fe/src/routes/routes.tsx` · `apps/arcbit-fe/src/api/client.ts` · `apps/arcbit-fe/src/auth/session.ts` · `apps/arcbit-fe/src/layouts/RootLayout.tsx`
- 문서: `CLAUDE.md`
- 쓰지 않는 경우: 서버가 첫 HTML 을 그려야 하면(검색 노출 · 링크 미리보기) → app-starter-ssr / 복사 후 안 쓰는 것은 지운다 — 스타터는 최소다
- 키워드: 스타터, SPA, 시작 템플릿, 새 앱, 프런트 시작 / starter, spa, boilerplate, vite react, frontend start

### `app-storybook` — 스토리집 — 모든 부품 · 복사해 시작하는 화면 틀(Patterns) · 토큰을 백엔드 없이 보고, 진짜 브라우저로 동작 · 접근성을 테스트한다.

- 종류 · 상태: app · stable
- 위치: `storybook-app` (`apps/storybook`)
- 켜는 법: 이 프로젝트를 찍을 때 골라 들어 있다
- 필요한 것: `tokens` · `ui`
- 백엔드: 없음(프런트만)
- 주요 진입점: `apps/storybook/.storybook/main.ts` · `apps/storybook/.storybook/preview.tsx` · `apps/storybook/src/tokens/Tokens.stories.tsx`
- 복사해 시작할 Patterns: `apps/storybook/src/patterns/DashboardPage.stories.tsx` · `apps/storybook/src/patterns/ListPage.stories.tsx` · `apps/storybook/src/patterns/FormPage.stories.tsx` · `apps/storybook/src/patterns/DetailPage.stories.tsx` · `apps/storybook/src/patterns/LoginPage.stories.tsx` · `apps/storybook/src/patterns/ForbiddenPage.stories.tsx` · `apps/storybook/src/patterns/SettingsPage.stories.tsx`
- 문서: `docs/ui-catalog.md` · `docs/design-tokens.md`
- 쓰지 않는 경우: 제품에 배포하는 앱이 아니다(개발 · 문서용) / 스토리집 없이 가볍게 찍으려면 new-project.sh --without-storybook
- 키워드: 스토리북, 스토리집, 화면 틀, 컴포넌트 카탈로그, 접근성 테스트, 컴포넌트 문서 / storybook, component catalog, patterns, a11y test, component docs

### `social-login` — 소셜 로그인의 프런트 절반 — GET /auth/methods 가 알려 준 제공자 · authorize 주소 · scope · pkce/nonce 로 인가 주소 만들기(Google · LINE · X · Kakao · Naver, PKCE S256 · nonce 는 시도마다), state 검증(탭에 묶임 · 한 번만) · 콜백의 code 를 백엔드로 보내 로그인 처리, 로그인한 계정에 제공자를 더하는 연결 흐름(createSocialLinkFlow), 제공자 마크 · 문구. 버튼 · 콜백 화면은 SignInScreen · createAuthRoutes 가 그린다.

- 종류 · 상태: pattern · stable
- 위치: `@arcbit/auth` (`packages/auth/src/social.ts`)
- 켜는 법: 이 프로젝트를 찍을 때 골라 들어 있다
- 필요한 것: `auth`
- 백엔드: 모듈 `auth-social` · `auth-social-google` | `auth-social-kakao` | `auth-social-naver` | `auth-social-oidc` | `auth-social-x` 중 하나 이상 · 경로 `/api/v1/auth/social`
- 주요 진입점: `createSocialLoginFlow` · `createSocialLinkFlow` · `useSocialLoginCallback` · `buildAuthorizeUrl` · `parseSocialCallback` · `SOCIAL_AUTHORIZE_PRESETS` · `SocialCallbackScreen` · `createCodeVerifier` · `redirectUriProblems` · `providerPresentation`
- 복사해 시작할 Patterns: `packages/auth/src/patterns/SignIn.stories.tsx` · `packages/auth/src/patterns/MailLinkLandings.stories.tsx`
- 문서: `packages/auth/README.md`
- 쓰지 않는 경우: clientSecret 은 프런트에 두지 않는다 — 백엔드 skeleton.auth-social.providers.* 에만 / 이메일 가입 · 계정 연결 정책은 백엔드 — 앱이 병합을 켜 두면(skeleton.account.social.merge-on-verified-email, 샘플 · 스타터 백엔드는 켠다) 확인된 제공자 이메일은 기존 계정으로 바로 로그인되고, 꺼 두면 ACCOUNT.SOCIAL_EMAIL_CONFLICT(409)가 나온다 — 화면은 둘 다 다룬다. 연결 · 병합은 계정 주소로 알림 메일이 간다 / 제공자마다 콜백 주소 · clientId 를 콘솔에 등록해야 한다(VITE_SOCIAL_<제공자>_CLIENT_ID)
- 키워드: 소셜 로그인, 구글 로그인, 카카오 로그인, 네이버 로그인, 간편 로그인, OAuth, LINE 로그인, 라인 로그인, X 로그인, 트위터 로그인, PKCE / social login, google login, kakao login, naver login, oauth, sso, line login, x login, twitter login, pkce, openid connect

### `account-lifecycle` — 계정 수명주기 화면 한 벌 — 가입(서버 정책 힌트 · 캡차 · 동의 슬롯 · 메일로 받은 6자리 인증번호를 같은 화면에서 입력하면 바로 로그인) · 비밀번호 재설정 · 링크 로그인 도착 · 로그인(방법은 백엔드가 알려 준다) · 계정 설정(이메일 변경 · 첫 비밀번호 · 소셜 연결/해제 · 삭제의 다시 인증은 비밀번호 · 메일 인증번호(그 자리에서 입력) · 제공자 동의 중 계정에 맞는 하나, 이메일 변경 대기는 서버가 말해 준다) · 오래된 메일 링크 안내 · 정지/차단 안내. createAuthRoutes 가 라우트까지 한 번에.

- 종류 · 상태: pattern · stable
- 위치: `@arcbit/auth` (`packages/auth/src/routes/createAuthRoutes.tsx`)
- 켜는 법: 이 프로젝트를 찍을 때 골라 들어 있다
- 필요한 것: `auth`
- 백엔드: 모듈 `account` · `account-jdbc` · `auth-session` · `auth-session-jdbc` · 경로 `/api/v1/account` · `/api/v1/auth`
- 주요 진입점: `createAuthRoutes` · `SignInScreen` · `SignUpScreen` · `VerifyCodePanel` · `ReauthProof` · `ForgotPasswordScreen` · `ResetPasswordScreen` · `AccountSettings` · `AccountStateNotice` · `defaultAuthLabels` · `koAuthLabels`
- 복사해 시작할 Patterns: `packages/auth/src/patterns/SignUp.stories.tsx` · `packages/auth/src/patterns/MailLinkLandings.stories.tsx` · `packages/auth/src/patterns/AccountSettings.stories.tsx`
- 문서: `packages/auth/README.md`
- 쓰지 않는 경우: 메일을 보내는 쪽(notification-mail)과 링크 주소(skeleton.account.mail.link-base-url)는 백엔드 설정 — 프런트의 /reset-password · /magic-link 경로와 맞춘다(링크가 남은 곳은 그 둘뿐 — 가입 인증 · 이메일 변경 · 다시 인증 · 삭제 확인은 6자리 인증번호) / 로그인 방법은 백엔드 GET /auth/methods 가 알려 준다(로딩 · 실패 대체 화면 포함) — 환경변수 VITE_AUTH_METHODS 는 그것을 덮어쓰는 선택일 뿐이다. 리프레시 전달 방식(body · cookie)만은 앱이 시작할 때 정하므로 VITE_AUTH_REFRESH_DELIVERY 가 백엔드와 같아야 한다(다르면 개발 콘솔에 경고) / 동의(약관 판) 저장은 없다 — 슬롯이 체크한 판을 콜백으로 보고할 뿐 / 이메일 주소가 없는 계정(Naver 등)의 다시 인증은 제공자 동의 왕복이다 — 하려던 작업과 계정은 OAuth state 기록에 묶이고(sessionStorage · 한 번 읽으면 지워진다) 돌아오면 설정 화면이 한 번만 이어서 한다. 서버에 이메일 변경 취소 엔드포인트는 없다(새 요청이 대신하거나 만료). PKCE 는 아직 없다(백엔드가 미룸)
- 키워드: 회원가입, 가입 화면, 이메일 인증, 메일 확인, 비밀번호 재설정, 비밀번호 찾기, 계정 설정, 프로필, 로그인 세션 관리, 계정 삭제, 정지된 계정 / sign up, registration screen, verify email, check your email, reset password, forgot password, account settings, profile, active sessions, delete account, suspended account

### `session-refresh` — 액세스 토큰 자동 갱신 — 401 이면 갱신을 한 번으로 합쳐(single-flight) 요청을 한 번만 다시 보낸다. 회전하는 리프레시 토큰을 안전하게 저장하고 탭 사이를 락 · storage 이벤트로 맞추며, 재사용 · 만료 때는 깨끗이 로그아웃. body · cookie 모드.

- 종류 · 상태: pattern · stable
- 위치: `@arcbit/auth` (`packages/auth/src/sessionRefresher.ts`)
- 켜는 법: 이 프로젝트를 찍을 때 골라 들어 있다
- 필요한 것: `auth`
- 백엔드: 모듈 `auth-session` · `auth-session-jdbc` · 경로 `/api/v1/auth/refresh` · `/api/v1/auth/logout`
- 주요 진입점: `createSessionRefresher` · `createRefreshStore` · `createTokenStore` · `createAuthSession`
- 문서: `packages/auth/README.md`
- 쓰지 않는 경우: body 모드(기본)의 리프레시 토큰은 JS 가 쥔다 — localStorage 에 두면 XSS 에 노출된다. 쿠키 모드(HttpOnly)는 한 줄 스위치(apps/*/src/auth/authConfig.ts 의 DEFAULT_REFRESH_DELIVERY 또는 VITE_AUTH_REFRESH_DELIVERY=cookie)와 백엔드 skeleton.auth-session.delivery=cookie 를 함께 켠다(프런트 · API 가 같은 사이트여야 한다 — SameSite=Strict) / 서버가 세션을 끊어도 이미 발급된 액세스 토큰은 만료(최대 15분)까지 산다 / 갱신 도중 페이지가 이동해 응답을 잃으면: 백엔드 reuse-grace(샘플 · 스타터는 10s)가 있으면 이어지고, 모듈 기본 0s 면 탈취로 보고 세션이 닫힌다(재로그인) — 클라이언트는 한 번 깨끗이 로그아웃하고 멈춘다
- 키워드: 토큰 갱신, 리프레시 토큰, 자동 로그인 유지, 세션 만료, 탭 동기화 / token refresh, refresh token, silent refresh, session expiry, cross-tab sync

### `magic-link-login` — 이메일 링크 로그인 — 로그인 화면의 「링크 받기」 · 메일 확인 안내 · 링크를 열면 로그인되는 도착 화면. 비밀번호 없이 쓰거나 비밀번호와 나란히 켠다.

- 종류 · 상태: pattern · stable
- 위치: `@arcbit/auth` (`packages/auth/src/screens/MagicLinkLanding.tsx`)
- 켜는 법: 이 프로젝트를 찍을 때 골라 들어 있다
- 필요한 것: `auth`
- 백엔드: 모듈 `auth-magic-link` · 경로 `/api/v1/auth/magic-link`
- 주요 진입점: `SignInScreen` · `MagicLinkLanding` · `createAuthRoutes`
- 복사해 시작할 Patterns: `packages/auth/src/patterns/SignIn.stories.tsx` · `packages/auth/src/patterns/MailLinkLandings.stories.tsx`
- 문서: `packages/auth/README.md`
- 쓰지 않는 경우: 링크는 15분 · 한 번만 — 도착 화면은 열자마자 한 번만 호출한다 / 없는 주소로 가입까지 해 줄지는 백엔드 skeleton.auth-magic-link.sign-up / 이미 있는 계정은 가입이 닫혀 있어도 링크로 들어온다. 비밀번호가 미확인인 계정은 링크로 들어오면 가입 때 정한 비밀번호가 버려진다 — 설정은 「비밀번호 없음」으로 보인다
- 키워드: 링크 로그인, 매직링크, 비밀번호 없는 로그인, 이메일 로그인 / magic link, passwordless, email sign in

### `account-admin` — 운영자 계정 표(선택 내보내기 @arcbit/auth/admin) — 검색 · 상태 필터 · 정지 · 해제 · 삭제 유예 복구 · 역할 부여/회수. 역할 관리 화면(AdminRoles — 만들기 · 권한 고르기 · 고치기 · 지우기)은 백엔드 authz 모듈이 있을 때.

- 종류 · 상태: pattern · stable
- 위치: `@arcbit/auth` (`packages/auth/src/admin/AdminAccounts.tsx`)
- 켜는 법: 이 프로젝트를 찍을 때 골라 들어 있다
- 필요한 것: `auth`
- 백엔드: 모듈 `account` · 있으면 더 켜지는 `authz` · `authz-jdbc` · 경로 `/api/v1/admin/accounts` · `/api/v1/admin/roles` · `/api/v1/admin/permissions`
- 주요 진입점: `@arcbit/auth/admin#AdminAccounts` · `@arcbit/auth/admin#AdminAccountsTable` · `@arcbit/auth/admin#createAdminAccountsApi` · `@arcbit/auth/admin#AdminRoles` · `@arcbit/auth/admin#createAdminRolesApi`
- 복사해 시작할 Patterns: `packages/auth/src/admin/AdminAccounts.stories.tsx` · `packages/auth/src/admin/AdminRoles.stories.tsx`
- 문서: `packages/auth/README.md`
- 쓰지 않는 경우: 백엔드 skeleton.account.admin.enabled=true 와 account.read · account.manage · account.roles 권한이 있어야 열린다(RequirePermission 은 화면용, 검사는 서버) / 사용자 지원용 상세 · 감사 로그 화면은 없다
- 키워드: 운영자 도구, 계정 관리, 계정 정지, 관리자 화면 / admin tools, account management, suspend account, admin panel

### `api-keys` — API 키 화면(선택 내보내기 @arcbit/auth/api-keys) — 설정 구역 ApiKeysSection: 내 키 목록(상태 ACTIVE · EXPIRED · REVOKED, 운영자가 회수한 키 표시) · 만들기 대화상자(이름 · 앱이 선언한 범위 체크 · 만료 30/90/365일/없음 · 다시 인증) → 토큰을 한 번만 보여 주고 복사 · 회수 확인. 운영자용 AdminApiKeys(@arcbit/auth/admin): 전체 키 표 · 주인/상태 필터 · 커서 · 사유 필수 회수. TanStack Query 훅 포함(선택 peer).

- 종류 · 상태: pattern · stable
- 위치: `@arcbit/auth` (`packages/auth/src/apiKeys/ApiKeysSection.tsx`)
- 켜는 법: 이 프로젝트를 찍을 때 골라 들어 있다
- 필요한 것: `auth`
- 백엔드: 모듈 `api-key` · `api-key-jdbc` · 경로 `/api/v1/api-keys` · `/api/v1/admin/api-keys`
- 주요 진입점: `@arcbit/auth/api-keys#ApiKeysSection` · `@arcbit/auth/api-keys#createApiKeysApi` · `@arcbit/auth/api-keys#koApiKeysLabels` · `@arcbit/auth/admin#AdminApiKeys` · `@arcbit/auth/admin#createAdminApiKeysApi`
- 복사해 시작할 Patterns: `packages/auth/src/apiKeys/ApiKeysSection.stories.tsx` · `packages/auth/src/admin/AdminApiKeys.stories.tsx`
- 문서: `packages/auth/README.md`
- 쓰지 않는 경우: 범위의 이름은 앱이 scopeLabels 로 정한다 - 범위 선언과 어떤 경로를 열지는 백엔드(@ApiKeyScope, 기본 거부) / 백엔드 skeleton.api-key.http.enabled(사용자) · skeleton.api-key.admin.enabled(운영, 기본 꺼짐 → 404 안내)와 api-key.read · api-key.revoke 권한이 있어야 열린다 / 키 요청 인증(Authorization: Bearer <접두사>_…)은 백엔드 몫 - 이 패키지는 발급 · 목록 · 회수 화면만. 토큰은 만든 직후 한 번만 보이고 다시 볼 수 없다 / 비밀번호도 이메일도 없는 계정(제공자 다시 인증만 가능)은 키를 만들 수 없다 - 제공자 왕복을 받지 않고 비밀번호나 이메일을 먼저 등록하라는 안내를 보인다
- 키워드: API 키, 액세스 토큰 발급, 개인 액세스 토큰, 키 회수, 범위 선택, 외부 연동 키 / api key, personal access token, api token, revoke key, key scopes, developer settings

### `screen-patterns` — 제품 화면 틀 — 대시보드 · 목록 · 폼 · 상세 · 로그인 · 권한 없음 · 설정을 Patterns/… 스토리에서 복사해 문구 · 데이터 연결만 바꿔 시작한다.

- 종류 · 상태: pattern · stable
- 위치: `@arcbit/ui` (`apps/storybook/src/patterns/ListPage.stories.tsx`)
- 켜는 법: 이 프로젝트를 찍을 때 골라 들어 있다
- 필요한 것: `ui`
- 백엔드: 없음(프런트만)
- 주요 진입점: `PageHeader` · `Table` · `Pagination` · `EmptyState` · `Field` · `Input` · `Tabs` · `ConfirmDialog` · `Stat`
- 복사해 시작할 Patterns: `apps/storybook/src/patterns/DashboardPage.stories.tsx` · `apps/storybook/src/patterns/ListPage.stories.tsx` · `apps/storybook/src/patterns/FormPage.stories.tsx` · `apps/storybook/src/patterns/DetailPage.stories.tsx` · `apps/storybook/src/patterns/LoginPage.stories.tsx` · `apps/storybook/src/patterns/ForbiddenPage.stories.tsx` · `apps/storybook/src/patterns/SettingsPage.stories.tsx`
- 문서: `docs/ui-catalog.md` · `CLAUDE.md`
- 쓰지 않는 경우: 처음부터 짜지 않는다 — 가장 가까운 Pattern 을 복사한다 / 숨은 도우미 파일이 없다 — 한 파일짜리라 복사한 뒤 데이터 훅(TanStack Query)을 잇는 일은 손으로
- 키워드: 대시보드, 목록 화면, 폼 화면, 상세 화면, 설정 화면, 관리자 화면, 화면 틀, 어드민 / dashboard, list page, form page, detail page, settings page, admin screen, screen template

### `script-with-watchdog` — 0% CPU 로 멈추는 빌드 · 테스트(rolldown 교착)를 시간으로 끊고 다시 돌리는 감시자 — 명령 앞에 붙인다.

- 종류 · 상태: script · stable
- 위치: (`scripts/with-watchdog.mjs`)
- 켜는 법: 이 프로젝트를 찍을 때 골라 들어 있다
- 백엔드: 없음(프런트만)
- 주요 진입점: `scripts/with-watchdog.mjs`
- 문서: `README.md`
- 쓰지 않는 경우: 진짜 실패(종료 코드 ≠ 0)는 재시도하지 않고 그대로 낸다 — 멈춤만 다룬다
- 키워드: 빌드 멈춤, 워치독, 교착, 멈춘 테스트 재시도 / watchdog, hang, stall, retry build, timeout

### `script-build-capabilities` — capabilities.json 에서 docs/capabilities.md · llms.txt 를 생성하고(--check 로 어긋남 검사) 같은 가드를 돌린다.

- 종류 · 상태: script · stable
- 위치: (`scripts/build-capabilities.mjs`)
- 켜는 법: 이 프로젝트를 찍을 때 골라 들어 있다
- 백엔드: 없음(프런트만)
- 주요 진입점: `scripts/build-capabilities.mjs` · `scripts/capabilities.d/lib.mjs`
- 문서: `docs/capabilities.schema.json`
- 쓰지 않는 경우: 생성물(docs/capabilities.md · llms.txt)을 손으로 고치지 않는다 — capabilities.json 을 고치고 pnpm capabilities
- 키워드: 기능 카탈로그, 카탈로그 생성, 카탈로그 점검, 기능 목록 / capabilities catalog, generate docs, catalog check, feature list

## 여기에 없는 것 (스켈레톤에는 있다)

- `realtime` (package, --packages realtime) — 서버가 밀어 주는 실시간 연결 — SSE(탭 숨김 일시정지 · 유휴 감시 · 재연결)와 STOMP WebSocket 알림 클라이언트.
- `i18n` (package, --packages i18n) — 화면 문구 다국어 — ICU 메시지 · 브라우저 언어 감지/저장 · 지연 로딩 사전 · useT() · 사전 짝 맞춤 테스트 도구.
- `notifications` (package, --packages notifications) — 알림 받은편지함 — 목록 · 안 읽은 수(전용 엔드포인트) · 읽음/모두 읽음 · 묶인 줄의 수 · 링크로 이동 · 종류별 끄기(NotificationPreferences) · 실시간 이벤트로 캐시 갱신, NotificationBell/List 부품과 TanStack Query 훅.
- `push` (package, --packages push) — 웹 푸시 — 앱 안 띠(PushPrompt, 「나중에」 14일) 뒤 클릭 안에서만 권한을 묻고 구독 · 서버 등록(usePush), 로그인 뒤 · 창이 보일 때 구독 다시 맞추기(usePushSync, 키가 바뀌면 재구독 · 권한이 거절로 바뀌면 기기 삭제), 로그아웃 직전 해지(unregisterPush), 설정 칸(PushSettings — 이 기기 스위치 · 거절됨 · 홈 화면 추가 필요 · 미지원 안내 · 시험 알림 · 내 다른 기기 표 · 종류별 푸시 스위치). 서비스 워커는 Vite 플러그인 pushServiceWorker(@arcbit/push/vite)가 낸다. 광고성 푸시를 보내는 앱은 광고 수신 동의 칸(@arcbit/push/advertising 의 AdvertisingSettings — 광고 · 야간(21~08시) 따로, 미리 체크 없음, 야간은 광고 동의 없이는 잠김, 2년 재확인 띠, 철회 확인; @arcbit/legal 의존)을 PushSettings 아래에 둔다.
- `rewards` (package, --packages rewards) — 보상 사용자 화면 — 출석 카드 · 친구초대 카드(링크의 ?ref= 를 보관했다가 로그인 뒤 한 번 claim) · 초대 현황 표 · 초대 코드 직접 입력 · 쿠폰함과 코드 등록 · 결제 때 쿠폰 고르기 · 포인트 잔액과 내역 · 내 배지 선반과 프로필 배지 줄(로그인 없이). 백엔드가 붙인 갈래(badge · campaign · coupon · point)만 골라 쓴다.
- `rewards-admin` (pattern, --packages rewards) — 운영자 보상 화면(선택 내보내기 @arcbit/rewards/admin) — 이벤트(켜고 끄기 · 출석 / 초대 / 업적 설정 · 보상 목록 - 쿠폰 · 포인트 · 배지) · 배지(정의 · 보관 · 수동 수여 · 수여 내역과 회수) · 쿠폰 정의(단계 편집기 · 계정에 주기 · 공용 코드 · 회수) · 포인트 조정 · 지급 건(다시 지급 · 멈추기). 단추는 can(key) 로 숨긴다. 샘플 화면: /admin/campaigns · /admin/referrals · /admin/coupons · /admin/points · /admin/reward-grants · /admin/badges · /admin/badge-awards.
- `reviews` (package, --packages reviews) — 리뷰 · 평점 — 아무 대상(종류 + id)에 별점 1~5 · 본문 · 사진 리뷰. 별점 표시(「5점 만점에 4.3점」)와 고르기(라디오 묶음 · 화살표 키) · 평균 + 분포 막대(누르면 그 별점으로 거름) · 정렬 · 거르기 칩(구매 인증 · 사진) · 쪽 이동 · 구매 인증 배지 · 도움돼요 · 신고 대화상자 · 운영자가 숨긴 내 리뷰 안내 · 운영자 답글 · 쓰기/고치기 폼(사진 칸은 renderPhotos 로 앱이 storage 를 꽂는다) · 쓸 수 없는 까닭 문구(구매한 분만 · 이미 씀 · 숨겨져 잠김 · 로그인). 작성자는 이름#꼬리표만 - 계정 id 는 응답에도 화면에도 없다.
- `reviews-admin` (pattern, --packages reviews) — 운영자 리뷰 화면(선택 내보내기 @arcbit/reviews/admin) — 신고 큐 · 숨김 · 전체 표(사유 칩 · 신고 수 · 최근 신고) · 숨기기(사유 필수 대화상자) · 문제없음 · 되살리기 · 운영자 답글(리뷰당 하나, 쓰기 · 고치기 · 지우기). 단추는 can(key) 로 숨긴다. 샘플 화면: /admin/reviews.
- `search` (package, --packages search) — 전문 검색 — 검색창(SearchBox: 입력 + 제출 단추) · 결과 화면(SearchResults: 종류 칩 · 개수 · 제목 링크 + 발췌 · 쪽 이동 · 빈/로딩/오류 · 「2글자 이상」 안내) · useSearch(입력 늦춤 · 이전 쪽 유지) · Highlight(서버가 준 [시작,끝) UTF-16 위치를 <mark> 로, 문자열은 글자로만). 종류 이름과 링크는 앱이 describe(type) 로 준다 - 패키지는 노트 · 상품을 모른다.
- `admin-dashboard` (package, --packages dashboard) — 관리자 대시보드 — 기간 · 직전 기간 비교 · 숫자 타일 + 누르면 바뀌는 추이 그래프(SVG) · 탭 달린 순위 카드 · 퍼널 · 출처 배지와 신선도. DashboardView 한 덩어리와 부품, 60초 갱신 훅, 실시간 「지금 N명」 배지와 패널 편집 모드(카드 · 타일 끄기, 순서 바꾸기, 계정별 저장).
- `board` (package, --packages board) — 게시판 — 글 · 중첩 댓글(대댓글) · 서버 설정으로 늘어나는 반응(좋아요 · 공감 …) · 운영자 숨김/고정, 작성자 표시(닉네임 · 탈퇴한 사용자 · 익명 — 작성자 id 는 그리지 않는다) · 내 것 판정(서버의 mine) · 작성자 선택기 자리(authorPicker 렌더 prop — 작성자 프로필을 쓰는 서버에서 authorRequired 가 켜지면 고른 authorId 를 싣는다) · 목록 · 상세 · 편집기 · 댓글 · 반응 부품과 훅(반응은 낙관적 갱신).
- `author-profile` (package, --packages author-profile) — 작성자 프로필 — 한 계정의 여러 닉네임(서로 이어지지 않는다)을 글 · 댓글마다 골라 쓰기. AuthorPicker(게시판 authorPicker 렌더 prop 에 꽂는 선택기 — 접힌 상태는 고른 이름#꼬리표 하나 · 처음 값은 이 스레드 → 이 기기 기억 → 비어 있음 · 이 스레드에서 쓴 닉네임과 다른 것으로 바꿀 때만 확인(한 문장 + 「이대로 쓰기」 · 「되돌리기」)) · AuthorProfileManager(목록 · 추가 · 이름 바꾸기 · 삭제 확인 · 상한 · 오류) · useProfileDialog(선택기의 「닉네임 정하기」가 여는 관리 대화상자 — 쓰던 글 유지 · 닫으면 포커스가 선택기로) · createAuthorMemory(기기 기억 — 계정 id 는 저장소 키에만) · 클라이언트와 TanStack Query 훅. 계정 id 는 화면 어디에도 그리지 않는다.
- `workspace` (package, --packages workspace) — 워크스페이스(팀) 사용자 화면 — 주소 `/w/<slug>/…` 에서 팀을 읽는 WorkspaceProvider/useWorkspace(탭마다 독립 · 옛 slug 는 새 주소로 replace · 풀린 id 를 X-Workspace-Id 헤더로: createWorkspaceHeaders) · WorkspaceSwitcher(머리줄 팀 고르기 + 새 워크스페이스) · CreateWorkspaceForm(이름 + 주소 이름) · WorkspaceSettings(이름 · 주소 이름 · 멤버 표: 역할 고르기 · 내보내기 · 소유권 이전 · 탈퇴, 단추는 역할로 숨김) · 「마지막에 쓴 팀」 기억은 첫 화면으로 보낼 때만. 라우터를 모른다(앱이 slug 와 이동 콜백을 준다). WorkspaceInvitations(여러 주소 초대 · 한 번에 20개 · 대기 표 · 만료 표시 · 재발송 · 취소 · 좌석 n / 상한 · 결과 invited / alreadyInvited / seatLimited) · AcceptInvitation(/invite — 미리보기 → 로그인 안 했으면 「로그인 · 가입 후 수락」, 토큰은 주소창에서 지우고 이 탭 저장소에, 돌아와 수락 → 앱이 그 워크스페이스로 이동 · 오류 코드별 문장). 운영자 목록은 @arcbit/workspace/admin(항목 workspace-admin).
- `workspace-admin` (pattern, --packages workspace) — 운영자의 워크스페이스 목록(선택 내보내기 @arcbit/workspace/admin) — 이름 · 주소 이름 검색 · 커서 「더 보기」 · 한 건의 상세(멤버 표 · 기다리는 초대 수). 읽기만 한다 — 만들기 · 고치기 · 닫기는 없다. can('workspace.read') 로 가린다.
- `storage` (package, --packages storage) — 파일 업로드 — 검증 → presign → 브라우저에서 스토리지로 직접 PUT(진행률 · 취소 · 멀티파트)과 useUpload 훅.
- `payment` (package, --packages payment) — 결제 한 벌 — 장부 API(주문 만들기 · 승인 · 내 결제 내역 · 환불 요청/거둠) · TanStack Query 훅(CONFIRMING 동안만 되묻는 useOrder) · 토스 결제창 열기(openCheckout) · 돌아온 주소 읽기(readCheckoutReturn) · 오류 코드, 화면 부품(상태 알약 · 결제 내역 · 결과 · 한 건 + 환불 줄 · 환불 요청 창 · 테스트 결제 표시 — 문구는 labels prop, 한국어는 koPaymentLabels, 카드는 「현대카드 ····1234」), 구독(자동결제 — 플랜 카드 · 카드 등록 창 열기 openBillingAuth · 내 구독 카드 · 해지 확인 창 · 백엔드 payment.subscription.enabled 가 켜진 앱만), 그리고 장부 없이 쓰는 얇은 호출(승인/취소/환불 경로는 앱이 정한다).
- `payment-admin` (pattern, --packages payment) — 운영자 결제 화면(선택 내보내기 @arcbit/payment/admin) — 결제 목록(상태 · 결제 번호로 찾기, 확인 필요 알약) · 한 건(환불 줄 · 이력 · 직접 환불 전액/부분 · 요청대로 환불하기 · 요청 거절하기 · 결제사와 맞추기) · 환불 요청 목록 · 웹훅 수신함. 돈이 나가는 행동은 늘 확인 창(AdminRefundDialog)을 거치고 금액은 남은 금액을 넘지 못하게 화면에서도 막는다. 샘플 화면: /admin/payments · /admin/payments/:id. 상품 · 가격 운영(백엔드 catalog 를 붙인 앱, 권한 catalog.manage): 상품 목록 · 상품 폼 · 통화별 가격 표 · 가격 더하기(행사가 포함) · 행사 기간 바꾸기 · 판매 중지(기존 구독자는 산 가격 그대로) · 결제사 가격 id 연결. 샘플 화면: /admin/catalog · /admin/catalog/:code.
- `captcha-turnstile` (package, --packages captcha-turnstile) — 봇 방지 — Cloudflare Turnstile 스크립트 로더 · <Turnstile> · 토큰 훅 · 요청에 토큰 붙이기.
- `marketing` (package, --packages marketing) — 공개 페이지 조립 부품 — Hero · 기능 · FAQ · 후기 · CTA · 푸터 · 요금제(월/연) · 쿠키 동의 · 약관 문서 페이지 · 404/500/점검 화면.
- `app-starter-ssr` (app, --ssr) — 서버 렌더 스타터 — Node 서버가 첫 응답을 그리고 브라우저가 이어받는다(plain Vite SSR · Dockerfile · 라우트별 제목 · 설명 · 데이터 미리 가져오기).
- `app-sample` (app, --with-sample) — 참조 앱 Notes — Patterns 로 조립한 작지만 실제 같은 제품(랜딩 · 로그인 · 대시보드 · 목록 · 상세 · 폼 · 첨부 · 알림 · 게시판 · 응원하기 결제 · 구독 · 혜택(출석 · 쿠폰 · 포인트) · 다국어 · 설정 · 404 — 로그인 아이디를 켜고 이메일은 쓰기 때 받는 서버 짝), 새 기능은 이 앱의 한 조각을 따라 한다.
- `app-workbench` (app, --with-workbench) — 백엔드 확인용 시각적 테스트 벤치 — 백엔드 모듈을 눌러 보는 화면들과 /packages 예제 화면.
- `live-notifications` (pattern, --packages notifications) — 알림이 새로고침 없이 즉시 뜬다 — 실시간 연결(SSE 또는 WebSocket)로 받은 이벤트를 알림 캐시에 넣어 종 · 목록 · 안 읽은 수가 바로 바뀐다.
- `landing-page` (pattern, --packages marketing) — 공개 첫 화면 — Hero · 기능 · 한마디 · 요금제 · FAQ · 마지막 권유 · 푸터를 Patterns/Landing 한 장으로 조립해 시작한다.
- `pricing-page` (pattern, --packages marketing) — 요금제 페이지 — 월/연 토글 · 절약 % · 강조 요금제 · 문의형 · 결제 질문 FAQ 를 데이터(plans)로 그리고 선택은 onSelect 로 받는다.
- `legal-documents` (pattern, --packages marketing) — 약관 · 개인정보처리방침 페이지 — 판(版) 바꾸기 · 효력일 · 옛 판 안내 · 「템플릿」 표시 · 사실({{키}}) 채우기, 문서는 마크다운.
- `cookie-consent` (pattern, --packages marketing) — 쿠키 · 추적 동의 — 동의 저장소(버전이 바뀌면 다시 묻기 · 필수 범주는 못 끈다)와 배너(모두 거부 = 모두 허용과 같은 무게).
- `error-pages` (pattern, --packages marketing) — 없는 주소(404) · 서버 오류(500, 참조 번호) · 점검 화면 — 이유를 말하고 갈 곳을 준다.

찾을 때: 스켈레톤의 `capabilities.json` 키워드를 본다. 패키지를 이 프로젝트로 가져오려면 스켈레톤의 `packages/<이름>` 폴더를 복사하고(의존으로 닫힌 패키지도 함께) 앱 `package.json` 에 `"@arcbit/<이름>": "workspace:*"` 한 줄을 더한다.
