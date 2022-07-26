import { NextFunction, Request, Response } from 'express';
import JWT from 'jsonwebtoken';
import ForbiddenError from '../errors/forbidden.error.model';

async function jwtAuthenticationMiddleware(
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

    try {
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
      throw new ForbiddenError('Token inválido');
    }
  } catch (error) {
    next(error);
  }
}

export default jwtAuthenticationMiddleware;
