import { EmailPasswordRequest, UserIdRequest } from '../../../lib/validators/global';
export declare class RegisterRequest {
    email: string;
    firstName: string;
    lastName: string;
    password: string;
}
export declare class ProfileRequest extends UserIdRequest {
}
export declare class ProfileUpdateRequest extends UserIdRequest {
    firstName?: string;
    lastName?: string;
}
export declare class VerifyEmailRequest {
    email: string;
    token: string;
}
export declare class LoginRequest extends EmailPasswordRequest {
}
