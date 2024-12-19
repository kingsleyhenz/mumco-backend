import Mailer, { ISendEmail } from '../core/Mailer';
declare class AppMail extends Mailer {
    sendMail<T extends Record<string, any>>(params: ISendEmail<T>): Promise<void>;
    sendPasswordResetMail(params: {
        email: string;
        link: string;
    }): Promise<void>;
    sendEmailVerificationLinkRequest(email: string, data: {
        link: string;
    }): Promise<void>;
    sendInterviewSchedule(email: string, data: {
        link: string;
        date: string;
        recruiter: string;
    }): Promise<void>;
    sendJobInvitation(email: string, data: {
        jobTitle: string;
        link: string;
        recruiter: string;
    }): Promise<void>;
    sendProfileReviewRequest(email: string, data: {
        name: string;
    }): Promise<void>;
}
declare const _default: AppMail;
export default _default;
