import { Controller, Get, Post } from '@overnightjs/core';
import { NextFunction, Request, Response } from 'express';
import { SafeUser, UserCreationResponse, UserError } from '~/common/interfaces/user.interface';
import { UserService } from '~/services/user.service';

// @TODO Error handling
@Controller('user')
export class UserController {
  private readonly userService: UserService = new UserService();

  @Get(':id')
  private findOne = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response<SafeUser>> => {
    const { id } = req.params;

    if (!id || typeof id === 'number')
      return res.status(400).json({
        message: `ID provided invalid or empty, did you mistyped something?`,
      });

    try {
      const response = await this.userService.findUser(Number(id));
      return res.status(200).json(response);
    } catch (e) {
      const response = {
        payload: e,
      };
      return res.status(500).json(response);
    }
  };

  @Post('create')
  private create = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response<UserCreationResponse | UserError>> => {
    try {
      const response = await this.userService.createUser(req.body);

      if (response.code === 'P2002') return res.status(409).json(response);

      return res.status(201).json(response);
    } catch {
      return res.status(500).json({ message: 'Internal server error.' });
    }
  };
}
