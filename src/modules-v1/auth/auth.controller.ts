import { omit } from 'lodash';
import { Request, Response } from 'express';
import { sr } from '../../lib/utils';
import { AuthenticatedRequest } from '../../types';
import UserRepo from '../../database/repositories/UserRepo';
import { Controller, Get, Patch, Post } from '../../lib/core/httpSetup';
import isAuthenticatedUser from '../../middleware/auth/isAuthenticatedUser';
import AuthService from './auth.service';

@Controller('/auth')
export default class AuthController {
  @Post('/login')
  // you have access to the response object, res.
  // e.g async login(req: Request, res: Response) {
  async login(req: Request, res: Response) {
    const result = await AuthService.login(req.body);

    return sr(result);
  }

  @Post('/register')
  async register(req: Request, res: Response) {
    const result = await AuthService.register(req.body);

    return sr(result);
  }

  @Post('/email/verify')
  async verifyEmail(req: Request, res: Response) {
    const result = await AuthService.verifyEmail(req.body);

    return sr(result);
  }

  @Patch('/profile', [isAuthenticatedUser()])
  async updateProfile(req: AuthenticatedRequest, res: Response) {
    const result = await AuthService.updateProfile({
      ...omit(req.body, ['userId']),
      userId: req.session.userId,
    });

    return sr(result);
  }

  @Get('/user', [isAuthenticatedUser()])
  async getUser(req: AuthenticatedRequest, res: Response) {
    return sr(omit(req.session.user, UserRepo.sensitiveData));
  }
}
