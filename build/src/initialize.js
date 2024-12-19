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
require("express-async-errors");
const database_1 = require("./database");
const notFoundHandler_1 = __importDefault(require("./middleware/application/notFoundHandler"));
const errorHandler_1 = __importDefault(require("./middleware/application/errorHandler"));
const logger_1 = require("./lib/logger");
const createRedisConnection = async () => {
    const redis = (await Promise.resolve().then(() => __importStar(require('./database/redis')))).default;
    return new Promise((resolve, reject) => {
        redis.on('connect', () => {
            logger_1.generalLogger.info('connected to redis server');
            resolve(true);
        });
        redis.on('error', (error) => {
            logger_1.generalLogger.error('error connecting to redis', {
                error,
            });
            reject(error);
        });
    });
};
exports.default = async () => {
    await createRedisConnection();
    await (0, database_1.connectDB)();
    const app = (await Promise.resolve().then(() => __importStar(require('./app')))).default;
    const router = (await Promise.resolve().then(() => __importStar(require('./router')))).default;
    app.use(router);
    app.use(notFoundHandler_1.default);
    app.use(errorHandler_1.default);
};
