import { NextFunction, Request, Response, Router } from 'express';
import statusCodes from 'http-status-codes';
import JWT from 'jsonwebtoken';
import ForbiddenError from '../errors/forbidden.error.model';
import basicAuthenticationMiddleware from '../middlewares/basic-authentication.middleware';
import userRepository from '../repositories/user.repository';

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
      const JWTOptions = {
        subject: user.uuid,
      };

      const jwt = JWT.sign(JWTPayload, secretKey, JWTOptions);
      res.status(statusCodes.OK).send({ token: jwt });
    } catch (error) {
      next(error);
    }
  }
);

export default authorizationRoute;
