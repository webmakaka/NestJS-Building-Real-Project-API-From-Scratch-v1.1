import { ArticleEntity } from 'article/article.entity';

export type ArticleType = Omit<ArticleEntity, 'updateTimestamp'>;
