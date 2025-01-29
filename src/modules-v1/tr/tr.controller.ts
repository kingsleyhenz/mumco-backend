import { Request, Response, Router } from 'express';
import TrService from './tr.service';
import { Controller, Post } from '../../lib/core/httpSetup';
import { sr } from '../../lib/utils';

@Controller('/tr')
export default class TrController {
  @Post('/test')
  async createTr(req: Request, res: Response) {
    const result = await TrService.createTr(req.body);

    return sr(result)
  }
}
