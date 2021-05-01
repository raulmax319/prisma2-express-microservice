import { Express, Router } from 'express';
import { readdirSync } from 'fs';

export default (app: Express): void => {
  const router = Router();
  app.use('/api/v1', router);

  readdirSync(`${__dirname}/v1`).map((file) => {
    if (!file.endsWith('.map')) require(`./v1/${file}`).default(router);
  });
};
