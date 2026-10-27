'use client';

import { useState } from 'react';
import { useCompletion } from '@ai-sdk/react';
import { WandSparkles } from 'lucide-react';
import { CalendarDate } from '@/types/calendar';
import { monthLabel, yearInChinese, WEEKDAY_NAMES, type AlmanacExtras } from './chong-sha';
import { AlmanacAiDialog, buildAnalysisPayload } from './almanac-ai-dialog';

interface AlmanacTodayProps {
  date: CalendarDate | null;
  /** 冲煞/喜神/时辰/节气，由 AlmanacHome 统一计算传入 */
  extras: AlmanacExtras | null;
}

/** 今日笺：大字日期 + 竖排农历 + 干支 + 宜忌印谱 + 冲煞喜神时辰 + AI 解析入口 */
export function AlmanacToday({ date, extras }: AlmanacTodayProps) {
  const [isAiOpen, setIsAiOpen] = useState(false);
  const { completion, complete, error, isLoading, setCompletion, stop } = useCompletion({
    api: '/api/ai-analysis',
    streamProtocol: 'text',
  });

  if (!date) {
    return (
      <div className="flex h-64 items-center justify-center" aria-label="加载中">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-[var(--am-hairline)] border-t-[var(--am-zhu)]" />
      </div>
    );
  }

  const dateKey = `${date.year}-${date.month}-${date.day}`;

  const handleOpenAi = () => {
    setIsAiOpen(true);
    setCompletion('');
    void complete('', { body: buildAnalysisPayload(date) }).catch(() => undefined);
  };

  const handleCloseAi = () => {
    stop();
    setIsAiOpen(false);
    setCompletion('');
  };

  return (
    <section className="flex flex-col" aria-label="今日黄历">
      <div className="flex items-baseline justify-between">
        <span className="am-serif text-[11.5px] font-semibold tracking-[0.26em] text-[var(--am-ink-soft)] lg:text-[13px] lg:tracking-[0.3em]">
          {yearInChinese(date.year)}年 {monthLabel(date.month)}
        </span>
        <span className="am-serif text-[13px] font-bold tracking-[0.1em] lg:text-[15px]">
          星期{WEEKDAY_NAMES[date.weekday]}
        </span>
      </div>

      <div className="mt-2 mb-0.5 flex items-end gap-3.5 lg:mx-0.5 lg:mt-3.5 lg:mb-1.5 lg:gap-5">
        <div className="am-num am-num-hero text-[92px] lg:text-[172px]">{date.day}</div>
        <div className="flex flex-row-reverse gap-1.5 pb-0.5 lg:gap-2.5 lg:pb-1.5">
          <div className="am-serif [writing-mode:vertical-rl] text-[19px] font-black tracking-[0.18em] lg:text-[30px] lg:tracking-[0.22em]">
            {date.lunarMonthName}
            {date.lunarDayName}
          </div>
          <div className="am-serif [writing-mode:vertical-rl] pt-1 text-[10.5px] tracking-[0.24em] text-[var(--am-ink-soft)] lg:text-[13px]">
            {date.ganZhiDay}
          </div>
        </div>
        {date.isYellowRoad && (
          <span className="ml-auto shrink-0 self-start rounded-full border border-[var(--am-gold)] bg-[var(--am-gold-light)] px-2.5 py-1 text-[10.5px] font-medium tracking-[0.14em] text-[#7a5e14]">
            黄道吉日
          </span>
        )}
      </div>

      <p className="am-serif mt-1.5 text-[11.5px] tracking-[0.1em] text-[var(--am-ink-soft)] lg:mt-2.5 lg:text-[13.5px] lg:tracking-[0.14em]">
        <b className="font-semibold text-[var(--am-ink)]">{date.ganZhiYear}年</b> 属{date.zodiac} ·{' '}
        <b className="font-semibold text-[var(--am-ink)]">{date.ganZhiMonth}月</b> ·{' '}
        <b className="font-semibold text-[var(--am-ink)]">{date.ganZhiDay}日</b> · {date.dayNaYin}
      </p>

      {/* 移动端：冲煞并入干支行 */}
      {extras && (
        <p className="am-serif mt-1 text-[11px] tracking-[0.08em] text-[var(--am-ink-soft)] lg:hidden">
          <em className="not-italic text-[var(--am-zhu)]">冲{extras.chongAnimal}</em>（
          {extras.chongGanZhi}）煞
          {extras.sha} · 喜神{extras.xi} · {extras.shichen}属{extras.shichenWuxing}
        </p>
      )}

      <hr className="am-rule my-3 lg:my-4" aria-hidden />

      <div className="grid grid-cols-1 gap-3 lg:grid-cols-2 lg:gap-x-6">
        <div className="flex items-start gap-3">
          <div
            key={`yi-${dateKey}`}
            className="am-seal am-seal-solid am-stamp h-8 w-8 text-[15px] lg:h-[42px] lg:w-[42px] lg:text-[19px]"
          >
            宜
          </div>
          <div className="am-serif flex flex-wrap gap-x-3.5 pt-0.5 text-[13px] leading-[1.9] tracking-[0.06em] lg:pt-1.5 lg:text-[14.5px]">
            {date.suitable.map((item) => (
              <span key={item} className="whitespace-nowrap">
                {item}
              </span>
            ))}
          </div>
        </div>
        <div className="flex items-start gap-3">
          <div
            key={`ji-${dateKey}`}
            className="am-seal am-seal-line am-stamp h-8 w-8 text-[15px] lg:h-[42px] lg:w-[42px] lg:text-[19px]"
          >
            忌
          </div>
          <div className="am-serif flex flex-wrap gap-x-3.5 pt-0.5 text-[13px] leading-[1.9] tracking-[0.06em] text-[var(--am-zhu-deep)] lg:pt-1.5 lg:text-[14.5px]">
            {date.avoid.map((item) => (
              <span key={item} className="whitespace-nowrap">
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* 桌面端：冲煞 / 喜神 / 时辰 三栏（mobile 已并入干支行） */}
      {extras && (
        <div className="mt-4 hidden gap-9 border-t border-[var(--am-hairline)] pt-3.5 lg:flex">
          <div>
            <div className="mb-1.5 text-[10.5px] font-medium tracking-[0.22em] text-[var(--am-ink-soft)]">
              冲煞
            </div>
            <div className="am-serif text-[15px] font-semibold tracking-[0.06em]">
              <em className="not-italic text-[var(--am-zhu)]">冲{extras.chongAnimal}</em>（
              {extras.chongGanZhi}）· 煞{extras.sha}
            </div>
          </div>
          <div>
            <div className="mb-1.5 text-[10.5px] font-medium tracking-[0.22em] text-[var(--am-ink-soft)]">
              喜神
            </div>
            <div className="am-serif text-[15px] font-semibold tracking-[0.06em]">{extras.xi}</div>
          </div>
          <div>
            <div className="mb-1.5 text-[10.5px] font-medium tracking-[0.22em] text-[var(--am-ink-soft)]">
              时辰
            </div>
            <div className="am-serif text-[15px] font-semibold tracking-[0.06em]">
              {extras.shichen} · {extras.shichenRange} · 属{extras.shichenWuxing}
            </div>
          </div>
        </div>
      )}

      <div className="mt-auto flex justify-end pt-4 lg:pt-5">
        <button
          type="button"
          onClick={handleOpenAi}
          disabled={isLoading}
          className="am-serif inline-flex cursor-pointer items-center gap-2 rounded-sm border-[1.5px] border-[var(--am-zhu)] bg-transparent px-3.5 py-1.5 text-[12px] font-semibold tracking-[0.14em] text-[var(--am-zhu)] transition-colors hover:bg-[var(--am-zhu-wash)] disabled:cursor-not-allowed disabled:opacity-60 lg:px-[18px] lg:py-2 lg:text-[13px]"
        >
          <WandSparkles className="h-3.5 w-3.5" aria-hidden />
          {isLoading ? '分析中…' : `AI 解析${date.isToday ? '今日' : '此日'}`}
        </button>
      </div>

      {isAiOpen && (
        <AlmanacAiDialog
          date={date}
          completion={completion}
          error={error}
          isLoading={isLoading}
          onClose={handleCloseAi}
        />
      )}
    </section>
  );
}
