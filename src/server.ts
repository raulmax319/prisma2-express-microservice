import express from 'express';
import { Logger } from './utils/logger';

export class Server {
  private readonly logger: Logger = new Logger(true);
  private readonly app = express();
  private readonly PORT = process.env.PORT ?? 3000;

  private applyMiddlewares = () => {
    this.app.use(express.json());
    // this.app.use('/v1', apiV1);
  };

  public start = async () => {
    this.applyMiddlewares();

    this.app.listen(this.PORT, () => {
      this.logger.detail(`Server is running on port ${this.PORT}`);
    });
  };
}

export const server = new Server();
