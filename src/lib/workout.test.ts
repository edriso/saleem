import { describe, expect, it } from 'vitest';
import type { Workout } from '@/types/domain';
import { buildSequence, isLastStep, stepProgress } from './workout';

const workout: Workout = {
  id: 'test',
  name: { en: 'Test', ar: 'تجربة' },
  mins: 3,
  rounds: 2,
  blurb: { en: '', ar: '' },
  moves: [
    { name: { en: 'A', ar: 'أ' }, secs: 30 },
    { name: { en: 'B', ar: 'ب' }, secs: 20 },
    { name: { en: 'Rest', ar: 'راحة' }, secs: 10, rest: true },
  ],
};

describe('buildSequence', () => {
  it('expands moves across all rounds', () => {
    const sequence = buildSequence(workout);
    expect(sequence).toHaveLength(6); // 3 moves × 2 rounds
  });

  it('tags each step with its 1-based round', () => {
    const sequence = buildSequence(workout);
    expect(sequence[0].round).toBe(1);
    expect(sequence[2].round).toBe(1);
    expect(sequence[3].round).toBe(2);
    expect(sequence[5].round).toBe(2);
  });

  it('carries rest steps through', () => {
    const sequence = buildSequence(workout);
    expect(sequence[2].rest).toBe(true);
    expect(sequence[5].rest).toBe(true);
  });
});

describe('isLastStep', () => {
  it('detects the final step', () => {
    const sequence = buildSequence(workout);
    expect(isLastStep(sequence, 5)).toBe(true);
    expect(isLastStep(sequence, 4)).toBe(false);
    expect(isLastStep(sequence, 0)).toBe(false);
  });
});

describe('stepProgress', () => {
  it('runs from 0 to 1 as the seconds count down', () => {
    expect(stepProgress(30, 30)).toBe(0);
    expect(stepProgress(30, 15)).toBeCloseTo(0.5);
    expect(stepProgress(30, 0)).toBe(1);
  });

  it('clamps and tolerates a zero-length step', () => {
    expect(stepProgress(30, -5)).toBe(1);
    expect(stepProgress(0, 0)).toBe(1);
  });
});
