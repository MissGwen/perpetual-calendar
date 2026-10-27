/**
 * 主题状态（模块级 store）
 * - classic：现有红金节庆风（默认，完全不动现有组件）
 * - almanac：朱墨黄历主题（独立组件集，data-theme 作用域样式）
 * - 与防闪白内联脚本（见 app/layout.tsx）约定：以 html[data-theme] 为唯一事实源
 */
export type ThemeName = 'classic' | 'almanac';

export const THEME_STORAGE_KEY = 'perpetual-calendar-theme';

const listeners = new Set<() => void>();

let currentTheme: ThemeName = 'classic';

function resolveInitialTheme(): ThemeName {
  if (typeof document === 'undefined') return 'classic';
  const attr = document.documentElement.getAttribute('data-theme');
  return attr === 'almanac' ? 'almanac' : 'classic';
}

currentTheme = resolveInitialTheme();

export function getTheme(): ThemeName {
  return currentTheme;
}

export function setTheme(theme: ThemeName): void {
  currentTheme = theme;
  if (typeof document !== 'undefined') {
    document.documentElement.setAttribute('data-theme', theme);
    try {
      localStorage.setItem(THEME_STORAGE_KEY, theme);
    } catch {
      // localStorage 不可用（隐私模式等）时仅内存切换
    }
  }
  listeners.forEach((listener) => listener());
}

export function subscribeTheme(listener: () => void): () => void {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}
