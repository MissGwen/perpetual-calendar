import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://perpetual-calendar-three.vercel.app';

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
