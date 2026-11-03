# Arcbit — 에이전트 · 개발자 안내

관심사가 같은 사람들을 위한, 직접 만든 작은 도구 덱. 사이트는 **카테고리 › 세부 카테고리 › 기능** 3단이고, 기능(도구) 하나가 폴더 하나다.

이 레포는 `react-skeleton` 에서 찍었다(`CLAUDE.md` 가 그 규칙). 이 파일은 Arcbit 에만 해당하는 규칙이며, 둘이 겹치면 이 파일이 먼저다.

## 층 — 어디를 고치나

| 층            | 위치                          | 규칙                                                                                                                                                                                                                            |
| ------------- | ----------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| skeleton 핵심 | `packages/*`                  | **고치지 않는다.** 필요한 기능은 skeleton 에서 패키지 폴더를 가져온다                                                                                                                                                           |
| 디자인 값     | `packages/tokens/tokens.json` | 값만 바꾼다(생성기 코드는 그대로) → `pnpm tokens`. 색 · 서체 · 크기는 `semantic` 절, 부품 모양(모서리 · 유리 면 · 흐림 · 홀로 막대)은 `component` 절. 값 고정 테스트 `packages/tokens/src/tokens.test.ts` 의 `ARCBIT` 표도 함께 |
| 사이트 코드   | `apps/arcbit-fe/src/`         | 우리가 짜는 곳은 여기뿐                                                                                                                                                                                                         |

## 앱 폴더

```
apps/arcbit-fe/src/
├── catalog/      categories.ts(사이트 지도 정본) · registry.ts(도구 자동 등록) · types.ts · components/
├── tools/<카테고리>/<세부>/<도구>/   도구 하나 = 폴더 하나
├── routes/       홈 · 카테고리 · 세부 카테고리 · 도구 페이지(공용) + skeleton 의 계정 · 약관 화면
├── layouts/      화면 틀(AppShell)
├── styles/       app.css(전역: 바탕 오로라뿐) · glass.module.css(홀로 글라스)
├── share/        여러 도구가 함께 쓰는 순수 조각(필요해질 때 만든다 — 도구끼리 직접 부르지 않고 여기로 올린다)
└── auth/ api/ legal/ hooks/   skeleton 백엔드 연결 (지금은 백엔드 없이 둔다. `hooks/useHello.ts` 는 백엔드 호출 예시이며 쓰지 않는다)
```

## 도구 추가 — 순서

1. 세부 카테고리가 없으면 `catalog/categories.ts` 에 한 줄 더한다.
2. `pnpm new:tool <카테고리> <세부> <도구> "화면 제목"` — 폴더 뼈대가 생긴다. 등록은 자동이다(중앙 파일을 고치지 않는다).
3. `logic.ts` 에 계산을 짜고 `logic.test.ts` 로 검증한다. 화면(`Tool.tsx`)에는 계산을 두지 않는다.
4. `Tool.tsx` 는 `@arcbit/ui` 부품으로 짠다. 결과를 공유할 수 있게 입력값은 주소 쿼리에 둔다(예시: `tools/game/animo/gender-type`).
5. `manifest.ts` 의 `summary` · `keywords` · `status`(new · beta · stable) · `updatedAt` 을 채운다. 고칠 때마다 `updatedAt` 을 오늘로.
6. `README.md` 에 무엇을 하는 도구인지, 데이터 출처를 적는다.

주소는 폴더 경로와 같다: `tools/game/animo/gender-type` → `/game/animo/gender-type`.

## 지킬 것

- **도구 경계**: 도구는 자기 폴더(하위 폴더 포함), `@arcbit/*`, 그리고 `catalog/types` · `styles/` · `share/` 만 import 한다. 다른 도구 · 화면은 부르지 않는다. ESLint 규칙 `arcbit/tool-boundary` 가 경로를 풀어 정적 · 동적 import 를 모두 막는다.
- **부품**: 날 `<button>` `<input>` `<select>` `<textarea>` `<dialog>` 금지 → `@arcbit/ui`. 쓰기 전에 `docs/ui-catalog.md` 에서 그 부품의 스토리를 읽는다.
- **스타일**: CSS Modules. 색 · 간격 · 모서리 · 글자 크기는 의미 토큰(`var(--space-md)` · `var(--teal)` …)만. 전역 CSS 는 `styles/app.css` 하나.
- **홀로 글라스**: `@arcbit/ui` 부품(Card · 버튼 · Dialog · 메뉴 · 머리줄 · 진행 막대)은 `tokens.json` 의 `component` 절 값으로 이미 유리 면 · 알약 버튼 · 홀로 막대다 — 부품에 따로 클래스를 붙이지 않는다. 부품이 아닌 면(카탈로그 카드처럼 `Link` 로 짠 것)만 `glass.module.css` 의 `glass`(유리 면) + `holoEdge`(무지개빛 테두리) + 눌리는 것이면 `interactive` 를 쓴다. 강조할 결과 카드에는 `holoEdge` 만 더한다. 마우스를 따라가는 효과는 쓰지 않는다.
- **색 이름**: 강조색의 의미 토큰 이름은 skeleton 그대로 `--teal` 이다(값은 남청). 주 버튼은 잉크색(`--inverse`).
- **데이터**: 확인되지 않은 수치를 사실처럼 쓰지 않는다. 예시 데이터면 화면에 「예시 데이터」 배지를 단다.
- **카테고리 id**: 소문자 · 숫자 · 하이픈. 앱의 고정 경로(`login` · `account` · `legal` …)와 겹치면 테스트가 실패한다.

## 디자인

정본은 Artifact 「VOLTAGE」 디자인 시스템(홀로 글라스 · White/Black 테마)이다. 토큰은 `tokens.json` 으로 옮겨져 있다.

- 바탕: 무채색 + 홀로 3색 오로라(옅게)
- 주 버튼: 잉크색, 강조: 남청 하나, 형광색 없음
- 글꼴: Geist(제목 · `--display`) · Noto Sans KR(본문 · `--sans`) · Geist Mono(라벨 · 숫자 · `--mono`) — `apps/arcbit-fe/index.html` 에서 Google Fonts 로 불러온다

## 로그인

skeleton 의 `@arcbit/auth` 는 백엔드(kotlin-skeleton)가 있어야 동작한다. 지금은 백엔드 없이 연결만 남겨 두었다. 저장이 필요한 기능(즐겨찾기 · 결과 기록)이 생기면 그때 방식을 정한다.

## 검증

Node 24 를 쓴다(CI 와 같다). Node 22 에서는 앱 설정 파일이 TypeScript 패키지를 불러오지 못하므로 명령 앞에 `NODE_OPTIONS=--experimental-strip-types` 를 붙인다.

```bash
pnpm lint && pnpm typecheck && pnpm test && pnpm build
pnpm --filter arcbit-fe test      # 앱만
pnpm dev                          # http://localhost:5173
pnpm storybook                    # 부품 사용법 http://localhost:6006
```

## 배포 (Cloudflare Pages)

Pages 프로젝트 `arcbit-fe` · 운영 주소 https://arcbit-fe.pages.dev

| 브랜치              | 배포                                                                                 |
| ------------------- | ------------------------------------------------------------------------------------ |
| `prod`              | **운영** — push 하면 운영 주소로 배포된다. 사용자가 명시적으로 요청할 때만 반영한다  |
| `main`              | 개발 기본 브랜치 — push 하면 미리보기 `https://main.arcbit-fe.pages.dev` 로 배포된다 |
| 그 밖의 브랜치 · PR | 미리보기 주소가 따로 생긴다                                                          |

운영 반영은 `main` 을 `prod` 로 그대로 올린다(`git push origin main:prod`). `prod` 에 직접 커밋하지 않는다.

| 칸                     | 값                                                                |
| ---------------------- | ----------------------------------------------------------------- |
| Production branch      | `prod`                                                            |
| Root directory         | 레포 루트                                                         |
| Build command          | `pnpm install --frozen-lockfile && pnpm --filter arcbit-fe build` |
| Build output directory | `apps/arcbit-fe/dist`                                             |
| Environment variables  | `NODE_VERSION=24` · `PNPM_VERSION=10`                             |

SPA 주소 처리: 빌드 결과에 최상위 `404.html` 이 없으면 Pages 가 모든 주소를 `index.html` 로 연다(기본 동작). `404.html` 이나 `_redirects` 를 더하지 않는다. 첫 배포 뒤 `/game/animo/gender-type` 을 새로고침해 열리는지 확인한다.

배포 뒤 옛 탭이 사라진 도구 파일을 부르면 `routes/RouteErrorPage.tsx` 가 「새 버전이 나왔어요 · 새로고침」을 보인다.
