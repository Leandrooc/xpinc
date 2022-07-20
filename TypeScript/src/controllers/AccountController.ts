/* eslint-disable class-methods-use-this */
import { Request, Response } from 'express';
import Client from '../entities/Client';
import AccountService from '../services/AccountService';

export default class AccountController {
  private readonly accountService;

  constructor(accountService: AccountService) {
    this.accountService = accountService;
  }

  async deposit(req: Request, res: Response): Promise<Response> {
    const { clientId, depositValue } = req.body;

    const user: Client = await this.accountService.getUserById(clientId);

    const newBalance = +user.balance + (+depositValue);

    await this.accountService.updateBalance(clientId, newBalance);

    return res.status(200).json({
      message: 'Depósito efetuado com sucesso!',
      user,
      depositedValue: depositValue,
      newBalance,
    });
  }
}
