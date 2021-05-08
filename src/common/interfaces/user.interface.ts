import { User } from '@prisma/client';

export type OmittedUser = Omit<User, 'password'>;

export interface UserCreationResponse {
  code: string;
  message: string;
  payload: {
    username?: string;
    email: string;
  };
}

export interface SafeUser {
  code: string;
  payload: {
    id: number;
    username: string;
    email: string;
    createdAt: Date;
  };
}

export interface UserError {
  code: string;
  message: string;
}

export interface BadRequestError {
  payload: Record<string, unknown>;
  message: string;
}
