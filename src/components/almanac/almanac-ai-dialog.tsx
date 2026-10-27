/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import ReactMarkdown from 'react-markdown';
import { X } from 'lucide-react';
import { CalendarDate } from '@/types/calendar';

interface AlmanacAiDialogProps {
  date: CalendarDate;
  completion: string;
  error: unknown;
  isLoading: boolean;
  onClose: () => void;
}

/** 与 classic 主题 date-detail.tsx 的 buildAnalysisPayload 保持同构（该函数未导出，此处独立维护） */
export function buildAnalysisPayload(date: CalendarDate) {
  return {
    solarDate: `${date.year}年${date.month + 1}月${date.day}日`,
    lunarDate: `${date.lunarMonthName}${date.lunarDayName}`,
    ganZhiYear: date.ganZhiYear,
    ganZhiMonth: date.ganZhiMonth,
    ganZhiDay: date.ganZhiDay,
    dayWuXing: date.dayWuXing,
    dayNaYin: date.dayNaYin,
    wangShuai: date.wangShuai,
    diShi: date.diShi,
    dayValue: date.dayValue,
    dayGod: date.dayGod,
    isYellowRoad: date.isYellowRoad,
    suitable: date.suitable,
    avoid: date.avoid,
    xiu: date.xiu,
    xiuLuck: date.xiuLuck,
    zheng: date.zheng,
    animal: date.animal,
    gong: date.gong,
  };
}

/** AI 分析弹窗（almanac 皮肤）：portal 到 body，ESC 可关，打开期间锁定页面滚动 */
export function AlmanacAiDialog({
  date,
  completion,
  error,
  isLoading,
  onClose,
}: AlmanacAiDialogProps) {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = prevOverflow;
    };
  }, [onClose]);

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 px-4 py-6 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label="AI 分析"
        className="am-frame relative flex max-h-[85vh] w-full max-w-2xl flex-col overflow-hidden"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4 border-b border-[var(--am-hairline)] px-5 py-4">
          <div>
            <h3 className="am-serif text-lg font-bold text-[var(--am-ink)]">AI 解析</h3>
            <p className="am-serif mt-1 text-sm text-[var(--am-ink-soft)]">
              {date.year}年{date.month + 1}月{date.day}日 · {date.lunarMonthName}
              {date.lunarDayName}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="关闭 AI 分析弹窗"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[var(--am-hairline)] text-[var(--am-ink-soft)] transition-colors hover:border-[var(--am-gold)] hover:text-[var(--am-ink)]"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="overflow-y-auto px-5 py-5">
          {error ? (
            <div className="rounded-sm border border-[var(--am-zhu)] px-4 py-4 text-[var(--am-zhu-deep)]">
              AI 分析暂时不可用，请稍后再试。
            </div>
          ) : completion ? (
            <div className="am-serif text-sm leading-7 text-[var(--am-ink)]">
              <ReactMarkdown
                components={{
                  h2: ({ node: _node, ...props }) => (
                    <h2
                      className="am-serif mt-5 mb-2 text-lg font-bold text-[var(--am-ink)]"
                      {...props}
                    />
                  ),
                  h3: ({ node: _node, ...props }) => (
                    <h3
                      className="am-serif mt-4 mb-2 text-base font-semibold text-[var(--am-ink)]"
                      {...props}
                    />
                  ),
                  p: ({ node: _node, ...props }) => (
                    <p className="am-serif mb-3 leading-relaxed text-[var(--am-ink)]" {...props} />
                  ),
                  ul: ({ node: _node, ...props }) => (
                    <ul
                      className="am-serif mb-3 list-disc space-y-1 pl-5 text-[var(--am-ink)]"
                      {...props}
                    />
                  ),
                  ol: ({ node: _node, ...props }) => (
                    <ol
                      className="am-serif mb-3 list-decimal space-y-1 pl-5 text-[var(--am-ink)]"
                      {...props}
                    />
                  ),
                  li: ({ node: _node, ...props }) => <li className="am-serif pl-1" {...props} />,
                  strong: ({ node: _node, ...props }) => (
                    <strong
                      className="am-serif font-semibold text-[var(--am-zhu-deep)]"
                      {...props}
                    />
                  ),
                }}
              >
                {completion + (isLoading ? ' ▍' : '')}
              </ReactMarkdown>
            </div>
          ) : (
            <div className="flex items-center gap-3 text-[var(--am-ink-soft)]">
              <span className="inline-block h-2.5 w-2.5 animate-pulse rounded-full bg-[var(--am-zhu)]" />
              <span>{isLoading ? '正在结合黄历为你生成分析…' : '正在准备分析内容…'}</span>
            </div>
          )}
        </div>
      </div>
    </div>,
    document.body,
  );
}
