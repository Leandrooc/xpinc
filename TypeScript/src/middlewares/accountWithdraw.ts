import { NextFunction, Request, Response } from 'express';
import { HttpError } from './error';

export default function accountWithdraw(req: Request, res: Response, next: NextFunction) {
  const { clientId, withdrawValue } = req.body;

  if (withdrawValue <= 0) throw new HttpError('Você não pode sacar valores menores ou igual a 0', 400);

  if (!clientId || !withdrawValue) {
    throw new HttpError('Os campos clientId e withdrawValue são obrigatórios', 400);
  }

  if (typeof clientId !== 'number' || typeof withdrawValue !== 'number') {
    throw new HttpError('Os campos precisam ser do tipo number', 400);
  }

  next();
}
