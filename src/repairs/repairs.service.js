import Repair from "./repairs.model.js";
import { Op } from "sequelize";
import User from "../users/users.model.js";

export class RepairService {
  async findOneRepair(id) {
    return await Repair.findOne({
      where: {
        id,
        status: "pending",
      },
    });
  }

  async findAllRepairs() {
    return await Repair.findAll({
      where: {
        status: {
          [Op.in]: ["pending", "completed"],
        },
      },
      include: [
        {
          model: User,
          as: "Data User",
          attributes: ["name", "email", "role", "status"],
        },
      ],
    });
  }

  async createRepair(data) {
    return await Repair.create(data);
  }

  async updateRepair(repair, data) {
    return await repair.update(data);
  }

  async deleteRepair(repair) {
    return await repair.update({ status: "cancelled" });
  }
}
