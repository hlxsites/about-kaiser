import { lookupPages, readBlockConfig } from '../../scripts/scripts.js';
import { createArticleCard } from '../related-articles/related-articles.js';

export default async function decorate(block) {
  const config = readBlockConfig(block);
  const pages = await lookupPages(config);
  block.textContent = '';
  pages.forEach((page) => {
    block.append(createArticleCard(page, 'article-feed'));
  });
}
