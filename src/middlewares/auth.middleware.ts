import { Request, Response, NextFunction } from "express";
import { User } from "../models/User.model";

export const attachUser = async (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  const auth = req.auth;

  if (!auth) {
    return next();
  }

  const auth0Id = auth.sub;
  const email = auth.email;

  let user = await User.findOne({ auth0Id });

  if (!user) {
    user = await User.create({
      auth0Id,
      email,
      name: auth.name,
    });
  }

  req.user = user; // 🔥 your existing code works now
  next();
};
