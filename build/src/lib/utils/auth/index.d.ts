import { User } from '@prisma/client';
export declare const createSession: (user: User) => Promise<{
    token: string;
    expires: number;
}>;
