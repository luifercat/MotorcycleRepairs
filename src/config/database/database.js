import { Sequelize } from "sequelize";
import { envs } from "../enviroments/enviroments.js";

const sequelize = new Sequelize(envs.DB_URI, {
  logging: false, //no ver el log en consola
});

export async function authenticate() {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully. 😎");
  } catch (error) {
    throw new Error("Error al autenticar: ", error);
  }
}

export async function syncUp() {
  try {
    //await sequelize.sync({ force: true });
    await sequelize.sync();
    console.log("Connection has been synced successfully 😎");
  } catch (error) {
    throw new Error("Error al sincronizar: ", error);
  }
}

export default sequelize;
