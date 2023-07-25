import { Request, Response } from "express";
import { CreateUserInput } from "../schema/user.schema";
import { createUser } from "../service/user.service";
import logger from "../../../utils/logger";
import { updateSession } from "../service";
import { UserDocument } from "../models";

export async function createUserHandler(
  req: Request<{}, {}, CreateUserInput["body"]>,
  res: Response
) {
  try {
    const user = await createUser(req.body as UserDocument);
    return res.send(user);
  } catch (e: any) {
    logger.error(e);
    return res.status(409).send(e.message);
  }
}

export async function getCurrentUser(req: Request, res: Response) {
  return res.send(res.locals['user']);
}

export async function loginUser() {

}

export async function logoutHandler(req: Request, res: Response) {
  const sessionId = res.locals['user']?.session

  try {
    await updateSession({ _id: sessionId }, { valid: false });

    res.clearCookie('accessToken');
    res.clearCookie('refreshToken');

    return res.status(200).send(null);
  } catch (e: any) {
    logger.error(e);
    return res.status(409).send(e.message);
  }
}