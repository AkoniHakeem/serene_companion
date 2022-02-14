import { Router } from "express";
import userRouter from "./user-router";
import botUser from "@routes/botUserRouter";

// Export the base-router
const baseRouter = Router();

// Setup routers
baseRouter.use("/users", userRouter);
baseRouter.use("/slack", botUser);

// Export default.
export default baseRouter;
