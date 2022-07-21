/* eslint-disable class-methods-use-this */
import { Request, Response } from 'express';
import Client from '../entities/Client';
import { HttpError } from '../middlewares/error';
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
      user: user.id,
      depositedValue: depositValue,
      newBalance,
    });
  }

  async withdraw(req: Request, res: Response): Promise<Response> {
    const { clientId, withdrawValue } = req.body;

    const user: Client = await this.accountService.getUserById(clientId);

    const newBalance = +user.balance - (+withdrawValue);
    if (newBalance < 0) throw new HttpError('Saldo insuficiente', 400);

    await this.accountService.updateBalance(clientId, newBalance);

    return res.status(200).json({
      message: 'Saque efetuado com sucesso!',
      user: user.id,
      withdrawalValue: withdrawValue,
      newBalance,
    });
  }

  async getBalance(req: Request, res: Response): Promise<Response> {
    const { clientId } = req.params;
    const { id, balance }: Client = await this.accountService.getUserById(+clientId);
    return res.status(200).json({ clientId: id, balance });
  }

  async getClients(req: Request, res: Response): Promise<Response> {
    const [clients, numberOfClients] = await this.accountService.getClients();
    return res.status(200).json({ numberOfClients, clients });
  }
}
