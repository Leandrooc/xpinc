import { NextFunction, Request, Response } from 'express';
import { HttpError } from './error';

export default function investmentData(req: Request, res: Response, next: NextFunction) {
  const { clientId, assetId, quantity } = req.body;

  if (!clientId || !assetId || !quantity) {
    throw new HttpError('Os campos clientId, assetId e quantity são obrigatórios', 400);
  }
  if (quantity < 1) throw new HttpError('Selecione uma quantidade de ativos válida', 400);

  if (typeof clientId !== 'number' || typeof assetId !== 'number' || typeof quantity !== 'number') {
    throw new HttpError('Os campos precisam ser do tipo number', 400);
  }

  next();
}
