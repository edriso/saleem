import type { CSSProperties, ReactNode } from 'react';
import { Icon, type IconName } from './icon';

type Variant = 'primary' | 'ghost' | 'soft';
type Size = 'sm' | 'md' | 'lg';

interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  variant?: Variant;
  size?: Size;
  icon?: IconName;
  /** Mirror the leading icon under RTL (for directional glyphs like chevrons). */
  flipIcon?: boolean;
  style?: CSSProperties;
  disabled?: boolean;
  type?: 'button' | 'submit';
  'aria-label'?: string;
}

const sizes: Record<Size, CSSProperties> = {
  sm: { padding: '9px 15px', fontSize: 14 },
  md: { padding: '13px 19px', fontSize: 15 },
  lg: { padding: '16px 24px', fontSize: 16 },
};

const variants: Record<Variant, CSSProperties> = {
  primary: {
    background: 'var(--accent)',
    color: 'var(--on-accent)',
    border: '1px solid transparent',
  },
  ghost: { background: 'transparent', color: 'var(--text)', border: '1px solid var(--line)' },
  soft: {
    background: 'var(--accent-soft)',
    color: 'var(--accent)',
    border: '1px solid transparent',
  },
};

/** The shared pill button, with an optional leading icon. */
export function Button({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  icon,
  flipIcon = false,
  style,
  disabled,
  type = 'button',
  'aria-label': ariaLabel,
}: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      className="s-btn s-tap"
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 9,
        fontFamily: 'inherit',
        fontWeight: 700,
        letterSpacing: '-0.01em',
        borderRadius: 999,
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.5 : 1,
        whiteSpace: 'nowrap',
        ...sizes[size],
        ...variants[variant],
        ...style,
      }}
    >
      {icon && (
        <span className={flipIcon ? 's-flip' : undefined} style={{ display: 'inline-flex' }}>
          <Icon name={icon} size={size === 'lg' ? 20 : 18} />
        </span>
      )}
      {children}
    </button>
  );
}
