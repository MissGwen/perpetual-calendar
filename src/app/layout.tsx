import type { Metadata } from 'next';
import { BGMPlayer } from '@/components/layout/BGMPlayer';
import { Header } from '@/components/layout/header';
import { Inter } from 'next/font/google';
import { cn } from '@/lib/utils';
import '@/styles/globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });

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
    <html lang="zh" className={cn('font-sans', inter.variable)}>
      <body className="antialiased min-h-screen bg-linear-to-br from-paper to-parchment-deep text-ink-deep">
        <Header />
        {children}
        <BGMPlayer />
      </body>
    </html>
  );
}
