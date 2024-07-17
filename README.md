<p>
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest


## Description

[Nest](https://github.com/nestjs/nest) 


## Installation

```bash
$ npm install
```

## Running the app




```bash

#pull dpage/pgadmin4 (pgAdmin 4 is a web based administration tool for the PostgreSQL database.)
$ docker pull dpage/pgadmin4

# Run Postgres
$ docker run --name postgres-nest -p 5432:5432 -e POSTGRES_PASSWORD=postgres -d postgres

# Run MongoDB
$ docker run --name mongo -p 27017:27017 -d mongo

# download and install the Robo 3T and connect to your MongoDB
https://studio3t.com/download/

# install cross-env globally
$ npm install -g cross-env

# install NestJS CLI
$npm install @nestjs/cli -g

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

# GraphQL Playground 
URL: http://localhost:3000/graphql

create a new file metadata
```
mutation {
createFile (
name: "some-file.json"
saveDateTime: "2024-03-28T18:00:00Z"
uri: "some-uri"
) {name, id}}
```

search file names
```
query {
file(name: "me") {name}
}
```

## License

[MIT licensed]
