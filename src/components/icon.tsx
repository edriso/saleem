import type { CSSProperties, ReactElement } from 'react';

export type IconName =
  | 'today'
  | 'eat'
  | 'move'
  | 'habits'
  | 'play'
  | 'pauseSolid'
  | 'check'
  | 'plus'
  | 'x'
  | 'chevR'
  | 'chevL'
  | 'globe'
  | 'drop'
  | 'walk'
  | 'leaf'
  | 'sun'
  | 'moon'
  | 'protein'
  | 'veg'
  | 'carbs'
  | 'fats'
  | 'bowl'
  | 'circle'
  | 'cup'
  | 'bread'
  | 'plate'
  | 'hand'
  | 'info';

interface IconProps {
  name: IconName;
  size?: number;
  stroke?: number;
  style?: CSSProperties;
}

/**
 * The minimal line-icon set, ported from the design prototype so the look
 * matches exactly. Decorative by default (aria-hidden); label the button, not
 * the glyph.
 */
export function Icon({ name, size = 22, stroke = 1.7, style }: IconProps): ReactElement {
  const p = {
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: stroke,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
  };

  const paths: Record<IconName, ReactElement> = {
    today: (
      <>
        <path {...p} d="M4 11.5 12 5l8 6.5" />
        <path {...p} d="M6 10.5V19h12v-8.5" />
        <path {...p} d="M10 19v-5h4v5" />
      </>
    ),
    eat: (
      <>
        <path {...p} d="M6 3v7a2 2 0 0 0 4 0V3M8 10v11" />
        <path {...p} d="M16 3c-1.5 0-2.5 2-2.5 5s1 4 2.5 4 2.5-1 2.5-4-1-5-2.5-5ZM16 12v9" />
      </>
    ),
    move: (
      <>
        <circle {...p} cx="13" cy="4.5" r="1.8" />
        <path {...p} d="M13 8l-3 3 3 2v5M10 11l-3-1M13 13l3 1.5M7.5 21l2.5-5" />
      </>
    ),
    habits: (
      <>
        <path {...p} d="M5 12.5 9 16.5 19 6.5" />
        <path {...p} d="M5 19h14" opacity="0.4" />
      </>
    ),
    play: <path {...p} d="M9 6.5 17 12l-8 5.5z" />,
    pauseSolid: <path {...p} d="M9.5 6.5v11M14.5 6.5v11" />,
    check: <path {...p} d="M5 12.5 9.5 17 19 7" />,
    plus: <path {...p} d="M12 5v14M5 12h14" />,
    x: <path {...p} d="M6.5 6.5 17.5 17.5M17.5 6.5 6.5 17.5" />,
    chevR: <path {...p} d="M9.5 6l6 6-6 6" />,
    chevL: <path {...p} d="M14.5 6l-6 6 6 6" />,
    globe: (
      <>
        <circle {...p} cx="12" cy="12" r="8.5" />
        <path {...p} d="M3.5 12h17M12 3.5c2.5 2.4 2.5 14.6 0 17M12 3.5c-2.5 2.4-2.5 14.6 0 17" />
      </>
    ),
    drop: <path {...p} d="M12 3.5c3.5 4 6 7 6 10a6 6 0 0 1-12 0c0-3 2.5-6 6-10Z" />,
    walk: (
      <>
        <circle {...p} cx="13" cy="4.5" r="1.7" />
        <path {...p} d="M13 8l-2.5 4 2.5 2.5V21M10.5 12 7 13M13 14l3.5 1.5" />
      </>
    ),
    leaf: (
      <>
        <path {...p} d="M6 18C6 9 12 5 19 5c0 9-6 13-13 13Z" />
        <path {...p} d="M9 15c2-3 5-5 8-6" />
      </>
    ),
    sun: (
      <>
        <circle {...p} cx="12" cy="12" r="4" />
        <path
          {...p}
          d="M12 2.5v2.5M12 19v2.5M2.5 12H5M19 12h2.5M5 5l1.8 1.8M17.2 17.2 19 19M19 5l-1.8 1.8M6.8 17.2 5 19"
        />
      </>
    ),
    moon: <path {...p} d="M19 13.5A7.5 7.5 0 1 1 10.5 5a6 6 0 0 0 8.5 8.5Z" />,
    protein: (
      <>
        <path {...p} d="M7 8.5a5 5 0 0 1 10 0c0 4-2 8-5 8s-5-4-5-8Z" />
        <circle {...p} cx="12" cy="9" r="2" />
      </>
    ),
    veg: (
      <>
        <path {...p} d="M6 18C6 9 12 5 19 5c0 9-6 13-13 13Z" />
        <path {...p} d="M9 15c2-3 5-5 8-6" />
      </>
    ),
    carbs: (
      <>
        <ellipse {...p} cx="12" cy="9" rx="8" ry="3.5" />
        <path {...p} d="M4 9c0 3 1 7 8 7s8-4 8-7" />
      </>
    ),
    fats: (
      <>
        <circle {...p} cx="12" cy="12" r="7.5" />
        <circle {...p} cx="12" cy="12" r="3" />
      </>
    ),
    bowl: (
      <>
        <path {...p} d="M3.5 11h17c0 4.5-3.8 7.5-8.5 7.5S3.5 15.5 3.5 11Z" />
        <path {...p} d="M7 8c0-1 1-2 2-1.5M12 7.5c0-1 1-2 2-1.5M16.5 8.5c0-1 1-2 2-1.5" />
      </>
    ),
    circle: <circle {...p} cx="12" cy="12" r="7.5" />,
    cup: (
      <>
        <path {...p} d="M5 8h12v5a5 5 0 0 1-10 0V8Z" />
        <path {...p} d="M17 9h2.2a1.8 1.8 0 0 1 0 3.6H17" />
        <path {...p} d="M8 3.5c-.5.8 0 1.5 0 2M12 3.5c-.5.8 0 1.5 0 2" />
      </>
    ),
    bread: (
      <>
        <path {...p} d="M4 10a4 4 0 0 1 4-4h8a4 4 0 0 1 0 8v3a1 1 0 0 1-1 1H8a4 4 0 0 1-4-4v-4Z" />
        <path {...p} d="M8 9v2M11 9v2M14 9v2" />
      </>
    ),
    plate: (
      <>
        <circle {...p} cx="12" cy="12" r="8.5" />
        <circle {...p} cx="12" cy="12" r="4.5" />
      </>
    ),
    hand: (
      <path
        {...p}
        d="M8 11V5.5a1.5 1.5 0 0 1 3 0V10m0-1a1.5 1.5 0 0 1 3 0v1m0-.5a1.5 1.5 0 0 1 3 0V15a5 5 0 0 1-5 5h-1.5a4 4 0 0 1-3-1.4L6 16a1.6 1.6 0 0 1 2.4-2L9.5 15"
      />
    ),
    info: (
      <>
        <circle {...p} cx="12" cy="12" r="8.5" />
        <path {...p} d="M12 11v5" />
        <circle cx="12" cy="8" r="1.1" fill="currentColor" />
      </>
    ),
  };

  return (
    <svg viewBox="0 0 24 24" width={size} height={size} style={style} aria-hidden="true">
      {paths[name]}
    </svg>
  );
}
