import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { IExpressRequest } from 'types/expressRequest.interface';
import { CreateUserDto } from 'user/dto/createUser.dto';
import { LoginUserDto } from 'user/dto/login.dto';
import { UserResponseInterface } from 'user/types/userResponse.interface';
import { UserService } from 'user/user.service';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('users')
  @UsePipes(new ValidationPipe())
  async createUser(
    @Body('user') createUserDto: CreateUserDto,
  ): Promise<UserResponseInterface> {
    const user = await this.userService.createUser(createUserDto);
    return this.userService.buildUserResponse(user);
  }

  @Post('users/login')
  @UsePipes(new ValidationPipe())
  async login(
    @Body('user') loginUserDto: LoginUserDto,
  ): Promise<UserResponseInterface> {
    const user = await this.userService.login(loginUserDto);
    return this.userService.buildUserResponse(user);
  }

  @Get('user')
  async currentUser(
    @Req() request: IExpressRequest,
  ): Promise<UserResponseInterface> {
    console.log(request.user);
    return this.userService.buildUserResponse(request.user);
  }
}
