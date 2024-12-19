import { ProfileUpdateRequest } from '../validators';
declare const _default: (params: ProfileUpdateRequest) => Promise<Promise<Partial<{
    password: string;
    email: string;
    id: string;
    firstName: string;
    lastName: string;
    emailVerifiedAt: Date | null;
}>>>;
export default _default;
