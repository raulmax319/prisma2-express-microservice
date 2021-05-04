import express from 'express';
import { Server } from '@overnightjs/core';
import { Router } from '~/routes';
import { logger } from './utils/logger';
import { HelloWorldController } from './controllers/hello-world/hello-world.controller';

class CoreServer extends Server {
  private readonly PORT = process.env.PORT ?? 3001;
  private readonly log = logger;
  constructor() {
    super(process.env.NODE_ENV === 'development');
    this.showLogs = true;
    this.applyMiddlewares();
    this.setupControllers();
  }

  private setupControllers(): void {
    const helloController = new HelloWorldController();
    super.addControllers([helloController]);
  }

  private applyMiddlewares = () => {
    this.app.use(express.json());
  };

  public start() {
    this.app.listen(this.PORT, () => {
      this.log.detail(`Server is running on port ${this.PORT}`);
    });
  }
}

export const server = new CoreServer();
