import express from 'express';
import cors from 'cors';
import { Server } from '@overnightjs/core';
import { PrismaClient } from '@prisma/client';
import { Logger } from 'tslog';
import controllerInstances from '~/routes';

class CoreServer extends Server {
  private readonly prisma: PrismaClient = new PrismaClient();

  private readonly PORT = process.env.PORT ?? 3001;

  private readonly logger: Logger = new Logger();

  private readonly controllersList = controllerInstances;

  constructor() {
    super(process.env.NODE_ENV === 'development');
    this.showLogs = true;
    this.applyMiddlewares();
    this.setupControllers();
  }

  private setupControllers(): void {
    const controllers = this.controllersList();
    super.addControllers(controllers);
  }

  private applyMiddlewares = () => {
    this.app.use(express.json());
    this.app.use(cors());
  };

  public async start() {
    await this.prisma
      .$connect()
      .then(() => this.logger.debug('Prisma connected successfully'))
      .catch((e) => this.logger.error('error... ', e));
    this.app.listen(this.PORT, () => {
      this.logger.debug(`Server is running on port ${this.PORT}`);
    });
  }
}

export const server = new CoreServer();
