import { Repository, UpdateResult } from 'typeorm';
import Client from '../entities/Client';
import { IClientByAsset } from '../interfaces.ts/IClientByAsset';
import { HttpError } from '../middlewares/error';

export default class AccountService {
  private readonly ClientRepository: Repository<Client>;

  constructor(clientRepository: Repository<Client>) {
    this.ClientRepository = clientRepository;
  }

  public async getClients(): Promise<[Client[], number]> {
    const clients = await this.ClientRepository.findAndCount({
      select: [
        'id',
        'balance',
      ],
    });
    return clients;
  }

  public async getClientById(id: number): Promise<Client> {
    const client = await this.ClientRepository.findOne({ where: { id } });
    if (!client) throw new HttpError('Cliente não encontrado!', 404);
    return client;
  }

  public async verifyEmail(email: 'string'): Promise<void> {
    const client = await this.ClientRepository.findOne({ where: { email } });
    if (client) throw new HttpError('Esse email já está registrado', 400);
  }

  public async createClient(name: string, email: string, password: string): Promise<void> {
    await this.ClientRepository.insert({
      name,
      email,
      password,
    });
  }

  public async updateBalance(id: number, newBalance: number): Promise<UpdateResult> {
    const updated = await this.ClientRepository.update({ id }, { balance: newBalance });
    return updated;
  }

  public async getClientByAsset(id: number): Promise<IClientByAsset | null> {
    const client = await this.ClientRepository.findOne({ where: { id }, relations: ['assetInCustody.assetId'], select: ['id', 'balance'] });
    if (client) {
      const formatedClient = {
        clientId: client.id,
        clientBalance: client.balance,
        assetsInCustody: client.assetInCustody.map((asset: any) => ({
          assetId: asset.id,
          quantity: asset.quantity,
          value: asset.assetId.value,
        })).filter(({ quantity }) => quantity > 0),
      };
      return formatedClient;
    }
    return client;
  }
}
