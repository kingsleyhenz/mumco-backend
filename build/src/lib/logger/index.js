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
Object.defineProperty(exports, "__esModule", { value: true });
exports.scriptLogger = exports.errorLogger = exports.routesLogger = exports.generalLogger = void 0;
const winston_1 = require("winston");
const winston_console_format_1 = require("winston-console-format");
const config_1 = __importStar(require("../../config"));
const { TEST, LOCAL } = config_1.AppEnvironmentEnum;
const consoleTransportOptions = [TEST, LOCAL].includes(config_1.default.app.env)
    ? {
        handleExceptions: true,
        format: winston_1.format.combine(winston_1.format.colorize({ all: true }), winston_1.format.padLevels(), (0, winston_console_format_1.consoleFormat)({
            showMeta: true,
            metaStrip: ['timestamp'],
            inspectOptions: {
                depth: Infinity,
                colors: true,
                maxArrayLength: Infinity,
                breakLength: 120,
                compact: Infinity,
            },
        })),
    }
    : { handleExceptions: true };
const createComponentLogger = (component) => (0, winston_1.createLogger)({
    level: 'debug',
    format: winston_1.format.combine(winston_1.format.timestamp(), winston_1.format.errors({ stack: true }), winston_1.format.splat(), winston_1.format.json()),
    defaultMeta: { component },
    transports: [new winston_1.transports.Console(consoleTransportOptions)],
});
exports.generalLogger = createComponentLogger('GENERAL');
exports.routesLogger = createComponentLogger('ROUTES');
exports.errorLogger = createComponentLogger('ERROR');
exports.scriptLogger = createComponentLogger('SCRIPT');
exports.default = exports.generalLogger;
