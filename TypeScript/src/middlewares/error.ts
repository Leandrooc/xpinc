import { NextFunction, Request, Response } from 'express';

export class HttpError extends Error {
  public readonly status: number;

  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}

const error = (err: Error, req: Request, res: Response, _next: NextFunction) => {
  const { message, status } = err as HttpError;
  res.status(status || 500).json({ message });
};

export default error;
