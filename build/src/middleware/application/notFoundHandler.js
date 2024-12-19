"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (req, res) => res.status(404).send({
    status: 'error',
    message: 'endpoint not found',
});
