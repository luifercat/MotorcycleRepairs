import { catchAsync } from "../errors/index.js";
import { RepairService } from "./repairs.service.js";

const repairService = new RepairService();

export const validateExistRepair = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const repair = await repairService.findOneRepair(id);

  if (repair?.dataValues.status !== "pending") {
    return next(new AppError(`repair not found with id: ${id}`, 404));
  }

  req.repair = repair;
  next();
});
