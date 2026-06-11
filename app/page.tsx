'use client';

import { useState, useEffect } from 'react';
import { Calendar } from '@/src/components/Calendar';
import { DateDetail } from '@/src/components/DateDetail';
import { CalendarDate } from '@/src/types/calendar';
import { getCalendarDate } from '@/src/utils/dateUtils';
import localFont from 'next/font/local';

const DAILY_MESSAGE_STORAGE_KEY = 'perpetual-calendar-daily-message';

const customFont = localFont({
  src: '../public/font/customFont.ttf',
});

export default function Home() {
  const [selectedDate, setSelectedDate] = useState<CalendarDate | null>(null);
  const [isMounted, setIsMounted] = useState(false);
  const [dailyMessage, setDailyMessage] = useState('');

  // Initialize with today's date and set mounted state
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsMounted(true);
      const today = new Date();
      setSelectedDate(getCalendarDate(today, today));
      const savedMessage = window.localStorage.getItem(DAILY_MESSAGE_STORAGE_KEY);
      if (savedMessage) {
        setDailyMessage(savedMessage);
      }
    }, 0);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isMounted) return;

    window.localStorage.setItem(DAILY_MESSAGE_STORAGE_KEY, dailyMessage);
  }, [dailyMessage, isMounted]);

  return (
    <main className="container mx-auto pt-16 pb-8 px-2 md:px-8 min-h-[calc(100vh-6rem)] flex items-center justify-center font-sans">
      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Header / Intro for Mobile (hidden on desktop) */}
        <div className="lg:hidden text-center text-foreground">
          <h1 className={`text-4xl my-2 tracking-wide text-primary ${customFont.className}`}>
            万年历
          </h1>
          <p className="text-foreground/80 text-sm">我们大部分时间都在害怕失败与拒绝</p>
          <p className="text-foreground/80 text-sm">但后悔或许才是最该害怕的事</p>
        </div>

        {/* Calendar Section */}
        <div className="lg:col-span-2 relative z-10">
          <div className="bg-white/95 backdrop-blur-xl rounded-4xl shadow-2xl shadow-primary/10 p-2 md:p-6 border border-white/40 min-h-125">
            <div className="hidden lg:block mb-8 px-4">
              <h1
                className={`text-4xl text-primary mb-2 flex items-center gap-3 ${customFont.className}`}
              >
                <span className="w-2 h-8 bg-linear-to-b from-primary to-primary-light rounded-full inline-block"></span>
                万年历
              </h1>
              <p className="text-gray-500 text-sm">
                选择日期以查看详细信息，包括农历、节假日和节气等。
              </p>
            </div>

            {isMounted ? (
              <Calendar
                onDateSelect={setSelectedDate}
                selectedDate={selectedDate}
                fontClassName={customFont.className}
              />
            ) : (
              <div className="w-full h-96 flex items-center justify-center">
                <div className="w-8 h-8 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
              </div>
            )}
          </div>
          <div className="mt-4 overflow-hidden rounded-2xl border border-[#D4AF37]/20 bg-linear-to-br from-[#FDFAF3] via-white to-[#F7EFDD] p-5 md:p-6 shadow-xl shadow-primary/5">
            <div className="flex items-center gap-3">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-linear-to-br from-[#C8102E] to-[#8B0000] text-lg font-serif text-[#F3E5AB] shadow-md">
                记
              </span>
              <div>
                <h3 className={`text-xl text-primary ${customFont.className}`}>
                  给今天的你留下一句话吧
                </h3>
                <p className="mt-1 text-sm text-[#7A5C3E]">
                  我先来🙋‍♀️：你的存在本身对这个世界就有意义~
                </p>
              </div>
            </div>
            <div className="mt-4 rounded-xl border border-[#D4AF37]/15 bg-white/80 p-2 shadow-inner shadow-primary/5">
              <label htmlFor="daily-message" className="sr-only">
                给今天的你留下一句话吧
              </label>
              <textarea
                id="daily-message"
                value={dailyMessage}
                onChange={(event) => setDailyMessage(event.target.value)}
                placeholder="例如：今天也要温柔一点，慢一点，也没关系。"
                className="min-h-32 w-full resize-none rounded-lg border border-transparent bg-transparent px-3 py-3 text-sm leading-7 text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
              />
            </div>
          </div>
          {/* Decorative Card */}
          {/* <div className="mt-4 bg-linear-to-br from-[#8B0000] to-[#C8102E] rounded-2xl p-6 text-white shadow-xl hidden lg:block border border-[#D4AF37]/30">
            <h3 className="font-medium text-[#F3E5AB] mb-2 opacity-90">今日箴言</h3>
            <p className="text-lg leading-relaxed font-serif italic text-white/95">
              &quot;光阴似箭，日月如梭。珍惜当下的每一刻。&quot;
            </p>
          </div> */}
        </div>

        {/* Detail Section */}
        <div className="lg:col-span-1 relative z-20 flex flex-col gap-4 lg:mt-0">
          {isMounted && <DateDetail date={selectedDate} />}
        </div>
      </div>
    </main>
  );
}
