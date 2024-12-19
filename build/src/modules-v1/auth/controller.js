"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
const utils_1 = require("../../lib/utils");
const login_1 = __importDefault(require("./services/login"));
const register_1 = __importDefault(require("./services/register"));
const verifyEmail_1 = __importDefault(require("./services/verifyEmail"));
const updateProfile_1 = __importDefault(require("./services/updateProfile"));
const UserRepo_1 = __importDefault(require("../../database/repositories/UserRepo"));
class AuthController {
}
_a = AuthController;
AuthController.login = async (req, res) => {
    const result = await (0, login_1.default)(req.body);
    return res.send((0, utils_1.successResponse)({
        data: result,
    }));
};
AuthController.register = async (req, res) => {
    const result = await (0, register_1.default)(req.body);
    return res.send((0, utils_1.successResponse)({
        data: result,
    }));
};
AuthController.verifyEmail = async (req, res) => {
    const result = await (0, verifyEmail_1.default)(req.body);
    return res.send((0, utils_1.successResponse)({
        data: result,
    }));
};
AuthController.updateProfile = async (req, res) => {
    const result = await (0, updateProfile_1.default)({
        ...(0, lodash_1.omit)(req.body, ['userId']),
        userId: req.session.userId,
    });
    return res.send((0, utils_1.successResponse)({
        data: result,
    }));
};
// public static getProfile = async (req: AuthenticatedRequest, res: Response) => {
//   const result = await getProfile({
//     userId: req.session.userId,
//     role: req.session.userRole,
//   });
//   return res.send(
//     successResponse({
//       data: result,
//     })
//   );
// };
AuthController.getUser = async (req, res) => {
    return res.send((0, utils_1.successResponse)({
        data: (0, lodash_1.omit)(req.session.user, UserRepo_1.default.sensitiveData),
    }));
};
exports.default = AuthController;
