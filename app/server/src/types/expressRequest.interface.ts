import { Request } from 'express';
import { UserEntity } from 'user/user.entity';

export interface IExpressRequest extends Request {
  user?: UserEntity;
}
