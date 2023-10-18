import { body, validationResult } from "express-validator";

export const validateCreateRepairs = [
  body("date")
    .notEmpty()
    .withMessage("The date is required")
    .isISO8601()
    .withMessage("The date must be in ISO8601 format (YYYY-MM-DD)"),

  body("motorsNumber")
    .notEmpty()
    .withMessage("The number of engine is mandatory")
    .isInt({ min: 1 })
    .withMessage(
      "The mnotor number must be an integer greater than or equal to 1"
    ),

  body("description")
    .notEmpty()
    .withMessage("The description is required")
    .isString()
    .withMessage("Description must be a text string"),
];

export const checkValidationResult = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array(),
    });
  }
  next();
};
