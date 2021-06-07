import {MiddlewareConsumer, Module, RequestMethod} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {TagModule} from 'tag/tag.module';
import {AuthMiddleware} from 'user/middlewares/auth.middleware';
import {UserModule} from 'user/user.module';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import ormconfig from './ormconfig';

@Module({
  imports: [TypeOrmModule.forRoot(ormconfig), TagModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes({
      path: '*',
      method: RequestMethod.ALL,
    });
  }
}
