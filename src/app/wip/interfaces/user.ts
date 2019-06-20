import {Position} from '../enumes/position.enum';

export interface User {
  uuid: string;
  firstName: string;
  lastName: string;
  email: string;
  description: string;
  position: Position;
  specializationField1: string;
  specializationField2: string;
  checkbox: boolean;

  lastActivity?: string;
  deletedAt?: string;
  updatedAt?: string;
  createdAt?: string;
  emailVerifiedAt?: string;
  activated?: boolean;
  deleted?: boolean;
}
