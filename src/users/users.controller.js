import { UserService } from "./users.service.js";
import {
  validateUser,
  validatePartialUser,
  validateLogin,
} from "./users.schema.js";
import { catchAsync } from "../errors/index.js";
import generateJWT from "../config/plugins/generatejwt.plugin.js";
import { verifyPassword } from "../config/plugins/encriptedPassword.plugin.js";

const userService = new UserService();

//------------ LOGIN AND REGISTER-------
export const login = catchAsync(async (req, res, next) => {
  const { hasError, errorMessages, userData } = validateLogin(req.body);

  if (hasError) {
    return res.status(422).json({
      status: "error",
      message: errorMessages,
    });
  }
  //1 validar que user exista en db
  const user = await userService.findOneUser(userData.email);

  if (!user) {
    return next(new AppError("This account does not exist", 404));
  }

  const isCorrectPassword = await verifyPassword(
    userData.password,
    user.password
  );
  //2 valida la contraseña si es correcta
  if (!isCorrectPassword) {
    return next(new AppError("Incorrect email or password", 401));
  }

  //3. generear el token
  const token = await generateJWT(user.id);

  //4. envia la respuesta al cliente
  return res.status(200).json({
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      status: user.status,
    },
  });
});
//---------------------------------------

//find all users
export const findAllUsers = catchAsync(async (req, res, next) => {
  const users = await userService.findAllUsers();
  return res.json(users);
});

//create users (register)
export const register = catchAsync(async (req, res, next) => {
  const { hasError, errorMessages, userData } = validateUser(req.body);

  if (hasError) {
    return res.status(422).json({
      status: "error",
      message: errorMessages,
    });
  }

  const user = await userService.createUser(userData);

  const token = await generateJWT(user.id);

  return res.status(201).json({
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      status: user.status,
    },
  });
});

export const findOneUser = catchAsync(async (req, res) => {
  const { user } = req;
  return res.json(user);
});

//update user
export const updateUser = catchAsync(async (req, res) => {
  const { hasError, errorMessages, userData } = validatePartialUser(req.body);

  if (hasError) {
    return res.status(422).json({
      status: "error",
      message: errorMessages,
    });
  }

  const { id } = req.params;
  const user = await userService.findOneUserId(id);
  if (!user) {
    return res.status(404).json({
      status: "error",
      message: `User with id: ${id} not found for update`,
    });
  }
  const updatedUser = await userService.updateUser(user, userData);
  return res.json(updatedUser);
});

//delete user
export const deleteUser = catchAsync(async (req, res) => {
  const { user } = req;
  await userService.deleteUser(user);
  return res.status(204).json(null);
});
