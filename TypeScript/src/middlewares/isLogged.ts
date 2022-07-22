import { NextFunction, Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { HttpError } from './error';

export default function isLogged(req: Request, res: Response, next: NextFunction) {
  const { authorization } = req.headers;
  const token = authorization;
  console.log(token, 'here');
  if (!token) throw new HttpError('Token não encontrado', 401);

  try {
    const { id } = jwt.verify(token, 'XP') as JwtPayload;
    res.locals.loggedUserId = id;
  } catch {
    throw new HttpError('Token inválido', 401);
  }

  next();
}
