module.exports = {
  type: 'postgres',
  url: process.env.DATABASE_URL,
  synchronize: false,
  entities: ['dist/**/database/entities/*.entity{.ts,.js}'],
  migrations: ['dist/**/database/migrations/**/*{.ts,.js}'],
  cli: {
    migrationsDir: `src/database/migrations`,
    entitiesDir: `src/database/entities`,
  },
  extra: {
    ssl:
      process.env.NODE_ENV == 'production'
        ? { rejectUnauthorized: false }
        : false,
  },
  logging: ['query', 'error'],
};
