"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mochaHooks = void 0;
// import { getConnection } from 'typeorm';
require("reflect-metadata");
const sinon_1 = __importDefault(require("sinon"));
const lodash_1 = __importDefault(require("lodash"));
const initialize_1 = __importDefault(require("../src/initialize"));
const database_1 = require("../src/database");
// import { seedSomething } from '../src/scripts/script';
// stubs
sinon_1.default.stub(lodash_1.default, 'random').returns(12345);
// eslint-disable-next-line import/prefer-default-export
exports.mochaHooks = {
    async beforeAll() {
        await (0, initialize_1.default)();
        // await seedSomething();
    },
    async afterAll() {
        await (0, database_1.disconnectDB)();
    },
};
