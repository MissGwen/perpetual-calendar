import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: '萬年历',
  description: '现代化、美观、清晰的萬年历应用',
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
      </body>
    </html>
  );
}
