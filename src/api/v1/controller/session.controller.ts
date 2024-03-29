import { CookieOptions, Request, Response } from "express";
import config from "config";
import jwt from "jsonwebtoken";
import {
  createSession,
  findSessions,
  updateSession,
} from "../service/session.service";
import {
  findAndUpdateUser,
  getGoogleOAuthTokens,
  getGoogleUser,
  validatePassword,
} from "../service/user.service";
import { signJwt } from "../../../utils/jwt.utils";
import log from "../../../utils/logger";
import logger from "../../../utils/logger";

const accessTokenCookieOptions: CookieOptions = {
  maxAge: 900000, // 15 mins
  httpOnly: true,
  domain: "localhost",
  path: "/",
  sameSite: "lax",
  secure: true,
};

const refreshTokenCookieOptions: CookieOptions = {
  ...accessTokenCookieOptions,
  maxAge: 3.154e10, // 1 year
};

export async function createUserSessionHandler(req: Request, res: Response) {
  // Validate the user's password
  const user = await validatePassword(req.body);

  if (!user) {
    return res.status(401).send("Invalid email or password");
  }

  // create a session
  const session = await createSession(user["_id"], req.get("user-agent") || "");

  // create an access token

  const accessToken = signJwt(
    { ...user, session: session["_id"] },
    { expiresIn: config.get("accessTokenTtl") } // 15 minutes
  );

  // create a refresh token
  const refreshToken = signJwt(
    { ...user, session: session["_id"] },
    { expiresIn: config.get("refreshTokenTtl") } // 15 minutes
  );

  // return access & refresh tokens

  res.cookie("accessToken", accessToken, accessTokenCookieOptions);

  res.cookie("refreshToken", refreshToken, refreshTokenCookieOptions);

  return res.send({ accessToken, refreshToken });
}

export async function getUserSessionsHandler(req: Request, res: Response) {
  const userId = res.locals["user"]._id;

  const sessions = await findSessions({ user: userId, valid: true });

  return res.send(sessions);
}

export async function deleteSessionHandler(req: Request, res: Response) {
  const sessionId = res.locals["user"].session;

  await updateSession({ _id: sessionId }, { valid: false });

  return res.send({
    accessToken: null,
    refreshToken: null,
  });
}

export async function googleOauthHandler(req: Request, res: Response) {
  // get the code from qs
  const code = req.query["code"] as string;

  try {
    // get the id and access token with the code
    const { id_token, access_token } = await getGoogleOAuthTokens({ code });

    // get user with tokens
    const googleUser = await getGoogleUser({ id_token, access_token });

    if (!googleUser.verified_email) {
      return res.status(403).send("Google account is not verified");
    }

    // upsert the user
    const user = await findAndUpdateUser(
      {
        email: googleUser.email,
      },
      {
        email: googleUser.email,
        name: googleUser.name,
        picture: googleUser.picture,
      },
      {
        upsert: true,
        new: true,
      }
    );

    const accessToken = signJwt(
      { ...user.toJSON() },
      { expiresIn: config.get("accessTokenTtl") } // 15 minutes
    );

    // create a refresh token
    const refreshToken = signJwt(
      { ...user.toJSON() },
      { expiresIn: config.get("refreshTokenTtl") } // 1 year
    );

    let url = config.get("origin") + `/signin/oauth/success?accessToken=${accessToken}&refreshToken=${refreshToken}`
    res.redirect(url);
  } catch (error) {
    log.error(error, "Failed to authorize Google user");
    return res.redirect(`${config.get("origin")}/signin`);
  }
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
    return res.status(404).send(e.message);
  }
}