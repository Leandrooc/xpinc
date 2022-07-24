import { Repository } from 'typeorm';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Client from '../entities/Client';
import { HttpError } from '../middlewares/error';

export default class LoginService {
  private readonly ClientRepository: Repository<Client>;

  private readonly jwtSecret;

  constructor(clientRepository: Repository<Client>) {
    this.ClientRepository = clientRepository;
    this.jwtSecret = 'XP';
  }

  public async auth(email: string, password: string) {
    const client = await this.ClientRepository.findOneBy({ email });
    if (!client) throw new HttpError('Email ou senha inválidos!', 401);

    const verifyPassword = await bcrypt.compare(password, client.password);
    if (!verifyPassword) throw new HttpError('Email ou senha inválidos!', 401);

    const token = jwt.sign({ id: client.id }, this.jwtSecret, { expiresIn: '4h' });
    return token;
  }
}
