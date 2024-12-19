import sendGrid from '@sendgrid/mail';
export interface ISendEmail<T extends Record<string, any>> {
    email: string;
    subject: string;
    templateName: string;
    data: T;
}
export interface IMailerParams {
    apiKey: string;
    templatePath: string;
    from: string;
}
export default class Mailer {
    #private;
    sender: sendGrid.MailService;
    templatePath: string;
    templateSources: Record<string, HandlebarsTemplateDelegate<any>>;
    from: string;
    constructor(params: IMailerParams);
    sendEmail<T extends Record<string, any>>(params: ISendEmail<T>): Promise<[sendGrid.ClientResponse, {}]>;
}
