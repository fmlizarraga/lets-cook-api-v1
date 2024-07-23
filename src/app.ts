import express from 'express';
import routes from './routes';

class App {
  public server;

  constructor() {
    this.server = express();
    this.routes = () => routes.forEach(({path, route}) => {
        this.server.use(path, route);
    });

    this.middlewares();
    this.routes();
  };

  middlewares() {
    this.server.use(express.json());
  };

  routes() {
    this.server.use(this.routes);
  };
};

export default new App().server;