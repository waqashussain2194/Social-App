# Memes Platform API

This Nest JS API is used to facilitate the React Native Platform.

For this project, Nest JS is coupled with GraphQL and TypeORM is used as
our ORM. PostgreSQL for our database.

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ npm install
```

## Before Starting Locally

Add `.env.local` file and clone the environment variables from
`.env.example`

## Running the migrations

```bash
# generate new migration
# Do run the application after writing entities and then generate migration
$ npm run migration:generate src/migrations/MigrationName

# run all migrations
$ npm run migration:run

# revert last migration
$ npm run migration:revert
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

## Generate new ...

```bash
$ nest g modules/moduleName

$ nest g resolver modules/moduleName

$ nest g service modules/moduleName



```
