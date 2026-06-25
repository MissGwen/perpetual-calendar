'use client';

import { type ChangeEvent } from 'react';

interface DailyMessageProps {
  /** 当前留言内容 */
  message: string;
  /** 留言变更回调（状态由父组件持有） */
  onChange: (value: string) => void;
}

/**
 * 「每日留言」卡片：鼓励用户给今天的自己留一句话。
 * 文本状态由父组件控制，便于后续与日期联动（如"某一天的留言"）。
 */
export function DailyMessage({ message, onChange }: DailyMessageProps) {
  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    onChange(event.target.value);
  };

  return (
    <div className="mt-4 overflow-hidden rounded-2xl border border-gold/20 bg-linear-to-br from-parchment-warm via-white to-parchment-amber p-5 md:p-6 shadow-xl shadow-festive/5">
      <div className="flex items-center gap-3">
        <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-linear-to-br from-festive to-festive-deep text-lg font-serif text-gold-light shadow-md">
          记
        </span>
        <div>
          <h3 className="text-xl text-festive font-display">给今天的你留下一句话吧</h3>
          <p className="mt-1 text-sm text-ink-600">我先来🙋‍♀️：你存在的本身就对这个世界有意义~</p>
        </div>
      </div>
      <div className="mt-4 rounded-xl border border-gold/15 bg-white/80 p-2 shadow-inner shadow-festive/5">
        <label htmlFor="daily-message" className="sr-only">
          给今天的你留下一句话吧
        </label>
        <textarea
          id="daily-message"
          value={message}
          onChange={handleChange}
          placeholder="例如：今天也要温柔一点，慢一点，也没关系。"
          className="min-h-32 w-full resize-none rounded-lg border border-transparent bg-transparent px-3 py-3 text-sm leading-7 text-ink-deep outline-none transition focus:border-festive focus:ring-2 focus:ring-festive/20"
        />
      </div>
    </div>
  );
}
