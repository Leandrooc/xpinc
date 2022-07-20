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

  if (depositValue <= 0) throw new HttpError('Você não pode depositar valores menores ou igual a 0', 400);
  next();
}
