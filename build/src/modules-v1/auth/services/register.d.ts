import { RegisterRequest } from '../validators';
declare const _default: (params: RegisterRequest) => Promise<Promise<{
    user: Partial<{
        password: string;
        email: string;
        id: string;
        firstName: string;
        lastName: string;
        emailVerifiedAt: Date | null;
    }>;
    token: string;
}>>;
export default _default;
