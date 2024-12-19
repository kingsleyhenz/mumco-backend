export declare enum AppEnvironmentEnum {
    TEST = "test",
    LOCAL = "local",
    DEVELOPMENT = "development",
    STAGING = "staging",
    PRODUCTION = "production"
}
interface Config {
    env: {
        isProduction: boolean;
        isDevelopment: boolean;
        isTest: boolean;
    };
    app: {
        env: AppEnvironmentEnum;
        isProduction: boolean;
        name: string;
        domain: string;
        logo: string;
        secret: string;
        bcryptRounds: number;
        port: number;
        templatePath: string;
    };
    db: {
        databaseUrl: string;
    };
    redis: {
        mode: string;
        host: string;
        port: number;
        password: string;
        username?: string;
        tls?: "yes" | "no";
    };
    sendgrid: {
        apiKey: string;
        from: string;
    };
}
declare const config: Config;
export declare const validateConfig: (options?: {
    exceptions?: string[];
}) => void;
export default config;
