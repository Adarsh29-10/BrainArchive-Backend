import { IUser } from "../models/User.model";

declare global {
  namespace Express {
    interface Request {
      user?: {
        auth0Id: string;
      };
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
