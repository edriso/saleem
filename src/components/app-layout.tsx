import { NavLink, Outlet } from 'react-router-dom';
import { useApplyDocument } from '@/hooks/use-apply-document';
import { useI18n, useToggleLang } from '@/i18n/i18n';
import type { MessageId } from '@/i18n/messages';
import { useUiStore } from '@/store/ui-store';
import { WorkoutPlayer } from '@/features/move/workout-player';
import { SettingsOverlay } from '@/features/settings/settings-overlay';
import { Icon, type IconName } from './icon';

interface NavItem {
  to: string;
  label: MessageId;
  icon: IconName;
  end?: boolean;
}

const NAV: NavItem[] = [
  { to: '/', label: 'today', icon: 'today', end: true },
  { to: '/eat', label: 'eat', icon: 'eat' },
  { to: '/move', label: 'move', icon: 'move' },
  { to: '/habits', label: 'habits', icon: 'habits' },
];

/**
 * The shell around every screen: a side rail on desktop, a bottom bar on
 * mobile, the routed screen between, plus the language toggle and the workout
 * and settings overlays. It mirrors cleanly under RTL via logical properties.
 */
export function AppLayout() {
  useApplyDocument();
  const { t, lang } = useI18n();
  const toggleLang = useToggleLang();
  const activeWorkout = useUiStore((state) => state.activeWorkout);
  const closeWorkout = useUiStore((state) => state.closeWorkout);
  const settingsOpen = useUiStore((state) => state.settingsOpen);
  const openSettings = useUiStore((state) => state.openSettings);
  const closeSettings = useUiStore((state) => state.closeSettings);
  const otherLang = lang === 'ar' ? t('switchToEnglish') : t('switchToArabic');

  return (
    <div className="s-app">
      {/* Desktop side rail */}
      <nav className="s-rail" aria-label={t('appName')}>
        <div className="s-brand">
          <span className="s-logo">
            <Icon name="leaf" size={20} />
          </span>
          <span>{t('appName')}</span>
        </div>
        <div className="s-rail-items">
          {NAV.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) => 's-navitem s-tap' + (isActive ? ' is-on' : '')}
            >
              <Icon name={item.icon} size={21} />
              <span>{t(item.label)}</span>
            </NavLink>
          ))}
          <button onClick={openSettings} className="s-navitem s-tap" type="button">
            <Icon name="sun" size={21} />
            <span>{t('settings')}</span>
          </button>
        </div>
        <button onClick={toggleLang} className="s-langbtn s-tap" type="button">
          <Icon name="globe" size={18} />
          <span>{otherLang}</span>
        </button>
      </nav>

      <main className="s-main">
        {/* Mobile top bar: brand + language toggle */}
        <div className="s-topbar">
          <div className="s-brand-m">
            <span className="s-logo">
              <Icon name="leaf" size={18} />
            </span>
            <span>{t('appName')}</span>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <button
              onClick={openSettings}
              className="s-iconbtn s-tap"
              type="button"
              aria-label={t('settings')}
              style={{ width: 38, height: 38 }}
            >
              <Icon name="sun" size={18} />
            </button>
            <button
              onClick={toggleLang}
              className="s-langchip s-tap"
              type="button"
              aria-label={otherLang}
            >
              <Icon name="globe" size={16} />
              <span>{lang === 'ar' ? t('switchToEnglish') : t('switchToArabic')}</span>
            </button>
          </div>
        </div>
        <div className="s-col">
          <Outlet />
        </div>
      </main>

      {/* Mobile bottom nav */}
      <nav className="s-bottom" aria-label={t('appName')}>
        {NAV.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            className={({ isActive }) => 's-tabbtn s-tap' + (isActive ? ' is-on' : '')}
          >
            <Icon name={item.icon} size={22} />
            <span>{t(item.label)}</span>
          </NavLink>
        ))}
      </nav>

      {activeWorkout && <WorkoutPlayer workout={activeWorkout} onClose={closeWorkout} />}
      {settingsOpen && <SettingsOverlay onClose={closeSettings} />}
    </div>
  );
}
