import Repair from "./repairs.model.js";

export class RepairService {
  async findOneRepair(id) {
    return await Repair.findOne({
      where: {
        id,
        status: true,
      },
    });
  }

  async findAllRepairs() {
    return await Repair.findAll({
      where: {
        status: true,
      },
    });
  }

  async createRepair(data) {
    return await Repair.create(data);
  }

  async updateRepair(repair, data) {
    return await repair.update(data);
  }

  async deleteRepair(repair) {
    return await repair.update({ status: false });
  }
}
