import { Module } from '@nestjs/common';
import { TagModule } from 'tag/tag.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [TagModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
