'use client';

import { useEffect, useMemo, useState } from 'react';
import { CalendarDate } from '@/types/calendar';
import { getCalendarDate, getMonthData } from '@/lib/calendar/date';
import { useMounted } from '@/hooks/use-mounted';
import { getAlmanacExtras } from './chong-sha';
import { AlmanacToday } from './almanac-today';
import { AlmanacMonth } from './almanac-month';
import { AlmanacStrip } from './almanac-strip';
import { AlmanacMessage } from './almanac-message';

interface AlmanacHomeProps {
  /** 留言内容与 classic 主题共用（同一 localStorage key，切换主题内容互通） */
  message: string;
  onMessageChange: (value: string) => void;
}

/**
 * 朱墨黄历主题首页：单页黄历笺（唯一一个文武线外框），
 * 今日栏 | 金色界栏 | 月历栏，底部黄历横栏敞口横排。
 */
export function AlmanacHome({ message, onMessageChange }: AlmanacHomeProps) {
  const isMounted = useMounted();
  const [viewDate, setViewDate] = useState<Date>(() => new Date());
  const [selectedDate, setSelectedDate] = useState<CalendarDate | null>(null);

  // 与 classic 首页一致：日历数据依赖客户端，挂载后延迟一帧选中今天
  useEffect(() => {
    if (!isMounted) return;
    const timer = setTimeout(() => {
      const today = new Date();
      setSelectedDate(getCalendarDate(today, today));
    }, 0);
    return () => clearTimeout(timer);
  }, [isMounted]);

  const monthData = useMemo(
    () => (isMounted ? getMonthData(viewDate.getFullYear(), viewDate.getMonth()) : null),
    [isMounted, viewDate],
  );

  const extras = useMemo(
    () => (selectedDate ? getAlmanacExtras(selectedDate) : null),
    [selectedDate],
  );

  const handlePrevMonth = () =>
    setViewDate((current) => new Date(current.getFullYear(), current.getMonth() - 1, 1));
  const handleNextMonth = () =>
    setViewDate((current) => new Date(current.getFullYear(), current.getMonth() + 1, 1));
  const handleGoToDate = (year: number, month: number) => setViewDate(new Date(year, month, 1));
  const handleTodayClick = () => {
    const today = new Date();
    setViewDate(new Date(today.getFullYear(), today.getMonth(), 1));
    setSelectedDate(getCalendarDate(today, today));
  };

  return (
    <main className="px-3 pb-10 pt-4 lg:mx-auto lg:max-w-[1236px] lg:px-7 lg:pb-11 lg:pt-9">
      <div className="am-frame p-3.5 pb-3 lg:p-[30px] lg:pb-6">
        <div className="grid gap-4 lg:grid-cols-[396px_1px_1fr] lg:gap-x-9">
          <AlmanacToday date={selectedDate} extras={extras} />
          <div aria-hidden className="hidden w-px bg-[var(--am-gold)] opacity-45 lg:block" />
          <section className="flex min-w-0 flex-col">
            <AlmanacMonth
              viewDate={viewDate}
              monthData={monthData}
              selectedDate={selectedDate}
              onSelect={setSelectedDate}
              onPrevMonth={handlePrevMonth}
              onNextMonth={handleNextMonth}
              onGoToDate={handleGoToDate}
              onTodayClick={handleTodayClick}
            />
            <AlmanacMessage message={message} onChange={onMessageChange} />
          </section>
        </div>

        {selectedDate && extras && (
          <div className="mt-4 border-t border-[var(--am-hairline)] pt-4 lg:mt-6 lg:pt-5">
            <AlmanacStrip date={selectedDate} extras={extras} />
          </div>
        )}
      </div>
    </main>
  );
}
