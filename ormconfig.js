module.exports = {
  "type": "postgres",
  "url": process.env.DATABASE_URL,
  "synchronize": false,
  "entities": ['dist/**/database/models/*.entity{.ts,.js}'],
  "migrations":  ['dist/**/database/migrations/**/*{.ts,.js}'],
  "cli": {
    "migrationsDir": `src/database/migrations`,
    "entitiesDir": `src/database/models`
  },
  "logging": ["query", "error"]
}
