import z from "zod";
import { extractValidationData } from "../common/utils/extractErrorData.js";

export const repairSchema = z.object({
  date: z.string({
    invalid_type_error: "Date must be a correct format!",
    required_error: "Date is required",
  }),
  motorsNumber: z.number({
    invalid_type_error: "Motor Number must be a correct format!",
    required_error: "Motor Number is required",
  }),
  description: z.string({
    invalid_type_error: "Description must be a correct format!",
    required_error: "Description is required",
  }),
  userId: z.number({
    invalid_type_error: "user ID  must be a correct format!",
    required_error: "user id is required",
  }),
});

//funcion que se va a encargar de validar
export function validateRepair(data) {
  const result = repairSchema.safeParse(data); //safeParse es un metodo que hace la validacion

  const {
    hasError,
    errorMessages,
    data: repairData, //aqui se renombra la const data por passengerData
  } = extractValidationData(result);

  return {
    hasError,
    errorMessages,
    repairData,
  };
}

//valida el update  -   partial porque valida parcialmente
export function validatePartialRepair(data) {
  const result = repairSchema.partial().safeParse(data);

  const {
    hasError, //para indicar si la data tiene algun error o no
    errorMessages,
    data: repairData,
  } = extractValidationData(result);

  return {
    hasError,
    errorMessages,
    repairData,
  };
}
