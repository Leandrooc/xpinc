/* eslint-disable prefer-regex-literals */
import { NextFunction, Request, Response } from 'express';
import { HttpError } from './error';

export default function login(req: Request, res: Response, next: NextFunction) {
  const { password, email } = req.body;

  if (!password || !email) {
    throw new HttpError('Os campos password e email são obrigatórios', 400);
  }

  if (typeof password !== 'string' || typeof email !== 'string') {
    throw new HttpError('Os campos precisam ser do tipo string', 400);
  }

  if (password.length < 6) throw new HttpError('Sua senha precisa ter pelo menos 6 caracteres', 400);

  const regex = new RegExp('[a-z0-9]+@[a-z]+.[a-z]{2,3}');
  if (!regex.test(email)) throw new HttpError('Insira um email válido', 400);

  next();
}
