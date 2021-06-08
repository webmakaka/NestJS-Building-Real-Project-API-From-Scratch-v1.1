import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {ArticleEntity} from 'article/article.entity';
import {CreateArticleDto} from 'article/dto/createArticle.dto';
import {IArticleRespone} from 'article/types/articleResponse.interface';
import slugify from 'slugify';
import {DeleteResult, Repository} from 'typeorm';
import {UserEntity} from 'user/user.entity';

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(ArticleEntity)
    private readonly articleRepository: Repository<ArticleEntity>,
  ) {}

  async createArticle(
    currentUser: UserEntity,
    createArticleDto: CreateArticleDto,
  ): Promise<ArticleEntity> {
    const article = new ArticleEntity();
    Object.assign(article, createArticleDto);
    if (!article.tagList) {
      article.tagList = [];
    }

    article.slug = this.getSlug(createArticleDto.title);

    article.author = currentUser;
    return await this.articleRepository.save(article);
  }

  async findBySlug(slug: string): Promise<ArticleEntity> {
    return await this.articleRepository.findOne({ slug });
  }

  async deleteArticle(
    slug: string,
    currentUserId: number,
  ): Promise<DeleteResult> {
    const article = await this.findBySlug(slug);

    if (!article) {
      throw new HttpException(
        '[App] Article does not exist',
        HttpStatus.NOT_FOUND,
      );
    }

    if (article.author.id !== currentUserId) {
      throw new HttpException(
        '[App] You are not an author',
        HttpStatus.FORBIDDEN,
      );
    }

    return await this.articleRepository.delete({ slug });
  }

  async updateArticle(
    slug: string,
    updateArticleDto: CreateArticleDto,
    currentUserId: number,
  ): Promise<ArticleEntity> {
    const article = await this.findBySlug(slug);

    if (!article) {
      throw new HttpException(
        '[App] Article does not exist',
        HttpStatus.NOT_FOUND,
      );
    }

    if (article.author.id !== currentUserId) {
      throw new HttpException(
        '[App] You are not an author',
        HttpStatus.FORBIDDEN,
      );
    }

    Object.assign(article, updateArticleDto);
    return await this.articleRepository.save(article);
  }

  buildArticleResponse(article: ArticleEntity): IArticleRespone {
    return { article };
  }

  private getSlug(title: string): string {
    return (
      slugify(title, { lower: true }) +
      '-' +
      ((Math.random() * Math.pow(36, 6)) | 0).toString(36)
    );
  }
}
