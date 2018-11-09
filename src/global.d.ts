import { User } from './user/entity';

declare module 'koa' {
  interface Context {
    user: User;
  }
}