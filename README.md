# MEAN Starter Tutorial

This project is based on [angular2-express-starter](https://github.com/Bielik20/angular2-express-starter), [TypeScript-Node-Starter](https://github.com/Microsoft/TypeScript-Node-Starter) and [ng-lib-tutorial](https://github.com/Bielik20/ng-lib-tutorial). It presents steps to reproduce.

## Add Dependencies

### Dev
```
npm i -D concurrently nodemon tsconfig-paths tspath @types/express @types/body-parser @types/compression @types/mongoose
```

- [concurrently](https://www.npmjs.com/package/concurrently) - required for starting
- [nodemon](https://www.npmjs.com/package/nodemon) - to listen changes on the server
- [tsconfig-paths](https://www.npmjs.com/package/tsconfig-paths) - to resolve server paths in local development (ts-node)
- [tspath](https://www.npmjs.com/package/tspath) - to resolve server paths in production build

### Regular
```
npm i express body-parser compression path mongoose normalize.css
```

- [express](https://www.npmjs.com/package/express), [body-parser](https://www.npmjs.com/package/body-parser), [compression](https://www.npmjs.com/package/compression) - basic libraries for the server
- [mongoose](https://www.npmjs.com/package/mongoose) - ODM for MongoDB
- [normalize.css](https://www.npmjs.com/package/normalize.css) - alternative to CSS resets

## Include Files

- `Procfile` - for heroku, so it knows how to serve application
- `proxy.conf.json` - enables referencing server by client
- `nodemon.json` - contains configuration for localhost server
- `libs/*` - sample libs to be used both in Client and Server
- `server/*` - basic express server

## Update package.json
```json
{
  "scripts": {
    "start": "concurrently --kill-others \"npm run start:server\" \"npm run start:client\"",
    "start:client": "ng serve --aot --progress=false --proxy-config proxy.conf.json",
    "start:server": "nodemon",
    "build": "npm run build:server && npm run build:client",
    "build:client": "ng build --prod",
    "build:server": "tsc -p ./server && echo y | tspath -p ./server",
    "lint": "npm run lint:client && npm run lint:server",
    "lint:client": "ng lint",
    "lint:server": "tslint './server/**/*.ts' --fix",
    "test:client": "ng test",
    "e2e:client": "ng e2e",
    "postinstall": "npm run build"
  },
  "engines": {
    "node": "8.10.0",
    "npm": "5.6.0"
  },
}
```

## Update .angular-cli
```json
{
  "apps": [
    {
      "outDir": "dist/client",
      "styles": [
        "../node_modules/normalize.css/normalize.css",
        "styles.css"
      ],
    }
  ],
  "defaults": {
    "styleExt": "scss",
    "class": {
      "spec": false
    },
    "component": {
      "spec": false
    },
    "service": {
      "spec": false
    },
    "pipe": {
      "spec": false
    }
  }
}
```

## Add Global Libs reference

### `tsconfig.json`
- Adds path to the library.
- **Left Side** is a name/alias to be used in the application to import library, it should be of the same name as given library in section "In ng-test-lib folder".
- **Right Side** is a path to that library.

```json
"compilerOptions": {
  "outDir": "./dist",
  "baseUrl": ".",
  "paths": {
    "@my/*": ["libs/*"]
  }
}
```

## Add Angular Libs reference

### `src/tsconfig.app.json` and `src/tsconfig.spec.json`
Remove `baseUrl` from `compilerOptions` in those files.

> Note that absolute routes start now from **root** folder not **src**. So angular route to module would look somewhat like that `src/app/weather/weather.module#WeatherModule`


# Trivia

## About Route Resolving

### Server
In local development [ts-node](https://github.com/TypeStrong/ts-node) is used along side with [tsconfig-paths](https://github.com/dividab/tsconfig-paths) which allows using paths from `tsconfig.json`.

In production build [tspath](https://github.com/duffman/tspath) is used to rewrite paths of compiled project. There seams to be limitation as we cannot use path of `'*'`. It has to be used with something else like `'@my/*'`

There many issues on github that collaborate on that problem:
- https://github.com/Microsoft/TypeScript/issues/10866
- https://github.com/TypeStrong/ts-node/issues/138
- https://github.com/Microsoft/TypeScript/issues/15479 

### Client
In Angular the CLI is doing most of the work so that paths in `tsconfig.json` are enough to make it work.

## Omitted Dependencies
Those dev dependencies were omitted:
- `@types/cors @types/uuid @types/jsonwebtoken webdriver-manager`

Those regular dependencies were omitted:
- `uuid cookie-parser jsonwebtoken ts-helpers (whole ngrx)`
