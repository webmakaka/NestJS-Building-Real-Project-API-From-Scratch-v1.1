import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ArticleService } from 'article/article.service';
import { CreateArticleDto } from 'article/dto/createArticle.dto';
import { User } from 'user/decorators/user.decorator';
import { AuthGuard } from 'user/guards/auth.guard';
import { UserEntity } from 'user/user.entity';

@Controller('articles')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Post()
  @UseGuards(AuthGuard)
  async create(
    @User() currentUser: UserEntity,
    @Body('article') createArticleDto: CreateArticleDto,
  ): Promise<any> {
    return this.articleService.createArticle(currentUser, createArticleDto);
  }
}
