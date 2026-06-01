import { useState } from 'react';
import { Card } from '@/components/card';
import { Icon, type IconName } from '@/components/icon';
import { Label } from '@/components/label';
import { ToneDot } from '@/components/tone-dot';
import { useI18n } from '@/i18n/i18n';
import type { MessageId } from '@/i18n/messages';
import { DISHES, PLATE } from '@/lib/content';
import type { Hand } from '@/types/domain';

const HAND_LABEL: Record<Hand, MessageId> = {
  palm: 'palm',
  fist: 'fist',
  cupped: 'cupped',
  thumb: 'thumb',
};

export function EatScreen() {
  const { t, tr } = useI18n();
  const [open, setOpen] = useState<string | null>(null);

  return (
    <div className="s-screen">
      <header style={{ marginBottom: 20 }}>
        <h1 style={{ margin: 0, fontSize: 28, fontWeight: 800, letterSpacing: '-0.02em' }}>
          {t('eat')}
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
          {t('plateIntro')}
        </p>
      </header>

      {/* The hand plate */}
      <Label style={{ marginBottom: 12 }}>{t('plateMethod')}</Label>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 26 }}>
        {PLATE.map((item) => (
          <Card key={item.id} pad={16} style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <div
              style={{
                width: 48,
                height: 48,
                borderRadius: 14,
                flexShrink: 0,
                display: 'grid',
                placeItems: 'center',
                background: item.color + '22',
                color: item.color,
              }}
            >
              <Icon name={item.icon as IconName} size={24} />
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, flexWrap: 'wrap' }}>
                <span style={{ fontWeight: 700, fontSize: 16 }}>{t(item.key)}</span>
                <span style={{ fontSize: 13, color: item.color, fontWeight: 600 }}>
                  {`= ${t(HAND_LABEL[item.hand])}`}
                </span>
              </div>
              <p
                style={{
                  margin: '3px 0 0',
                  fontSize: 13,
                  color: 'var(--text-dim)',
                  lineHeight: 1.45,
                  textWrap: 'pretty',
                }}
              >
                {tr(item.tip)}
              </p>
            </div>
            <span style={{ color: item.color, flexShrink: 0, opacity: 0.5 }}>
              <Icon name="hand" size={26} />
            </span>
          </Card>
        ))}
      </div>

      {/* Smarter swaps */}
      <Label style={{ marginBottom: 6 }}>{t('swaps')}</Label>
      <p
        style={{
          margin: '0 0 14px',
          color: 'var(--text-dim)',
          fontSize: 13.5,
          lineHeight: 1.5,
          textWrap: 'pretty',
        }}
      >
        {t('swapsIntro')}
      </p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {DISHES.map((dish) => {
          const isOpen = open === dish.id;
          return (
            <Card key={dish.id} pad={0} style={{ overflow: 'hidden' }}>
              <button
                onClick={() => setOpen(isOpen ? null : dish.id)}
                className="s-tap"
                aria-expanded={isOpen}
                style={{
                  width: '100%',
                  background: 'transparent',
                  border: 'none',
                  color: 'inherit',
                  font: 'inherit',
                  cursor: 'pointer',
                  padding: 16,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 13,
                  textAlign: 'start',
                }}
              >
                <div
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: 12,
                    flexShrink: 0,
                    background: 'var(--surface-2)',
                    color: 'var(--accent)',
                    display: 'grid',
                    placeItems: 'center',
                  }}
                >
                  <Icon name={dish.icon as IconName} size={22} />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <ToneDot tone={dish.tone} />
                    <span style={{ fontWeight: 700, fontSize: 16 }}>{tr(dish.name)}</span>
                  </div>
                  <div style={{ fontSize: 12.5, color: 'var(--text-faint)', marginTop: 2 }}>
                    {tr(dish.verdict)}
                  </div>
                </div>
                <span
                  className="s-flip"
                  style={{
                    color: 'var(--text-faint)',
                    flexShrink: 0,
                    transform: isOpen ? 'rotate(90deg)' : undefined,
                    transition: 'transform .25s',
                  }}
                >
                  <Icon name="chevR" size={19} />
                </span>
              </button>
              {isOpen && (
                <div className="s-fade" style={{ padding: '0 16px 16px' }}>
                  <div
                    style={{
                      padding: '13px 14px',
                      borderRadius: 13,
                      background: 'var(--accent-soft)',
                      marginBottom: 10,
                    }}
                  >
                    <div style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
                      <Icon
                        name="check"
                        size={17}
                        style={{ color: 'var(--accent)', flexShrink: 0, marginTop: 1 }}
                      />
                      <span
                        style={{
                          fontSize: 14,
                          color: 'var(--text)',
                          lineHeight: 1.5,
                          textWrap: 'pretty',
                        }}
                      >
                        {tr(dish.swap)}
                      </span>
                    </div>
                  </div>
                  <div
                    style={{ display: 'flex', gap: 8, alignItems: 'flex-start', padding: '0 4px' }}
                  >
                    <Icon
                      name="info"
                      size={15}
                      style={{ color: 'var(--text-faint)', flexShrink: 0, marginTop: 2 }}
                    />
                    <span
                      style={{
                        fontSize: 13,
                        color: 'var(--text-dim)',
                        lineHeight: 1.5,
                        textWrap: 'pretty',
                      }}
                    >
                      {tr(dish.why)}
                    </span>
                  </div>
                </div>
              )}
            </Card>
          );
        })}
      </div>
    </div>
  );
}
