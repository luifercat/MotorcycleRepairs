import { RepairService } from "./repairs.service.js";
import { validateRepair, validatePartialRepair } from "./repairs.schema.js";
import { catchAsync, AppError } from "../errors/index.js";

const repairService = new RepairService();

//create Repair
export const createRepair = catchAsync(async (req, res) => {
  const { hasError, errorMessages, repairData } = validateRepair(req.body);

  if (hasError) {
    return res.status(422).json({
      status: "error",
      message: errorMessages,
    });
  }

  const repair = await repairService.createRepair(repairData);
  return res.status(201).json(repair);
});

//find all Repair
export const findAllRepairs = catchAsync(async (req, res) => {
  const repairs = await repairService.findAllRepairs();
  return res.json(repairs);
});

export const findOneRepair = catchAsync(async (req, res) => {
  const { repair } = req;

  return res.json(repair);
});

//update repair
export const updateRepair = catchAsync(async (req, res) => {
  const { hasError, errorMessages, repairData } = validatePartialRepair(
    req.body
  );

  if (hasError) {
    return res.status(422).json({
      status: "error",
      message: errorMessages,
    });
  }

  const { id } = req.params;
  const repair = await repairService.findOneRepair(id);
  if (!repair) {
    return res.status(404).json({
      status: "error",
      message: `Repair with id: ${id} not found for update`,
    });
  }
  const updatedRepair = await repairService.updateRepair(repair, repairData);
  return res.json(updatedRepair);
});

//delete repair
export const deleteRepair = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const repair = await repairService.findOneRepair(id);
  if (!repair) {
    return next(
      new AppError(
        `repair not found with id: ${id} not found for delete ******`,
        404
      )
    );
  }
  await repairService.deleteRepair(repair);
  return res.status(204).json(null);
});
