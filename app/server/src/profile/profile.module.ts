import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfileController } from 'profile/profile.controller';
import { ProfileService } from 'profile/profile.service';
import { UserEntity } from 'user/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [ProfileController],
  providers: [ProfileService],
})
export class ProfileModule {}
