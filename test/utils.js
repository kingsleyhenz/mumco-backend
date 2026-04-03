"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.nockPayStackBvnResolveEndpoint = exports.nockFlutterWaveAccountResolveEndpoint = void 0;
const nock_1 = __importDefault(require("nock"));
const nockFlutterWaveAccountResolveEndpoint = (name) => {
    (0, nock_1.default)('https://api.flutterwave.com')
        .defaultReplyHeaders({
        'access-control-allow-origin': '*',
        'access-control-allow-credentials': 'true',
    })
        .post(/accounts\/resolve/)
        .reply(200, {
        status: 'success',
        message: 'Account details fetched',
        data: {
            account_number: '3089273822',
            account_name: name,
        },
    });
};
exports.nockFlutterWaveAccountResolveEndpoint = nockFlutterWaveAccountResolveEndpoint;
const nockPayStackBvnResolveEndpoint = (bvn) => {
    (0, nock_1.default)('https://api.paystack.co')
        .defaultReplyHeaders({
        'access-control-allow-origin': '*',
        'access-control-allow-credentials': 'true',
    })
        .post(/bvn/, (body) => !!body)
        .reply(200, {
        status: true,
        message: 'BVN lookup successful',
        data: {
            bvn,
            is_blacklisted: false,
            account_number: true,
            first_name: true,
            last_name: true,
        },
        meta: { calls_this_month: 2, free_calls_left: 8 },
    });
};
exports.nockPayStackBvnResolveEndpoint = nockPayStackBvnResolveEndpoint;
