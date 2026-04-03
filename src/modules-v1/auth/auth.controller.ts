import { Request, Response } from 'express';
import { sr } from '../../lib/utils';
import { Controller, Post } from '../../lib/core/httpSetup';
import AuthService from './auth.service';

@Controller('/auth')
export default class AuthController {
  @Post('/login')
  async login(req: Request, res: Response) {
    const result = await AuthService.login(req.body);

    return sr(result);
  }
}
