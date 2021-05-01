import express from 'express';
import routes from './routes';
// import { apiV1 } from './routes/v1';
import { logger } from './utils/logger';

class Server {
  private readonly app = express();
  private readonly PORT = process.env.PORT ?? 3000;
  private readonly log = logger;
  private readonly router = routes;

  private applyMiddlewares = () => {
    this.app.use(express.json());
    this.router(this.app);
  };

  public start = async () => {
    this.applyMiddlewares();

    this.app.listen(this.PORT, () => {
      this.log.detail(`Server is running on port ${this.PORT}`);
    });
  };
}

export const server = new Server();
