import type { Metadata } from 'next';
import { Header, BGMPlayer } from '@/components/layout';
import { ThemeToggle } from '@/components/theme/theme-toggle';
import { Inter, Noto_Serif_SC, Fraunces } from 'next/font/google';
import localFont from 'next/font/local';
import { cn } from '@/lib/utils';
import { THEME_STORAGE_KEY } from '@/lib/theme-store';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });
// 自定义中文展示字体，全局注入 --font-display 变量供所有页面复用
const displayFont = localFont({
  src: '../../public/font/customFont.ttf',
  variable: '--font-display',
  display: 'swap',
});
// 朱墨黄历主题（almanac）专用字体，仅在 [data-theme='almanac'] 作用域下使用
const notoSerifSC = Noto_Serif_SC({
  subsets: ['latin'],
  variable: '--font-am-serif',
  display: 'swap',
});
const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-am-display',
  display: 'swap',
});

// 防闪白：首屏绘制前同步 localStorage 中的主题到 html[data-theme]（与 lib/theme-store.ts 约定一致）
const themeInitScript = `(function(){try{var t=localStorage.getItem('${THEME_STORAGE_KEY}');document.documentElement.setAttribute('data-theme',t==='almanac'?'almanac':'classic');}catch(e){document.documentElement.setAttribute('data-theme','classic');}})();`;

export const metadata: Metadata = {
  metadataBase: new URL('https://perpetual-calendar-three.vercel.app'),
  title: '万年历 Perpetual Calendar',
  description:
    'Modern Chinese Perpetual Calendar. 现代化、美观、清晰的万年历应用，提供公历、农历、黄历、节气、节假日、吉凶宜忌查询。Provides Gregorian, Lunar calendar, solar terms, and traditional Chinese daily aura (Almanac) queries.',
  keywords: [
    '万年历',
    '日历',
    '农历',
    '黄历',
    '节假日',
    '节气',
    '老黄历',
    'Chinese Calendar',
    'Lunar Calendar',
    'Chinese Almanac',
    'Perpetual Calendar',
    'Solar Terms',
  ],
  authors: [{ name: 'Perpetual Calendar' }],
  creator: 'Perpetual Calendar',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: '万年历 Perpetual Calendar',
    description:
      'Modern Chinese Perpetual Calendar. 现代化、美观、清晰的万年历应用，提供全面的日历查询服务。',
    url: '/',
    siteName: '万年历 Chinese Calendar',
    locale: 'zh_CN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: '万年历 Perpetual Calendar',
    description:
      'Modern Chinese Perpetual Calendar. 现代化、美观、清晰的万年历应用，提供全面的日历查询服务。',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="zh"
      className={cn(
        'font-sans',
        inter.variable,
        displayFont.variable,
        notoSerifSC.variable,
        fraunces.variable,
      )}
      suppressHydrationWarning
    >
      <body className="antialiased min-h-screen bg-linear-to-br from-paper to-parchment-deep text-ink-deep">
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        <Header />
        {children}
        <BGMPlayer />
        <ThemeToggle />
      </body>
    </html>
  );
}
