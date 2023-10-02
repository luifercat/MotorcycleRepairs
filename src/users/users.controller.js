import { UserService } from "./users.service.js";

const userService = new UserService();

//create users
export const createUser = async (req, res) => {
  try {
    const user = await userService.createUser(req.body);
    return res.status(201).json(user);
  } catch (error) {
    return res.status(500).json(error);
  }
};

//find all users
export const findAllUsers = async (req, res) => {
  try {
    const users = await userService.findAllUsers();
    return res.json(users);
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const findOneUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await userService.findOneUser(id);
    if (!user) {
      return res.status(404).json({
        status: "error",
        message: `User with id: ${id} not found`,
      });
    }
    return res.json(user);
  } catch (error) {
    return res.status(500).json(error);
  }
};

//update user
export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await userService.findOneUser(id);
    if (!user) {
      return res.status(404).json({
        status: "error",
        message: `User with id: ${id} not found for update`,
      });
    }
    const updatedUser = await userService.updateUser(user, req.body);
    return res.json(updatedUser);
  } catch (error) {
    return res.status(500).json(error);
  }
};

//delete user
export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await userService.findOneUser(id);
    if (!user) {
      return res.status(404).json({
        status: "error",
        message: `User with id: ${id} not found for delete`,
      });
    }
    await userService.deleteUser(user);
    return res.status(204).json(null);
  } catch (error) {
    return res.status(500).jason(error);
  }
};
