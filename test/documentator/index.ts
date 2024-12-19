/* eslint-disable */
// Reason is that this script contains iterators/generators
// require regenerator - runtime, which is too heavyweight for this guide to allow them
import * as fs from 'fs';
import xpath from 'path';
import URL from 'url';
import definition from './config';
import { DocumentorInitObject } from './types';

export default class Documentator {
  public fileName: string;

  public xstore: Record<string, any> = {};

  private testLabel: string = '';

  private static INITIALIZED: Documentator | undefined;

  public masterTemplate: Record<string, any>;

  private endpoints: Record<string, any>[] = [];

  public storageLocation: string;

  private pathToTempFile: string;

  private shouldDocument = true;

  constructor(fileName: string, title: string, url: string, port: number, version = '1.0.0', storageLocation: string) {
    this.fileName = fileName;
    this.fileName = fileName;
    this.storageLocation = storageLocation;
    this.pathToTempFile = xpath.join(__dirname, './endpoints.json');
    this.masterTemplate = {
      openapi: '3.0.0',
      info: {
        title,
        version,
      },
      servers: [
        {
          url,
        },
        {
          url: `http://localhost:${port}`,
        },
      ],
      components: {
        securitySchemes: {
          bearerAuth: {
            type: 'http',
            scheme: 'bearer',
            bearerFormat: 'JWT',
          },
        },
      },
      security: [
        {
          bearerAuth: [],
        },
      ],
      paths: {},
    };
  }
  switchOff(): void {
    this.shouldDocument = false;
  }
  terminalDocumentingControl(): void {
    if (!process.argv.includes('generate:documentation')) this.switchOff();
  }
  store(key: string, value: any) {
    this.xstore[key] = value;
  }

  getSchema(variable: any, otherOpt: { [key: string]: any } = {}): any {
    if (variable == null) return {};
    switch (typeof variable) {
      case 'string':
        return { type: 'string', ...otherOpt[variable] };
      case 'number':
        return { type: 'number' };
      case 'boolean':
        return { type: 'boolean' };
      case 'object':
        if (Array.isArray(variable)) {
          return {
            type: 'array',
            items: this.getSchema(variable[0]),
          };
        }
        const schema: { type: string; properties: Record<string, any> } = {
          type: 'object',
          properties: {},
        };
        for (const [key, value] of Object.entries(variable)) {
          schema.properties[key] = this.getSchema(value, otherOpt[key]);
        }
        return schema;
    }
    return 'no schema';
  }

  getPathParameters(options: Record<string, any>) {
    const params = options.pathParameters || [];
    return params.map((param: any) => ({
      in: 'path',
      name: param.name,
      description: param.description || '',
      schema: this.getSchema('string'),
      required: true,
    }));
  }

  getQueryParameters(path: string, otherOpt: any = {}) {
    const { URLSearchParams } = URL;
    const queryParams = new URLSearchParams(path.split('?')[1]);
    return Array.from(queryParams.entries()).map(([key, value]) => ({
      in: 'query',
      name: key,
      schema: this.getSchema(value, otherOpt),
    }));
  }

  getHeaderParameters(headers: Record<string, any>) {
    return Object.keys(headers)
      .filter((key: any) => !['User-Agent', 'Content-Type', 'Authorization'].includes(key))
      .map((header) => ({
        in: 'header',
        name: header,
        schema: this.getSchema(headers[header]),
      }));
  }

  getPath(req: any, res: any, options: any, otherOpt: any = {}) {
    return {
      [req.method]: {
        description: options.description || '',
        tags: options.tags || [],
        parameters: [
          ...this.getHeaderParameters(req.headers),
          ...this.getPathParameters(options),
          ...this.getQueryParameters(req.path, otherOpt),
        ],
        ...this.resolveRequestBody(req, otherOpt),
        responses: this.resolveResponse(res),
      },
    };
  }

  resolveRequestBody(req: any, otherOpt: any = {}) {
    return req.body
      ? {
          requestBody: {
            content: {
              'application/json': {
                schema: this.getSchema(req.body, otherOpt),
                example: req.body,
              },
            },
          },
        }
      : {};
  }
  resolveResponse(res: any) {
    return {
      [res.status]: {
        description: '',
        content: {
          'application/json': {
            schema: this.getSchema(res.body),
            example: res.body,
          },
        },
      },
    };
  }

  addEndpoint = (res: any, options: any = {}, otherOpt: any = {}) => {
    if (!this.shouldDocument) return;
    const request = {
      method: res.request.method.toLowerCase(),
      path: res.res.req.path,
      headers: res.request.header,
      body: res.request._data || null,
    };
    const response = {
      status: res.status,
      body: res.body,
    };

    // let json = JSON.parse(fs.readFileSync(this.pathToTempFile, 'utf8'));
    // json.push({
    //   request,
    //   response,
    //   options,
    // });
    this.endpoints.push({
      request,
      response,
      options,
      otherOpt,
    });
    // fs.writeFileSync(this.pathToTempFile, JSON.stringify(json));
  };

  transformPath = (path: string, options: any) => {
    if (options.pathParameters) {
      const pathArray = path
        .split('/')
        .slice(1)
        .map((segment, index) => {
          const param = options.pathParameters.find((p: any) => p.index === index);
          if (param) {
            return `{${param.name}}`;
          }
          return segment;
        });
      return `/${pathArray.join('/')}`;
    }
    return path.split('?').shift();
  };

  retrieveEndpoints() {
    if (!this.shouldDocument) return;
    const data: Record<string, any>[] = JSON.parse(fs.readFileSync(this.pathToTempFile, 'utf8'));
    // console.log(data)
    this.endpoints = data;
  }

  renderDocumentation() {
    const template = { ...this.masterTemplate };
    // this.retrieveEndpoints();
    for (const endpoint of this.endpoints) {
      const { request, response, options, otherOpt } = endpoint;
      const path = <string>this.transformPath(request.path, options);
      if (template.paths[path]) {
        if (template.paths[path][request.method]) {
          if (response.status === 200) {
            template.paths[path][request.method].requestBody = //
              this.resolveRequestBody(request, otherOpt).requestBody || {};
          }
          template.paths[path][request.method].responses = {
            ...(template.paths[path][request.method].responses || {}),
            ...this.resolveResponse(response),
          };
        } else {
          template.paths[path][request.method] = {
            ...(template.paths[path][request.method] || {}),
            ...this.getPath(request, response, options, otherOpt)[request.method],
          };
        }
      } else {
        template.paths[path] = {
          ...(template.paths[path] || {}),
          ...this.getPath(request, response, options, otherOpt),
        };
      }
    }

    fs.writeFileSync(
      xpath.join(`${this.storageLocation}/${this.fileName}.json`),
      JSON.stringify(template, undefined, 2),
      'utf8'
    );
    return template;
  }

  static start(defn: DocumentorInitObject) {
    if (!Documentator.INITIALIZED) {
      Documentator.INITIALIZED = new Documentator(
        defn.fileName,
        defn.title,
        defn.url,
        (defn.port = 3000),
        defn.version,
        defn.storageLocation
      );
    }
  }

  static getInstance() {
    if (!Documentator.INITIALIZED) Documentator.start(definition);
    return Documentator.INITIALIZED!;
  }

  static document() {
    if (Documentator.INITIALIZED) Documentator.INITIALIZED.renderDocumentation();
  }
}
