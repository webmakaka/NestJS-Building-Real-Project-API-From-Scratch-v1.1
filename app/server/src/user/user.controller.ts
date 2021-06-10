import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  UseGuards,
  UsePipes
} from '@nestjs/common';
import {BackendValidationPipe} from 'shared/pipes/backendValidation.pipe';
import {User} from 'user/decorators/user.decorator';
import {CreateUserDto} from 'user/dto/createUser.dto';
import {LoginUserDto} from 'user/dto/login.dto';
import {UpdateUserDto} from 'user/dto/updateUser.dto';
import {AuthGuard} from 'user/guards/auth.guard';
import {IUserResponse} from 'user/types/userResponse.interface';
import {UserEntity} from 'user/user.entity';
import {UserService} from 'user/user.service';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('users')
  @UsePipes(new BackendValidationPipe())
  async createUser(
    @Body('user') createUserDto: CreateUserDto,
  ): Promise<IUserResponse> {
    const user = await this.userService.createUser(createUserDto);
    return this.userService.buildUserResponse(user);
  }

  @Post('users/login')
  @UsePipes(new BackendValidationPipe())
  async login(
    @Body('user') loginUserDto: LoginUserDto,
  ): Promise<IUserResponse> {
    const user = await this.userService.login(loginUserDto);
    return this.userService.buildUserResponse(user);
  }

  @Get('user')
  @UseGuards(AuthGuard)
  async currentUser(@User() user: UserEntity): Promise<IUserResponse> {
    return this.userService.buildUserResponse(user);
  }

  @Put('user')
  @UseGuards(AuthGuard)
  async updateCurrentUser(
    @User('id') currentUserId: number,
    @Body('user') updateUserDto: UpdateUserDto,
  ): Promise<IUserResponse> {
    const user = await this.userService.updateUser(
      currentUserId,
      updateUserDto,
    );
    return this.userService.buildUserResponse(user);
  }
}
