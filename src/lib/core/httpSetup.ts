import { ClassConstructor } from 'class-transformer';
import { RequestHandler, Response, Router } from 'express';
import { PageData, wrapServiceAction } from '../utils';
import { ServerResponse } from 'http';

interface Route {
  method: 'get' | 'post' | 'put' | 'patch' | 'delete';
  middlewares?: RequestHandler[];
  path: string;
}

interface RouteFn extends Route {
  fn: RequestHandler;
}

interface ControllerInterface {
  path: string;
  middlewares: RequestHandler[];
  router: Router;
  routes: Route[];
}

export function Controller(path: string, middlewares: RequestHandler[] = []) {
  return <T extends { new (...args: any[]): object }>(constructor: T) => {
    return class extends constructor implements ControllerInterface {
      path = path;

      middlewares: RequestHandler[];

      router: Router = Router();

      routes: RouteFn[];

      constructor(...args: any[]) {
        super(args);
        this.routes = Reflect.getMetadata('routes', constructor.prototype) || [];

        this.middlewares = middlewares;
        if (this.middlewares.length > 0) {
          this.router.use(this.middlewares);
        }

        this.routes.forEach((r) => {
          this.router[r.method](r.path, [...(r.middlewares || []), r.fn]);
        });
      }
    };
  };
}

export function addRoute(route: Route) {
  return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
    const originalMethod: (...args: any[]) => any = descriptor.value;
    const existingRoutes: Route[] = Reflect.getMetadata('routes', target) || [];

    // eslint-disable-next-line
    descriptor.value = async function (...args: any[]) {
      // eslint-disable-next-line
      const [_, r] = args;
      const res = r as Response;
      const result: { data: any; pageData?: PageData; message: string } | ServerResponse = await originalMethod.apply(this, args);
      // don't send response again if a response is returned to avoid Converting circular structure to JSON error
      if (result instanceof ServerResponse) {
        return;
      }
      res.send(result);
    };

    Reflect.defineMetadata('routes', [...existingRoutes, { ...route, fn: descriptor.value }], target);
  };
}

export function Post(path: string, middlewares?: RequestHandler[]) {
  return addRoute({ method: 'post', path, middlewares });
}

export function Get(path: string, middlewares?: RequestHandler[]) {
  return addRoute({ method: 'get', path, middlewares });
}

export function Delete(path: string, middlewares?: RequestHandler[]) {
  return addRoute({ method: 'delete', path, middlewares });
}

export function Patch(path: string, middlewares?: RequestHandler[]) {
  return addRoute({ method: 'patch', path, middlewares });
}

export function Put(path: string, middlewares?: RequestHandler[]) {
  return addRoute({ method: 'put', path, middlewares });
}

export function ValidateDto<T extends ClassConstructor<any>>(dto: T) {
  // eslint-disable-next-line
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;
    // eslint-disable-next-line
    descriptor.value = async function (...args: any[]) {
      const func = wrapServiceAction({ schema: dto, handler: originalMethod });
      return func.apply(this, args);
    };
    return descriptor;
  };
}

export function createController(C: { new (...args: any[]): object }) {
  const c = new C() as ControllerInterface;
  if (!c.router || !c.routes || typeof c.routes !== 'object') {
    throw new Error(`The class ${Controller.name} is not a controller`);
  }
  return c;
}

export function setupControllers(appRouter: Router, controllers: { new (...args: any[]): object }[]) {
  controllers.forEach((c) => {
    const controller = createController(c);
    appRouter.use(controller.path, controller.router);
  });
}
