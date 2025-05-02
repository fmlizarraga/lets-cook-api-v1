import { DataSource } from "typeorm";
import { Post } from "../entity/Post";
import { Tag } from "../entity/Tag";
import { User } from "../entity/User";
import { Comment } from "../entity/Comment";
import { dbConfig } from "../config/env";

export const AppDataSource = new DataSource({
    type: "postgres",
    host: dbConfig.DB_HOST,
    port: dbConfig.DB_PORT,
    username: dbConfig.DB_USERNAME,
    password: dbConfig.DB_PASSWORD,
    database: dbConfig.DB_NAME,
    synchronize: true,
    logging: true,
    entities: [Post, Tag, User, Comment],
    subscribers: [],
    migrations: [],
});
