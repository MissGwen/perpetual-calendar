'use client';

import { useEffect, useState } from 'react';

/**
 * 延迟一帧返回挂载状态，用于规避 SSR 首帧与服务端不一致导致的 hydration 警告。
 * 组件可在返回 false 时渲染骨架/占位，true 后再渲染依赖客户端 API 的内容。
 */
export function useMounted() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(timer);
  }, []);

  return mounted;
}
