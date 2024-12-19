"use strict";
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _Mailer_instances, _Mailer_compileTemplates;
Object.defineProperty(exports, "__esModule", { value: true });
const mail_1 = __importDefault(require("@sendgrid/mail"));
const handlebars_1 = __importDefault(require("handlebars"));
const fs_1 = require("fs");
const path_1 = require("path");
class Mailer {
    constructor(params) {
        _Mailer_instances.add(this);
        this.sender = mail_1.default;
        this.templateSources = {};
        this.sender.setApiKey(params.apiKey);
        this.templatePath = params.templatePath;
        this.from = params.from;
        (0, fs_1.readdirSync)(this.templatePath)
            .filter((temp) => temp.includes('.hbs'))
            .forEach(($path) => {
            this.templateSources[$path.replace('.hbs', '')] = __classPrivateFieldGet(this, _Mailer_instances, "m", _Mailer_compileTemplates).call(this, (0, path_1.join)(this.templatePath, $path));
        });
    }
    async sendEmail(params) {
        const { email, subject, templateName, data } = params;
        if (!Object.keys(this.templateSources).includes(templateName)) {
            throw Error('template not found');
        }
        return this.sender
            .send({
            html: this.templateSources[templateName](data),
            from: this.from,
            subject,
            to: email,
        })
            .catch((e) => {
            var _a, _b, _c;
            throw new Error(`${e.message}: ${(_c = (_b = (_a = e.response) === null || _a === void 0 ? void 0 : _a.body) === null || _b === void 0 ? void 0 : _b.errors) === null || _c === void 0 ? void 0 : _c.map((re) => re.message)}`);
        });
    }
}
exports.default = Mailer;
_Mailer_instances = new WeakSet(), _Mailer_compileTemplates = function _Mailer_compileTemplates(templatePath) {
    const source = (0, fs_1.readFileSync)(templatePath, 'utf8');
    return handlebars_1.default.compile(source);
};
