import { NextFunction, Request, Response } from 'express';

export default function accoutDeposit(req: Request, res: Response, next: NextFunction) {
  const { clientId, depositValue } = req.body;

  if (!clientId || !depositValue) {
    return res.status(400)
      .json({ message: 'Os campos clientId e depositValue são obrigatórios' });
  }

  if (typeof clientId !== 'number' || typeof depositValue !== 'number') {
    return res.status(400)
      .json({ message: 'Os campos precisam ser do tipo number' });
  }
  next();
}
