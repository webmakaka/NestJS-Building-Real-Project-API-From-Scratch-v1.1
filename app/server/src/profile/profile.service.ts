import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {ProfileType} from 'profile/types/profile.type';
import {IProfileResponse} from 'profile/types/profileResponse.interface';
import {Repository} from 'typeorm';
import {UserEntity} from 'user/user.entity';

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async getProfile(
    currentUserId: number,
    profileUserName: string,
  ): Promise<ProfileType> {
    const user = await this.userRepository.findOne({
      username: profileUserName,
    });

    if (!user) {
      throw new HttpException(
        '[App] Profile does not exist',
        HttpStatus.NOT_FOUND,
      );
    }

    return { ...user, following: false };
  }

  buildProfileResponse(profile: ProfileType): IProfileResponse {
    delete profile.email;
    return { profile };
  }
}
