'use client';

import { cn } from '../utils/cn';
import { CalendarDate } from '../types/calendar';

interface DateCellProps {
  date: CalendarDate;
  isSelected?: boolean;
  onClick?: (date: CalendarDate) => void;
}

export function DateCell({ date, isSelected, onClick }: DateCellProps) {
  const isToday = date.isToday;
  const isCurrentMonth = date.isCurrentMonth;
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
        'relative flex flex-col items-center justify-center aspect-square rounded-xl p-1 md:p-2 cursor-pointer transition-all duration-200 group border border-transparent',
        isCurrentMonth ? 'hover:bg-red-50' : 'opacity-40 hover:opacity-70',
        isSelected && 'bg-red-50 border-red-200 ring-2 ring-primary/20',
        isToday && 'bg-primary text-[#F3E5AB] hover:bg-primary-light shadow-md shadow-primary/20',
      )}
    >
      <span
        className={cn(
          'text-base md:text-lg font-medium',
          !isToday && !isCurrentMonth && 'text-gray-400',
          !isToday && isCurrentMonth && isWeekend && 'text-primary',
          !isToday && isCurrentMonth && !isWeekend && 'text-gray-800',
        )}
      >
        {date.day}
      </span>
      <span
        className={cn(
          'text-[10px] md:text-xs truncate max-w-full px-1',
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
