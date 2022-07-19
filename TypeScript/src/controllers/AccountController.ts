/* eslint-disable class-methods-use-this */
import { Request, Response } from 'express';
import Client from '../entities/Client';
import AccountService from '../services/AccountService';

export default class AccountController {
  private readonly accountService;

  constructor() {
    this.accountService = new AccountService();
  }

  async deposit(req: Request, res: Response): Promise<Response> {
    const { clientId, depositValue } = req.body;

    if (depositValue <= 0) {
      return res.status(400)
        .json({ message: 'Você não pode depositar valores menores ou igual a 0' });
    }

    const user: Client | null = await this.accountService.getUserById(clientId);
    if (!user) return res.status(404).json({ message: 'Cliente não encontrado!' });

    const newBalance = +user.balance + (+depositValue);

    const successfulUpdate = await this.accountService.updateBalance(clientId, newBalance);
    if (!successfulUpdate) return res.status(500).json({ message: 'Erro interno' });

    return res.status(200).json({
      message: 'Depósito efetuado com sucesso!',
      user,
      depositedValue: depositValue,
      newBalance,
    });
  }
}
