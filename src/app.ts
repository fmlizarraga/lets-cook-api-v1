import "reflect-metadata";
import express, { Request, Response, NextFunction } from "express";
import routes from "./routes";

class App {
    public server;

    constructor() {
        this.server = express();

        this.middlewares();
        this.routes();
        this.errorHandling();
    }

    middlewares() {
        this.server.use(express.json());
    }

    routes() {
        routes.forEach(({ path, route }) => {
            this.server.use(path, route);
        });
    }

    errorHandling() {
        this.server.use(
            (error: any, req: Request, res: Response, next: NextFunction) => {
                const message = error.message ?? "Internal Server Error";
                const status = error.status ?? 500;
                const data = error.data ?? null;
                console.error(error);
                res.status(status).json({ message: message, data: data });
            },
        );
    }
}

export default new App().server;
