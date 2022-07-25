import { NextFunction, Request, Response } from 'express';
import statusCodes from 'http-status-codes';
import DatabaseError from '../errors/database.error.model';

function errorHandler(
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (error instanceof DatabaseError) {
    res.sendStatus(statusCodes.BAD_REQUEST);
  } else {
    res.sendStatus(statusCodes.INTERNAL_SERVER_ERROR);
  }
}

export default errorHandler;
