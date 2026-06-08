import { streamText } from 'ai';
import { deepseek } from '@/app/ai/deepseek';
import type { DeepSeekLanguageModelOptions } from '@ai-sdk/deepseek';

type AnalysisPayload = {
  solarDate?: string;
  lunarDate?: string;
  ganZhiYear?: string;
  ganZhiMonth?: string;
  ganZhiDay?: string;
  dayWuXing?: string;
  dayNaYin?: string;
  wangShuai?: string;
  diShi?: string;
  dayValue?: string;
  dayGod?: string;
  isYellowRoad?: boolean;
  suitable?: string[];
  avoid?: string[];
  xiu?: string;
  xiuLuck?: string;
  zheng?: string;
  animal?: string;
  gong?: string;
};

function formatList(items: string[] | undefined) {
  if (!items || items.length === 0) {
    return '暂无';
  }

  return items.join('、');
}

function buildPrompt(payload: AnalysisPayload) {
  return [
    `公历日期：${payload.solarDate ?? '未知'}`,
    `农历日期：${payload.lunarDate ?? '未知'}`,
    `干支：${payload.ganZhiYear ?? '未知'}年 ${payload.ganZhiMonth ?? '未知'}月 ${payload.ganZhiDay ?? '未知'}日`,
    `日柱五行：${payload.dayWuXing ?? '未知'}`,
    `纳音：${payload.dayNaYin ?? '未知'}`,
    `旺衰：${payload.wangShuai ?? '未知'}`,
    `地势：${payload.diShi ?? '未知'}`,
    `值日：${payload.dayValue ?? '未知'}`,
    `值神：${payload.dayGod ?? '未知'}`,
    `黄道状态：${payload.isYellowRoad ? '黄道吉日' : '黑道日'}`,
    `宜：${formatList(payload.suitable)}`,
    `忌：${formatList(payload.avoid)}`,
    `星宿：${payload.xiu ?? '未知'}宿（${payload.xiuLuck ?? '未知'}）`,
    `星宿属性：${payload.zheng ?? '未知'} / ${payload.animal ?? '未知'} / ${payload.gong ?? '未知'}方`,
  ].join('\n');
}

export async function POST(req: Request) {
  if (!process.env.DEEPSEEK_API_KEY) {
    return new Response('AI 服务尚未配置 DEEPSEEK_API_KEY。', { status: 500 });
  }

  let payload: AnalysisPayload;

  try {
    payload = await req.json();
  } catch {
    return new Response('请求体格式不正确。', { status: 400 });
  }

  if (!payload?.solarDate || !payload?.lunarDate || !payload?.ganZhiDay) {
    return new Response('缺少生成分析所需的日期信息。', { status: 400 });
  }

  try {
    const result = streamText({
      model: deepseek('deepseek-v4-pro'),
      providerOptions: {
        deepseek: {
          thinking: {
            type: 'enabled',
          },
          reasoningEffort: 'max',
        } satisfies DeepSeekLanguageModelOptions,
      },
      system: `你是一位擅长用现代语言解读传统黄历信息的中文顾问。

你的任务是根据用户给出的某一天黄历信息，生成一段简洁、温和、可读性强的分析。

必须遵守以下要求：
1. 不要用恐吓、宿命论或绝对化语气。
2. 可以结合五行、旺衰、宜忌、星宿做整体判断，但表达必须通俗。
3. 输出仅使用纯文本，不要使用 Markdown 代码块。
4. 控制在 3 个自然段以内，总长度适合弹窗阅读。
5. 最后一段给出 2 到 3 条贴近现代生活的建议，可以涉及工作、沟通、节奏、出行、情绪管理等。
6. 如果信息偏吉，就强调顺势而为；如果信息偏谨慎，就强调稳妥安排，不夸大风险。`,
      prompt: `请基于以下黄历信息，输出今天的整体分析和行动建议：\n\n${buildPrompt(payload)}`,
    });

    return result.toTextStreamResponse();
  } catch {
    return new Response('AI 分析暂时不可用，请稍后再试。', { status: 500 });
  }
}
