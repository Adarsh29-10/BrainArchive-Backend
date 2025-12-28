import { IUser } from "../models/User.model";

declare global {
  namespace Express {
    interface Request {
      user?: IUser;
      auth?: {
        sub?: string;
        email?: string;
        name?: string;
        [key: string]: any;
      };
    }
  }
}

export {};
