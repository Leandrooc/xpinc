/* eslint-disable prefer-regex-literals */
import { NextFunction, Request, Response } from 'express';
import { HttpError } from './error';

export default function createClient(req: Request, res: Response, next: NextFunction) {
  const { name, password, email } = req.body;

  if (!name || !password || !email) {
    throw new HttpError('Os campos name, password e email são obrigatórios', 400);
  }

  if (typeof name !== 'string' || typeof password !== 'string' || typeof email !== 'string') {
    throw new HttpError('Os campos precisam ser do tipo string', 400);
  }

  if (password.length < 6) throw new HttpError('Sua senha precisa ter pelo menos 6 caracteres', 400);
  if (name.length < 6) throw new HttpError('Seu nome precisa ter pelo menos 6 caracteres', 400);

  const regex = new RegExp('[a-z0-9]+@[a-z]+.[a-z]{2,3}');
  if (!regex.test(email)) throw new HttpError('Insira um email válido', 400);

  next();
}
