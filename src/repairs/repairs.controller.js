import { RepairService } from "./repairs.service.js";

const repairService = new RepairService();

//create Repair
export const createRepair = async (req, res) => {
  try {
    const repair = await repairService.createRepair(req.body);
    return res.status(201).json(repair);
  } catch (error) {
    return res.status(500).json(error);
  }
};

//find all Repair
export const findAllRepairs = async (req, res) => {
  try {
    const repairs = await repairService.findAllRepairs();
    return res.json(repairs);
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const findOneRepair = async (req, res) => {
  try {
    const { id } = req.params;
    const repair = await repairService.findOneRepair(id);
    if (!repair) {
      return res.status(404).json({
        status: "error",
        message: `Repair with id: ${id} not found`,
      });
    }
    return res.json(repair);
  } catch (error) {
    return res.status(500).json(error);
  }
};

//update repair
export const updateRepair = async (req, res) => {
  try {
    const { id } = req.params;
    const repair = await repairService.findOneRepair(id);
    if (!repair) {
      return res.status(404).json({
        status: "error",
        message: `Repair with id: ${id} not found for update`,
      });
    }
    const updatedRepair = await repairService.updateRepair(repair, req.body);
    return res.json(updatedRepair);
  } catch (error) {
    return res.status(500).json(error);
  }
};

//delete repair
export const deleteRepair = async (req, res) => {
  try {
    const { id } = req.params;
    const repair = await repairService.findOneRepair(id);
    if (!repair) {
      return res.status(404).json({
        status: "error",
        message: `Repair with id: ${id} not found for update`,
      });
    }
    await repairService.deleteRepair(repair);
    return res.status(204).json(null);
  } catch (error) {
    return res.status(500).jason(error);
  }
};
