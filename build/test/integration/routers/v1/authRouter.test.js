"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const supertest_1 = __importDefault(require("supertest"));
const faker_1 = __importDefault(require("faker"));
const app_1 = __importDefault(require("../../../../src/app"));
const server = supertest_1.default.agent(app_1.default);
const userAgent = 'Mozilla/5.0 (Windows NT 6.1; Win64; x64; rv:47.0) Gecko/20100101 Firefox/47.0';
describe('Auth Router', () => {
    const email = faker_1.default.internet.email();
    const password = faker_1.default.internet.password();
    let token;
    describe('Register', () => {
        it('should return an error if any required fields are absent', async () => {
            const res = await server.post('/v1/auth/register').set('User-Agent', userAgent).send({});
            chai_1.assert.equal(res.status, 422);
        });
        it('should register if all fields are present', async () => {
            const res = await server
                .post('/v1/auth/register')
                .set('User-Agent', userAgent)
                .send({
                email,
                password,
                first_name: faker_1.default.name.firstName(),
                last_name: faker_1.default.name.lastName(),
                phone_number: faker_1.default.phone.phoneNumber('+23480########'),
            });
            chai_1.assert.equal(res.status, 200);
        });
    });
    describe('Login', () => {
        it('should return an error if any required fields are absent', async () => {
            const res = await server.post('/v1/auth/login').set('User-Agent', userAgent).send({});
            chai_1.assert.equal(res.status, 422);
        });
        it('should not login with invalid credentials', async () => {
            const res = await server.post('/v1/auth/login').set('User-Agent', userAgent).send({
                email: faker_1.default.internet.email(),
                password: faker_1.default.internet.password(),
            });
            chai_1.assert.equal(res.status, 400);
            chai_1.assert.include(res.body.message, 'not correct');
        });
        it('should require device verification for different user agent', async () => {
            const res = await server.post('/v1/auth/login').set('User-Agent', `${userAgent}---v2`).send({
                email,
                password,
            });
            chai_1.assert.equal(res.status, 200);
            chai_1.assert.isTrue(res.body.data.unknown_device);
        });
        it('should login with valid credentials and allowed device', async () => {
            const res = await server.post('/v1/auth/login').set('User-Agent', `${userAgent}`).send({
                email,
                password,
            });
            chai_1.assert.equal(res.status, 200);
            chai_1.assert.exists(res.body.data.user);
            chai_1.assert.exists(res.body.data.token);
            token = res.body.data.token;
        });
        it('should return user details with valid token', async () => {
            const res = await server.get('/v1/user').set('Authorization', `Bearer ${token}`).send();
            chai_1.assert.equal(res.status, 200);
            chai_1.assert.exists(res.body.data.user.id);
        });
    });
});
