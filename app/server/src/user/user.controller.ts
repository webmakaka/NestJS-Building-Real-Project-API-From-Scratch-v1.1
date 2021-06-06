import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from 'user/dto/createUser.dto';
import { UserEntity } from 'user/user.entity';
import { UserService } from 'user/user.service';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('users')
  async createUser(
    @Body('user') createUserDto: CreateUserDto,
  ): Promise<UserEntity> {
    return this.userService.createUser(createUserDto);
  }
}
