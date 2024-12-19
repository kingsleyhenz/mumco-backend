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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.paginateResponse = exports.calcSkip = exports.decodeToken = exports.generateJWTToken = exports.bcryptCompare = exports.bcryptHash = exports.generateHash = exports.generateRandomCode = exports.successResponse = exports.wrapServiceAction = exports.transformAndValidate = exports.getErrorObject = exports.getAllConstraints = void 0;
const crypto_1 = __importDefault(require("crypto"));
const bcrypt = __importStar(require("bcrypt"));
const jwt = __importStar(require("jsonwebtoken"));
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const config_1 = __importDefault(require("../../config"));
const errors_1 = require("../errors");
const getAllConstraints = (errors) => {
    const constraints = [];
    // eslint-disable-next-line no-restricted-syntax
    for (const error of errors) {
        if (error.constraints) {
            constraints.push(error.constraints);
        }
        if (error.children) {
            constraints.push(...(0, exports.getAllConstraints)(error.children));
        }
    }
    return constraints;
};
exports.getAllConstraints = getAllConstraints;
const getErrorObject = (errors, prefix) => {
    let obj = {};
    // eslint-disable-next-line no-restricted-syntax
    for (const error of errors) {
        const key = `${prefix ? `${prefix}.` : ''}${error.property}`;
        obj[key] = error.constraints ? Object.values(error.constraints) : [];
        if (error.children) {
            obj = {
                ...obj,
                ...(0, exports.getErrorObject)(error.children, key),
            };
        }
    }
    return obj;
};
exports.getErrorObject = getErrorObject;
async function transformAndValidate(params) {
    const options = params.options || {};
    const transformed = (0, class_transformer_1.plainToInstance)(params.schema, params.body);
    const errors = await (0, class_validator_1.validate)(transformed, {
        whitelist: true,
        forbidNonWhitelisted: true,
        validationError: { target: false },
        ...options,
    });
    if (errors.length > 0) {
        const cErrors = (0, exports.getErrorObject)(errors);
        return cErrors;
    }
    return null;
}
exports.transformAndValidate = transformAndValidate;
function wrapServiceAction(params) {
    return async (...args) => {
        const transformed = (0, class_transformer_1.plainToInstance)(params.schema, args[0]);
        const errors = await (0, class_validator_1.validate)(transformed, {
            whitelist: true,
            forbidNonWhitelisted: true,
            validationError: { target: false },
        });
        if (errors.length > 0) {
            const cErrors = (0, exports.getErrorObject)(errors);
            throw new errors_1.ValidationError(cErrors);
        }
        return params.handler(transformed);
    };
}
exports.wrapServiceAction = wrapServiceAction;
function successResponse(result) {
    return {
        status: 'success',
        ...result,
        message: result.message || 'success',
    };
}
exports.successResponse = successResponse;
function generateRandomCode(length) {
    return crypto_1.default
        .randomBytes(length * 3)
        .toString('base64')
        .split('+')
        .join('')
        .split('/')
        .join('')
        .split('=')
        .join('')
        .substr(0, length);
}
exports.generateRandomCode = generateRandomCode;
function generateHash(seed) {
    const data = seed.toString() + Date.now().toString();
    return crypto_1.default.createHash('sha256').update(data).digest('hex');
}
exports.generateHash = generateHash;
function bcryptHash(password) {
    return bcrypt.hash(password, config_1.default.app.bcryptRounds);
}
exports.bcryptHash = bcryptHash;
function bcryptCompare(password, hash) {
    return bcrypt.compare(password, hash);
}
exports.bcryptCompare = bcryptCompare;
async function generateJWTToken(payload, secret = config_1.default.app.secret, expiresIn) {
    const jwtPayload = {
        ...payload,
        counter: generateRandomCode(36),
    };
    const options = { expiresIn: expiresIn || '720h' };
    return new Promise((resolve, reject) => {
        jwt.sign(jwtPayload, secret, options, (err, token) => {
            if (err) {
                reject(err);
            }
            resolve(token);
        });
    });
}
exports.generateJWTToken = generateJWTToken;
async function decodeToken(token) {
    return new Promise((resolve, reject) => {
        jwt.verify(token, config_1.default.app.secret, (err, decoded) => {
            if (err) {
                reject(err);
            }
            resolve(decoded);
        });
    });
}
exports.decodeToken = decodeToken;
// interface Action<T> {
//   (entityMngr: EntityManager): Promise<TransactionResult<T>>;
// }
// interface TransactionResult<T = any> {
//   success: boolean;
//   data: T;
// }
// /**
//  * Utility for running db queries in transactions. Ensure you pass the EntityManager (qr) to all repo actions
//  * to run them in the transaction. If you don't it could lead to unpredictable results
//  * @param action
//  * @param tries Number of re-tries if errors occur
//  */
// export async function transaction<T>(action: Action<T>, tries = 2): Promise<T> {
//   let currentTry = 0;
//   let result: TransactionResult = { success: false, data: null };
//   while (!result.success) {
//     currentTry += 1;
//     try {
//       // eslint-disable-next-line no-await-in-loop
//       result = await getManager().transaction(action);
//     } catch (e) {
//       if (currentTry >= tries) throw e;
//     }
//   }
//   return result.data;
// }
function calcSkip({ page, limit }) {
    return (page - 1) * limit;
}
exports.calcSkip = calcSkip;
function paginateResponse(data, page, take) {
    const [result, total] = data;
    const lastPage = Math.ceil(total / take) || +page;
    const nextPage = page + 1 > lastPage ? null : page + 1;
    const prevPage = page - 1 < 1 ? null : page - 1;
    // console.log(lastPage, nextPage, page + 1 > lastPage, page);
    return {
        data: [...result],
        pageData: {
            total,
            currentPage: +page,
            nextPage,
            prevPage,
            lastPage,
        },
    };
}
exports.paginateResponse = paginateResponse;
