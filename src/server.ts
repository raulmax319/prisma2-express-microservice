import express from 'express';
import { Server } from '@overnightjs/core';
import cors from 'cors';
import controllerInstances from '~/routes';
import { PrismaClient } from '.prisma/client';

class CoreServer extends Server {
  private readonly prisma: PrismaClient = new PrismaClient();
  private readonly PORT = process.env.PORT ?? 3001;
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
      .then(() => console.log('Prisma connected successfully'))
      .catch((e) => console.log('error... ', e));
    this.app.listen(this.PORT, () => {
      console.log(`Server is running on port ${this.PORT}`);
    });
  }
}

export const server = new CoreServer();
