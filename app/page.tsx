"use client";

import React, { useState, useEffect } from "react";
import { Calendar } from "@/src/components/Calendar";
import { DateDetail } from "@/src/components/DateDetail";
import { CalendarDate } from "@/src/types/calendar";
import { getCalendarDate } from "@/src/utils/dateUtils";

export default function Home() {
  const [selectedDate, setSelectedDate] = useState<CalendarDate | null>(null);

  // Initialize with today's date
  useEffect(() => {
    const today = new Date();
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setSelectedDate(getCalendarDate(today, today));
  }, []);

  return (
    <main className="container mx-auto p-4 md:p-8 min-h-screen flex items-center justify-center font-sans">
      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Header / Intro for Mobile (hidden on desktop) */}
        <div className="lg:hidden text-center mb-4 text-foreground">
          <h1 className="text-3xl font-bold mb-2 tracking-wide">万年历</h1>
          <p className="text-foreground/80 text-sm">记录时间的流转与美好</p>
        </div>

        {/* Calendar Section */}
        <div className="lg:col-span-2 relative z-10">
          <div className="bg-white/95 backdrop-blur-xl rounded-[2rem] shadow-2xl shadow-primary/10 p-4 md:p-6 border border-white/40">
            <div className="hidden lg:block mb-8 px-4">
              <h1 className="text-3xl font-bold text-primary mb-2 flex items-center gap-3">
                <span className="w-2 h-8 bg-gradient-to-b from-primary to-primary-light rounded-full inline-block"></span>
                万年历
              </h1>
              <p className="text-gray-500 text-sm">选择日期以查看详细信息，包括农历、节假日和节气等。</p>
            </div>
            
            <Calendar 
              onDateSelect={setSelectedDate} 
              selectedDate={selectedDate} 
            />
          </div>
        </div>

        {/* Detail Section */}
        <div className="lg:col-span-1 relative z-10 flex flex-col gap-6">
          <DateDetail date={selectedDate} />
          
          {/* Decorative Card */}
          <div className="bg-gradient-to-br from-[#8B0000] to-[#C8102E] rounded-2xl p-6 text-white shadow-xl hidden lg:block border border-[#D4AF37]/30">
            <h3 className="font-medium text-[#F3E5AB] mb-2 opacity-90">今日箴言</h3>
            <p className="text-lg leading-relaxed font-serif italic text-white/95">
              &quot;光阴似箭，日月如梭。珍惜当下的每一刻。&quot;
            </p>
          </div>
        </div>
        
      </div>
    </main>
  );
}
