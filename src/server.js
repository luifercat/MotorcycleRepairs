import { envs } from "./config/enviroments/enviroments.js";
import app from "./app.js";
import { authenticate, syncUp } from "./config/database/database.js";
import { associationModels } from "./config/database/association.js";

async function main() {
  try {
    await authenticate();
    associationModels();
    await syncUp();
  } catch (error) {
    console.error(error);
  }
}

main();
app.listen(envs.PORT, () => {
  console.log(`Server running on port ${envs.PORT}`);
});
