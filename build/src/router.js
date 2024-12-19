"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const modules_v1_1 = __importDefault(require("./modules-v1"));
const router = (0, express_1.Router)();
router.get('/version', (req, res) => {
    return res.send({
        status: 'success',
        data: {
            // eslint-disable-next-line import/no-dynamic-require
            version: require(path_1.default.join(process.cwd(), 'package.json')).version,
        },
    });
});
router.get('/healthz', (req, res) => {
    return res.send();
});
router.get('/readyz', (req, res) => {
    if (global.isShuttingDown || global.isStartingUp) {
        return res.status(500).send();
    }
    return res.send();
});
router.get('/docs-json', (req, res) => {
    const docs = path_1.default.join(__dirname, '..', 'docs', 'endpoint.json');
    if (!fs_1.default.existsSync(docs))
        return res.status(404).send('docs not found');
    return res.sendFile(docs);
});
router.get('/docs', (req, res) => {
    return res.sendFile(path_1.default.join(__dirname, '..', 'docs', 'index.html'));
});
router.use('/v1', modules_v1_1.default);
exports.default = router;
