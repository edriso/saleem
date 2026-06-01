import { useEffect } from 'react';
import { useSaleemStore } from '@/store/saleem-store';

const FONTS: Record<string, string> = {
  en: "'Plus Jakarta Sans', system-ui, sans-serif",
  ar: "'Cairo', system-ui, sans-serif",
};

/*
 * Reflects the active settings onto <html>: language, direction, theme, accent,
 * and the per-language font. Switching language flips lang/dir/font with no
 * reload, which is what makes the whole UI re-mirror instantly for RTL.
 */
export function useApplyDocument(): void {
  const { lang, theme, accent } = useSaleemStore((state) => state.settings);

  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute('lang', lang);
    root.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
    root.setAttribute('data-theme', theme);
    root.style.setProperty('--accent', accent);
    root.style.setProperty('--font', FONTS[lang]);
  }, [lang, theme, accent]);
}
