import { NextFunction, Request, Response } from 'express';
import { HttpError } from './error';

export default function accoutDeposit(req: Request, res: Response, next: NextFunction) {
  const { clientId, depositValue } = req.body;

  if (!clientId || !depositValue) {
    throw new HttpError('Os campos clientId e depositValue são obrigatórios', 400);
  }

  if (typeof clientId !== 'number' || typeof depositValue !== 'number') {
    throw new HttpError('Os campos precisam ser do tipo number', 400);
  }
  next();
}
