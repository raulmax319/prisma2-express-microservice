import { User } from '@prisma/client';
import { Controller, Get, Post } from '@overnightjs/core';
import { NextFunction, Request, Response } from 'express';
import { database } from '~/database/database';

type OmittedUser = Omit<User, 'password'>;

interface UserCreationResponse {
  username?: string;
  email: string;
}

@Controller('user')
export class UserController {
  private readonly prisma: typeof database = database;

  @Get(':id')
  private async getUser(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response<OmittedUser>> {
    const { id } = req.params;

    if (!id || typeof id === 'number')
      return res.status(400).json({
        message: `ID provided invalid or empty, did you mistyped something?`,
      });

    try {
      const user: OmittedUser = await this.prisma.user.findUnique({
        where: { id: Number(id) },
      });

      const response: OmittedUser = {
        id: Number(id),
        username: user.username,
        email: user.email,
        createdAt: user.createdAt,
      };
      return res.json(response);
    } catch (e) {
      const response = {
        payload: e,
        message: `User with ID: ${id} not found.`,
      };
      return res.status(404).json(response);
    }
  }

  @Post('create')
  private async saveUser(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response<UserCreationResponse>> {
    try {
      const user: Omit<User, 'id'> = {
        email: 'test.user4@mail.com',
        password: '51515',
        username: 'testuser4',
        createdAt: new Date(),
      };

      const newUser: User = await this.prisma.user.create({
        data: user,
      });

      const response: UserCreationResponse = {
        username: newUser.username,
        email: newUser.email,
      };
      return res.status(201).json(response);
    } catch (error) {
      const message = `Unique constraint failed on the fields: [${error.meta.target.map(
        (elem: string) => `(${elem})`,
      )}]`;
      const response = {
        code: error.code,
        message,
      };
      return res.status(409).json(response);
    }
  }
}
