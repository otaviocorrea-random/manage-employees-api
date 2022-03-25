## Description

A simple application to manage employees of a company, it allows to add multiple employees to multiple companies, with basic functions of a CRUD for both entities.

🌎 [View endpoint documentation](https://api-manage-employees.herokuapp.com/doc) 

## Installation 🚀
> ⚠️⚠️⚠️WARNING⚠️⚠️⚠️
>
> 🐘 PostgreSQL is required 

### .env  🏔️🏔️🏔️
```bash
#make a .env file in root 
DATABASE_URL="postgres://user:pass@host:5432/db_name"
```

```bash
# install packages
$ npm install

# build
$ npm run build

# run migrations
$ npm run typeorm migration:run
```


## Running the app 💣

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test 🧪

```bash
# unit tests
$ npm run test

# test coverage
$ npm run test:cov
```

## ToDo
> The current tests correctly cover only the parameters passed to the controller methods, so you should create tests that are more suitable for the entire application in general

- [ ] Make more suitable unit tests
- [ ] Do integration tests
- [ ] Review all tests and see if they have good code coverage
