import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it } from 'vitest';
import { App } from '@/App';
import { createDefaultState } from '@/lib/repository';
import { useSaleemStore } from '@/store/saleem-store';
import { useUiStore } from '@/store/ui-store';

function resetState() {
  localStorage.clear();
  const defaults = createDefaultState();
  useSaleemStore.setState({ settings: defaults.settings, app: defaults.app });
  useUiStore.setState({ activeWorkout: null, settingsOpen: false });
  window.history.pushState({}, '', '/');
}

beforeEach(resetState);

describe('language toggle and RTL', () => {
  it('flips documentElement lang/dir and swaps the copy', async () => {
    const user = userEvent.setup();
    render(<App />);

    expect(document.documentElement.getAttribute('lang')).toBe('en');
    expect(document.documentElement.getAttribute('dir')).toBe('ltr');
    expect(screen.getAllByText('Today').length).toBeGreaterThan(0);

    // The toggle's accessible name is the other language's endonym.
    await user.click(screen.getAllByRole('button', { name: 'العربية' })[0]);

    expect(document.documentElement.getAttribute('lang')).toBe('ar');
    expect(document.documentElement.getAttribute('dir')).toBe('rtl');
    expect(screen.getAllByText('النهاردة').length).toBeGreaterThan(0);
  });
});

describe('water counter', () => {
  it('increments toward the goal when a glass is added', async () => {
    const user = userEvent.setup();
    render(<App />);

    expect(useSaleemStore.getState().app.water).toBe(0);
    await user.click(screen.getByRole('button', { name: 'Add a glass' }));
    expect(useSaleemStore.getState().app.water).toBe(1);
  });
});

describe('habits', () => {
  it('marks the focus habit and shows a one-day streak', async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getAllByRole('link', { name: 'Habits' })[0]);
    // The default focus habit (sugar) shows the Done action.
    await user.click(screen.getByRole('button', { name: 'Done' }));

    expect(useSaleemStore.getState().app.habitDays.sugar).toBe(1);
    expect(screen.getByText(/day streak/)).toBeInTheDocument();
  });
});

describe('eat: dish swaps', () => {
  it('expands a dish to reveal its swap and why', async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getAllByRole('link', { name: 'Eat' })[0]);
    const koshari = screen.getByRole('button', { name: /Koshari/ });
    await user.click(koshari);

    expect(within(document.body).getByText(/ask for more lentils/i)).toBeInTheDocument();
  });
});
