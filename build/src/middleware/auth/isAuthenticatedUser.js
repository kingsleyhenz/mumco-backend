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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
const errors_1 = require("../../lib/errors");
const utils = __importStar(require("../../lib/utils"));
const UserRepo_1 = __importDefault(require("../../database/repositories/UserRepo"));
const redis_1 = __importDefault(require("../../database/redis"));
const enum_1 = require("../../database/enum");
exports.default = (tokenFlag = enum_1.TokenFlag.AUTH) => async (req, res, next) => {
    try {
        const authorization = req.header('authorization') || '';
        const token = authorization.split(' ')[1];
        if (!token) {
            next(new errors_1.AuthenticationError('you need to be authenticated to access this endpoint'));
            return;
        }
        const { userId, flag, counter } = await utils.decodeToken(token);
        if (!userId) {
            next(new errors_1.AuthenticationError('unable to verify token'));
            return;
        }
        if (flag !== tokenFlag) {
            next(new errors_1.AuthenticationError(`token is not valid for ${tokenFlag}`));
            return;
        }
        const user = await UserRepo_1.default.getUserById(userId);
        const session = await redis_1.default.get(`sessions:${userId}:${counter}`);
        if (user == null || (tokenFlag === enum_1.TokenFlag.AUTH && !session)) {
            next(new errors_1.AuthenticationError('token is invalid'));
            return;
        }
        req.session = {
            userId: user.id,
            user: (0, lodash_1.omit)(user, ['password']),
        };
        next();
        return;
    }
    catch (e) {
        switch (e.name) {
            case 'TokenExpiredError': {
                next(new errors_1.AuthenticationError('token has expired'));
                return;
            }
            case 'JsonWebTokenError': {
                next(new errors_1.AuthenticationError(e.message));
                return;
            }
            case 'NotBeforeError': {
                next(new errors_1.AuthenticationError(e.message));
                return;
            }
            default: {
                next(e);
            }
        }
    }
};
