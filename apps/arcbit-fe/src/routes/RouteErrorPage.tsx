import { Button, EmptyState } from '@arcbit/ui'
import { isRouteErrorResponse, Link, useRouteError } from 'react-router-dom'
import styles from './CatalogPage.module.css'

/** 배포로 파일 이름이 바뀐 뒤 옛 탭이 도구 화면을 부르면 이런 메시지로 실패한다 */
const CHUNK_ERROR = /dynamically imported module|Importing a module script failed|module script/i

export function RouteErrorPage() {
  const error = useRouteError()
  const stale = error instanceof Error && CHUNK_ERROR.test(error.message)
  const notFound = isRouteErrorResponse(error) && error.status === 404
  return (
    <div className={styles.page}>
      <EmptyState
        title={
          stale
            ? '새 버전이 나왔어요'
            : notFound
              ? '페이지를 찾을 수 없어요'
              : '화면을 그리지 못했어요'
        }
        description={
          stale
            ? '새로고침하면 최신 화면으로 열려요.'
            : '잠시 뒤 다시 시도하거나 홈으로 돌아가 주세요.'
        }
        action={
          stale ? (
            <Button onClick={() => window.location.reload()}>새로고침</Button>
          ) : (
            <Link to="/">홈으로</Link>
          )
        }
      />
    </div>
  )
}
