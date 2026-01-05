import { User } from "../models/User.model";
import { Request, Response, NextFunction } from "express";

export const attachUser = async (req:Request, _res:Response, next:NextFunction) => {
  try {
    const auth = req.auth;

    if (!auth?.sub) {
      return next();
    }

    const auth0Id = auth.sub;

    const email =
      auth.email ||
      auth["https://brainarchive/email"] ||
      `${auth0Id}@auth0.local`;


    let user = await User.findOne({ auth0Id });

    if (!user) {
      user = await User.create({
        auth0Id,
        email,
        name: auth.name || "Unknown",
      });

    }

    req.user = user;
    next();
  } catch (error) {
    console.error("ATTACH USER ERROR:", error);
    next(error);
  }
};
