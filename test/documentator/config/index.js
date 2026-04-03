"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
exports.default = {
    fileName: 'api',
    title: 'landpay-api',
    url: 'https://landpay-server.staging.chigisoft.co',
    port: 3000,
    storageLocation: path_1.default.join(__dirname, '../../../documentation'),
};
