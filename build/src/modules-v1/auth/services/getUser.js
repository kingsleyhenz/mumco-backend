"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
const utils_1 = require("../../../lib/utils");
const UserRepo_1 = __importDefault(require("../../../database/repositories/UserRepo"));
const errors_1 = require("../../../lib/errors");
const global_1 = require("../../../lib/validators/global");
exports.default = (0, utils_1.wrapServiceAction)({
    schema: global_1.UserIdRequest,
    handler: async (params) => {
        const user = await UserRepo_1.default.getUserById(params.userId);
        if (!user)
            throw new errors_1.NotFoundError(errors_1.ErrorMessages.ITEM_NOT_FOUND.replace('%k', 'user'));
        return { user: (0, lodash_1.omit)(user, UserRepo_1.default.sensitiveData) };
    },
});
