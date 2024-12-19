import { ValidationOptions } from 'class-validator';
export declare function IsEmail(validationOptions?: ValidationOptions): (object: Object, propertyName: string) => void;
export declare function IsPhoneNumber(validationOptions?: ValidationOptions): (object: Object, propertyName: string) => void;
export declare function IsDependentOn<T>(property: string, basedOn: T, validationOptions?: ValidationOptions): (object: Object, propertyName: string) => void;
export declare const TransformToLowerCase: () => PropertyDecorator;
export declare const TransformToUpperCase: () => PropertyDecorator;
export declare const TransformTrim: () => PropertyDecorator;
