import { Request, Response } from 'express';
import { Controller, Delete, Get, Patch, Post } from '../../lib/core/httpSetup';
import { sr } from '../../lib/utils';
import isAuthenticatedUser from '../../middleware/auth/isAuthenticatedUser';
import upload from '../../middleware/fileUpload';
import { AuthenticatedRequest } from '../../types';
import EventsService from './events.service';

@Controller('/events')
export default class EventsController {
  @Get('/')
  async getEvents(req: Request, res: Response) {
    const result = await EventsService.getEvents();
    return sr(result);
  }

  @Post('/', [isAuthenticatedUser(), upload.array('files', 10)])
  async createEvent(req: AuthenticatedRequest, res: Response) {
    const result = await EventsService.createEvent(req.body, (req.files as Express.Multer.File[]) || []);
    return sr(result);
  }

  @Patch('/:eventId', [isAuthenticatedUser(), upload.array('files', 10)])
  async updateEvent(req: AuthenticatedRequest, res: Response) {
    const result = await EventsService.updateEvent(
      req.body,
      req.params.eventId,
      (req.files as Express.Multer.File[]) || [],
    );
    return sr(result);
  }

  @Delete('/:eventId', [isAuthenticatedUser()])
  async deleteEvent(req: AuthenticatedRequest, res: Response) {
    const result = await EventsService.deleteEvent({ eventId: req.params.eventId });
    return sr(result);
  }
}
