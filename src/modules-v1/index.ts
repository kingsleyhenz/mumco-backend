import { Router } from 'express';
import { setupControllers } from '../lib/core/httpSetup';
import AuthController from './auth/auth.controller';
import EventsController from './events/events.controller';


const router = Router();

setupControllers(router, [AuthController, EventsController]);


export default router;
