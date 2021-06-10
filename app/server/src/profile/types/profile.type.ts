import { UserType } from 'user/types/user.type';

export type ProfileType = UserType & { following: boolean };
