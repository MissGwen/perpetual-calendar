declare module 'lunar-javascript' {
  export class Solar {
    static fromDate(date: Date): Solar;
    getFestivals(): string[];
  }

  export class Lunar {
    static fromDate(date: Date): Lunar;
    getYear(): number;
    getMonth(): number;
    getDay(): number;
    getMonthInChinese(): string;
    getDayInChinese(): string;
    getFestivals(): string[];
    getJieQi(): string;
    getYearShengXiao(): string;
    getYearInGanZhi(): string;
    getMonthInGanZhi(): string;
    getDayInGanZhi(): string;
    /**
     * 获取八字
     */
    getEightChar(): EightChar;
  }

  /**
   * 八字
   */
  export class EightChar {
    getYear(): string;
    getMonth(): string;
    getDay(): string;
    getTime(): string;
    
    getYearWuXing(): string;
    getMonthWuXing(): string;
    getDayWuXing(): string;
    getTimeWuXing(): string;
    
    getYearDiShi(): string;
    getMonthDiShi(): string;
    getDayDiShi(): string;
    getTimeDiShi(): string;
    
    getDayNaYin(): string;

    getYearGan(): string;
    getMonthGan(): string;
    getDayGan(): string;
    getTimeGan(): string;

    getYearZhi(): string;
    getMonthZhi(): string;
    getDayZhi(): string;
    getTimeZhi(): string;
  }

  export class HolidayUtil {
    static getHoliday(year: number, month: number, day: number): { getName(): string; isWork(): boolean } | null;
  }
}
