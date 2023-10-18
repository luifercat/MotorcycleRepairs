import { body, validationResult } from "express-validator";

export const validateRegisterUser = [
  body("name")
    .notEmpty()
    .withMessage("The name is required")
    .isLength({ min: 5 })
    .withMessage("The name must be at least 5 characters"),

  body("email")
    .notEmpty()
    .withMessage("The email is required")
    .isEmail()
    .withMessage("The email is not valid"),

  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 8 })
    .withMessage("The password must be at least 8 characters"),
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
