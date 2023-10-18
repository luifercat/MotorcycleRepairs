import User from "./users.model.js";

export class UserService {
  async findOneUser(email) {
    return await User.findOne({
      where: {
        email,
        status: "available",
      },
    });
  }

  async findOneUserId(id) {
    return await User.findOne({
      where: {
        id,
        status: "available",
      },
    });
  }

  async findAllUsers() {
    return await User.findAll({});
  }

  async createUser(data) {
    return await User.create(data);
  }

  async updateUser(user, data) {
    return await user.update(data);
  }

  async deleteUser(user) {
    console.log("user del serv--->  " + user.name);
    return await user.update({ status: "not available" });
  }
}
