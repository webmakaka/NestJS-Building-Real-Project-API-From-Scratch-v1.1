import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from 'user/dto/createUser.dto';
import { UserResponseInterface } from 'user/types/userResponse.interface';
import { UserService } from 'user/user.service';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Post('users')
  async createUser(
    @Body('user') createUserDto: CreateUserDto,
  ): Promise<UserResponseInterface> {
    const user = await this.userService.createUser(createUserDto);
    return this.userService.buildUserResponse(user);
  }
}
