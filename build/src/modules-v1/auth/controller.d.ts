import { Request, Response } from 'express';
import { AuthenticatedRequest } from '../../types';
export default class AuthController {
    static login: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    static register: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    static verifyEmail: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    static updateProfile: (req: AuthenticatedRequest, res: Response) => Promise<Response<any, Record<string, any>>>;
    static getUser: (req: AuthenticatedRequest, res: Response) => Promise<Response<any, Record<string, any>>>;
}
