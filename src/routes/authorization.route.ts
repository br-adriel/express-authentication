import { NextFunction, Request, Response, Router } from 'express';
import statusCodes from 'http-status-codes';
import JWT from 'jsonwebtoken';
import ForbiddenError from '../errors/forbidden.error.model';
import userRepository from '../repositories/user.repository';

const authorizationRoute = Router();

authorizationRoute.post(
  '/token',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const authorizationHeader = req.headers['authorization'];
      if (!authorizationHeader) {
        throw new ForbiddenError('Credenciais não informadas');
      }

      const [authenticationType, token] = authorizationHeader.split(' ');
      if (authenticationType !== 'Basic' || !token) {
        throw new ForbiddenError('Tipo inválido de autenticação');
      }

      const tokenContent = Buffer.from(token, 'base64').toString('utf-8');
      const [username, password] = tokenContent.split(':');
      if (!username || !password) {
        throw new ForbiddenError('Credenciais não preenchidas');
      }

      const user = await userRepository.findByUsernameAndPassword(
        username,
        password
      );
      if (!user) {
        throw new ForbiddenError('Username ou senha inválidos');
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
