import { NextFunction, Request, Response } from 'express';

class httpError extends Error {
  public readonly status: number;

  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}

const error = (err: Error, req: Request, res: Response, _next: NextFunction) => {
  const { message, status } = err as httpError;
  res.status(status || 500).json({ message });
};

export default error;
