"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("../../../src/app"));
const server = supertest_1.default.agent(app_1.default);
describe('Base Router', () => {
    describe('Version', () => {
        it('should fetch app version', async () => {
            const res = await server.get('/version');
            chai_1.assert.equal(res.status, 200);
        });
    });
    describe('Health Check', () => {
        it('should call health check endpoint', async () => {
            const res = await server.get('/healthz');
            chai_1.assert.equal(res.status, 200);
        });
        it('should call readiness check endpoint', async () => {
            const res = await server.get('/readyz');
            chai_1.assert.equal(res.status, 200);
        });
    });
});
