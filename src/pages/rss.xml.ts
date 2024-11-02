import type { APIRoute } from 'astro';
import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export const GET: APIRoute = async ({ params, request, site }) => {

  const blogPosts = await getCollection('blog');

  return rss({
    // `<title>` field in output xml
    title: 'Miguel Blog',
    // `<description>` field in output xml
    description: 'Aprendiendo Astro',
    // Pull in your project "site" from the endpoint context
    // https://docs.astro.build/en/reference/api-reference/#contextsite
    site: site ?? '',
    // Array of `<item>`s in output xml
    // See "Generating items" section for examples using content collections and glob imports
    items: blogPosts.map(({ data, slug }) => ({
      title: data.title,
      description: data.description,
      pubDate: data.date,
      link: `/posts/${slug}`,
    })),
    // (optional) inject custom xml
    customData: `<language>en-us</language>`,
    //stylesheet: '/styles/rss.xsl',
  });
}