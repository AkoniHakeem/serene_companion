import { db } from "@services/databaseService";
import { Request, RequestHandler, Response, Router } from "express";
import { UserResponse } from "src/entities/userResponse";

const router = Router();

const path = {
  responses: "/responses",
};

const handler: RequestHandler = async (req: Request, res: Response) => {
  const responses = await db().find(UserResponse);

  return res.status(200).json(responses);
};

router.get(path.responses, handler);

export default router;
