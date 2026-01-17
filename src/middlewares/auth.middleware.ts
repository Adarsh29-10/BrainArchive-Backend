import { Request, Response, NextFunction } from "express";

export const attachUser = async (req:Request, _res:Response, next:NextFunction) => {
  const auth = req.auth;

  if (!auth?.sub) return next();

  req.user = {
    auth0Id: auth.sub
  };

  next();
};
