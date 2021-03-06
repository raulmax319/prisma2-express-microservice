import { Controller, Get } from '@overnightjs/core';
import { NextFunction, Request, Response } from 'express';

@Controller('hello')
export class HelloWorldController {
  @Get('/')
  private getHello = (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Response<{ ok: boolean; message: string }> | undefined => {
    try {
      const response = { ok: true, message: 'helloWorld' };
      return res.send(response);
    } catch (e) {
      return res.status(500).send({ ok: false, message: e.message });
    }
  };
}
