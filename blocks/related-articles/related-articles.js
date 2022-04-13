import { lookupPages, createOptimizedPicture } from '../../scripts/scripts.js';

export function createArticleCard(article, prefix) {
  const card = document.createElement('div');
  card.className = `${prefix}-card`;
  card.innerHTML = `
    <h4>${article.title}</h4>
    <p>${article.description}</p>`;
  const a = document.createElement('a');
  a.href = article.path;
  a.append(createOptimizedPicture(article.image, article.title, false, [{ width: 400 }]));
  card.prepend(a);
  return (card);
}

export default async function decorate(block) {
  const pathnames = [...block.querySelectorAll('a')].map((a) => new URL(a.href).pathname);
  const pages = await lookupPages(pathnames);
  console.log(pathnames);
  block.textContent = '';
  pages.forEach((page) => {
    block.append(createArticleCard(page, 'related-articles-card'));
  });
}
