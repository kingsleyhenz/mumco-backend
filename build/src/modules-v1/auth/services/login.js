"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = __importDefault(require("lodash"));
const validators_1 = require("../validators");
const utils_1 = require("../../../lib/utils");
const UserRepo_1 = __importDefault(require("../../../database/repositories/UserRepo"));
const errors_1 = require("../../../lib/errors");
const auth_1 = require("../../../lib/utils/auth");
exports.default = (0, utils_1.wrapServiceAction)({
    schema: validators_1.LoginRequest,
    handler: async (params) => {
        const user = await UserRepo_1.default.getUserByEmail(params.email);
        if (!user) {
            throw new errors_1.ServiceError(errors_1.ErrorMessages.LOGIN_CREDENTIALS_INVALID);
        }
        const passwordsMatch = await (0, utils_1.bcryptCompare)(params.password, user.password);
        if (!passwordsMatch) {
            throw new errors_1.ServiceError(errors_1.ErrorMessages.LOGIN_CREDENTIALS_INVALID);
        }
        const { token, expires } = await (0, auth_1.createSession)(user);
        return {
            user: lodash_1.default.omit(user, UserRepo_1.default.sensitiveData),
            token,
            tokenExpiresOn: new Date(expires).toISOString(),
        };
    },
});
