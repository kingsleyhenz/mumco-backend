import { type Request, type Response, type NextFunction } from 'express';
import { type GenericError } from '../../lib/errors';
declare const _default: (err: GenericError, req: Request, res: Response, next: NextFunction) => void | Response;
export default _default;
