import "dotenv/config";
import env from "env-var";

export const envs = {
  PORT: env.get("PORT").required().asPortNumber(),
  DB_URI: env.get("DB_URI").required().asString(),
};

/*
//DONDE MANEJAMOS LAS VAR DE ENTORNO

import "dotenv/config";
import env from "env-var";

//exportamos las variables de entorno
export const envs = {
  PORT: env.get("PORT").required().asPortNumber(), //PORT es la variable de entorno y debe ser requerida
  DB_URI: env.get("DB_URI").required().asString(), //DB_URI  caDENA DE CONEXION
};
*/
