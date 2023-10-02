import express from "express";
import { router } from "./routes/routes.js";

// import { router as userRouter } from "./users/users.route.js";

const app = express();
app.use(express.json());

//app.use("/api/v1", userRouter);
app.use("/api/v1", router);

export default app;

//app.listen(3000, () => {
//  console.log(`Server is running on port 3000 :-)...`);
//});
