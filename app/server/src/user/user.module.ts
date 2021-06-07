import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthGuard } from 'user/guards/auth.guard';
import { UserController } from 'user/user.controller';
import { UserEntity } from 'user/user.entity';
import { UserService } from 'user/user.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [UserController],
  providers: [UserService, AuthGuard],
  exports: [UserService],
})
export class UserModule {}
