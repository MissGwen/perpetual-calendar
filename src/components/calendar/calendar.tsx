'use client';

import { useState, useMemo } from 'react';
import { getMonthData } from '@/lib/calendar/date';
import { DateCell } from './date-cell';
import { MonthNavigator } from './month-navigator';
import { CalendarDate } from '@/types/calendar';

const WEEKDAYS = ['日', '一', '二', '三', '四', '五', '六'];

interface CalendarProps {
  onDateSelect: (date: CalendarDate) => void;
  selectedDate: CalendarDate | null;
}

export function Calendar({ onDateSelect, selectedDate }: CalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date());

  const monthData = useMemo(() => {
    return getMonthData(currentDate.getFullYear(), currentDate.getMonth());
  }, [currentDate]);

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const handleDateSelect = (year: number, month: number) => {
    setCurrentDate(new Date(year, month, 1));
  };

  const handleTodayClick = () => {
    setCurrentDate(new Date());
    const today = monthData.dates.find((d) => d.isToday);
    if (today) onDateSelect(today);
  };

  // 获取本月中旬的生肖作为水印
  const watermarkZodiac = monthData.dates[15]?.zodiac || '';

  return (
    <div className="w-full flex flex-col bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden relative">
      {/* 水印背景 */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center overflow-hidden z-0">
        <span
          className="text-gold opacity-10 select-none font-display"
          style={{
            fontSize: '300px',
            lineHeight: 1,
          }}
        >
          {watermarkZodiac}
        </span>
      </div>

      <div className="relative z-10">
        <MonthNavigator
          currentDate={currentDate}
          onPrevMonth={handlePrevMonth}
          onNextMonth={handleNextMonth}
          onDateSelect={handleDateSelect}
          onTodayClick={handleTodayClick}
        />

        <div className="grid grid-cols-7 gap-1 p-1 bg-red-50/30 border-b border-gray-50">
          {WEEKDAYS.map((day, index) => (
            <div
              key={day}
              className={`text-center text-sm font-medium py-2 ${
                index === 0 || index === 6 ? 'text-festive' : 'text-gray-600'
              }`}
            >
              {day}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-1 p-1 md:p-4 min-h-75">
          {monthData.dates.map((date, index) => (
            <DateCell
              key={`${date.year}-${date.month}-${date.day}-${index}`}
              date={date}
              isSelected={
                selectedDate?.year === date.year &&
                selectedDate?.month === date.month &&
                selectedDate?.day === date.day
              }
              onClick={() => onDateSelect(date)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
