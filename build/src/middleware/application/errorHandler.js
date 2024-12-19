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
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const errors_1 = require("../../lib/errors");
const logger_1 = require("../../lib/logger");
const config_1 = __importStar(require("../../config"));
const logError = (err, req) => {
    logger_1.errorLogger.error(err.message, {
        url: req.originalUrl,
        method: req.method,
        body: req.body,
        stack: err.stack,
    });
};
exports.default = (err, req, res, next) => {
    if (res.headersSent) {
        next(err);
        return {};
    }
    switch (err.name) {
        case errors_1.ServiceError.name:
        case errors_1.NotFoundError.name:
        case errors_1.AuthenticationError.name:
        case errors_1.AuthorizationError.name:
            if (config_1.default.env.isTest)
                logError(err, req);
            return res.status(err.statusCode).send({
                status: 'error',
                message: err.message,
            });
        case errors_1.ValidationError.name:
            if (config_1.default.env.isTest)
                logError(err, req);
            return res.status(err.statusCode).send({
                status: 'error',
                message: err.message,
                errors: err.errors,
            });
        case SyntaxError.name: // for json parser
            return res.status(err.statusCode).send({
                status: 'error',
                message: 'invalid json body',
            });
        default:
            logError(err, req);
            return res.status(500).send({
                status: 'error',
                message: 'an error occurred',
                ...([config_1.AppEnvironmentEnum.LOCAL, config_1.AppEnvironmentEnum.DEVELOPMENT].includes(config_1.default.app.env)
                    ? { stack: err.stack }
                    : {}),
            });
    }
};
