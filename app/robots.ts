import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  // 注意：上线时建议配置环境变量 NEXT_PUBLIC_SITE_URL 或直接替换为真实的域名
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://perpetual-calendar-three.vercel.app';

  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
