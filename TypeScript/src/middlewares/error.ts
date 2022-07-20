/* eslint-disable no-unused-vars */
import { NextFunction, Request, Response } from 'express';

export class HttpError extends Error {
  public readonly status: number;

  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}

const error = (
  err: Error & Partial<HttpError>,
  req: Request,
  res: Response,
  _next: NextFunction,
) => res.status(err.status || 500).json({ message: err.message || 'Erro interno' });

export default error;
