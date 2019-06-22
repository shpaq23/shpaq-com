import {User} from './user';

export interface ServerResponse {
  code: number;
  data: any|User;
  message: string;
}
