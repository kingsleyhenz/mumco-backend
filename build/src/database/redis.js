"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ioredis_1 = __importDefault(require("ioredis"));
const config_1 = __importDefault(require("../config"));
const { password, username, host, port, tls } = config_1.default.redis;
const extractedConfig = {
    password,
    username,
    tls: tls === 'yes'
        ? {
            requestCert: true,
            rejectUnauthorized: true,
        }
        : undefined,
};
const redis = config_1.default.redis.mode === 'cluster'
    ? new ioredis_1.default.Cluster([
        {
            port,
            host,
        },
    ], {
        redisOptions: {
            ...extractedConfig,
        },
    })
    : new ioredis_1.default({
        port: config_1.default.redis.port,
        host: config_1.default.redis.host,
        ...extractedConfig,
    });
exports.default = redis;
