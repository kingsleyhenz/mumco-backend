import { Request } from 'express';

interface Session {
  userId: string;
  user: Omit<User, 'password'>;
  [key: string]: any;
}

export interface AuthenticatedRequest extends Request {
  session: Session;
}

export interface ServiceActionResult {
  data: any;
  message?: string;
  statusCode?: number;
}