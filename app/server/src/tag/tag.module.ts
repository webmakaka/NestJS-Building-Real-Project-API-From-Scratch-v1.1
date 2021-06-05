import { Module } from '@nestjs/common';
import { TagController } from 'tag/tag.controller';

@Module({
  controllers: [TagController],
})
export class TagModule {}
