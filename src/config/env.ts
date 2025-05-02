const port = process.env.PORT ? parseInt(process.env.PORT) : 3000;

const dbConfig = {
    DB_HOST: process.env.DB_HOST ?? 'localhost',
    DB_PORT: parseInt(process.env.DB_PORT ?? '5432'),
    DB_USERNAME: process.env.DB_USERNAME ?? 'postgres',
    DB_PASSWORD: process.env.DB_PASSWORD ?? '',
    DB_NAME: process.env.DB_NAME ?? 'test'
};

const jwtSecret = process.env.JWT_SECRET ?? 'secret';

export { port, dbConfig, jwtSecret };