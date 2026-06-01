import type { Lang } from '@/types/domain';

/*
 * Locale-aware formatting. Saleem deliberately shows Eastern-Arabic numerals
 * (٠١٢٣) in Arabic and Western numerals (0123) in English, via Intl with the
 * `ar-EG` / `en-GB` locales, and uses that one rule everywhere a number or date
 * appears so the app reads as genuinely Egyptian in Arabic.
 */

export function localeFor(lang: Lang): string {
  return lang === 'ar' ? 'ar-EG' : 'en-GB';
}

/** Formats an integer/number in the active language's numeral system. */
export function formatNumber(value: number, lang: Lang): string {
  return new Intl.NumberFormat(localeFor(lang)).format(value);
}

/** A long, friendly date like "Monday, 1 June" / "الاثنين، ١ يونيو". */
export function formatLongDate(date: Date, lang: Lang): string {
  return new Intl.DateTimeFormat(localeFor(lang), {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  }).format(date);
}
