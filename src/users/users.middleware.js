import { catchAsync, AppError } from "../errors/index.js";
import { UserService } from "./users.service.js";
import jwt from "jsonwebtoken";
import { promisify } from "util";
import { envs } from "../config/enviroments/enviroments.js";

const userService = new UserService();
export const protect = catchAsync(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return next(
      new AppError("You are not logged in!, please log in get access", 401)
    );
  }

  const decoded = await promisify(jwt.verify)(token, envs.SECRET_JWT_SEED);

  const user = await userService.findOneUserId(decoded.id);

  if (!user) {
    return next(
      new AppError("the owner of this token is not longer avalible", 401)
    );
  }

  req.sessionUser = user;
  next();
});

//-------
export const proctect = catchAsync(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return next(
      new AppError("You are not logged in!, please log in get access", 401)
    );
  }

  const decoded = await promisify(jwt.verify)(token, envs.SECRET_JWT_SEED);

  const user = await userService.findOneUserId(decoded.id);

  if (!user) {
    return next(
      new AppError("the owner of this token is not longer avalible", 401)
    );
  }

  req.sessionUser = user;
  next();
});
//-----------

export const validateExistUser = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const user = await userService.findOneUserId(id);

  if (!user) {
    return next(new AppError(`User not found with id: ${id}`, 404));
  }
  req.user = user;
  next();
});

export const restricTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.sessionUser.role)) {
      return next(
        new AppError("You do not have permission to perform this action", 403)
      );
    }
    next();
  };
};

//----------------------
export const protectAccount = (req, res, next) => {
  const { user, sessionUser } = req;

  if (user.id !== sessionUser.id) {
    return next(new AppError("you do not own  this account", 401));
  }

  next();
};
