import { Repository, UpdateResult } from 'typeorm';
import Client from '../entities/Client';
import { HttpError } from '../middlewares/error';

export default class AccountService {
  private readonly ClientRepository: Repository<Client>;

  constructor(clientRepository: Repository<Client>) {
    this.ClientRepository = clientRepository;
  }

  public async getClients(): Promise<[Client[], number]> {
    const users = await this.ClientRepository.findAndCount({
      select: [
        'id',
        'balance',
      ],
    });
    return users;
  }

  public async getUserById(id: number): Promise<Client> {
    const user = await this.ClientRepository.findOne({ where: { id } });
    if (!user) throw new HttpError('Cliente não encontrado!', 404);
    return user;
  }

  public async updateBalance(id: number, newBalance: number): Promise<UpdateResult> {
    const updated = await this.ClientRepository.update({ id }, { balance: newBalance });
    return updated;
  }
}
