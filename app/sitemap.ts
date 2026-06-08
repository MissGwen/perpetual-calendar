import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  // 注意：上线时建议配置环境变量 NEXT_PUBLIC_SITE_URL 或直接替换为真实的域名
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://perpetual-calendar-three.vercel.app';

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    // 如果后续有更多的页面路由，可以在此数组中继续添加
    // 例如：针对每年的静态日历页
    // {
    //   url: `${baseUrl}/year/2024`,
    //   lastModified: new Date(),
    //   changeFrequency: 'monthly',
    //   priority: 0.8,
    // }
  ];
}
