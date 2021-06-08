import { Module } from '@nestjs/common';
import { ArticleController } from 'article/article.controller';
import { ArticleService } from 'article/article.service';

@Module({
  controllers: [ArticleController],
  providers: [ArticleService],
})
export class ArticleModule {}
