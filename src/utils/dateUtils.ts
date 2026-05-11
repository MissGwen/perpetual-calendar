import {
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  isSameDay,
  isSameMonth,
  format,
} from 'date-fns';
import { Lunar, Solar, HolidayUtil } from 'lunar-javascript';
import { CalendarDate, MonthData, Holiday } from '../types/calendar';

export function getWangXiang(dayWuXing: string, monthWuXing: string): string {
  // 定义五行生克关系，返回 日干 在 月令 下的状态（旺相休囚死）
  const relationship: Record<string, Record<string, string>> = {
    木: { 木: '旺', 火: '相', 水: '休', 金: '囚', 土: '死' },
    火: { 火: '旺', 土: '相', 木: '休', 水: '囚', 金: '死' },
    土: { 土: '旺', 金: '相', 火: '休', 木: '囚', 水: '死' },
    金: { 金: '旺', 水: '相', 土: '休', 火: '囚', 木: '死' },
    水: { 水: '旺', 木: '相', 金: '休', 土: '囚', 火: '死' },
  };

  return relationship[monthWuXing]?.[dayWuXing] || '未知';
}

export function getCalendarDate(date: Date, currentMonthDate: Date): CalendarDate {
  const solar = Solar.fromDate(date);
  const lunar = Lunar.fromDate(date);

  const holidays: Holiday[] = [];

  // Get solar festivals / terms
  const festivals = solar.getFestivals();
  festivals.forEach((f) => holidays.push({ name: f, type: 'public' }));

  const lunarFestivals = lunar.getFestivals();
  lunarFestivals.forEach((f) => holidays.push({ name: f, type: 'traditional' }));

  const jieQi = lunar.getJieQi();
  if (jieQi) {
    holidays.push({ name: jieQi, type: 'solar_term' });
  }

  // Legal holidays in China (if supported by lunar-javascript)
  const holiday = HolidayUtil.getHoliday(date.getFullYear(), date.getMonth() + 1, date.getDate());
  if (holiday && holiday.isWork() === false) {
    // Avoid duplicate names
    if (!holidays.find((h) => h.name === holiday.getName())) {
      holidays.push({ name: holiday.getName(), type: 'public' });
    }
  }

  // Calculate WuXing and DiShi
  const eightChar = lunar.getEightChar();
  const dayWuXingFull = eightChar.getDayWuXing(); // e.g. "木水"
  const monthWuXingFull = eightChar.getMonthWuXing();

  const dayGanWuXing = dayWuXingFull.charAt(0);
  const monthZhiWuXing = monthWuXingFull.charAt(1);
  const wangShuai = getWangXiang(dayGanWuXing, monthZhiWuXing);
  const diShi = eightChar.getDayDiShi();

  return {
    year: date.getFullYear(),
    month: date.getMonth(),
    day: date.getDate(),
    date,
    lunarYear: lunar.getYear(),
    lunarMonth: lunar.getMonth(),
    lunarDay: lunar.getDay(),
    lunarMonthName: lunar.getMonthInChinese() + '月',
    lunarDayName: lunar.getDayInChinese(),
    isHoliday: holidays.length > 0 || (holiday !== null && !holiday.isWork()),
    holidays,
    isToday: isSameDay(date, new Date()),
    weekday: date.getDay(),
    isCurrentMonth: isSameMonth(date, currentMonthDate),
    zodiac: lunar.getYearShengXiao(),
    ganZhiYear: lunar.getYearInGanZhi(),
    ganZhiMonth: lunar.getMonthInGanZhi(),
    ganZhiDay: lunar.getDayInGanZhi(),
    dayWuXing: dayWuXingFull,
    dayNaYin: eightChar.getDayNaYin(),
    wangShuai,
    diShi,
  };
}

export function getMonthData(year: number, month: number): MonthData {
  const targetDate = new Date(year, month, 1);
  const monthStart = startOfMonth(targetDate);
  const monthEnd = endOfMonth(targetDate);

  // Get calendar grid start and end (including prev/next month dates to fill the grid)
  const calendarStart = startOfWeek(monthStart, { weekStartsOn: 0 }); // Sunday start
  const calendarEnd = endOfWeek(monthEnd, { weekStartsOn: 0 });

  const days = eachDayOfInterval({ start: calendarStart, end: calendarEnd });

  const dates = days.map((day) => getCalendarDate(day, targetDate));

  return {
    year,
    month,
    dates,
    firstDayWeek: monthStart.getDay(),
    totalDays: endOfMonth(targetDate).getDate(),
  };
}

export function formatDate(date: Date, formatStr: string = 'yyyy-MM-dd'): string {
  return format(date, formatStr);
}
