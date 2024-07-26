import { DataSource } from "typeorm";
import { Post } from "./entity/Post";
import { Tag } from "./entity/Tag";
import { User } from "./entity/User";
import { Comment } from "./entity/Comment";
require('dotenv').config();

export const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.DB_HOST ? process.env.DB_HOST : "localhost",
    port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 5432,
    username: process.env.DB_USERNAME ? process.env.DB_USERNAME : "postgres",
    password: process.env.DB_PASSWORD ? process.env.DB_PASSWORD : "",
    database: process.env.DB_NAME ? process.env.DB_NAME : "test",
    synchronize: true,
    logging: true,
    entities: [Post, Tag, User, Comment],
    subscribers: [],
    migrations: [],
});
