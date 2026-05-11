'use client';

import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from 'lucide-react';
import { cn } from '../utils/cn';

interface MonthNavigatorProps {
  currentDate: Date;
  onPrevMonth: () => void;
  onNextMonth: () => void;
  onDateSelect: (year: number, month: number) => void;
  onTodayClick: () => void;
}

export function MonthNavigator({
  currentDate,
  onPrevMonth,
  onNextMonth,
  onDateSelect,
  onTodayClick,
}: MonthNavigatorProps) {
  const [isPickerOpen, setIsPickerOpen] = useState(false);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const handleYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onDateSelect(parseInt(e.target.value, 10), month);
  };

  const handleMonthChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onDateSelect(year, parseInt(e.target.value, 10));
  };

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between py-4 px-2 border-b border-gray-100 gap-4">
      <div className="flex items-center gap-4">
        <button
          onClick={onPrevMonth}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          aria-label="Previous Month"
        >
          <ChevronLeft className="w-5 h-5 text-gray-600" />
        </button>

        <div className="flex items-center gap-2 group relative">
          <button
            className="text-xl font-semibold text-gray-800 min-w-30 text-center hover:bg-gray-50 px-3 py-1 rounded-lg transition-colors flex items-center justify-center gap-2"
            onClick={() => setIsPickerOpen(!isPickerOpen)}
          >
            {year}年 {month + 1}月
            <CalendarIcon className="w-4 h-4 text-gray-400 group-hover:text-primary transition-colors" />
          </button>

          {isPickerOpen && (
            <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 bg-white rounded-xl shadow-xl border border-gray-100 p-4 z-50 flex gap-2 w-max animate-in fade-in slide-in-from-top-2">
              <select
                value={year}
                onChange={handleYearChange}
                className="px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary bg-white cursor-pointer"
              >
                {Array.from({ length: 101 }, (_, i) => year - 50 + i).map((y) => (
                  <option key={y} value={y}>
                    {y}年
                  </option>
                ))}
              </select>
              <select
                value={month}
                onChange={handleMonthChange}
                className="px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary bg-white cursor-pointer"
              >
                {Array.from({ length: 12 }, (_, i) => i).map((m) => (
                  <option key={m} value={m}>
                    {m + 1}月
                  </option>
                ))}
              </select>
              <button
                onClick={() => setIsPickerOpen(false)}
                className="px-3 py-2 bg-primary text-white rounded-lg hover:bg-primary-light transition-colors text-sm font-medium"
              >
                确定
              </button>
            </div>
          )}
        </div>

        <button
          onClick={onNextMonth}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          aria-label="Next Month"
        >
          <ChevronRight className="w-5 h-5 text-gray-600" />
        </button>
      </div>

      <button
        onClick={onTodayClick}
        className={cn(
          'px-4 py-2 text-sm font-medium rounded-full transition-all',
          'bg-red-50 text-primary hover:bg-red-100 hover:shadow-sm',
        )}
      >
        回到今天
      </button>
    </div>
  );
}
