import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/button';
import { Card } from '@/components/card';
import { Icon, type IconName } from '@/components/icon';
import { Label } from '@/components/label';
import { Ring } from '@/components/ring';
import { useI18n } from '@/i18n/i18n';
import { greetingId } from '@/lib/date';
import { FACTS, HABITS } from '@/lib/content';
import { useSaleemStore } from '@/store/saleem-store';
import { MiniPlate } from './mini-plate';

export function TodayScreen() {
  const { t, tr, num, longDate } = useI18n();
  const navigate = useNavigate();
  const app = useSaleemStore((state) => state.app);
  const waterGoal = useSaleemStore((state) => state.settings.waterGoal);
  const addWater = useSaleemStore((state) => state.addWater);

  // One fact per day, rotating — deterministic so it does not flicker.
  const fact = useMemo(() => FACTS[new Date().getDate() % FACTS.length], []);
  const habit = HABITS.find((h) => h.id === app.focusHabit) ?? HABITS[0];

  return (
    <div className="s-screen">
      <header style={{ marginBottom: 22 }}>
        <Label style={{ marginBottom: 9 }}>{longDate()}</Label>
        <h1
          style={{
            margin: 0,
            fontSize: 30,
            fontWeight: 800,
            letterSpacing: '-0.02em',
            lineHeight: 1.1,
          }}
        >
          {t(greetingId())}
        </h1>
        <p
          style={{
            margin: '8px 0 0',
            color: 'var(--text-dim)',
            fontSize: 15.5,
            lineHeight: 1.5,
            textWrap: 'pretty',
          }}
        >
          {t('tagline')}
        </p>
      </header>

      {/* Build your plate */}
      <Card accent pad={22} style={{ marginBottom: 14 }}>
        <Label style={{ color: 'var(--accent)', marginBottom: 12 }}>{t('nextMeal')}</Label>
        <MiniPlate />
        <Button
          onClick={() => navigate('/eat')}
          variant="primary"
          size="lg"
          icon="eat"
          style={{ width: '100%', marginTop: 18 }}
        >
          {t('plateMethod')}
        </Button>
      </Card>

      {/* Water + move */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 14 }}>
        <Card pad={18}>
          <Label style={{ marginBottom: 12 }}>{t('water')}</Label>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <Ring value={app.water / waterGoal} size={54} thickness={5} color="#3a86c8">
              <Icon name="drop" size={20} style={{ color: '#3a86c8' }} />
            </Ring>
            <div>
              <div style={{ fontSize: 22, fontWeight: 700, lineHeight: 1 }}>
                <span>{num(app.water)}</span>
                <span style={{ fontSize: 14, color: 'var(--text-faint)' }}>/{num(waterGoal)}</span>
              </div>
              <div style={{ fontSize: 12, color: 'var(--text-faint)', marginTop: 2 }}>
                {t('glasses')}
              </div>
            </div>
          </div>
          <Button
            onClick={addWater}
            variant="soft"
            size="sm"
            icon="plus"
            style={{ width: '100%', marginTop: 14 }}
          >
            {t('addGlass')}
          </Button>
        </Card>

        <Card pad={18}>
          <Label style={{ marginBottom: 12 }}>{t('move')}</Label>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <Ring value={app.movedToday ? 1 : 0} size={54} thickness={5}>
              <Icon name="move" size={20} style={{ color: 'var(--accent)' }} />
            </Ring>
            <div style={{ fontSize: 13.5, color: 'var(--text-dim)', lineHeight: 1.4 }}>
              {t('move10')}
            </div>
          </div>
          <Button
            onClick={() => navigate('/move')}
            variant="soft"
            size="sm"
            icon="play"
            style={{ width: '100%', marginTop: 14 }}
          >
            {t('start')}
          </Button>
        </Card>
      </div>

      {/* This week's habit */}
      <Card
        pad={18}
        onClick={() => navigate('/habits')}
        ariaLabel={t('todaysHabit')}
        style={{ marginBottom: 14 }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <div
            style={{
              width: 46,
              height: 46,
              borderRadius: 13,
              flexShrink: 0,
              background: 'var(--accent-soft)',
              color: 'var(--accent)',
              display: 'grid',
              placeItems: 'center',
            }}
          >
            <Icon name={habit.icon as IconName} size={23} />
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <Label style={{ marginBottom: 3 }}>{t('todaysHabit')}</Label>
            <div style={{ fontWeight: 700, fontSize: 16 }}>{tr(habit.name)}</div>
          </div>
          <span style={{ color: 'var(--text-faint)' }} className="s-flip">
            <Icon name="chevR" size={20} />
          </span>
        </div>
      </Card>

      {/* Rotating fact */}
      <Card
        pad={16}
        style={{
          background: 'var(--surface-2)',
          display: 'flex',
          gap: 12,
          alignItems: 'flex-start',
        }}
      >
        <span style={{ color: 'var(--accent)', flexShrink: 0, marginTop: 1 }}>
          <Icon name="leaf" size={19} />
        </span>
        <p
          style={{
            margin: 0,
            fontSize: 13.5,
            lineHeight: 1.6,
            color: 'var(--text-dim)',
            textWrap: 'pretty',
          }}
        >
          {tr(fact)}
        </p>
      </Card>
    </div>
  );
}
