'use client';

import { useState, useEffect } from 'react';
import { Calendar, CalendarTitle, DateDetail } from '@/components/calendar';
import { DailyMessage } from '@/components/journal';
import { CalendarDate } from '@/types/calendar';
import { getCalendarDate } from '@/lib/calendar/date';
import { useMounted } from '@/hooks/use-mounted';
import { useLocalStorage } from '@/hooks/use-local-storage';

const DAILY_MESSAGE_STORAGE_KEY = 'perpetual-calendar-daily-message';

export default function Home() {
  const [selectedDate, setSelectedDate] = useState<CalendarDate | null>(null);
  const isMounted = useMounted();
  const [dailyMessage, setDailyMessage] = useLocalStorage(DAILY_MESSAGE_STORAGE_KEY, '');

  // 初始化：选中今天。日历数据依赖客户端，故延迟到挂载后计算。
  useEffect(() => {
    if (!isMounted) return;
    const timer = setTimeout(() => {
      const today = new Date();
      setSelectedDate(getCalendarDate(today, today));
    }, 0);
    return () => clearTimeout(timer);
  }, [isMounted]);

  return (
    <main className="container mx-auto pt-16 pb-8 px-2 md:px-8 min-h-[calc(100vh-6rem)] flex items-center justify-center font-sans">
      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Header / Intro for Mobile (hidden on desktop) */}
        <CalendarTitle />

        {/* Calendar Section */}
        <div className="lg:col-span-2 relative z-10">
          <div className="bg-white/95 backdrop-blur-xl rounded-4xl shadow-2xl shadow-festive/10 p-2 md:p-6 border border-white/40 min-h-125">
            <div className="hidden lg:block mb-8 px-4">
              <h1 className="text-4xl text-festive mb-2 flex items-center gap-3 font-display">
                <span className="w-2 h-8 bg-linear-to-b from-festive to-festive-light rounded-full inline-block"></span>
                万年历
              </h1>
              <p className="text-gray-500 text-sm">
                选择日期以查看详细信息，包括农历、节假日和节气等。
              </p>
            </div>

            {isMounted ? (
              <Calendar onDateSelect={setSelectedDate} selectedDate={selectedDate} />
            ) : (
              <div className="w-full h-96 flex items-center justify-center">
                <div className="w-8 h-8 border-4 border-festive/30 border-t-festive rounded-full animate-spin"></div>
              </div>
            )}
          </div>
          <DailyMessage message={dailyMessage} onChange={setDailyMessage} />
        </div>

        {/* Detail Section */}
        <div className="lg:col-span-1 relative z-20 flex flex-col gap-4 lg:mt-0">
          {isMounted && <DateDetail date={selectedDate} />}
        </div>
      </div>
    </main>
  );
}
