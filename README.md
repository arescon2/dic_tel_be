## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ npm i -g @nestjs/cli

$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## migrations

```bash

# create migration
$ npx typeorm migration:create -n NAME -d src/migrations

# generate migration
$ npx typeorm migration:generate -n NAME

# run migrations
$ npx typeorm migration:run

# revert migrations
$ npx typeorm migration:revert

```

Nest is [MIT licensed](LICENSE).
