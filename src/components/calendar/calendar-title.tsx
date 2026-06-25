/**
 * 移动端首页标题块（仅在小屏显示，桌面端隐藏）。
 */
export function CalendarTitle() {
  return (
    <div className="lg:hidden text-center text-ink-deep">
      <h1 className="text-4xl my-2 tracking-wide text-festive font-display">万年历</h1>
      <p className="text-ink-deep/80 text-sm">我们大部分时间都在害怕失败与拒绝</p>
      <p className="text-ink-deep/80 text-sm">但后悔或许才是最该害怕的事</p>
    </div>
  );
}
