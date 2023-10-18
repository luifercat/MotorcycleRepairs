import { Router } from "express";
import {
  createRepair,
  findAllRepairs,
  findOneRepair,
  updateRepair,
  deleteRepair,
} from "./repairs.controller.js";
import { validateExistRepair } from "./repairs.middleware.js";
import { protect, restricTo } from "../users/users.middleware.js";
import {
  validateCreateRepairs,
  checkValidationResult,
} from "../config/plugins/expressValidateRepairs.js";

export const router = Router();
router.use(protect);

router
  .route("/")
  .get(restricTo("employee"), findAllRepairs)
  .post(
    restricTo("employee"),
    validateCreateRepairs,
    checkValidationResult,
    createRepair
  );

router
  .route("/:id")
  .get(validateExistRepair, restricTo("employee"), findOneRepair)
  .patch(restricTo("employee"), updateRepair)
  .delete(restricTo("employee"), deleteRepair);
