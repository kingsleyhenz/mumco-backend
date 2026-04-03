import { DocumentorInitObject } from './types';
export default class Documentator {
    fileName: string;
    xstore: Record<string, any>;
    private testLabel;
    private static INITIALIZED;
    masterTemplate: Record<string, any>;
    private endpoints;
    storageLocation: string;
    private pathToTempFile;
    private shouldDocument;
    constructor(fileName: string, title: string, url: string, port: number, version: string | undefined, storageLocation: string);
    switchOff(): void;
    terminalDocumentingControl(): void;
    store(key: string, value: any): void;
    getSchema(variable: any, otherOpt?: {
        [key: string]: any;
    }): any;
    getPathParameters(options: Record<string, any>): any;
    getQueryParameters(path: string, otherOpt?: any): {
        in: string;
        name: string;
        schema: any;
    }[];
    getHeaderParameters(headers: Record<string, any>): {
        in: string;
        name: string;
        schema: any;
    }[];
    getPath(req: any, res: any, options: any, otherOpt?: any): {
        [x: number]: {
            responses: {
                [x: number]: {
                    description: string;
                    content: {
                        'application/json': {
                            schema: any;
                            example: any;
                        };
                    };
                };
            };
            requestBody: {
                content: {
                    'application/json': {
                        schema: any;
                        example: any;
                    };
                };
            };
            description: any;
            tags: any;
            parameters: any[];
        } | {
            responses: {
                [x: number]: {
                    description: string;
                    content: {
                        'application/json': {
                            schema: any;
                            example: any;
                        };
                    };
                };
            };
            requestBody?: undefined;
            description: any;
            tags: any;
            parameters: any[];
        };
    };
    resolveRequestBody(req: any, otherOpt?: any): {
        requestBody: {
            content: {
                'application/json': {
                    schema: any;
                    example: any;
                };
            };
        };
    } | {
        requestBody?: undefined;
    };
    resolveResponse(res: any): {
        [x: number]: {
            description: string;
            content: {
                'application/json': {
                    schema: any;
                    example: any;
                };
            };
        };
    };
    addEndpoint: (res: any, options?: any, otherOpt?: any) => void;
    transformPath: (path: string, options: any) => string | undefined;
    retrieveEndpoints(): void;
    renderDocumentation(): {
        [x: string]: any;
    };
    static start(defn: DocumentorInitObject): void;
    static getInstance(): Documentator;
    static document(): void;
}
