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
/* eslint-disable no-await-in-loop */
const lodash_1 = __importDefault(require("lodash"));
const config_1 = __importDefault(require("../../../config"));
const utils = __importStar(require("../../../lib/utils"));
const redis_1 = __importDefault(require("../../../database/redis"));
const utils_1 = require("../../../lib/utils");
const errors_1 = require("../../../lib/errors");
const UserRepo_1 = __importDefault(require("../../../database/repositories/UserRepo"));
const enum_1 = require("../../../database/enum");
const validators_1 = require("../validators");
exports.default = (0, utils_1.wrapServiceAction)({
    schema: validators_1.RegisterRequest,
    handler: async (params) => {
        const existingUserWithEmail = await UserRepo_1.default.getUserByEmail(params.email);
        if (existingUserWithEmail) {
            throw new errors_1.ServiceError(errors_1.ErrorMessages.ITEM_EXISTS.replace('%k', 'a user with this email'));
        }
        const user = await UserRepo_1.default.createUser({
            email: params.email,
            firstName: params.firstName,
            lastName: params.lastName,
            password: await utils.bcryptHash(params.password),
        });
        const token = await utils.generateJWTToken({ userId: user.id, flag: enum_1.TokenFlag.EMAIL_VERIFICATION });
        const code = config_1.default.env.isProduction ? utils.generateRandomCode(64) : '12345';
        const hash = await utils.bcryptHash(code);
        await redis_1.default.setex(`verification:email:${user.id}`, 30 * 60, hash);
        // TODO: send verification mail
        return {
            user: lodash_1.default.omit(user, UserRepo_1.default.sensitiveData),
            token,
        };
    },
});
