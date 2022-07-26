import { NextFunction, Request, Response, Router } from 'express';
import statusCodes from 'http-status-codes';
import JWT, { SignOptions } from 'jsonwebtoken';
import ForbiddenError from '../errors/forbidden.error.model';
import basicAuthenticationMiddleware from '../middlewares/basic-authentication.middleware';
import jwtAuthenticationMiddleware from '../middlewares/jwt-authentication.middleware';

const authorizationRoute = Router();

authorizationRoute.post(
  '/token',
  basicAuthenticationMiddleware,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = req.user;
      if (!user) {
        throw new ForbiddenError('Usuario nao informado');
      }

      const JWTPayload = { username: user.username };
      const secretKey = `${process.env.SECRET_KEY}`;
      const JWTOptions: SignOptions = {
        subject: user.uuid,
        expiresIn: '15m',
      };

      const jwt = JWT.sign(JWTPayload, secretKey, JWTOptions);
      res.status(statusCodes.OK).send({ token: jwt });
    } catch (error) {
      next(error);
    }
  }
);

authorizationRoute.post(
  '/token/validate',
  jwtAuthenticationMiddleware,
  async (req: Request, res: Response, next: NextFunction) => {
    res.sendStatus(statusCodes.OK);
  }
);

export default authorizationRoute;
