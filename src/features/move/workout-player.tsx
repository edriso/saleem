import { useEffect, useMemo, useState } from 'react';
import { Button } from '@/components/button';
import { Icon } from '@/components/icon';
import { Label } from '@/components/label';
import { Overlay } from '@/components/overlay';
import { Ring } from '@/components/ring';
import { useInterval } from '@/hooks/use-interval';
import { useI18n } from '@/i18n/i18n';
import { buildSequence, isLastStep, stepProgress } from '@/lib/workout';
import { useSaleemStore } from '@/store/saleem-store';
import type { Workout } from '@/types/domain';

interface WorkoutPlayerProps {
  workout: Workout;
  onClose: () => void;
}

/**
 * The full-screen guided player: a per-move countdown ring, round counter,
 * rest steps, pause/skip, and a warm completion. Wrapped in the focus-trapping
 * Overlay (Escape closes it). Mirrors cleanly under RTL.
 */
export function WorkoutPlayer({ workout, onClose }: WorkoutPlayerProps) {
  const { t, tr, num } = useI18n();
  const completeWorkout = useSaleemStore((state) => state.completeWorkout);

  const sequence = useMemo(() => buildSequence(workout), [workout]);
  const [index, setIndex] = useState(0);
  const [secondsLeft, setSecondsLeft] = useState(sequence[0].secs);
  const [running, setRunning] = useState(true);
  const [done, setDone] = useState(false);

  const step = sequence[index];

  useInterval(
    () => {
      setSecondsLeft((left) => {
        if (left > 1) {
          return left - 1;
        }
        // This step is finished: advance, or complete the workout.
        setIndex((current) => {
          if (isLastStep(sequence, current)) {
            setDone(true);
            return current;
          }
          return current + 1;
        });
        return 0;
      });
    },
    running && !done ? 1000 : null,
  );

  // Reset the clock whenever the active step changes.
  useEffect(() => {
    if (!done) {
      setSecondsLeft(sequence[index].secs);
    }
  }, [index, done, sequence]);

  function finish() {
    completeWorkout();
    onClose();
  }

  function skip() {
    if (isLastStep(sequence, index)) {
      setDone(true);
    } else {
      setIndex(index + 1);
    }
  }

  if (done) {
    return (
      <Overlay ariaLabel={tr(workout.name)} onClose={onClose}>
        <div
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 30,
            textAlign: 'center',
          }}
        >
          <div
            style={{
              width: 90,
              height: 90,
              borderRadius: '50%',
              background: 'var(--accent-soft)',
              color: 'var(--accent)',
              display: 'grid',
              placeItems: 'center',
              marginBottom: 22,
            }}
          >
            <Icon name="check" size={46} stroke={2.2} />
          </div>
          <h2
            style={{ fontSize: 26, fontWeight: 800, letterSpacing: '-0.01em', margin: '0 0 10px' }}
          >
            {tr(workout.name)}
          </h2>
          <p
            style={{
              color: 'var(--text-dim)',
              fontSize: 16,
              lineHeight: 1.5,
              margin: '0 0 28px',
              maxWidth: 320,
              textWrap: 'pretty',
            }}
          >
            {t('workoutDone')}
          </p>
          <Button onClick={finish} variant="primary" size="lg" icon="check">
            {t('didIt')}
          </Button>
        </div>
      </Overlay>
    );
  }

  const isRest = step.rest === true;
  const progress = stepProgress(step.secs, secondsLeft);

  return (
    <Overlay ariaLabel={tr(workout.name)} onClose={onClose}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '16px 20px',
        }}
      >
        <button onClick={onClose} className="s-iconbtn s-tap" type="button" aria-label={t('close')}>
          <Icon name="x" size={20} />
        </button>
        <Label>{`${tr(workout.name)} · ${num(step.round)}/${num(workout.rounds)}`}</Label>
        <div style={{ width: 42 }} />
      </div>

      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 26,
        }}
      >
        <Ring
          value={progress}
          size={240}
          thickness={6}
          color={isRest ? 'var(--text-faint)' : 'var(--accent)'}
        >
          <div style={{ textAlign: 'center' }}>
            <div
              style={{
                fontSize: 64,
                fontWeight: 700,
                letterSpacing: '-0.02em',
                lineHeight: 1,
                fontVariantNumeric: 'tabular-nums',
              }}
            >
              {num(Math.max(secondsLeft, 0))}
            </div>
          </div>
        </Ring>
        <h2
          style={{
            fontSize: 26,
            fontWeight: 800,
            letterSpacing: '-0.01em',
            margin: '30px 0 0',
            textAlign: 'center',
            color: isRest ? 'var(--text-dim)' : 'var(--text)',
          }}
        >
          {isRest ? t('rest') : tr(step.name)}
        </h2>
      </div>

      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          gap: 12,
          padding: '0 24px calc(36px + env(safe-area-inset-bottom))',
        }}
      >
        <Button
          onClick={() => setRunning((value) => !value)}
          variant="ghost"
          size="lg"
          icon={running ? 'pauseSolid' : 'play'}
        >
          {running ? t('pause') : t('go')}
        </Button>
        <Button onClick={skip} variant="soft" size="lg" icon="chevR" flipIcon>
          {t('go')}
        </Button>
      </div>
    </Overlay>
  );
}
