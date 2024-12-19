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
exports.createSession = void 0;
const moment_1 = __importDefault(require("moment"));
const utils = __importStar(require("../index"));
const redis_1 = __importDefault(require("../../../database/redis"));
const enum_1 = require("../../../database/enum");
// eslint-disable-next-line import/prefer-default-export
const createSession = async (user) => {
    const token = await utils.generateJWTToken({ userId: user.id, flag: enum_1.TokenFlag.AUTH });
    const decodedToken = await utils.decodeToken(token);
    const sessionKeyPrefix = `sessions:${user.id}`;
    const sessionKey = `${sessionKeyPrefix}:${decodedToken.counter}`;
    const expires = (0, moment_1.default)().diff((0, moment_1.default)(decodedToken.exp), 'seconds');
    await redis_1.default.setex(sessionKey, expires, token);
    await redis_1.default.sadd(sessionKeyPrefix, sessionKey);
    await redis_1.default.expire(sessionKeyPrefix, expires);
    return { token, expires: decodedToken.exp * 1000 };
};
exports.createSession = createSession;
