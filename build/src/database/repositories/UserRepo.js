"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = __importDefault(require(".."));
class UserRepo {
}
_a = UserRepo;
UserRepo.sensitiveData = ["password"];
UserRepo.getUserById = async (id) => {
    return __1.default.user.findUnique({ where: { id } });
};
UserRepo.getUserByClause = async (clause) => {
    return __1.default.user.findUnique({
        where: clause,
    });
};
UserRepo.getUserByEmail = async (email) => {
    return __1.default.user.findUnique({
        where: {
            email,
        },
    });
};
UserRepo.createUser = async (data) => {
    return __1.default.user.create({
        data,
    });
};
UserRepo.updateUserById = async (id, data) => {
    await __1.default.user.update({ where: { id }, data });
    return UserRepo.getUserById(id);
};
exports.default = UserRepo;
