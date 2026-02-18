import { Request } from "express";
import { User } from "../modules/user/User.model";
import { ApiError } from "./ApiError";

export const getCurrentUser = async (req: Request) => {
  if (!req.user?.auth0Id) {
    throw new ApiError(401, "Unauthorized");
  }

  const user = await User.findOne({ auth0Id: req.user.auth0Id });

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  return user;
};
