"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable no-await-in-loop */
const lodash_1 = require("lodash");
const utils_1 = require("../../../lib/utils");
const errors_1 = require("../../../lib/errors");
const UserRepo_1 = __importDefault(require("../../../database/repositories/UserRepo"));
const validators_1 = require("../validators");
exports.default = (0, utils_1.wrapServiceAction)({
    schema: validators_1.ProfileUpdateRequest,
    handler: async (params) => {
        let user = await UserRepo_1.default.getUserById(params.userId);
        if (!user) {
            throw new errors_1.NotFoundError(errors_1.ErrorMessages.ITEM_NOT_FOUND.replace('%k', 'user'));
        }
        user = await UserRepo_1.default.updateUserById(params.userId, {
            firstName: params.firstName,
            lastName: params.lastName,
        });
        return (0, lodash_1.omit)(user, UserRepo_1.default.sensitiveData);
    },
});
