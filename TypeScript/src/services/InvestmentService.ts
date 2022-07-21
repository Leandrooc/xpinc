import { Repository } from 'typeorm';
import Asset from '../entities/Asset';
import Client from '../entities/Client';
import { HttpError } from '../middlewares/error';

export default class InvestmentService {
  private readonly AssetRepository: Repository<Asset>;

  private readonly ClientRepository: Repository<Client>;

  constructor(assetRepository: Repository<Asset>, clientRepository: Repository<Client>) {
    this.AssetRepository = assetRepository;
    this.ClientRepository = clientRepository;
  }

  async buy(clientId: number, assetId: number, quantity: number): Promise<any> {
    const user = await this.ClientRepository.findOne({ where: { id: clientId } });
    if (!user) throw new HttpError('Cliente não encontrado!', 404);

    const asset = await this.AssetRepository.findOne({ where: { id: assetId } });
    if (!asset) throw new HttpError('Ativo não encontrado', 404);

    if (asset.quantity < quantity) throw new HttpError('Não há ativos o suficiente para essa compra', 400);
  }
}
