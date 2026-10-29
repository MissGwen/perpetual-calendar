'use client';

import { useState } from 'react';
import { ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';
import { CalendarDate, MonthData } from '@/types/calendar';
import { cn } from '@/lib/utils';
import { monthLabel, yearInChinese, MONTH_NAMES, WEEKDAY_NAMES } from './chong-sha';

interface AlmanacMonthProps {
  viewDate: Date;
  monthData: MonthData | null;
  selectedDate: CalendarDate | null;
  onSelect: (date: CalendarDate) => void;
  onPrevMonth: () => void;
  onNextMonth: () => void;
  /** 年月浮层「确定」后的跳转 */
  onGoToDate: (year: number, month: number) => void;
  onTodayClick: () => void;
}

const MONTH_OPTIONS = MONTH_NAMES.map((name) => `${name}月`);
const ARROW_BTN_CLASS =
  'flex h-7 w-7 cursor-pointer items-center justify-center rounded-sm border border-[var(--am-hairline)] text-[var(--am-ink-soft)] transition-colors hover:border-[var(--am-gold)] hover:text-[var(--am-ink)] lg:h-[30px] lg:w-[30px]';
const SELECT_CLASS =
  'am-serif rounded-sm border border-[var(--am-hairline)] bg-transparent px-2 py-1 text-sm text-[var(--am-ink)]';

/** 副文本优先级与现有 DateCell 一致：节日/节气名 > 初一显示农历月名 > 农历日名 */
function subLabel(date: CalendarDate): string {
  if (date.holidays.length > 0) return date.holidays[0].name;
  if (date.lunarDayName === '初一') return date.lunarMonthName;
  return date.lunarDayName;
}

function AlmanacDateCell({
  date,
  isSelected,
  onSelect,
}: {
  date: CalendarDate;
  isSelected: boolean;
  onSelect: (date: CalendarDate) => void;
}) {
  // 非本月：灰色补位日期，仅展示不可交互（比空白格更易读周位）
  if (!date.isCurrentMonth) {
    return (
      <div className="flex aspect-[1/.9] flex-col items-center justify-center gap-0.5 lg:aspect-[1/.92] lg:gap-1">
        <span className="am-num text-[14px] leading-none text-[var(--am-ink-faint)] lg:text-[17.5px]">
          {date.day}
        </span>
        <span className="text-[9px] leading-none text-[var(--am-ink-faint)] lg:text-[10.5px]">
          {date.lunarDayName}
        </span>
      </div>
    );
  }

  const isWeekend = date.weekday === 0 || date.weekday === 6;
  const isFest = date.holidays.length > 0;
  const isFirstDay = date.lunarDayName === '初一';
  const label = subLabel(date);

  return (
    <button
      type="button"
      onClick={() => onSelect(date)}
      aria-pressed={isSelected}
      aria-current={date.isToday ? 'date' : undefined}
      aria-label={`${date.year}年${date.month + 1}月${date.day}日 ${date.lunarMonthName}${date.lunarDayName}${isFest ? ' ' + date.holidays.map((h) => h.name).join(' ') : ''}`}
      className={cn(
        'flex cursor-pointer flex-col items-center justify-center gap-0.5 rounded-sm border transition-colors lg:gap-1',
        'aspect-[1/.9] lg:aspect-[1/.92]',
        date.isToday
          ? 'border-[var(--am-zhu)] bg-[var(--am-zhu)]'
          : isSelected
            ? 'border-[var(--am-zhu)] shadow-[inset_0_0_0_1px_var(--am-zhu)]'
            : 'border-transparent hover:bg-[var(--am-zhu-wash)]',
      )}
    >
      <span
        className={cn(
          'am-num text-[14px] leading-none lg:text-[17.5px]',
          date.isToday
            ? 'am-num-strong text-[var(--am-paper-card)]'
            : isWeekend && 'text-[var(--am-zhu)]',
        )}
      >
        {date.day}
      </span>
      <span
        className={cn(
          'flex items-center gap-0.5 text-[9px] leading-none lg:gap-[3px] lg:text-[10.5px]',
          date.isToday
            ? 'text-[#f3d9c0]'
            : isFest
              ? 'font-medium text-[var(--am-zhu)]'
              : 'text-[var(--am-ink-soft)]',
          !date.isToday && isFirstDay && 'font-bold',
        )}
      >
        {label}
        {date.isHoliday && !date.isToday && (
          <span
            className="h-[3px] w-[3px] rounded-full bg-[var(--am-gold-bright)] lg:h-1 lg:w-1"
            aria-hidden
          />
        )}
      </span>
    </button>
  );
}

/** 月历笺：导航（箭头 + 年月浮层 + 回到今天）+ 7 列日期网格 */
export function AlmanacMonth({
  viewDate,
  monthData,
  selectedDate,
  onSelect,
  onPrevMonth,
  onNextMonth,
  onGoToDate,
  onTodayClick,
}: AlmanacMonthProps) {
  const [isPickerOpen, setIsPickerOpen] = useState(false);
  const [pickerYear, setPickerYear] = useState(viewDate.getFullYear());
  const [pickerMonth, setPickerMonth] = useState(viewDate.getMonth());

  // 年份范围与现有 MonthNavigator 一致：当前浏览年 ±50，共 101 项
  const yearOptions = Array.from({ length: 101 }, (_, i) => viewDate.getFullYear() - 50 + i);

  const openPicker = () => {
    setPickerYear(viewDate.getFullYear());
    setPickerMonth(viewDate.getMonth());
    setIsPickerOpen(true);
  };

  const confirmPicker = () => {
    onGoToDate(pickerYear, pickerMonth);
    setIsPickerOpen(false);
  };

  return (
    <section
      className="mt-4 flex flex-col border-t border-[var(--am-hairline)] pt-4 lg:mt-0 lg:border-0 lg:pt-0"
      aria-label="月历"
    >
      <div className="mb-2.5 flex items-center justify-between lg:mb-3.5">
        <div className="relative flex items-center gap-2">
          <button
            type="button"
            onClick={onPrevMonth}
            aria-label="上一月"
            className={ARROW_BTN_CLASS}
          >
            <ChevronLeft className="h-3.5 w-3.5" />
          </button>
          <button
            type="button"
            onClick={openPicker}
            aria-haspopup="dialog"
            aria-expanded={isPickerOpen}
            className="am-serif cursor-pointer text-[15.5px] font-bold tracking-[0.12em] text-[var(--am-ink)] lg:text-[19px]"
          >
            {yearInChinese(viewDate.getFullYear())}年 {monthLabel(viewDate.getMonth())}
            <ChevronDown className="ml-1 inline h-3 w-3 text-[var(--am-ink-faint)]" aria-hidden />
          </button>
          <button
            type="button"
            onClick={onNextMonth}
            aria-label="下一月"
            className={ARROW_BTN_CLASS}
          >
            <ChevronRight className="h-3.5 w-3.5" />
          </button>

          {isPickerOpen && (
            <>
              {/* 点击浮层外的任意位置关闭 */}
              <div
                className="fixed inset-0 z-40"
                onClick={() => setIsPickerOpen(false)}
                aria-hidden
              />
              <div
                role="dialog"
                aria-label="选择年月"
                className="absolute top-full left-1/2 z-50 mt-2 flex -translate-x-1/2 items-center gap-2 rounded-sm border-2 border-[var(--am-ink)] bg-[var(--am-paper-card)] p-2.5 shadow-lg"
              >
                <select
                  value={pickerYear}
                  onChange={(e) => setPickerYear(Number(e.target.value))}
                  aria-label="年份"
                  className={SELECT_CLASS}
                >
                  {yearOptions.map((year) => (
                    <option key={year} value={year}>
                      {year}年
                    </option>
                  ))}
                </select>
                <select
                  value={pickerMonth}
                  onChange={(e) => setPickerMonth(Number(e.target.value))}
                  aria-label="月份"
                  className={SELECT_CLASS}
                >
                  {MONTH_OPTIONS.map((name, month) => (
                    <option key={name} value={month}>
                      {name}
                    </option>
                  ))}
                </select>
                <button
                  type="button"
                  onClick={confirmPicker}
                  className="am-serif cursor-pointer rounded-sm bg-[var(--am-zhu)] px-3 py-1.5 text-sm font-semibold text-[var(--am-paper-card)] transition-colors hover:bg-[var(--am-zhu-deep)]"
                >
                  确定
                </button>
              </div>
            </>
          )}
        </div>

        <button
          type="button"
          onClick={onTodayClick}
          className="cursor-pointer rounded-full border border-[var(--am-zhu)] px-2.5 py-1 text-[11px] tracking-[0.08em] text-[var(--am-zhu)] transition-colors hover:bg-[var(--am-zhu-wash)] lg:px-3.5 lg:py-1.5 lg:text-xs"
        >
          回到今天
        </button>
      </div>

      <div className="grid grid-cols-7 border-b border-[var(--am-hairline)] pb-1.5 lg:pb-2">
        {WEEKDAY_NAMES.map((week, index) => (
          <div
            key={week}
            className={cn(
              'text-center text-[11px] font-medium tracking-[0.1em] lg:text-xs',
              index === 0 || index === 6 ? 'text-[var(--am-zhu)]' : 'text-[var(--am-ink-soft)]',
            )}
          >
            {week}
          </div>
        ))}
      </div>

      {monthData ? (
        <div className="grid flex-1 grid-cols-7 gap-[3px] pt-1.5 lg:gap-1 lg:pt-2.5">
          {monthData.dates.map((date, index) => (
            <AlmanacDateCell
              key={`${date.year}-${date.month}-${date.day}-${index}`}
              date={date}
              isSelected={
                !!selectedDate &&
                date.year === selectedDate.year &&
                date.month === selectedDate.month &&
                date.day === selectedDate.day
              }
              onSelect={onSelect}
            />
          ))}
        </div>
      ) : (
        <div className="flex h-96 items-center justify-center" aria-label="加载中">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-[var(--am-hairline)] border-t-[var(--am-zhu)]" />
        </div>
      )}
    </section>
  );
}
