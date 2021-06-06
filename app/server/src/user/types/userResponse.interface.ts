import { UserType } from 'user/types/user.type';

export interface UserResponseInterface {
  user: UserType & { token: string };
}
