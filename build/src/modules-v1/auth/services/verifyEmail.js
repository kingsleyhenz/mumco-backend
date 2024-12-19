"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable no-await-in-loop */
const lodash_1 = require("lodash");
const redis_1 = __importDefault(require("../../../database/redis"));
const utils_1 = require("../../../lib/utils");
const errors_1 = require("../../../lib/errors");
const UserRepo_1 = __importDefault(require("../../../database/repositories/UserRepo"));
const validators_1 = require("../validators");
const auth_1 = require("../../../lib/utils/auth");
exports.default = (0, utils_1.wrapServiceAction)({
    schema: validators_1.VerifyEmailRequest,
    handler: async (params) => {
        const user = await UserRepo_1.default.getUserByEmail(params.email);
        if (!user) {
            throw new errors_1.ServiceError(errors_1.ErrorMessages.ITEM_NOT_FOUND.replace('%k', 'user'));
        }
        const verificationKey = `verification:email:${user.id}`;
        const existingToken = await redis_1.default.get(verificationKey);
        if (!existingToken) {
            throw new errors_1.ServiceError(errors_1.ErrorMessages.EMAIL_VERIFICATION_LINK_EXPIRED);
        }
        await Promise.all([
            UserRepo_1.default.updateUserById(user.id, {
                emailVerifiedAt: new Date(),
            }),
            redis_1.default.del(verificationKey),
        ]);
        const { token, expires } = await (0, auth_1.createSession)(user);
        return {
            user: (0, lodash_1.omit)(user, UserRepo_1.default.sensitiveData),
            token,
            tokenExpiresOn: new Date(expires).toISOString(),
        };
    },
});
