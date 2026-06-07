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
    /**
     * 十二值星（建除满平定执破危成收开闭）
     */
    getZhiXing(): string;
    /**
     * 值日天神（青龙明堂天刑朱雀金匮天德白虎玉堂天牢玄武司命勾陈）
     */
    getDayTianShen(): string;
    /**
     * 天神类型：'黄道' | '黑道'
     */
    getDayTianShenType(): string;
    /**
     * 天神吉凶：'吉' | '凶'
     */
    getDayTianShenLuck(): string;
    /**
     * 二十八星宿名称（角亢氐房心尾箕斗牛女虚危室壁奎娄胃昴毕觜参井鬼柳星张翼轸）
     */
    getXiu(): string;
    /**
     * 星宿吉凶：'吉' | '凶'
     */
    getXiuLuck(): string;
    /**
     * 星宿歌诀
     */
    getXiuSong(): string;
    /**
     * 星宿五行/日月（木金土日月火水）
     */
    getZheng(): string;
    /**
     * 星宿动物（蛟龙貉兔狐虎豹獬牛蝠鼠燕猪貐狼狗雉鸡乌猴猿犴羊獐马鹿蛇蚓）
     */
    getAnimal(): string;
    /**
     * 星宿方位宫（东南西北）
     */
    getGong(): string;
    /**
     * 星宿兽
     */
    getShou(): string;
    /**
     * 月支
     */
    getMonthZhi(): string;
    /**
     * 日支
     */
    getDayZhi(): string;
    /**
     * 星期几 0-6
     */
    getWeek(): number;
    /**
     * 获取宜做的事
     */
    getDayYi(): string[];
    /**
     * 获取忌讳做的事
     */
    getDayJi(): string[];
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
    static getHoliday(
      year: number,
      month: number,
      day: number,
    ): { getName(): string; isWork(): boolean } | null;
  }
}
