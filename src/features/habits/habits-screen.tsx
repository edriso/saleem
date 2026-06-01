import { Button } from '@/components/button';
import { Card } from '@/components/card';
import { Icon, type IconName } from '@/components/icon';
import { useI18n } from '@/i18n/i18n';
import { HABITS } from '@/lib/content';
import { useSaleemStore } from '@/store/saleem-store';

export function HabitsScreen() {
  const { t, tr, num } = useI18n();
  const app = useSaleemStore((state) => state.app);
  const setFocusHabit = useSaleemStore((state) => state.setFocusHabit);
  const markHabit = useSaleemStore((state) => state.markHabit);

  return (
    <div className="s-screen">
      <header style={{ marginBottom: 20 }}>
        <h1 style={{ margin: 0, fontSize: 28, fontWeight: 800, letterSpacing: '-0.02em' }}>
          {t('habits')}
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
          {t('pickHabit')}
        </p>
      </header>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 11 }}>
        {HABITS.map((habit) => {
          const isFocus = app.focusHabit === habit.id;
          const days = app.habitDays[habit.id] ?? 0;
          return (
            <Card key={habit.id} accent={isFocus} pad={18}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                <div
                  style={{
                    width: 46,
                    height: 46,
                    borderRadius: 13,
                    flexShrink: 0,
                    background: isFocus ? 'var(--accent)' : 'var(--surface-2)',
                    color: isFocus ? 'var(--on-accent)' : 'var(--accent)',
                    display: 'grid',
                    placeItems: 'center',
                  }}
                >
                  <Icon name={habit.icon as IconName} size={23} />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontWeight: 700, fontSize: 16 }}>{tr(habit.name)}</div>
                  {days > 0 && (
                    <div style={{ fontSize: 12.5, color: 'var(--accent)', marginTop: 2 }}>
                      {`${num(days)} ${t('streak')}`}
                    </div>
                  )}
                </div>
                {isFocus ? (
                  <Button
                    onClick={() => markHabit(habit.id)}
                    variant="primary"
                    size="sm"
                    icon="check"
                  >
                    {t('didIt')}
                  </Button>
                ) : (
                  <Button onClick={() => setFocusHabit(habit.id)} variant="ghost" size="sm">
                    {t('start')}
                  </Button>
                )}
              </div>
              <p
                style={{
                  margin: '13px 0 0',
                  fontSize: 13.5,
                  color: 'var(--text-dim)',
                  lineHeight: 1.55,
                  textWrap: 'pretty',
                  paddingTop: 13,
                  borderTop: '1px solid var(--line)',
                }}
              >
                {tr(habit.why)}
              </p>
            </Card>
          );
        })}
      </div>

      {/* Gentle safety note */}
      <Card
        pad={16}
        style={{
          marginTop: 18,
          background: 'var(--surface-2)',
          display: 'flex',
          gap: 12,
          alignItems: 'flex-start',
        }}
      >
        <span style={{ color: 'var(--text-faint)', flexShrink: 0, marginTop: 1 }}>
          <Icon name="info" size={18} />
        </span>
        <p
          style={{
            margin: 0,
            fontSize: 12.5,
            lineHeight: 1.6,
            color: 'var(--text-faint)',
            textWrap: 'pretty',
          }}
        >
          {t('safety')}
        </p>
      </Card>
    </div>
  );
}
