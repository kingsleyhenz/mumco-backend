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
exports.LoginRequest = exports.VerifyEmailRequest = exports.ProfileUpdateRequest = exports.ProfileRequest = exports.RegisterRequest = void 0;
/* eslint-disable max-classes-per-file */
const class_validator_1 = require("class-validator");
const validators_1 = require("../../../lib/validators");
const global_1 = require("../../../lib/validators/global");
class RegisterRequest {
}
__decorate([
    (0, validators_1.IsEmail)(),
    (0, validators_1.TransformToLowerCase)(),
    __metadata("design:type", String)
], RegisterRequest.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], RegisterRequest.prototype, "firstName", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], RegisterRequest.prototype, "lastName", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(6, {
        message: 'Password should contain at least 6 characters',
    }),
    __metadata("design:type", String)
], RegisterRequest.prototype, "password", void 0);
exports.RegisterRequest = RegisterRequest;
class ProfileRequest extends global_1.UserIdRequest {
}
exports.ProfileRequest = ProfileRequest;
class ProfileUpdateRequest extends global_1.UserIdRequest {
}
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], ProfileUpdateRequest.prototype, "firstName", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], ProfileUpdateRequest.prototype, "lastName", void 0);
exports.ProfileUpdateRequest = ProfileUpdateRequest;
class VerifyEmailRequest {
}
__decorate([
    (0, validators_1.IsEmail)(),
    (0, validators_1.TransformToLowerCase)(),
    __metadata("design:type", String)
], VerifyEmailRequest.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], VerifyEmailRequest.prototype, "token", void 0);
exports.VerifyEmailRequest = VerifyEmailRequest;
class LoginRequest extends global_1.EmailPasswordRequest {
}
exports.LoginRequest = LoginRequest;
