"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controller_1 = __importDefault(require("./controller"));
const isAuthenticatedUser_1 = __importDefault(require("../../middleware/auth/isAuthenticatedUser"));
const enum_1 = require("../../database/enum");
const router = (0, express_1.Router)();
router.post('/login', controller_1.default.login);
router.post('/register', controller_1.default.register);
router.post('/email/verify', controller_1.default.verifyEmail);
router.get('/user', (0, isAuthenticatedUser_1.default)(), controller_1.default.getUser);
router.patch('/profile', (0, isAuthenticatedUser_1.default)(enum_1.TokenFlag.AUTH), controller_1.default.updateProfile);
exports.default = router;
