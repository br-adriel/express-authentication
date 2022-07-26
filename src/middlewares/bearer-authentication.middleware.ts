import { NextFunction, Request, Response } from 'express';
import ForbiddenError from '../errors/forbidden.error.model';
import JWT from 'jsonwebtoken';
import userRepository from '../repositories/user.repository';

async function bearerAuthenticationMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const authorizationHeader = req.headers['authorization'];
    if (!authorizationHeader) {
      throw new ForbiddenError('Credenciais não informadas');
    }

    const [authenticationType, token] = authorizationHeader.split(' ');
    if (authenticationType !== 'Bearer' || !token) {
      throw new ForbiddenError('Tipo inválido de autenticação');
    }

    const tokenPayload = JWT.verify(token, `${process.env.SECRET_KEY}`);
    if (typeof tokenPayload !== 'object' || !tokenPayload.sub) {
      throw new ForbiddenError('Token inválido');
    }

    req.user = {
      uuid: tokenPayload.sub,
      username: tokenPayload.username,
    };

    next();
  } catch (error) {
    next(error);
  }
}

export default bearerAuthenticationMiddleware;
