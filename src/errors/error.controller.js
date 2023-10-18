import { envs } from "../config/enviroments/enviroments.js";
import { AppError } from "./appError.js";
import Error from "./error.model.js";

const handleCastError22001 = () =>
  new AppError("value too long for type on attribute in database", 400); //puede o no llevar el return

const handleCastError23505 = () => {
  return new AppError("Duplicate field value: please use another value", 400); //puede o no llevar el return
};

const sendErrorDev = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    stack: err.stack,
    error: err,
  });
};

const sendErrorProd = async (err, res) => {
  await Error.create({
    status: err.status,
    message: err.message,
    stack: err.stack,
  });

  if (err.isOperational) {
    //is operational error?
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } else {
    res.status(500).json({
      status: "fail",
      message: "something went very wrong!",
    });
  }
};

export const globalerrorHandler = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "fail";

  if (envs.NODE_ENV === "development") {
    sendErrorDev(err, res);
  }

  if (envs.NODE_ENV === "production") {
    let error = err;
    if (err.parent?.code === "22001") error = handleCastError22001();
    if (err.parent?.code === "23505") error = handleCastError23505();

    sendErrorProd(error, res);
  }
};
