import { ClassConstructor } from 'class-transformer';
import { ValidationError as CValidationError, ValidatorOptions } from 'class-validator';
import { JwtPayload } from 'jsonwebtoken';
import { ErrorObject } from '../errors';
export declare const getAllConstraints: (errors: CValidationError[]) => Record<string, string>[];
export declare const getErrorObject: (errors: CValidationError[], prefix?: string) => ErrorObject;
export declare function transformAndValidate<T, V>(params: {
    schema: ClassConstructor<T>;
    body: V;
    options?: ValidatorOptions;
}): Promise<ErrorObject | null>;
export declare function wrapServiceAction<T, V extends (args: any) => any>(params: {
    schema: ClassConstructor<T>;
    handler: V;
}): (...funcArgs: Parameters<V>) => Promise<ReturnType<V>>;
export declare function successResponse(result: {
    message?: string;
    data: any;
}): {
    message: string;
    data: any;
    status: string;
};
export declare function generateRandomCode(length: number): string;
export declare function generateHash(seed: string): string;
export declare function bcryptHash(password: string): Promise<string>;
export declare function bcryptCompare(password: string, hash: string): Promise<boolean>;
export declare function generateJWTToken(payload: Record<string, any>, secret?: string, expiresIn?: string): Promise<string>;
export declare function decodeToken(token: string): Promise<JwtPayload>;
export declare function calcSkip({ page, limit }: {
    page: number;
    limit: number;
}): number;
export declare function paginateResponse(data: [any[], number], page: number, take: number): {
    data: any[];
    pageData: {
        total: number;
        currentPage: number;
        nextPage: number | null;
        prevPage: number | null;
        lastPage: number;
    };
};
