import { Card } from '@/components/card';
import { Icon } from '@/components/icon';
import { useI18n } from '@/i18n/i18n';
import { WORKOUTS } from '@/lib/content';
import { useUiStore } from '@/store/ui-store';

export function MoveScreen() {
  const { t, tr, num } = useI18n();
  const openWorkout = useUiStore((state) => state.openWorkout);

  return (
    <div className="s-screen">
      <header style={{ marginBottom: 20 }}>
        <h1 style={{ margin: 0, fontSize: 28, fontWeight: 800, letterSpacing: '-0.02em' }}>
          {t('move')}
        </h1>
        <p
          style={{
            margin: '7px 0 0',
            color: 'var(--text-dim)',
            fontSize: 15,
            lineHeight: 1.5,
            textWrap: 'pretty',
          }}
        >
          {t('moveIntro')}
        </p>
      </header>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {WORKOUTS.map((workout) => (
          <Card
            key={workout.id}
            pad={18}
            onClick={() => openWorkout(workout)}
            ariaLabel={tr(workout.name)}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              <div
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: 14,
                  flexShrink: 0,
                  background: 'var(--accent-soft)',
                  color: 'var(--accent)',
                  display: 'grid',
                  placeItems: 'center',
                }}
              >
                <Icon name="move" size={26} />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontWeight: 700, fontSize: 17 }}>{tr(workout.name)}</div>
                <div style={{ fontSize: 13, color: 'var(--text-faint)', marginTop: 2 }}>
                  {`${num(workout.mins)} ${t('minutes')} · ${num(workout.rounds)} ${t('rounds')}`}
                </div>
              </div>
              <div
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 11,
                  background: 'var(--accent)',
                  color: 'var(--on-accent)',
                  display: 'grid',
                  placeItems: 'center',
                  flexShrink: 0,
                }}
              >
                <Icon name="play" size={18} />
              </div>
            </div>
            <p
              style={{
                margin: '12px 0 0',
                fontSize: 13.5,
                color: 'var(--text-dim)',
                lineHeight: 1.5,
                textWrap: 'pretty',
              }}
            >
              {tr(workout.blurb)}
            </p>
          </Card>
        ))}
      </div>
    </div>
  );
}
