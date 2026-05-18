'use client';

import { cn } from '../utils/cn';
import { CalendarDate } from '../types/calendar';

interface DateCellProps {
  date: CalendarDate;
  isSelected?: boolean;
  onClick?: (date: CalendarDate) => void;
}

export function DateCell({ date, isSelected, onClick }: DateCellProps) {
  const isCurrentMonth = date.isCurrentMonth;

  // 如果不是当前月份，直接返回空白占位格子，不响应任何交互
  if (!isCurrentMonth) {
    return <div className="aspect-square" />;
  }

  const isToday = date.isToday;
  const isWeekend = date.weekday === 0 || date.weekday === 6;

  // Get primary display text for lunar or holiday
  let secondaryText = date.lunarDayName;
  if (date.holidays.length > 0) {
    // Prefer holiday or solar term
    secondaryText = date.holidays[0].name;
  } else if (date.lunarDayName === '初一') {
    secondaryText = date.lunarMonthName;
  }

  const isHolidayOrTerm = date.holidays.length > 0;

  return (
    <div
      onClick={() => onClick?.(date)}
      className={cn(
        'relative flex flex-col items-center justify-center aspect-square rounded-xl p-1 md:p-2 cursor-pointer transition-all duration-200 group border border-transparent hover:bg-red-50',
        isSelected && 'bg-red-50 border-red-200 ring-2 ring-primary/20',
        isToday && 'bg-primary text-[#F3E5AB] hover:bg-primary-light shadow-md shadow-primary/20',
      )}
    >
      <span
        className={cn(
          'text-base md:text-lg font-medium',
          !isToday && isWeekend && 'text-primary',
          !isToday && !isWeekend && 'text-gray-800',
        )}
      >
        {date.day}
      </span>
      <span
        className={cn(
          'text-[10px] md:text-xs text-center whitespace-normal leading-[1.1] md:leading-tight wrap-break-word max-w-full px-0.5',
          isToday ? 'text-[#F3E5AB]/90' : isHolidayOrTerm ? 'text-primary' : 'text-gray-500',
          isSelected && !isToday && !isHolidayOrTerm && 'text-primary',
        )}
      >
        {secondaryText}
      </span>

      {/* Red dot for holidays if not displaying text prominently or just an indicator */}
      {date.isHoliday && (
        <div className="absolute top-1 right-1 w-1.5 h-1.5 bg-[#D4AF37] rounded-full" />
      )}
    </div>
  );
}
