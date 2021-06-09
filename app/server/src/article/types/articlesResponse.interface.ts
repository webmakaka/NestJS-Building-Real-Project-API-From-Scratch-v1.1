import { ArticleType } from 'article/types/article.type';

export interface IArticlesResponse {
  articles: ArticleType[];
  articlesCount: number;
}
