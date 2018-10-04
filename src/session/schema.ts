import { email, password } from '../shared/schema';

export const loginSchema = {
  email: email.required(),
  password: password.required()
};