"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateConfig = exports.AppEnvironmentEnum = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = require("path");
dotenv_1.default.config({
    path: process.env.ENV_FILE_PATH,
});
var AppEnvironmentEnum;
(function (AppEnvironmentEnum) {
    AppEnvironmentEnum["TEST"] = "test";
    AppEnvironmentEnum["LOCAL"] = "local";
    AppEnvironmentEnum["DEVELOPMENT"] = "development";
    AppEnvironmentEnum["STAGING"] = "staging";
    AppEnvironmentEnum["PRODUCTION"] = "production";
})(AppEnvironmentEnum = exports.AppEnvironmentEnum || (exports.AppEnvironmentEnum = {}));
const isTestEnvironment = process.env.APP_ENV === AppEnvironmentEnum.TEST;
const config = {
    env: {
        isProduction: process.env.NODE_ENV === AppEnvironmentEnum.PRODUCTION,
        isDevelopment: process.env.NODE_ENV === AppEnvironmentEnum.DEVELOPMENT,
        isTest: process.env.NODE_ENV === AppEnvironmentEnum.TEST,
    },
    app: {
        name: process.env.APP_NAME,
        domain: process.env.APP_DOMAIN,
        logo: process.env.APP_LOGO,
        env: process.env.APP_ENV,
        isProduction: process.env.APP_ENV === AppEnvironmentEnum.PRODUCTION,
        secret: process.env.APP_SECRET,
        bcryptRounds: 10,
        port: +process.env.PORT,
        // frontendDomain: process.env.APP_FRONTEND_DOMAIN!,
        templatePath: (0, path_1.join)(__dirname, "lib", "mail", "templates"),
    },
    db: {
        databaseUrl: process.env.DATABASE_URL,
    },
    redis: {
        mode: process.env.REDIS_MODE || "standalone",
        host: process.env.REDIS_HOST,
        port: +process.env.REDIS_PORT,
        password: process.env.REDIS_PASSWORD,
        username: process.env.REDIS_USERNAME,
        tls: process.env.REDIS_TLS,
    },
    sendgrid: {
        apiKey: process.env.SENDGRID_API_KEY,
        from: process.env.SENDGRID_EMAIL_FROM,
    },
    // s3: {
    //   endpoint: process.env.S3_ENDPOINT!,
    //   accessKey: process.env.S3_ACCESS_KEY!,
    //   secretKey: process.env.S3_SECRET_KEY!,
    //   bucket: process.env.S3_BUCKET!,
    //   region: process.env.S3_REGION!,
    // },
};
const validateConfig = (options) => {
    const missingKeys = [];
    Object.entries(config).forEach(([baseKey, baseValue]) => {
        Object.entries(baseValue).forEach(([key, value]) => {
            var _a;
            if ((value === "" || value === undefined) &&
                !((_a = options === null || options === void 0 ? void 0 : options.exceptions) === null || _a === void 0 ? void 0 : _a.includes(`${baseKey}.${key}`))) {
                missingKeys.push(`${baseKey}.${key}`);
            }
        });
    });
    if (missingKeys.length) {
        global.console.error(`The following configuration keys are not set: ${missingKeys.join(", ")}`);
        process.exit(1);
    }
};
exports.validateConfig = validateConfig;
(0, exports.validateConfig)({
    exceptions: ["redis.username", "redis.tls", "s3.endpoint"],
});
exports.default = config;
