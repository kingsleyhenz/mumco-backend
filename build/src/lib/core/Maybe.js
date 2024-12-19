"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
const errors_1 = require("../errors");
const messages_1 = require("../errors/messages");
class Maybe {
}
_a = Maybe;
Maybe.ensure = async ({ data, handler, tag, customError, customMessage }) => {
    const response = await handler(data);
    if (!response) {
        if (customError) {
            customError(data);
        }
        else {
            throw new errors_1.NotFoundError(customMessage || messages_1.ErrorMessages.ITEM_NOT_FOUND.replace('%k', tag || 'resource').replace('%d', String(data)));
        }
    }
    return response;
};
Maybe.ensureAll = async ({ data, handler, tag, customError, customMessage }) => {
    const chunks = (0, lodash_1.chunk)(data, 5);
    const promisedChunks = chunks.map((c) => Promise.all(c.map((d) => Maybe.ensure({ data: d, handler, tag, customError, customMessage }))));
    return (await Promise.all(promisedChunks)).flat();
};
Maybe.ensureAllNot = async ({ data, handler, tag, customError, customMessage }) => {
    const chunks = (0, lodash_1.chunk)(data, 5);
    const promisedChunks = chunks.map((c) => Promise.all(c.map((d) => Maybe.ensureNot({ data: d, handler, tag, customError, customMessage }))));
    return (await Promise.all(promisedChunks)).flat();
};
Maybe.ensureNot = async ({ data, handler, tag, customError, customMessage }) => {
    const response = await handler(data);
    if (response) {
        if (customError) {
            customError(data);
        }
        else {
            throw new errors_1.ServiceError(customMessage || messages_1.ErrorMessages.ITEM_EXISTS.replace('%k', tag || 'resource'));
        }
    }
};
exports.default = Maybe;
