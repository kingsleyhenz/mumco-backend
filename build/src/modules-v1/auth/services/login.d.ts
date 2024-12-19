import { LoginRequest } from '../validators';
declare const _default: (params: LoginRequest) => Promise<Promise<{
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
