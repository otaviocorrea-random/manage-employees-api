module.exports = {
  "type": "postgres",
  "url": process.env.DATABASE_URL,
  "synchronize": true,
  "entities": ['dist/**/database/models/*.entity{.ts,.js}'],
  "migrations":  ['dist/**/database/migrations/**/*{.ts,.js}'],
  "cli": {
    "migrationsDir": `${__dirname}/src/database/migrations`,
    "entitiesDir": `${__dirname}/src/database/models`
  },
  "logging": ["query", "error"]
}
