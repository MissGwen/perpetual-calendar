'use client';

import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { CalendarDate } from '@/types/calendar';
import type { AlmanacExtras } from './chong-sha';

interface AlmanacStripProps {
  date: CalendarDate;
  extras: AlmanacExtras;
}

function Badge({ tone, children }: { tone: 'gold' | 'zhu'; children: ReactNode }) {
  const toneClass =
    tone === 'gold'
      ? 'border-[var(--am-gold)] bg-[var(--am-gold-light)] text-[#7a5e14]'
      : 'border-[var(--am-zhu)] text-[var(--am-zhu)]';
  return (
    <span
      className={`rounded-full border px-2 py-0.5 text-[9.5px] font-medium tracking-[0.12em] lg:px-[9px] lg:py-[3px] lg:text-[10.5px] ${toneClass}`}
    >
      {children}
    </span>
  );
}

function StripItem({
  label,
  value,
  sub,
  className,
}: {
  label: string;
  value: ReactNode;
  sub?: string;
  className?: string;
}) {
  return (
    <div className={cn('lg:flex-1', className)}>
      <div className="mb-1 text-[10px] font-medium tracking-[0.2em] text-[var(--am-ink-soft)] lg:mb-2 lg:text-[11px] lg:tracking-[0.22em]">
        {label}
      </div>
      <div className="am-serif flex items-center gap-1.5 text-base font-bold tracking-[0.06em] lg:gap-2.5 lg:text-[21px]">
        {value}
      </div>
      {sub && (
        <div className="mt-1 text-[10px] tracking-[0.05em] text-[var(--am-ink-soft)] lg:mt-1.5 lg:text-[11.5px]">
          {sub}
        </div>
      )}
    </div>
  );
}

/** 小金点分节符（仅桌面端显示；移动端为两列网格） */
function StripDivider() {
  return (
    <span
      aria-hidden
      className="mt-[26px] hidden h-[5px] w-[5px] shrink-0 rotate-45 bg-[var(--am-gold-bright)] opacity-85 lg:block"
    />
  );
}

/** 黄历横栏：值神 / 建除十二神 / 二十八宿 / 纳音五行 / 节气（敞口横排，无框） */
export function AlmanacStrip({ date, extras }: AlmanacStripProps) {
  return (
    <div
      className="grid grid-cols-2 gap-x-5 gap-y-3.5 lg:flex lg:items-start lg:gap-x-6"
      aria-label="黄历速览"
    >
      <StripItem
        label="值神"
        value={
          <>
            {date.dayGod} <Badge tone="gold">{date.isYellowRoad ? '黄道' : '黑道'}</Badge>
          </>
        }
        sub={date.isYellowRoad ? '黄道吉日 · 吉神所在' : '黑道日 · 诸事审慎'}
      />
      <StripDivider />
      <StripItem label="建除十二神" value={`${date.dayValue}日`} />
      <StripDivider />
      <StripItem
        label="二十八宿"
        value={
          <>
            {date.xiu}宿 <Badge tone={date.xiuLuck === '吉' ? 'gold' : 'zhu'}>{date.xiuLuck}</Badge>
          </>
        }
        sub={`${date.zheng} · ${date.animal} · ${date.gong}方`}
      />
      <StripDivider />
      <StripItem
        label="纳音五行"
        value={date.dayNaYin}
        sub={`日柱${date.dayWuXing} · 旺衰${date.wangShuai} · ${date.diShi}`}
      />
      <StripDivider />
      <StripItem
        label="节气"
        value={
          <>
            {extras.nextJieQi.name} <Badge tone="gold">{extras.nextJieQi.date}</Badge>
          </>
        }
        sub={`${extras.prevJieQi.name}（${extras.prevJieQi.date}）已过`}
        className="col-span-2 lg:col-span-1"
      />
    </div>
  );
}
