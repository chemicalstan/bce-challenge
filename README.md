## Description

## Installation

```bash
$ npm install
```

## Setup

```bash
# create a .env file at the root dir
$ touch .env
```

### Implement local env vars

- Copy the variable names at the `.env.example` file located at the root dir.

- Paste the variable names in the newly created `.env` file above and input the neccesary values.

## Running the app

```bash
# development
$ npm run start
```

```bash
# watch mode
$ npm run start:dev
```

```bash
# production mode
$ npm run start:prod
```

## Test

```bash
# e2e tests
$ npm run test:e2e
```

## GraphQL

```bash
# local url
http://localhost:<PORT>/graphql
```

```bash
# live url
https://bce-challenge.herokuapp.com/graphql
```

## ADVANTAGE OF PURE LEVENSHTEIN DISTANCE ALGORITHM OVER DAMERAU-LEVENSHTEIN DISTANCE ALGORITHM IN THIS SCENARIO

### These algorithms compute the `distance` regarding how many `edits` it would take to transform string A to equal string B.

### Levenshtein considers three possible ways: `insertions`, `deletions`, and `symbol substitutions` of single characters.

### In comparison, The Damerau-Levenshtein variant adds a fourth way; the ability to account for the `transposition` of two adjacent characters.

### Since this project aims to save execution time by caching a verified user's account details in the database to optimize Paystack API calls, the Levenshtein distance algorithm, which takes only three computations into account, is a more effective solution in this specific scenario.

[Further Read](https://stats.stackexchange.com/a/485061)
