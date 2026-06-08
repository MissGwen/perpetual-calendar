import type { Metadata } from 'next';
import './globals.css';
import { BGMPlayer } from '@/src/components/BGMPlayer';

export const metadata: Metadata = {
  // 注意：上线时建议配置环境变量 NEXT_PUBLIC_SITE_URL 或直接替换为真实的域名
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://perpetual-calendar-three.vercel.app'),
  title: '万年历 - 农历、黄历、节假日查询',
  description: '现代化、美观、清晰的万年历应用，提供公历、农历、黄历、节气、节假日、吉凶宜忌查询，帮助您更好地规划时间。',
  keywords: ['万年历', '日历', '农历', '黄历', '节假日', '节气', '老黄历', '吉凶宜忌', '放假安排'],
  authors: [{ name: 'Perpetual Calendar' }],
  creator: 'Perpetual Calendar',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: '万年历 - 农历、黄历、节假日查询',
    description: '现代化、美观、清晰的万年历应用，提供全面的日历查询服务。',
    url: '/',
    siteName: '万年历',
    locale: 'zh_CN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: '万年历 - 农历、黄历、节假日查询',
    description: '现代化、美观、清晰的万年历应用，提供全面的日历查询服务。',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body className="antialiased min-h-screen bg-linear-to-br from-background to-[#EAE0C8] text-foreground">
        {children}
        <BGMPlayer />
      </body>
    </html>
  );
}
