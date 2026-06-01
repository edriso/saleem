import { useI18n } from '@/i18n/i18n';

function dot(color: string) {
  return {
    width: 11,
    height: 11,
    borderRadius: 99,
    background: color,
    display: 'inline-block',
    flexShrink: 0,
  } as const;
}

/** The plate visual: ½ vegetables, ¼ protein, ¼ carbs, as a simple SVG pie. */
export function MiniPlate() {
  const { t } = useI18n();
  const rows = [
    { color: '#3fb27f', text: `½ ${t('veg')}` },
    { color: '#e0795a', text: `¼ ${t('protein')}` },
    { color: '#d9a23b', text: `¼ ${t('carbs')}` },
  ];

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
      <div style={{ position: 'relative', width: 96, height: 96, flexShrink: 0 }}>
        <svg viewBox="0 0 100 100" width="96" height="96" aria-hidden="true">
          <circle cx="50" cy="50" r="47" fill="var(--surface-2)" stroke="var(--line)" />
          <path d="M50 50 L50 4 A46 46 0 0 1 96 50 Z" fill="#d9a23b" opacity="0.85" />
          <path d="M50 50 L96 50 A46 46 0 0 1 50 96 Z" fill="#e0795a" opacity="0.85" />
          <path
            d="M50 50 L50 96 A46 46 0 0 1 4 50 A46 46 0 0 1 50 4 Z"
            fill="#3fb27f"
            opacity="0.9"
          />
          <circle cx="50" cy="50" r="47" fill="none" stroke="var(--bg)" strokeWidth="2" />
        </svg>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, fontSize: 13.5 }}>
        {rows.map((row) => (
          <span key={row.text} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={dot(row.color)} />
            {row.text}
          </span>
        ))}
      </div>
    </div>
  );
}
