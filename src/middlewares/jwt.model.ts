import { JwtPayload } from 'jsonwebtoken';

export interface IJwtPayload extends JwtPayload {
  user: string,
  phoneNumber: string,
}