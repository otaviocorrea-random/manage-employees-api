const path = require('path');

module.exports = {
  "type": "postgres",
  "url": process.env.DATABASE_URL,
  "entities": [path.resolve(__dirname, 'src', 'database', 'models', '*')],
  "migrations": [path.resolve(__dirname, 'src', 'database', 'migrations', '*')],
  "cli": {
    "migrationsDir": `${__dirname}/src/database/migrations`,
    "entitiesDir": `${__dirname}/src/database/models`
  }
}
