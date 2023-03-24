import BaseError from '@/utils/exceptions/base.exception';
import { Request, Response, NextFunction } from 'express';

function errorMiddleware(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (err instanceof BaseError) {
    return res
      .status(err.statusCode)
      .send({ errors: err.serializeErrors() });
  }

  res.status(500).send('Something went wrong');
}

export default errorMiddleware;
