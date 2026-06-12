import { streamText } from 'ai';
import { env } from '@/env';
import { deepseek } from '@/lib/ai/deepseek';
// import type { DeepSeekLanguageModelOptions } from '@ai-sdk/deepseek';
import { redis } from '@/lib/database/redis';
// import type { DeepSeekLanguageModelOptions } from '@ai-sdk/deepseek';

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
  if (!env.DEEPSEEK_API_KEY) {
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

  const cacheKey = `ai-analysis:${payload.solarDate}`;

  try {
    // 1. 尝试从 Redis 获取缓存
    const cachedResponse = await redis.get(cacheKey);

    if (cachedResponse) {
      // 2. 如果有缓存，创建 ReadableStream 模拟流式输出
      const stream = new ReadableStream({
        async start(controller) {
          const encoder = new TextEncoder();
          // 使用扩展运算符 [...] 来拆分字符串，这样可以正确处理包含 emoji（代理对）的 Unicode 字符
          const chunks = [...cachedResponse];

          for (const chunk of chunks) {
            controller.enqueue(encoder.encode(chunk));
            // 模拟打字延迟，每个字符 20ms
            await new Promise((resolve) => setTimeout(resolve, 20));
          }
          controller.close();
        },
      });

      return new Response(stream, {
        headers: {
          'Content-Type': 'text/plain; charset=utf-8',
        },
      });
    }

    // 3. 计算北京时间当日午夜零点剩余秒数
    const now = new Date();
    const utc = now.getTime() + now.getTimezoneOffset() * 60000;
    const beijingTime = new Date(utc + 3600000 * 8);
    const nextMidnight = new Date(
      beijingTime.getFullYear(),
      beijingTime.getMonth(),
      beijingTime.getDate() + 1,
    );
    const expireSeconds = Math.floor((nextMidnight.getTime() - beijingTime.getTime()) / 1000);

    // 4. 没有缓存，调用大模型生成
    const result = streamText({
      model: deepseek('deepseek-v4-flash'),
      // providerOptions: {
      //   deepseek: {
      //     thinking: {
      //       type: 'enabled',
      //     },
      //     reasoningEffort: 'max',
      //   } satisfies DeepSeekLanguageModelOptions,
      // },
      system: `你是一位擅长用现代语言解读传统黄历信息的中文顾问。

你的任务是根据用户给出的某一天黄历信息，生成一段简洁、温和、可读性强的分析。

必须遵守以下要求：
1. 不要用恐吓、宿命论或绝对化语气。
2. 可以结合五行、旺衰、宜忌、星宿做整体判断，但表达必须通俗。
3. 请使用 Markdown 格式（如二级标题、加粗、无序列表等）来进行排版，以提高阅读体验。可以适当增加一些emoji表情，但不要使用代码块（\`\`\`）。
4. 控制在 3 个自然段以内，总长度适合弹窗阅读。
5. 最后一段给出 2 到 3 条贴近现代生活的建议，可以涉及工作、沟通、节奏、出行、情绪管理等。
6. 如果信息偏吉，就强调顺势而为；如果信息偏谨慎，就强调稳妥安排，不夸大风险。`,
      prompt: `请基于以下黄历信息，输出今天的整体分析和行动建议：\n\n${buildPrompt(payload)}`,
      onFinish: async ({ text }) => {
        try {
          // 生成完成后，存入 Redis，设置过期时间为北京时间当晚零点
          await redis.set(cacheKey, text, { EX: expireSeconds });
        } catch (error) {
          console.error('Failed to cache AI response:', error);
        }
      },
    });

    return result.toTextStreamResponse();
  } catch (error) {
    console.error('AI API Error:', error);
    return new Response('AI 分析暂时不可用，请稍后再试。', { status: 500 });
  }
}
