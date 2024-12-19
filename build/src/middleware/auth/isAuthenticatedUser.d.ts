import { type Response, type NextFunction } from 'express';
import { type AuthenticatedRequest } from '../../types';
import { TokenFlag } from '../../database/enum';
declare const _default: (tokenFlag?: TokenFlag) => (req: AuthenticatedRequest, res: Response, next: NextFunction) => Promise<void>;
export default _default;
