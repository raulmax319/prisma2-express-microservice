import { Router } from 'express';

export default (router: Router): void => {
  router.get('/', (req, res) => {
    return res.send({ type: 'ok', message: 'Hello World!' });
  });
};
