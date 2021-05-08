import { User } from '@prisma/client';
import { Logger } from 'tslog';
import {
  BadRequestError,
  OmittedUser,
  SafeUser,
  UserCreationResponse,
  UserError,
} from '~/common/interfaces/user.interface';
import { database } from '~/database/database';

export class UserService {
  private readonly prisma: typeof database = database;

  // Debug only
  // private readonly logger: Logger = new Logger();

  public createUser = async (
    userData: Exclude<User, 'id'>,
  ): Promise<UserCreationResponse | UserError> => {
    try {
      const data: User = {
        ...userData,
        createdAt: new Date(),
      };

      const user: User = await this.prisma.user.create({
        data,
      });

      const newUser: UserCreationResponse = {
        code: 'OK',
        message: 'User was created successfully.',
        payload: {
          username: user.username,
          email: user.email,
        },
      };
      return newUser;
    } catch (error) {
      const message = `Unique constraint failed on the fields: [${error.meta.target.map(
        (elem: string) => `(${elem})`,
      )}]`;
      const err: UserError = {
        code: error.code,
        message,
      };
      return err;
    }
  };

  public findUser = async (id: number): Promise<SafeUser | BadRequestError> => {
    try {
      const user: OmittedUser = await this.prisma.user.findUnique({
        where: { id },
      });

      const response: SafeUser = {
        code: 'OK',
        payload: {
          id,
          username: user.username,
          email: user.email,
          createdAt: user.createdAt,
        },
      };
      return response;
    } catch (e) {
      const response: BadRequestError = {
        payload: e,
        message: `User with ID: ${id} not found.`,
      };
      return response;
    }
  };
}
