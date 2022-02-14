import { Router } from "express";
import userRouter from "./user-router";
import botUser from "@routes/botUserRouter";
import responsesRouter from "@routes/getResponsesRouter";

// Export the base-router
const baseRouter = Router();

// Setup routers
baseRouter.use("/users", userRouter);
baseRouter.use("/slack", botUser);
baseRouter.use("", responsesRouter);

// Export default.
export default baseRouter;
