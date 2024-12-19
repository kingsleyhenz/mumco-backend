import { VerifyEmailRequest } from '../validators';
declare const _default: (params: VerifyEmailRequest) => Promise<Promise<{
    user: Partial<{
        password: string;
        email: string;
        id: string;
        firstName: string;
        lastName: string;
        emailVerifiedAt: Date | null;
    }>;
    token: string;
    tokenExpiresOn: string;
}>>;
export default _default;
