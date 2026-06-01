import type { CSSProperties, ReactNode } from 'react';
import { useI18n } from '@/i18n/i18n';

/**
 * A small uppercase, wide-tracked eyebrow label. Latin letter-spacing is wrong
 * for Arabic, so tracking and uppercasing are dropped under `ar`.
 */
export function Label({ children, style }: { children: ReactNode; style?: CSSProperties }) {
  const { lang } = useI18n();
  const arabic = lang === 'ar';
  return (
    <div
      className="s-label"
      style={{
        fontSize: arabic ? 12.5 : 12,
        fontWeight: 700,
        letterSpacing: arabic ? '0' : '0.06em',
        textTransform: arabic ? 'none' : 'uppercase',
        color: 'var(--text-faint)',
        ...style,
      }}
    >
      {children}
    </div>
  );
}
