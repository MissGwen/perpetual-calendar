'use client';

import { useTheme } from '@/hooks/use-theme';

/**
 * 主题切换悬浮钮：固定左下角的印章样式（与右下角 BGM 播放钮对称）
 * - classic 主题显示「笺」，点击切换到朱墨黄历主题
 * - almanac 主题显示「历」，点击切换回经典主题
 */
export function ThemeToggle() {
  const [theme, setTheme] = useTheme();
  const isAlmanac = theme === 'almanac';

  return (
    <button
      type="button"
      onClick={() => setTheme(isAlmanac ? 'classic' : 'almanac')}
      aria-label={isAlmanac ? '切换回经典主题' : '切换为朱墨黄历主题'}
      title={isAlmanac ? '切换回经典主题' : '切换为朱墨黄历主题'}
      className="theme-toggle fixed bottom-6 left-6 z-50 flex h-11 w-11 -rotate-2 cursor-pointer select-none items-center justify-center rounded-full bg-ink-800 font-serif text-lg font-black text-parchment shadow-md transition-transform hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand active:scale-95"
    >
      {isAlmanac ? '历' : '笺'}
    </button>
  );
}
