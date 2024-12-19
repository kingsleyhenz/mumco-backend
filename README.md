# NodeJS Boilerplate V2

Stack:

- NodeJS
- Typescript
- Express
- PostgreSQL
- Prisma
- Redis

This project uses a modular structure, which allows for separating functionalities or parts of the system into distinct modules. For now, there is an auth module. For starters, there is an `auth` module.

Each module contains the following:
- A `services` directory to store all the services in files
- A `controller.ts` file to house HTTP controllers that call the services
- A `validators` directory to store the validator classes (usually there's just one file, `index.ts`, in the `validators` directory),
- A router that calls the controller methods for the module.

```
# Modules Directory Structure

modules-v1/
├── auth/ # auth module
│   ├── services/ #services directory
│   │   ├── getUser.ts
│   │   ├── login.ts
│   │   └── register.ts
│   ├── validators/ # validators for the services
│   │   └── index.ts
│   ├── utils/ # module-perculiar utilities
│   │   └── index.ts
│   ├── controller.ts
│   └── router.ts
```

Each module corresponds to a subdivision or sub-route of the API. E.g `modules-v1/auth` corresponds to the `/v1/auth/` route.

Using modules promotes separation of concerns and helps keep the code organized, making it easier to locate specific parts of the application.

## Database

Prisma is the ORM of choice for this boilerplate, offering seamless integration with TypeScript. 
PostgreSQL is the primary database, though MySQL can also be used.

The `database/repositories` directory houses repositories for the various tables. Repositories are used to abstract the data layer. Directly calling Prisma methods within services can make it difficult to test, swap ORMs, or modify functionality. By using repositories, we provide a consistent interface for services without exposing the underlying data-layer logic.

See [Why it's bad practice to not use repositories with Prisma.](https://www.reddit.com/r/nestjs/comments/1fc6weh/why_is_bad_practice_not_use_repository_with_prisma/?rdt=44896)
