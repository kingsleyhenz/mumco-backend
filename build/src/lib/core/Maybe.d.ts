export interface IEnsure<T, R> {
    data: T;
    handler: (wrapped: T) => Promise<R>;
    customError?: (data: T) => void;
    customMessage?: string;
    tag?: string;
}
export interface IEnsureArray<T, R> {
    data: T[];
    handler: (wrapped: T) => Promise<R>;
    tag?: string;
    customMessage?: string;
    customError?: (data?: T) => void;
}
export default class Maybe {
    static ensure: <T, R>({ data, handler, tag, customError, customMessage }: IEnsure<T, R>) => Promise<NonNullable<Awaited<R>>>;
    static ensureAll: <T, R>({ data, handler, tag, customError, customMessage }: IEnsureArray<T, R>) => Promise<Awaited<Awaited<R> & {}>[]>;
    static ensureAllNot: <T, R>({ data, handler, tag, customError, customMessage }: IEnsureArray<T, R>) => Promise<void[]>;
    static ensureNot: <T, R>({ data, handler, tag, customError, customMessage }: IEnsure<T, R>) => Promise<void>;
}
