import { act, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { I18nProvider } from '@/i18n/i18n';
import { createDefaultState } from '@/lib/repository';
import { useSaleemStore } from '@/store/saleem-store';
import type { Workout } from '@/types/domain';
import { WorkoutPlayer } from './workout-player';

const workout: Workout = {
  id: 'mini',
  name: { en: 'Mini', ar: 'ميني' },
  mins: 1,
  rounds: 1,
  blurb: { en: 'tiny', ar: 'صغير' },
  moves: [{ name: { en: 'Hop', ar: 'نطة' }, secs: 2 }],
};

beforeEach(() => {
  const defaults = createDefaultState();
  useSaleemStore.setState({ settings: defaults.settings, app: defaults.app });
  vi.useFakeTimers();
});

afterEach(() => {
  vi.useRealTimers();
});

describe('WorkoutPlayer', () => {
  it('counts down and reaches a warm completion', () => {
    render(
      <I18nProvider>
        <WorkoutPlayer workout={workout} onClose={() => {}} />
      </I18nProvider>,
    );

    expect(screen.getByText('Hop')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();

    act(() => {
      vi.advanceTimersByTime(1000);
    });
    expect(screen.getByText('1')).toBeInTheDocument();

    act(() => {
      vi.advanceTimersByTime(1000);
    });
    expect(screen.getByText(/movement in the bank/)).toBeInTheDocument();
  });

  it('records the workout as done when finishing', () => {
    render(
      <I18nProvider>
        <WorkoutPlayer workout={workout} onClose={() => {}} />
      </I18nProvider>,
    );

    act(() => {
      vi.advanceTimersByTime(2000);
    });
    // The completion screen's "Done" button marks movedToday.
    act(() => {
      screen.getByRole('button', { name: 'Done' }).click();
    });
    expect(useSaleemStore.getState().app.movedToday).toBe(true);
  });
});
