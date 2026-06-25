import type { Metadata } from 'next';
import { Header, BGMPlayer } from '@/components/layout';
import { Inter } from 'next/font/google';
import localFont from 'next/font/local';
import { cn } from '@/lib/utils';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });
// 自定义中文展示字体，全局注入 --font-display 变量供所有页面复用
const displayFont = localFont({
  src: '../../public/font/customFont.ttf',
  variable: '--font-display',
  display: 'swap',
});

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
    <html lang="zh" className={cn('font-sans', inter.variable, displayFont.variable)}>
      <body className="antialiased min-h-screen bg-linear-to-br from-paper to-parchment-deep text-ink-deep">
        <Header />
        {children}
        <BGMPlayer />
      </body>
    </html>
  );
}
