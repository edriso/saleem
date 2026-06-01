import type { Tone } from '@/types/domain';

const COLORS: Record<Tone, string> = {
  good: 'var(--accent)',
  ok: '#d9a23b',
  watch: '#e0795a',
};

/** A small colored dot signalling a dish's tone: good / ok / watch. */
export function ToneDot({ tone }: { tone: Tone }) {
  return (
    <span
      aria-hidden="true"
      style={{
        width: 9,
        height: 9,
        borderRadius: 99,
        background: COLORS[tone],
        flexShrink: 0,
        display: 'inline-block',
      }}
    />
  );
}
