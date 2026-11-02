import { Badge, Card, ChoiceGroup, CopyButton, Progress } from '@arcbit/ui'
import { useSearchParams } from 'react-router-dom'
import glass from '../../../../styles/glass.module.css'
import { GENDERS, STYLES, isGender, isPlayStyle, recommend } from './logic'
import styles from './Tool.module.css'

/** 고른 값은 주소 쿼리(?g=&s=)에 둔다 — 주소를 그대로 보내면 같은 결과가 열린다 */
export default function GenderTypeTool() {
  const [params, setParams] = useSearchParams()
  const g = params.get('g')
  const s = params.get('s')
  const gender = isGender(g) ? g : null
  const style = isPlayStyle(s) ? s : null
  const result = gender && style ? recommend(gender, style) : null

  const pick = (key: 'g' | 's') => (value: string) =>
    setParams(
      (prev) => {
        const next = new URLSearchParams(prev)
        next.set(key, value)
        return next
      },
      { replace: true },
    )

  return (
    <div className={styles.layout}>
      <Card className={glass.glass} title="고르기">
        <div className={styles.inputs}>
          <div className={styles.group}>
            <span id="gt-gender" className={styles.label}>
              성별
            </span>
            <ChoiceGroup
              options={GENDERS}
              value={gender}
              onChange={pick('g')}
              aria-labelledby="gt-gender"
            />
          </div>
          <div className={styles.group}>
            <span id="gt-style" className={styles.label}>
              플레이 성향
            </span>
            <ChoiceGroup
              options={STYLES}
              value={style}
              onChange={pick('s')}
              aria-labelledby="gt-style"
            />
          </div>
        </div>
      </Card>

      <div aria-live="polite">
        {result ? (
          <Card
            className={`${glass.glass} ${glass.holoEdge}`}
            title="추천 결과"
            actions={<Badge tone="warning">예시 데이터</Badge>}
          >
            <div className={styles.result}>
              <p className={styles.type}>{result.type}</p>
              <p className={styles.description}>{result.description}</p>
              <div className={styles.stats}>
                {result.stats.map((stat) => (
                  <div key={stat.label} className={styles.stat}>
                    <span className={styles.statLabel} aria-hidden="true">
                      {stat.label}
                    </span>
                    <Progress
                      label={stat.label}
                      value={stat.value * 10}
                      valueText={`${stat.value} / 10`}
                    />
                  </div>
                ))}
              </div>
              <CopyButton
                value={window.location.href}
                label="결과 링크 복사"
                copiedLabel="복사했어요"
              />
            </div>
          </Card>
        ) : (
          <p className={styles.hint}>성별과 플레이 성향을 고르면 결과가 바로 보여요.</p>
        )}
      </div>
    </div>
  )
}
