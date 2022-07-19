import { Repository } from 'typeorm';
import Client from '../entities/Client';
import clientRepository from '../repositories/clientRepository';

export default class AccountService {
  private readonly ClientRepository: Repository<Client>;

  constructor() {
    this.ClientRepository = clientRepository;
  }

  public async getUserById(id: number): Promise<Client | null> {
    const user = await this.ClientRepository.findOne({ where: { id } });
    if (!user) return null;
    return user;
  }

  public async updateBalance(id: number, newBalance: number): Promise<true | null> {
    try {
      await this.ClientRepository.update({ id }, { balance: newBalance });
      return true;
    } catch {
      return null;
    }
  }
}
