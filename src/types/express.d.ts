import { JwtPayload } from 'jsonwebtoken';
import { UserAttributes } from '../models/user';

declare module 'express-serve-static-core' {
  interface Request {
    user?: JwtPayload | string | UserAttributes; // or whatever type you expect for `user`
  }
}