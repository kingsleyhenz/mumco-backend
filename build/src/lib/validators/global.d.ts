export declare class EmailRequest {
    email: string;
}
export declare class EmailPasswordRequest {
    email: string;
    password: string;
}
export declare class UserIdRequest {
    userId: string;
}
export declare class LevelIdRequest {
    levelId: string;
}
export declare class PaginationRequest {
    page: number;
    limit: number;
}
export declare class LevelPaginationRequest extends PaginationRequest {
    levelId: string;
}
export declare class StudentIdRequest {
    studentId: string;
}
export declare class IdRequest {
    id: string;
}
export declare class IdWithUserIdRequest extends UserIdRequest {
    id: string;
}
export declare class SchoolSessionRequest {
    sessionId: string;
}
export declare class OrganizationWithUserIdRequest extends UserIdRequest {
    organizationId: string;
}
export declare class OrganizationRequest {
    organizationId: string;
}
export declare class OrganizationWithIdRequest extends IdRequest {
    organizationId: string;
}
export declare class EmptyRequest {
}
