# Getir Code Challenge

Get records in formatted response from mongodb

## Getting started

### Install dependencies:

i'm using [Yarn](https://yarnpkg.com/) on this repo, so better use it over Npm

```sh
yarn
```

### Run it locally:

First, create an `.env` file in the root with the following content:

```.env
# EMail Configuration
DB_URI=mongodb+srv://[username:password@]host1[:port1][,...hostN[:portN]][/[defaultauthdb][?options]]
```

To fire up the server locally, run:

```sh
yarn dev
```

to manually test the server response, run this command:

```sh
curl --location --request POST 'http://localhost:3000/records' \
--header 'Content-Type: application/json' \
--data-raw '{
    "startDate": "2016-01-26",
    "endDate": "2018-02-02",
    "minCount": 2700,
    "maxCount": 3000
}'
```

## Linting and Code Quality

for linting JS/TS files, i'm using [Eslint](https://eslint.org/) configured with [Typescript](https://www.typescriptlang.org/), for the rest of the files i'm using [prettier](https://prettier.io/)

to lint all files run:

```sh
yarn lint:check
```

to apply possible fixes, run:

```sh
yarn lint:fix
```

when committing, the code will be fixed automatically before it gets committed, thanks to [husky](https://typicode.github.io/husky/#/) and [lint-staged](https://github.com/okonet/lint-staged).

### Tests and Test Coverage:

i'm using [Jest](https://jestjs.io/) for unit tests and code coverage.

to run tests once, run

```sh
yarn test
```

to run tests with watch mode, run

```sh
yarn test:watch
```

to run tests once with coverage, run

```sh
yarn test:cov
```

to run tests with coverage and watch mode, run

```sh
yarn test:cov:watch
```

coverage data is stored in `./coverage` directory

## Deployment

The code is deployed on heroku, you can access the app on:

https://getir-zak.herokuapp.com

to deploy it on your own heroku, just modify the `deploy-to-heroku` script on `package.json` and replace `getir-zak` with your app name.

make sure you have [heroku-cli](https://devcenter.heroku.com/articles/heroku-cli) installed, then login:

```sh
heroku login
```

then finally deploy:

```sh
yarn deploy
```

to manually test the hosted server response, run this command:

```sh
curl --location --request POST 'https://getir-zak.herokuapp.com/records' \
--header 'Content-Type: application/json' \
--data-raw '{
    "startDate": "2016-01-26",
    "endDate": "2018-02-02",
    "minCount": 2700,
    "maxCount": 3000
}'
```
