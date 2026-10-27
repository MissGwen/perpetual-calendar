'use client';

interface AlmanacMessageProps {
  /** 留言内容（状态由页面持有，与 classic 主题共用同一 localStorage key，两主题互通） */
  message: string;
  onChange: (value: string) => void;
}

/** 留言行：记印 + 单行输入（受控） */
export function AlmanacMessage({ message, onChange }: AlmanacMessageProps) {
  return (
    <div className="mt-3 flex items-center gap-2.5 lg:mt-4">
      <div className="am-seal am-seal-line h-[22px] w-[22px] shrink-0 text-[11px] lg:h-[26px] lg:w-[26px] lg:text-[13px]">
        记
      </div>
      <label
        className="am-serif shrink-0 text-xs font-semibold tracking-[0.06em] lg:text-[13.5px]"
        htmlFor="almanac-message"
      >
        给今天留一句话
      </label>
      <input
        id="almanac-message"
        type="text"
        value={message}
        onChange={(event) => onChange(event.target.value)}
        placeholder="我先来：你存在的本身就对这个世界有意义～"
        className="min-w-0 flex-1 border-b border-[var(--am-hairline)] bg-transparent px-0.5 py-1.5 text-[11.5px] text-[var(--am-ink-soft)] outline-none placeholder:text-[var(--am-ink-faint)] focus:border-[var(--am-zhu)] focus:text-[var(--am-ink)] lg:text-[13px]"
      />
    </div>
  );
}
