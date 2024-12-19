import { User, Prisma } from "@prisma/client";
export default class UserRepo {
    static sensitiveData: string[];
    static getUserById: (id: string) => Promise<{
        password: string;
        email: string;
        id: string;
        firstName: string;
        lastName: string;
        emailVerifiedAt: Date | null;
    } | null>;
    static getUserByClause: (clause: Prisma.UserWhereUniqueInput) => Promise<{
        password: string;
        email: string;
        id: string;
        firstName: string;
        lastName: string;
        emailVerifiedAt: Date | null;
    } | null>;
    static getUserByEmail: (email: string) => Promise<{
        password: string;
        email: string;
        id: string;
        firstName: string;
        lastName: string;
        emailVerifiedAt: Date | null;
    } | null>;
    static createUser: (data: Prisma.UserCreateInput) => Promise<{
        password: string;
        email: string;
        id: string;
        firstName: string;
        lastName: string;
        emailVerifiedAt: Date | null;
    }>;
    static updateUserById: (id: string, data: Partial<User>) => Promise<{
        password: string;
        email: string;
        id: string;
        firstName: string;
        lastName: string;
        emailVerifiedAt: Date | null;
    } | null>;
}
