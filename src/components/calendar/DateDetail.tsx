/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import { useState, useMemo } from 'react';
import { useCompletion } from '@ai-sdk/react';
import ReactMarkdown from 'react-markdown';
import { CalendarDate } from '@/types/calendar';
import { getCalendarDate } from '@/lib/dateUtils';
import { CalendarDays, Sparkles, Star, BookOpen, WandSparkles, X } from 'lucide-react';
import {
  WU_XING_EXPLANATION,
  NA_YIN_EXPLANATION,
  WANG_SHUAI_EXPLANATION,
  DI_SHI_EXPLANATION,
} from '@/lib/explanations';

interface DateDetailProps {
  date: CalendarDate | null;
}

function buildAnalysisPayload(date: CalendarDate) {
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

export function DateDetail({ date }: DateDetailProps) {
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);
  const { completion, complete, error, isLoading, setCompletion, stop } = useCompletion({
    api: '/api/ai-analysis',
    streamProtocol: 'text',
  });

  // 获取今天的真实日期数据，用于 AI 分析和弹窗显示
  const todayData = useMemo(() => {
    const today = new Date();
    return getCalendarDate(today, today);
  }, []);

  if (!date) return null;

  const handleOpenAiAnalysis = () => {
    setIsAiModalOpen(true);
    setCompletion('');

    void complete('', {
      body: buildAnalysisPayload(todayData),
    }).catch(() => undefined);
  };

  const handleCloseAiAnalysis = () => {
    stop();
    setIsAiModalOpen(false);
    setCompletion('');
  };

  return (
    <>
      <div className="w-full bg-white rounded-2xl shadow-xl p-5 md:p-6 flex flex-col gap-4 md:gap-5 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="flex items-start justify-between gap-3 border-b border-gray-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center text-festive shrink-0">
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
                  <span className="ml-2 text-festive font-medium bg-red-50 px-2 py-0.5 rounded-md text-xs">
                    今天
                  </span>
                )}
              </p>

              {date.holidays.length > 0 && (
                <div className="flex flex-wrap gap-1 mt-2 md:hidden">
                  {date.holidays.map((holiday, idx) => (
                    <span
                      key={`mobile-holiday-${holiday.name}-${idx}`}
                      className={`px-1.5 py-0.5 text-[10px] leading-none font-medium rounded-sm ${
                        holiday.type === 'public'
                          ? 'bg-red-100 text-festive border border-red-200'
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
        </div>

        <div className="bg-linear-to-br from-amber-50 to-orange-50/80 rounded-xl overflow-hidden border border-amber-100/60">
          <div className="p-4 flex items-start gap-3">
            <Star className="w-5 h-5 text-gold shrink-0 mt-0.5" />
            <div className="w-full">
              <p className="text-sm font-medium text-amber-800 mb-1">干支</p>
              <p className="text-lg font-semibold text-amber-900">
                {date.ganZhiYear}年 [{date.zodiac}年]
              </p>
              <p className="text-sm text-amber-700 mt-1">
                {date.ganZhiMonth}月 {date.ganZhiDay}日
              </p>
            </div>
            <button
              type="button"
              onClick={handleOpenAiAnalysis}
              disabled={isLoading}
              className="inline-flex shrink-0 items-center gap-1 rounded-xl bg-linear-to-r from-festive to-festive-soft px-3 py-2 text-sm font-medium text-white shadow-lg shadow-festive/15 transition hover:scale-[1.02] hover:shadow-xl hover:shadow-festive/20 disabled:cursor-not-allowed disabled:opacity-70"
            >
              <WandSparkles className="h-3.5 w-3.5" />
              {isLoading ? '分析中...' : 'AI分析'}
            </button>
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
                <span className="font-bold text-festive">
                  {date.wangShuai}{' '}
                  <span className="text-xs font-normal text-red-700 ml-1">· {date.diShi}</span>
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="relative overflow-hidden rounded-xl border border-gold/30 bg-linear-to-b from-parchment-warm to-parchment-amber shadow-sm">
          <div className="flex items-center justify-between gap-2 px-4 py-2.5 bg-linear-to-r from-festive-deep to-festive">
            <div className="flex items-center gap-2.5 font-serif text-gold-light">
              <span className="text-base font-bold tracking-wider">{date.dayValue}日</span>
              <span className="w-1 h-1 rounded-full bg-gold-light/50"></span>
              <span className="text-sm">
                <span className="mr-1 text-xs text-gold-light/60">值神</span>
                {date.dayGod}
              </span>
            </div>
            {date.isYellowRoad ? (
              <span className="flex shrink-0 items-center gap-1 rounded-full bg-linear-to-r from-gold-light to-gold px-2.5 py-1 text-xs font-serif font-bold text-festive-darker shadow-sm">
                <Star className="w-3 h-3 fill-current" />
                黄道吉日
              </span>
            ) : (
              <span className="shrink-0 rounded-full border border-gold-light/30 px-2.5 py-1 text-xs font-serif font-medium text-gold-light/70">
                黑道日
              </span>
            )}
          </div>

          <div className="flex justify-between gap-3 px-2 py-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-gold-light font-serif text-xl font-bold text-festive-darker shadow-md ring-1 ring-inset ring-gold-light/25">
              宜
            </div>
            <div className="flex w-4/5 flex-wrap gap-2">
              {date.suitable.map((item, idx) => (
                <span
                  key={`suitable-${item}-${idx}`}
                  className="rounded-md border border-gold/30 bg-gold/20 px-3 py-1 text-sm font-medium text-festive-darker"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div className="flex justify-between gap-3 px-2 py-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-linear-to-br from-festive to-festive-deep font-serif text-xl font-bold text-gold-light shadow-md ring-1 ring-inset ring-gold-light/25">
              忌
            </div>
            <div className="flex w-4/5 flex-wrap gap-2">
              {date.avoid.map((item, idx) => (
                <span
                  key={`avoid-${item}-${idx}`}
                  className="rounded-md border border-festive/20 bg-festive/10 px-3 py-1 text-sm font-medium text-festive-deep"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-linear-to-br from-indigo-50/80 to-purple-50/60 rounded-xl overflow-hidden border border-indigo-100/60">
          <div className="p-4">
            <p className="text-sm font-medium text-indigo-800 mb-3">二十八星宿</p>
            <div className="flex items-center gap-3 mb-2">
              <span className="text-xl font-bold text-indigo-900">{date.xiu}宿</span>
              <span
                className={`px-2 py-0.5 rounded-full text-xs font-bold ${
                  date.xiuLuck === '吉'
                    ? 'bg-green-100 text-green-700 border border-green-200'
                    : 'bg-red-100 text-red-700 border border-red-200'
                }`}
              >
                {date.xiuLuck}
              </span>
            </div>
            <div className="flex gap-3 text-xs text-indigo-700">
              <span>
                <span className="text-indigo-400">属性</span> {date.zheng}
              </span>
              <span>
                <span className="text-indigo-400">动物</span> {date.animal}
              </span>
              <span>
                <span className="text-indigo-400">方位</span> {date.gong}
              </span>
            </div>
          </div>
        </div>

        <div className="bg-mystic-bg/10 rounded-xl p-4 md:p-5 border border-blue-100/50">
          <div className="flex items-center gap-2 mb-4">
            <BookOpen className="w-4 h-4 text-mystic" />
            <h3 className="text-sm font-semibold text-mystic">气场解析</h3>
          </div>
          <div className="flex flex-col gap-3 text-sm text-mystic leading-relaxed">
            {date.dayWuXing &&
              Array.from(new Set(date.dayWuXing.split(''))).map(
                (char) =>
                  WU_XING_EXPLANATION[char] && (
                    <p key={`wuxing-${char}`}>
                      <span className="inline-block bg-mystic-light/30 text-mystic font-medium px-1.5 py-0.5 rounded text-xs mr-1.5 -translate-y-px">
                        {char}
                      </span>
                      {WU_XING_EXPLANATION[char]}
                    </p>
                  ),
              )}
            {date.dayNaYin && NA_YIN_EXPLANATION[date.dayNaYin] && (
              <p>
                <span className="inline-block bg-mystic-light/30 text-mystic font-medium px-1.5 py-0.5 rounded text-xs mr-1.5 -translate-y-px">
                  {date.dayNaYin}
                </span>
                {NA_YIN_EXPLANATION[date.dayNaYin]}
              </p>
            )}
            {WANG_SHUAI_EXPLANATION[date.wangShuai] && (
              <p>
                <span className="inline-block bg-mystic-light/30 text-mystic font-medium px-1.5 py-0.5 rounded text-xs mr-1.5 -translate-y-px">
                  {date.wangShuai}
                </span>
                {WANG_SHUAI_EXPLANATION[date.wangShuai]}
              </p>
            )}
            {DI_SHI_EXPLANATION[date.diShi] && (
              <p>
                <span className="inline-block bg-mystic-light/30 text-mystic font-medium px-1.5 py-0.5 rounded text-xs mr-1.5 -translate-y-px">
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
                      ? 'bg-red-100 text-festive border border-red-200'
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

      {isAiModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 px-4 py-6 backdrop-blur-sm"
          onClick={handleCloseAiAnalysis}
        >
          <div
            className="relative w-full max-w-2xl overflow-hidden rounded-3xl border border-white/40 bg-white shadow-2xl shadow-black/20"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4 border-b border-gray-100 bg-linear-to-r from-parchment-soft to-white px-5 py-4 md:px-6">
              <div>
                {/* <p className="text-xs font-medium tracking-[0.18em] text-festive/70">AI ANALYSIS</p> */}
                <h3 className="mt-1 text-lg font-semibold text-festive/70">今日 AI 分析</h3>
                <p className="mt-1 text-sm text-gray-500">
                  {todayData.year}年{todayData.month + 1}月{todayData.day}日 ·{' '}
                  {todayData.lunarMonthName}
                  {todayData.lunarDayName}
                </p>
              </div>
              <button
                type="button"
                onClick={handleCloseAiAnalysis}
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 text-gray-500 transition hover:bg-gray-50 hover:text-gray-700"
                aria-label="关闭 AI 分析弹窗"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="max-h-[70vh] overflow-y-auto px-5 py-5 md:px-6">
              <div className="rounded-2xl bg-linear-to-br from-amber-50 via-white to-rose-50 p-4 text-sm leading-7 text-gray-700">
                {error ? (
                  <div className="rounded-2xl border border-red-100 bg-red-50 px-4 py-4 text-red-600">
                    AI 分析暂时不可用，请稍后再试。
                  </div>
                ) : (
                  <div className="relative">
                    {completion ? (
                      <>
                        <ReactMarkdown
                          components={{
                            h2: ({ node, ...props }) => (
                              <h2
                                className="text-lg font-bold text-gray-900 mt-5 mb-2"
                                {...props}
                              />
                            ),
                            h3: ({ node, ...props }) => (
                              <h3
                                className="text-base font-semibold text-gray-800 mt-4 mb-2"
                                {...props}
                              />
                            ),
                            p: ({ node, ...props }) => (
                              <p className="mb-3 leading-relaxed text-gray-700" {...props} />
                            ),
                            ul: ({ node, ...props }) => (
                              <ul
                                className="list-disc pl-5 mb-3 space-y-1 text-gray-700"
                                {...props}
                              />
                            ),
                            ol: ({ node, ...props }) => (
                              <ol
                                className="list-decimal pl-5 mb-3 space-y-1 text-gray-700"
                                {...props}
                              />
                            ),
                            li: ({ node, ...props }) => <li className="pl-1" {...props} />,
                            strong: ({ node, ...props }) => (
                              <strong className="font-semibold text-gray-900" {...props} />
                            ),
                          }}
                        >
                          {completion + (isLoading ? ' ▍' : '')}
                        </ReactMarkdown>
                      </>
                    ) : (
                      <div className="flex items-center gap-3 text-gray-500">
                        <span className="inline-block h-2.5 w-2.5 animate-pulse rounded-full bg-festive" />
                        <span>
                          {isLoading ? '正在结合今日黄历为你生成分析...' : '正在准备分析内容...'}
                        </span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
