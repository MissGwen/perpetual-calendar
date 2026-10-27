'use client';

import { useSyncExternalStore } from 'react';
import { getTheme, setTheme, subscribeTheme, type ThemeName } from '@/lib/theme-store';

export function useTheme(): [ThemeName, (theme: ThemeName) => void] {
  const theme = useSyncExternalStore(subscribeTheme, getTheme, (): ThemeName => 'classic');
  return [theme, setTheme];
}
