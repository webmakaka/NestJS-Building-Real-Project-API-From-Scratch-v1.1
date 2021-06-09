import { ArticleEntity } from 'article/article.entity';

export interface IArticlesResponse {
  articles: ArticleEntity[];
  articlesCount: number;
}
