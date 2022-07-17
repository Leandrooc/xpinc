/* eslint-disable class-methods-use-this */
import { Request, Response } from 'express';

export default class AccountController {
  async deposit(req: Request, res: Response): Promise<Response> {
    return res.status(200).json({
      message: 'Depósito efetuado com sucesso!',
    });
  }

  async withdraw(req: Request, res: Response): Promise<Response> {
    return res.status(200).json({
      message: 'Saque efetuado com sucesso!',
    });
  }
}
