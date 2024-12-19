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
const config_1 = __importStar(require("../../config"));
const Mailer_1 = __importDefault(require("../core/Mailer"));
class AppMail extends Mailer_1.default {
    async sendMail(params) {
        if ([
            config_1.AppEnvironmentEnum.LOCAL,
            config_1.AppEnvironmentEnum.DEVELOPMENT,
            config_1.AppEnvironmentEnum.STAGING,
            config_1.AppEnvironmentEnum.PRODUCTION,
        ].includes(config_1.default.app.env) &&
            params.email) {
            await this.sendEmail(params);
        }
    }
    async sendPasswordResetMail(params) {
        const { email, link } = params;
        await this.sendMail({
            templateName: 'reset-password',
            subject: 'Password Reset',
            email,
            data: {
                link,
            },
        });
    }
    async sendEmailVerificationLinkRequest(email, data) {
        await this.sendEmail({
            templateName: 'email-verification',
            subject: 'Email Verification',
            email,
            data: { ...data, email },
        });
    }
    async sendInterviewSchedule(email, data) {
        await this.sendMail({
            templateName: 'interview-schedule',
            subject: 'Interview Schedule',
            email,
            data,
        });
    }
    async sendJobInvitation(email, data) {
        await this.sendMail({
            templateName: 'job-invitation',
            subject: `Job Invitation from ${data.recruiter}`,
            email,
            data,
        });
    }
    async sendProfileReviewRequest(email, data) {
        await this.sendMail({
            templateName: 'request-review',
            subject: 'Paxity Profile Review',
            email,
            data,
        });
    }
}
exports.default = new AppMail({
    templatePath: config_1.default.app.templatePath,
    apiKey: config_1.default.sendgrid.apiKey,
    from: config_1.default.sendgrid.from,
});
