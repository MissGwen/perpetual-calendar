'use client';

import { CalendarDate } from '../types/calendar';
import { CalendarDays, Sparkles, Star, BookOpen } from 'lucide-react';
import {
  WU_XING_EXPLANATION,
  NA_YIN_EXPLANATION,
  WANG_SHUAI_EXPLANATION,
  DI_SHI_EXPLANATION,
} from '../utils/explanations';

interface DateDetailProps {
  date: CalendarDate | null;
}

export function DateDetail({ date }: DateDetailProps) {
  if (!date) return null;

  return (
    <div className="w-full bg-white rounded-2xl shadow-xl p-6 flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center gap-3 border-b border-gray-100 pb-4">
        <div className="w-12 h-12 rounded-xl bg-red-50 flex items-center justify-center text-primary">
          <CalendarDays className="w-6 h-6" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-800">
            {date.year}年{date.month + 1}月{date.day}日
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            星期{['日', '一', '二', '三', '四', '五', '六'][date.weekday]}
            <span className="ml-2">
              农历：{date.lunarMonthName}
              {date.lunarDayName}
            </span>
            {date.isToday && (
              <span className="ml-2 text-primary font-medium bg-red-50 px-2 py-0.5 rounded-md">
                今天
              </span>
            )}
          </p>
        </div>
      </div>

      <div className="bg-linear-to-br from-amber-50 to-yellow-50 p-4 rounded-xl flex items-start gap-3">
        <Star className="w-5 h-5 text-[#D4AF37] shrink-0 mt-0.5" />
        <div className="w-full">
          <p className="text-sm font-medium text-amber-800 mb-1">干支</p>
          <p className="text-lg font-semibold text-amber-900">
            {date.ganZhiYear}年 [{date.zodiac}年]
          </p>
          <p className="text-sm text-amber-700 mt-1 flex items-center justify-between">
            <span>
              {date.ganZhiMonth}月 {date.ganZhiDay}日
            </span>
          </p>
        </div>
      </div>
      {/* </div> */}

      {/* 五行气场模块 */}
      <div className="bg-red-50/50 rounded-xl p-4 border border-red-100">
        <div className="flex justify-between items-center text-sm">
          <div className="flex items-center gap-2">
            <span className="font-medium text-red-800">五行</span>
            <span className="font-bold text-red-900">
              {date.dayWuXing}{' '}
              <span className="text-xs font-normal text-red-700 ml-1">({date.dayNaYin})</span>
            </span>
          </div>
          <div className="flex items-center gap-2 pl-4">
            <span className="font-medium text-red-800">状态</span>
            <span className="font-bold text-[#C8102E]">
              {date.wangShuai}{' '}
              <span className="text-xs font-normal text-red-700 ml-1">· {date.diShi}</span>
            </span>
          </div>
        </div>
      </div>

      {/* 气场解析模块 */}
      <div className="bg-blue-50/50 rounded-xl p-4 border border-blue-100">
        <div className="flex items-center gap-2 mb-3">
          <BookOpen className="w-4 h-4 text-blue-600" />
          <h3 className="text-sm font-medium text-blue-800">气场解析</h3>
        </div>
        <div className="flex flex-col gap-2 text-sm text-blue-900/80">
          {date.dayWuXing &&
            Array.from(new Set(date.dayWuXing.split(''))).map(
              (char) =>
                WU_XING_EXPLANATION[char] && (
                  <p key={`wuxing-${char}`}>
                    <span className="font-semibold text-blue-900 mr-1">[{char}]</span>{' '}
                    {WU_XING_EXPLANATION[char]}
                  </p>
                ),
            )}
          {date.dayNaYin && NA_YIN_EXPLANATION[date.dayNaYin] && (
            <p>
              <span className="font-semibold text-blue-900 mr-1">[{date.dayNaYin}]</span>{' '}
              {NA_YIN_EXPLANATION[date.dayNaYin]}
            </p>
          )}
          {WANG_SHUAI_EXPLANATION[date.wangShuai] && (
            <p>
              <span className="font-semibold text-blue-900 mr-1">[{date.wangShuai}]</span>{' '}
              {WANG_SHUAI_EXPLANATION[date.wangShuai]}
            </p>
          )}
          {DI_SHI_EXPLANATION[date.diShi] && (
            <p>
              <span className="font-semibold text-blue-900 mr-1">[{date.diShi}]</span>{' '}
              {DI_SHI_EXPLANATION[date.diShi]}
            </p>
          )}
        </div>
      </div>

      {date.holidays.length > 0 && (
        <div className="bg-orange-50/50 rounded-xl p-4 border border-orange-100">
          <div className="flex items-center gap-2 mb-3">
            <Sparkles className="w-4 h-4 text-orange-500" />
            <h3 className="text-sm font-medium text-orange-800">节假日及节气</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {date.holidays.map((holiday, idx) => (
              <span
                key={`${holiday.name}-${idx}`}
                className={`px-3 py-1 text-xs font-medium rounded-full ${
                  holiday.type === 'public'
                    ? 'bg-red-100 text-primary border border-red-200'
                    : holiday.type === 'solar_term'
                      ? 'bg-yellow-100 text-yellow-700 border border-yellow-200'
                      : 'bg-orange-100 text-orange-700 border border-orange-200'
                }`}
              >
                {holiday.name}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
