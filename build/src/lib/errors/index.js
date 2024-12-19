"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthorizationError = exports.AuthenticationError = exports.ValidationError = exports.NotFoundError = exports.ServiceError = exports.GenericError = void 0;
// eslint-disable-next-line max-classes-per-file
class GenericError extends Error {
    constructor(message, statusCode = 400) {
        super(message);
        this.name = this.constructor.name;
        this.statusCode = statusCode;
        Error.captureStackTrace(this, this.constructor);
    }
}
exports.GenericError = GenericError;
class ServiceError extends GenericError {
}
exports.ServiceError = ServiceError;
class NotFoundError extends GenericError {
    constructor(message) {
        super(message, 404);
    }
}
exports.NotFoundError = NotFoundError;
class ValidationError extends GenericError {
    constructor(errors = {}) {
        super('validation error', 422);
        this.errors = errors;
    }
}
exports.ValidationError = ValidationError;
class AuthenticationError extends GenericError {
    constructor(message) {
        super(message, 401);
    }
}
exports.AuthenticationError = AuthenticationError;
class AuthorizationError extends GenericError {
    constructor(message = 'you are not authorized to perform this action') {
        super(message, 403);
    }
}
exports.AuthorizationError = AuthorizationError;
__exportStar(require("./messages"), exports);
