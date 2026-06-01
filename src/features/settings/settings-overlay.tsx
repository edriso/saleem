import type { ReactNode } from 'react';
import { Icon } from '@/components/icon';
import { Label } from '@/components/label';
import { Overlay } from '@/components/overlay';
import { useI18n } from '@/i18n/i18n';
import { ACCENTS } from '@/types/domain';
import { useSaleemStore } from '@/store/saleem-store';

interface SettingsOverlayProps {
  onClose: () => void;
}

/** A small, accessible panel for language and look: lang, theme, accent, goal. */
export function SettingsOverlay({ onClose }: SettingsOverlayProps) {
  const { t, num } = useI18n();
  const settings = useSaleemStore((state) => state.settings);
  const setLang = useSaleemStore((state) => state.setLang);
  const setTheme = useSaleemStore((state) => state.setTheme);
  const setAccent = useSaleemStore((state) => state.setAccent);
  const setWaterGoal = useSaleemStore((state) => state.setWaterGoal);

  return (
    <Overlay ariaLabel={t('settings')} onClose={onClose}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '18px 20px',
        }}
      >
        <button onClick={onClose} className="s-iconbtn s-tap" type="button" aria-label={t('close')}>
          <Icon name="x" size={20} />
        </button>
        <Label>{t('settings')}</Label>
        <div style={{ width: 42 }} />
      </div>

      <div
        style={{
          flex: 1,
          overflowY: 'auto',
          padding: '8px 22px 40px',
          maxWidth: 460,
          width: '100%',
          margin: '0 auto',
        }}
      >
        <Label style={{ marginBottom: 14, color: 'var(--accent)' }}>{t('languageAndLook')}</Label>

        <Section label={t('language')}>
          <PillGroup
            options={[
              { value: 'en', label: 'English' },
              { value: 'ar', label: 'العربية' },
            ]}
            selected={settings.lang}
            onSelect={(value) => setLang(value === 'ar' ? 'ar' : 'en')}
          />
        </Section>

        <Section label={t('theme')}>
          <PillGroup
            options={[
              { value: 'dark', label: t('themeDark') },
              { value: 'light', label: t('themeLight') },
            ]}
            selected={settings.theme}
            onSelect={(value) => setTheme(value === 'light' ? 'light' : 'dark')}
          />
        </Section>

        <Section label={t('accent')}>
          <div
            role="group"
            aria-label={t('accent')}
            style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}
          >
            {ACCENTS.map((color) => {
              const isSelected = settings.accent === color;
              return (
                <button
                  key={color}
                  type="button"
                  onClick={() => setAccent(color)}
                  aria-pressed={isSelected}
                  aria-label={color}
                  className="s-tap"
                  style={{
                    width: 38,
                    height: 38,
                    borderRadius: '50%',
                    cursor: 'pointer',
                    background: color,
                    border: `3px solid ${isSelected ? 'var(--text)' : 'transparent'}`,
                    boxShadow: '0 0 0 1px var(--line)',
                  }}
                />
              );
            })}
          </div>
        </Section>

        <Label style={{ margin: '6px 0 14px', color: 'var(--accent)' }}>{t('goals')}</Label>
        <Section label={`${t('waterGoal')} · ${num(settings.waterGoal)} ${t('glasses')}`}>
          <input
            type="range"
            min={4}
            max={12}
            step={1}
            value={settings.waterGoal}
            onChange={(event) => setWaterGoal(Number(event.target.value))}
            aria-label={t('waterGoal')}
            className="s-range"
          />
        </Section>
      </div>
    </Overlay>
  );
}

function Section({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div style={{ marginBottom: 26 }}>
      <Label style={{ marginBottom: 12 }}>{label}</Label>
      {children}
    </div>
  );
}

interface PillOption {
  value: string;
  label: string;
}

function PillGroup({
  options,
  selected,
  onSelect,
}: {
  options: PillOption[];
  selected: string;
  onSelect: (value: string) => void;
}) {
  return (
    <div role="group" style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
      {options.map((option) => {
        const isSelected = option.value === selected;
        return (
          <button
            key={option.value}
            type="button"
            onClick={() => onSelect(option.value)}
            aria-pressed={isSelected}
            className="s-tap"
            style={{
              padding: '10px 18px',
              borderRadius: 999,
              cursor: 'pointer',
              fontFamily: 'inherit',
              fontSize: 14,
              fontWeight: 700,
              background: isSelected ? 'var(--accent-soft)' : 'transparent',
              color: isSelected ? 'var(--accent)' : 'var(--text-dim)',
              border: `1px solid ${isSelected ? 'var(--accent-line)' : 'var(--line)'}`,
            }}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
