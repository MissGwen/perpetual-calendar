import { describe, expect, it } from 'vitest';
import { formatDate, getCurrentShiChen, getWangXiang } from './date';

describe('dateUtils', () => {
  it('returns the expected wuxing state', () => {
    expect(getWangXiang('木', '木')).toBe('旺');
    expect(getWangXiang('火', '金')).toBe('囚');
    expect(getWangXiang('金', '未知')).toBe('未知');
  });

  it('maps hours to shichen correctly', () => {
    expect(getCurrentShiChen(new Date('2026-06-11T23:30:00')).shichen).toBe('子时');
    expect(getCurrentShiChen(new Date('2026-06-11T08:30:00')).shichen).toBe('辰时');
    expect(getCurrentShiChen(new Date('2026-06-11T21:30:00')).shichen).toBe('亥时');
  });

  it('formats dates with the provided format', () => {
    expect(formatDate(new Date('2026-06-11T00:00:00'), 'yyyy/MM/dd')).toBe('2026/06/11');
  });
});
