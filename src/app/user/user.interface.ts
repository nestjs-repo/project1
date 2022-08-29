import { UserDocument } from './schema/user.schema';

export interface IUserDocument extends Omit<UserDocument, 'role'> {
  role: string;
}

export interface IUserCreate {
  firstName?: string;
  lastName?: string;
  password: string;
  email: string;
  mobileNumber?: string;
  isConfirmed?: boolean;
  role: string;
}

export type IUserUpdate = Pick<IUserCreate, 'firstName' | 'lastName'>;

export interface IUserCheckExist {
  email: boolean;
  mobileNumber: boolean;
}
