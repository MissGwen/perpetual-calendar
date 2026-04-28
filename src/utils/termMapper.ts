// 极简轻命理风格词汇映射
// 将传统的命理术语映射为大众易懂、偏正向或中性的描述词

export const WANG_SHUAI_MAP: Record<string, string> = {
  '旺': '充盈',
  '相': '舒展',
  '休': '渐缓',
  '囚': '收敛',
  '死': '沉潜',
};

export const DI_SHI_MAP: Record<string, string> = {
  '长生': '焕新',
  '沐浴': '蜕变',
  '冠带': '成长',
  '临官': '鼎盛',
  '帝旺': '巅峰',
  '衰': '渐缓',
  '病': '休憩',
  '死': '归藏',
  '墓': '蛰伏',
  '绝': '萌发',
  '胎': '蕴育',
  '养': '滋养',
};

/**
 * 转换旺相休囚死术语
 * @param term 原始术语
 * @returns 转换后的词汇，如果未匹配则返回原词
 */
export function mapWangShuai(term: string): string {
  return WANG_SHUAI_MAP[term] || term;
}

/**
 * 转换长生十二神地势术语
 * @param term 原始术语
 * @returns 转换后的词汇，如果未匹配则返回原词
 */
export function mapDiShi(term: string): string {
  return DI_SHI_MAP[term] || term;
}