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
    <div className="w-full bg-white rounded-2xl shadow-xl p-5 md:p-6 flex flex-col gap-4 md:gap-5 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center gap-3 border-b border-gray-100 pb-4">
        <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center text-primary shrink-0">
          <CalendarDays className="w-5 h-5" />
        </div>
        <div>
          <h2 className="text-xl md:text-2xl font-bold text-gray-800">
            {date.year}年{date.month + 1}月{date.day}日
          </h2>
          <p className="text-sm text-gray-500 mt-0.5">
            星期{['日', '一', '二', '三', '四', '五', '六'][date.weekday]}
            <span className="ml-2">
              农历：{date.lunarMonthName}
              {date.lunarDayName}
            </span>
            {date.isToday && (
              <span className="ml-2 text-primary font-medium bg-red-50 px-2 py-0.5 rounded-md text-xs">
                今天
              </span>
            )}
          </p>

          {/* 移动端：紧凑展示的节假日及节气 */}
          {date.holidays.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-2 md:hidden">
              {date.holidays.map((holiday, idx) => (
                <span
                  key={`mobile-holiday-${holiday.name}-${idx}`}
                  className={`px-1.5 py-0.5 text-[10px] leading-none font-medium rounded-sm ${
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
          )}
        </div>
      </div>

      {/* 综合气场模块 (干支 + 五行合并) */}
      <div className="bg-linear-to-br from-amber-50 to-orange-50/80 rounded-xl overflow-hidden border border-amber-100/60">
        <div className="p-4 flex items-start gap-3">
          <Star className="w-5 h-5 text-[#D4AF37] shrink-0 mt-0.5" />
          <div className="w-full">
            <p className="text-sm font-medium text-amber-800 mb-1">干支</p>
            <p className="text-lg font-semibold text-amber-900">
              {date.ganZhiYear}年 [{date.zodiac}年]
            </p>
            <p className="text-sm text-amber-700 mt-1">
              {date.ganZhiMonth}月 {date.ganZhiDay}日
            </p>
          </div>
        </div>

        <div className="border-t border-amber-200/50 bg-white/40 px-4 py-3">
          <div className="flex justify-between items-center text-sm flex-wrap">
            <div className="flex items-center gap-2 w-1/2">
              <span className="font-medium text-red-800">五行</span>
              <span className="font-bold text-red-900">
                {date.dayWuXing}{' '}
                <span className="text-xs font-normal text-red-700 ml-1">({date.dayNaYin})</span>
              </span>
            </div>
            <div className="flex items-center gap-2 w-1/2">
              <span className="font-medium text-red-800">状态</span>
              <span className="font-bold text-[#C8102E]">
                {date.wangShuai}{' '}
                <span className="text-xs font-normal text-red-700 ml-1">· {date.diShi}</span>
              </span>
            </div>
            {/* <div className="flex items-center gap-2 w-1/2">
              <span className="font-medium text-red-800">{date.shichen}</span>
              <span className="font-bold text-red-900">{date.shichenWuxing}</span>
            </div> */}
          </div>
        </div>
      </div>

      {/* 宜忌模块 (老黄历通书风) */}
      <div className="relative overflow-hidden rounded-xl border border-[#D4AF37]/30 bg-linear-to-b from-[#FDFAF3] to-[#F7EFDD] shadow-sm">
        {/* 顶部值日信息条 */}
        <div className="flex items-center justify-between gap-2 px-4 py-2.5 bg-linear-to-r from-[#8B0000] to-[#C8102E]">
          <div className="flex items-center gap-2.5 font-serif text-[#F3E5AB]">
            <span className="text-base font-bold tracking-wider">{date.dayValue}日</span>
            <span className="w-1 h-1 rounded-full bg-[#F3E5AB]/50"></span>
            <span className="text-sm">
              <span className="mr-1 text-xs text-[#F3E5AB]/60">值神</span>
              {date.dayGod}
            </span>
          </div>
          {date.isYellowRoad ? (
            <span className="flex shrink-0 items-center gap-1 rounded-full bg-linear-to-r from-[#F3E5AB] to-[#D4AF37] px-2.5 py-1 text-xs font-serif font-bold text-[#7A1010] shadow-sm">
              <Star className="w-3 h-3 fill-current" />
              黄道吉日
            </span>
          ) : (
            <span className="shrink-0 rounded-full border border-[#F3E5AB]/30 px-2.5 py-1 text-xs font-serif font-medium text-[#F3E5AB]/70">
              黑道日
            </span>
          )}
        </div>

        {/* 宜 */}
        <div className="flex justify-between gap-3 px-2 py-4">
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-linear-to-r from-[#F3E5AB] to-[#D4AF37] font-serif text-xl font-bold text-[#7A1010] shadow-md ring-1 ring-inset ring-[#F3E5AB]/25">
            宜
          </div>
          <div className="flex w-4/5 flex-wrap gap-2">
            {date.suitable.map((item, idx) => (
              <span
                key={`suitable-${item}-${idx}`}
                className="rounded-md border border-[#D4AF37]/30 bg-[#D4AF37]/20 px-3 py-1 text-sm font-medium text-[#7A1010]"
              >
                {item}
              </span>
            ))}
          </div>
        </div>

        {/* 忌 */}
        <div className="flex justify-between gap-3 px-2 py-4">
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-linear-to-br from-[#C8102E] to-[#8B0000] font-serif text-xl font-bold text-[#F3E5AB] shadow-md ring-1 ring-inset ring-[#F3E5AB]/25">
            忌
          </div>
          <div className="flex w-4/5 flex-wrap gap-2">
            {date.avoid.map((item, idx) => (
              <span
                key={`avoid-${item}-${idx}`}
                className="rounded-md border border-[#C8102E]/20 bg-[#C8102E]/10 px-3 py-1 text-sm font-medium text-[#8B0000]"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* 气场解析模块 */}
      <div className="bg-[#ad6598]/10 rounded-xl p-4 md:p-5 border border-blue-100/50">
        <div className="flex items-center gap-2 mb-4">
          <BookOpen className="w-4 h-4 text-[#806d9e]" />
          <h3 className="text-sm font-semibold text-[#806d9e]">气场解析</h3>
        </div>
        <div className="flex flex-col gap-3 text-sm text-[#806d9e] leading-relaxed">
          {date.dayWuXing &&
            Array.from(new Set(date.dayWuXing.split(''))).map(
              (char) =>
                WU_XING_EXPLANATION[char] && (
                  <p key={`wuxing-${char}`}>
                    <span className="inline-block bg-[#bc84a8]/30 text-[#806d9e] font-medium px-1.5 py-0.5 rounded text-xs mr-1.5 -translate-y-px">
                      {char}
                    </span>
                    {WU_XING_EXPLANATION[char]}
                  </p>
                ),
            )}
          {date.dayNaYin && NA_YIN_EXPLANATION[date.dayNaYin] && (
            <p>
              <span className="inline-block bg-[#bc84a8]/30 text-[#806d9e] font-medium px-1.5 py-0.5 rounded text-xs mr-1.5 -translate-y-px">
                {date.dayNaYin}
              </span>
              {NA_YIN_EXPLANATION[date.dayNaYin]}
            </p>
          )}
          {WANG_SHUAI_EXPLANATION[date.wangShuai] && (
            <p>
              <span className="inline-block bg-[#bc84a8]/30 text-[#806d9e] font-medium px-1.5 py-0.5 rounded text-xs mr-1.5 -translate-y-px">
                {date.wangShuai}
              </span>
              {WANG_SHUAI_EXPLANATION[date.wangShuai]}
            </p>
          )}
          {DI_SHI_EXPLANATION[date.diShi] && (
            <p>
              <span className="inline-block bg-[#bc84a8]/30 text-[#806d9e] font-medium px-1.5 py-0.5 rounded text-xs mr-1.5 -translate-y-px">
                {date.diShi}
              </span>
              {DI_SHI_EXPLANATION[date.diShi]}
            </p>
          )}
        </div>
      </div>

      {date.holidays.length > 0 && (
        <div className="hidden md:block bg-orange-50/50 rounded-xl p-4 border border-orange-100">
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
