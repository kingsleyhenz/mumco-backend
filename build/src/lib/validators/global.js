"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmptyRequest = exports.OrganizationWithIdRequest = exports.OrganizationRequest = exports.OrganizationWithUserIdRequest = exports.SchoolSessionRequest = exports.IdWithUserIdRequest = exports.IdRequest = exports.StudentIdRequest = exports.LevelPaginationRequest = exports.PaginationRequest = exports.LevelIdRequest = exports.UserIdRequest = exports.EmailPasswordRequest = exports.EmailRequest = void 0;
/* eslint-disable max-classes-per-file */
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const _1 = require(".");
class EmailRequest {
}
__decorate([
    (0, _1.IsEmail)(),
    (0, _1.TransformToLowerCase)(),
    __metadata("design:type", String)
], EmailRequest.prototype, "email", void 0);
exports.EmailRequest = EmailRequest;
class EmailPasswordRequest {
}
__decorate([
    (0, _1.IsEmail)(),
    (0, _1.TransformToLowerCase)(),
    __metadata("design:type", String)
], EmailPasswordRequest.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(6, {
        message: 'Password should contain at least 6 characters',
    }),
    __metadata("design:type", String)
], EmailPasswordRequest.prototype, "password", void 0);
exports.EmailPasswordRequest = EmailPasswordRequest;
class UserIdRequest {
}
__decorate([
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], UserIdRequest.prototype, "userId", void 0);
exports.UserIdRequest = UserIdRequest;
class LevelIdRequest {
}
__decorate([
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], LevelIdRequest.prototype, "levelId", void 0);
exports.LevelIdRequest = LevelIdRequest;
class PaginationRequest {
    constructor() {
        this.page = 1;
        this.limit = 20;
    }
}
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Object)
], PaginationRequest.prototype, "page", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Max)(20),
    __metadata("design:type", Object)
], PaginationRequest.prototype, "limit", void 0);
exports.PaginationRequest = PaginationRequest;
class LevelPaginationRequest extends PaginationRequest {
}
__decorate([
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], LevelPaginationRequest.prototype, "levelId", void 0);
exports.LevelPaginationRequest = LevelPaginationRequest;
class StudentIdRequest {
}
__decorate([
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], StudentIdRequest.prototype, "studentId", void 0);
exports.StudentIdRequest = StudentIdRequest;
class IdRequest {
}
__decorate([
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], IdRequest.prototype, "id", void 0);
exports.IdRequest = IdRequest;
class IdWithUserIdRequest extends UserIdRequest {
}
__decorate([
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], IdWithUserIdRequest.prototype, "id", void 0);
exports.IdWithUserIdRequest = IdWithUserIdRequest;
class SchoolSessionRequest {
}
__decorate([
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], SchoolSessionRequest.prototype, "sessionId", void 0);
exports.SchoolSessionRequest = SchoolSessionRequest;
class OrganizationWithUserIdRequest extends UserIdRequest {
}
__decorate([
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], OrganizationWithUserIdRequest.prototype, "organizationId", void 0);
exports.OrganizationWithUserIdRequest = OrganizationWithUserIdRequest;
class OrganizationRequest {
}
__decorate([
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], OrganizationRequest.prototype, "organizationId", void 0);
exports.OrganizationRequest = OrganizationRequest;
class OrganizationWithIdRequest extends IdRequest {
}
__decorate([
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], OrganizationWithIdRequest.prototype, "organizationId", void 0);
exports.OrganizationWithIdRequest = OrganizationWithIdRequest;
class EmptyRequest {
}
exports.EmptyRequest = EmptyRequest;
