"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.disconnectDB = exports.connectDB = void 0;
const client_1 = require("@prisma/client");
const logger_1 = require("../lib/logger");
const prisma = new client_1.PrismaClient();
async function connectDB() {
    await prisma.$connect();
    logger_1.generalLogger.info('🔥 connected to db');
}
exports.connectDB = connectDB;
async function disconnectDB() {
    await prisma.$disconnect();
    logger_1.generalLogger.info('🧊 disconnected from db');
}
exports.disconnectDB = disconnectDB;
exports.default = prisma;
