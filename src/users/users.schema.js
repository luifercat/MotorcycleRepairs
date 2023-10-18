import z from "zod";
import { extractValidationData } from "../common/utils/extractErrorData.js";

export const userSchema = z.object({
  name: z
    .string()
    .min(5, {
      message: "The name is too short, it does not meet the parameter",
    })
    .max(30, {
      message: "The name is too short, it does not meet the parameter",
    }),
  email: z.string().email(),
  password: z.string().min(8),
  role: z.enum(["client", "employee"]),
});

//---- validate login -----
const loginUserSchema = z.object({
  email: z.string().email({ message: "Invalid email" }),
  password: z.string().min(8, { message: "Password is too short" }),
});

export const validateLogin = (data) => {
  const result = loginUserSchema.safeParse(data); //safeParse es un metodo que hace la validacion

  const {
    hasError,
    errorMessages,
    data: userData, //aqui se renombra la const data por passengerData
  } = extractValidationData(result); //lo que hace la funcion extractValidationData es sacar todos los resultados, errores, data y retorna todo

  return {
    hasError,
    errorMessages,
    userData,
  };
};
//--------------------

//funcion que se va a encargar de validar
export const validateUser = (data) => {
  const result = userSchema.safeParse(data); //safeParse es un metodo que hace la validacion

  const {
    hasError,
    errorMessages,
    data: userData, //aqui se renombra la const data por passengerData
  } = extractValidationData(result); //lo que hace la funcion extractValidationData es sacar todos los resultados, errores, data y retorna todo

  return {
    hasError,
    errorMessages,
    userData,
  };
};

//valida el update  -   partial porque valida parcialmente
export const validatePartialUser = (data) => {
  const result = userSchema.partial().safeParse(data);

  const {
    hasError, //para indicar si la data tiene algun error o no
    errorMessages,
    data: userData,
  } = extractValidationData(result);

  return {
    hasError,
    errorMessages,
    userData,
  };
};
