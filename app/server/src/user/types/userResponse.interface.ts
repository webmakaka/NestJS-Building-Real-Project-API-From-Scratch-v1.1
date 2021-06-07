import { UserType } from 'user/types/user.type';

export interface IUserResponse {
  user: UserType & { token: string };
}
