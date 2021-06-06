import { UserEntity } from 'user/user.entity';

export type UserType = Omit<UserEntity, 'hashPassword'>;
