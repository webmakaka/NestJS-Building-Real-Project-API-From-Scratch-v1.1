import {Controller, Get, Param} from '@nestjs/common';
import {ProfileService} from 'profile/profile.service';
import {IProfileResponse} from 'profile/types/profileResponse.interface';
import {User} from 'user/decorators/user.decorator';

@Controller('profiles')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Get(':username')
  async getProfile(
    @User('id') currentUserId: number,
    @Param('username') profileUserName: string,
  ): Promise<IProfileResponse> {
    const profile = await this.profileService.getProfile(
      currentUserId,
      profileUserName,
    );

    return this.profileService.buildProfileResponse(profile);
  }
}
