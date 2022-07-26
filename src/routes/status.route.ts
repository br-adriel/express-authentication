import { NextFunction, Request, Response, Router } from 'express';
import statusCodes from 'http-status-codes';

const statusRoute = Router();

statusRoute.get(
  '/status',
  (req: Request, res: Response, next: NextFunction) => {
    res.sendStatus(statusCodes.OK);
  }
);

export default statusRoute;
