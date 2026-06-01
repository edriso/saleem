import { createContext, useCallback, useContext, useMemo, type ReactNode } from 'react';
import { formatLongDate, formatNumber } from '@/lib/format';
import { useSaleemStore } from '@/store/saleem-store';
import type { Lang, Localized } from '@/types/domain';
import { messages, type MessageId } from './messages';

interface I18nValue {
  lang: Lang;
  dir: 'ltr' | 'rtl';
  /** Translate a UI message id to the active language. */
  t: (id: MessageId) => string;
  /** Resolve a `{ en, ar }` content value to the active language. */
  tr: (value: Localized) => string;
  /** Format a number in the active language's numeral system. */
  num: (value: number) => string;
  /** Format a long, friendly date in the active locale. */
  longDate: (date?: Date) => string;
}

const I18nContext = createContext<I18nValue | null>(null);

/**
 * Provides the i18n value derived from the active language in the store. Holds
 * no language state of its own — the language is part of persisted settings —
 * so the toggle, theme, and accent all flow from one source of truth.
 */
export function I18nProvider({ children }: { children: ReactNode }) {
  const lang = useSaleemStore((state) => state.settings.lang);

  const value = useMemo<I18nValue>(() => {
    const dir = lang === 'ar' ? 'rtl' : 'ltr';
    return {
      lang,
      dir,
      t: (id) => messages[id][lang],
      tr: (entry) => entry[lang],
      num: (n) => formatNumber(n, lang),
      longDate: (date = new Date()) => formatLongDate(date, lang),
    };
  }, [lang]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useI18n(): I18nValue {
  const value = useContext(I18nContext);
  if (!value) {
    throw new Error('useI18n must be used within an I18nProvider');
  }
  return value;
}

/** Stable callback to flip between the two languages. */
// eslint-disable-next-line react-refresh/only-export-components
export function useToggleLang(): () => void {
  const lang = useSaleemStore((state) => state.settings.lang);
  const setLang = useSaleemStore((state) => state.setLang);
  return useCallback(() => setLang(lang === 'ar' ? 'en' : 'ar'), [lang, setLang]);
}
