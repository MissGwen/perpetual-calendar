'use client';

import { useEffect, useRef, useState } from 'react';
import { useMounted } from './use-mounted';

/**
 * 读写 localStorage 的受控 hook。
 *
 * - 挂载后才访问 window.localStorage，避免 SSR 期报错与 hydration 不一致；
 * - 初始值先用 `initial`，挂载后再同步覆盖为已存储值，避免首帧闪烁；
 * - 值变化时自动写回。
 */
export function useLocalStorage(key: string, initial: string) {
  const [value, setValue] = useState(initial);
  const mounted = useMounted();
  const hasLoadedRef = useRef(false);

  useEffect(() => {
    if (!mounted) return;

    hasLoadedRef.current = false;

    // 延迟一帧同步，避免在 effect 体内同步 setState 触发级联渲染
    const timer = setTimeout(() => {
      const saved = window.localStorage.getItem(key);
      const nextValue = saved ?? initial;

      setValue(nextValue);

      if (saved === null) {
        window.localStorage.setItem(key, nextValue);
      }

      hasLoadedRef.current = true;
    }, 0);
    return () => clearTimeout(timer);
  }, [initial, key, mounted]);

  useEffect(() => {
    if (!mounted || !hasLoadedRef.current) return;
    const timer = setTimeout(() => {
      window.localStorage.setItem(key, value);
    }, 0);
    return () => clearTimeout(timer);
  }, [key, value, mounted]);

  return [value, setValue] as const;
}
