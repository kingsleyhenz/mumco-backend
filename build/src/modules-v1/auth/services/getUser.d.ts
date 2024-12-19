import { UserIdRequest } from '../../../lib/validators/global';
declare const _default: (params: UserIdRequest) => Promise<Promise<{
    user: Partial<{
        password: string;
        email: string;
        id: string;
        firstName: string;
        lastName: string;
        emailVerifiedAt: Date | null;
    }>;
}>>;
export default _default;
