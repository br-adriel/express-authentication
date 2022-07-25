import { Router, Request, Response, NextFunction } from 'express';
import statusCodes from 'http-status-codes';

const usersRoute = Router();

usersRoute.get('/users', (req: Request, res: Response, next: NextFunction) => {
  const users = [{ userName: 'Adriel' }];
  res.status(statusCodes.OK).send(users);
});

usersRoute.get(
  '/users/:uuid',
  (req: Request<{ uuid: string }>, res: Response, next: NextFunction) => {
    const uuid = req.params.uuid;
    res.status(statusCodes.OK).send(uuid);
  }
);

export default usersRoute;
