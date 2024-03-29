/* eslint-disable class-methods-use-this */
import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Client from '../entities/Client';
import { HttpError } from '../middlewares/error';
import AccountService from '../services/AccountService';

export default class AccountController {
  private readonly accountService;

  constructor(accountService: AccountService) {
    this.accountService = accountService;
  }

  public async deposit(req: Request, res: Response): Promise<Response> {
    const { clientId, depositValue } = req.body;

    const user: Client = await this.accountService.getClientById(clientId);

    const newBalance = +user.balance + (+depositValue);

    await this.accountService.updateBalance(clientId, newBalance);

    return res.status(200).json({
      message: 'Depósito efetuado com sucesso!',
      clientId: user.id,
      depositedValue: depositValue,
      newBalance,
    });
  }

  public async withdraw(req: Request, res: Response): Promise<Response> {
    const { clientId, withdrawValue } = req.body;

    const user: Client = await this.accountService.getClientById(clientId);

    const newBalance = +user.balance - (+withdrawValue);
    if (newBalance < 0) throw new HttpError('Saldo insuficiente', 400);

    await this.accountService.updateBalance(clientId, newBalance);

    return res.status(200).json({
      message: 'Saque efetuado com sucesso!',
      clientId: user.id,
      withdrawalValue: withdrawValue,
      newBalance,
    });
  }

  public async getBalance(req: Request, res: Response): Promise<Response> {
    const { clientId } = req.params;
    const { id, balance }: Client = await this.accountService.getClientById(+clientId);
    return res.status(200).json({ clientId: id, balance });
  }

  public async getClients(req: Request, res: Response): Promise<Response> {
    const [clients, numberOfClients] = await this.accountService.getClients();
    return res.status(200).json({ numberOfClients, clients });
  }

  public async getClientByAsset(req: Request, res: Response): Promise<Response> {
    const { clientId } = req.params;
    const client = await this.accountService.getClientByAsset(+clientId);
    if (!client) return res.status(404).json({ message: 'Cliente não encontrado' });
    return res.status(200).json(client);
  }

  public async createClient(req: Request, res: Response): Promise<Response> {
    const { name, email, password } = req.body;
    await this.accountService.verifyEmail(email);

    const hashPassword = await bcrypt.hash(password, 10);
    const client = await this.accountService.createClient(name, email, hashPassword);

    const token = jwt.sign({ id: client.generatedMaps[0].id }, 'XP', { expiresIn: '4h' });

    return res.status(201).json({ message: 'Conta criada com sucesso!', token });
  }

  public async getAssetsValue(req: Request, res: Response): Promise<Response> {
    const id: number = +res.locals.loggedUserId;
    const assetsWithValues = await this.accountService.getAssetsValue(id);
    return res.status(200).json(assetsWithValues);
  }
}
