import { Router } from "express";
import {
  //createUser,
  findAllUsers,
  findOneUser,
  updateUser,
  deleteUser,
  login,
  register, //reemplaza createUser
} from "./users.controller.js";
import {
  proctect,
  protectAccount,
  validateExistUser,
} from "./users.middleware.js";
import {
  checkValidationResult,
  validateRegisterUser,
} from "../config/plugins/expressValidateUser.js";

export const router = Router();

router.post("/login", login);

router.post(
  "/register",
  proctect,
  validateRegisterUser,
  checkValidationResult,
  register
);

router.route("/").get(findAllUsers);

router
  .route("/:id")
  .get(validateExistUser, findOneUser)
  .patch(updateUser)
  .delete(proctect, validateExistUser, protectAccount, deleteUser);
