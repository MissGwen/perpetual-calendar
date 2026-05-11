export interface Holiday {
  name: string;
  type: 'public' | 'traditional' | 'solar_term';
}

export interface CalendarDate {
  year: number;
  month: number; // 0-11
  day: number;
  date: Date;
  lunarYear: number;
  lunarMonth: number;
  lunarDay: number;
  lunarMonthName: string;
  lunarDayName: string;
  isHoliday: boolean;
  holidays: Holiday[];
  isToday: boolean;
  weekday: number; // 0-6 (Sun-Sat)
  isCurrentMonth: boolean; // Indicates if the date belongs to the currently viewed month
  zodiac: string; // 生肖
  ganZhiYear: string; // 干支纪年
  ganZhiMonth: string; // 干支纪月
  ganZhiDay: string; // 干支纪日

  dayWuXing: string; // 日柱五行
  dayNaYin: string; // 日柱纳音
  wangShuai: string; // 五行旺衰（旺相休囚死）
  diShi: string; // 地势（长生十二神）
}

export interface MonthData {
  year: number;
  month: number;
  dates: CalendarDate[];
  firstDayWeek: number;
  totalDays: number;
}
