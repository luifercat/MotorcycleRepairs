import express from "express";
import { AppError } from "./errors/appError.js";
import { router } from "./routes/routes.js";
import { envs } from "./config/enviroments/enviroments.js";
import { globalerrorHandler } from "./errors/error.controller.js";
import { enableCors } from "./config/plugins/cors.plugins.js";
import { enableMorgan } from "./config/plugins/morgan.plugins.js";

import { limitRequest } from "./config/plugins/rateLimitPlugins.js";
import { setSecurityHeader } from "./config/plugins/securityHeaderPlugin.js";
import { sanitizaterClear } from "./config/plugins/sanitizaterPlugins.js";
import { setParameterPollution } from "./config/plugins/paramaterPollutionPlugins.js";
// import { router as userRouter } from "./users/users.route.js";

const app = express();

const ACCEPTED_ORIGINS = ["http://localhost:8080", "http://localhost:5434"];

app.use(express.json());

const rateLimit = limitRequest(
  20,
  60,
  "too many request from this Ip , please try again in an hour!"
);
const helmet = setSecurityHeader();
const sanitizater = sanitizaterClear();
const hpp = setParameterPollution();

app.use("/api/v1", router);

//TODO: refactorizar
if (envs.NODE_ENV === "development") {
  enableMorgan(app);
}

app.use(rateLimit);
app.use(helmet());
app.use(sanitizater);
app.use(hpp());
enableCors(app, ACCEPTED_ORIGINS);

app.all("*", (req, res, next) => {
  next(new AppError(`can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalerrorHandler);

export default app;
