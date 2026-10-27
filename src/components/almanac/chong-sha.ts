import { Solar } from 'lunar-typescript';
import { CalendarDate } from '@/types/calendar';
import { getCurrentShiChen } from '@/lib/calendar/date';

/**
 * almanac 主题的补充数据：冲煞 / 喜神 / 时辰 / 前后节气。
 * 这些字段现有 CalendarDate 未包含，此处按选中日期现算，不改动现有数据层。
 */
export interface AlmanacExtras {
  /** 冲的生肖，如「狗」 */
  chongAnimal: string;
  /** 冲的干支，如「庚戌」 */
  chongGanZhi: string;
  /** 煞方，如「南」 */
  sha: string;
  /** 喜神方位，如「西南」 */
  xi: string;
  /** 当前时辰，如「巳时」（与 classic 主题一致，按当前时刻计算） */
  shichen: string;
  shichenRange: string;
  shichenWuxing: string;
  /** 上一个已过的节气 */
  prevJieQi: { name: string; date: string };
  /** 下一个将至的节气 */
  nextJieQi: { name: string; date: string };
}

export function getAlmanacExtras(date: CalendarDate): AlmanacExtras {
  const lunar = Solar.fromYmd(date.year, date.month + 1, date.day).getLunar();

  // getDayChongDesc 形如 “(庚戌)狗”
  const chongMatch = /\(([^)]+)\)(.+)$/.exec(lunar.getDayChongDesc());
  const { shichen, range, wuxing } = getCurrentShiChen(new Date());

  const prev = lunar.getPrevJieQi();
  const next = lunar.getNextJieQi();

  return {
    chongAnimal: chongMatch ? chongMatch[2] : lunar.getDayChongDesc(),
    chongGanZhi: chongMatch ? chongMatch[1] : '',
    sha: lunar.getDaySha(),
    xi: lunar.getDayPositionXiDesc(),
    shichen,
    shichenRange: range,
    shichenWuxing: wuxing,
    prevJieQi: {
      name: prev.getName(),
      date: `${prev.getSolar().getMonth()}月${prev.getSolar().getDay()}日`,
    },
    nextJieQi: {
      name: next.getName(),
      date: `${next.getSolar().getMonth()}月${next.getSolar().getDay()}日`,
    },
  };
}

const YEAR_DIGITS = ['〇', '一', '二', '三', '四', '五', '六', '七', '八', '九'];
const MONTH_NAMES = ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十', '十一', '十二'];
const WEEKDAY_NAMES = ['日', '一', '二', '三', '四', '五', '六'];

export { MONTH_NAMES, WEEKDAY_NAMES };

/** 2026 → 二〇二六 */
export function yearInChinese(year: number): string {
  return String(year)
    .split('')
    .map((ch) => YEAR_DIGITS[Number(ch)] ?? ch)
    .join('');
}

/** 0 基公历月份 → 十月 */
export function monthLabel(month: number): string {
  return `${MONTH_NAMES[month] ?? String(month + 1)}月`;
}
