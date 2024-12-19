export declare class GenericError extends Error {
    statusCode: number;
    constructor(message: string, statusCode?: number);
}
export declare class ServiceError extends GenericError {
}
export declare class NotFoundError extends GenericError {
    constructor(message: string);
}
export declare class ValidationError extends GenericError {
    errors: ErrorObject;
    constructor(errors?: ErrorObject);
}
export declare class AuthenticationError extends GenericError {
    constructor(message: string);
}
export declare class AuthorizationError extends GenericError {
    constructor(message?: string);
}
export type ErrorObject = {
    [key: string]: string[];
};
export * from './messages';
