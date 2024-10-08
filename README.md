[![Build Status](https://dev.azure.com/matghp-org/NestJS-Lab/_apis/build/status%2FMatGhp.NestJs-Lab?branchName=master)](https://dev.azure.com/matghp-org/NestJS-Lab/_build/latest?definitionId=3&branchName=master)

Version 1.3


## Description

[NestJS](https://github.com/nestjs/nest) 


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
  createFile(createFileInput: {
    name: "example-file-123.txt"
    saveDateTime: "2024-07-17T12:00:00Z"
    uri: "example-uri",
  }) {
    id
    name
    saveDateTime
    uri
  }
}
```

search file names
```
query {
searchFileName(name: "file") {name}
}
```

get all files
```
query {
  allFiles 
   {name}
}
```

## License

[MIT licensed]
