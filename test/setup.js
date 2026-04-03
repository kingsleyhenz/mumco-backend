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
const child_process_1 = require("child_process");
const initialize_1 = __importDefault(require("../src/initialize"));
const database_1 = require("../src/database");
// import { seedSomething } from '../src/scripts/script';
const documentator_1 = __importDefault(require("./documentator"));
const config_1 = __importDefault(require("./documentator/config"));
// stubs
sinon_1.default.stub(lodash_1.default, 'random').returns(12345);
// eslint-disable-next-line import/prefer-default-export
exports.mochaHooks = {
    async beforeAll() {
        (0, child_process_1.execSync)(`yarn crossenv DATABASE_URL=${process.env.TEST_DATABASE_URL} yarn migrate:prod`);
        await (0, initialize_1.default)();
        documentator_1.default.start(config_1.default);
        // await seedSomething();
    },
    async afterAll() {
        documentator_1.default.document();
        await (0, database_1.disconnectDB)();
    },
};
