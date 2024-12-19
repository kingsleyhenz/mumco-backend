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
require("reflect-metadata");
const http_1 = __importDefault(require("http"));
const stoppable_1 = __importDefault(require("stoppable"));
const initialize_1 = __importDefault(require("./initialize"));
const config_1 = __importDefault(require("./config"));
const logger_1 = require("./lib/logger");
const database_1 = require("./database");
const startServer = async () => {
    global.isStartingUp = true;
    const app = (await Promise.resolve().then(() => __importStar(require('./app')))).default;
    const server = (0, stoppable_1.default)(http_1.default.createServer(app));
    server.listen(config_1.default.app.port, () => {
        logger_1.generalLogger.info(`! Server Started and Listening on Port: ${config_1.default.app.port} with PID: ${process.pid}`);
        global.isStartingUp = false;
    });
    process.on('SIGTERM', async () => {
        global.isShuttingDown = true;
        logger_1.generalLogger.info('Starting graceful server shutdown');
        // wait for readiness probe to start failing before stopping the server
        await new Promise((resolve) => setTimeout(resolve, 15 * 1000));
        server.stop(() => {
            (0, database_1.disconnectDB)()
                .then(() => {
                logger_1.generalLogger.info('Graceful server shutdown completed');
                setTimeout(() => process.exit(0), 1000);
            })
                .catch((e) => {
                logger_1.errorLogger.error(`error disconnecting db: ${e.message}`);
            });
        });
    });
};
const start = async () => {
    try {
        await (0, initialize_1.default)();
        // await runMigrations();
        // await seedAll()
        await startServer();
    }
    catch (e) {
        logger_1.generalLogger.error(e);
        process.exit(1);
    }
};
exports.default = start();
