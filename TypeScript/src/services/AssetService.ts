import { Repository } from 'typeorm';
import Asset from '../entities/Asset';
import { HttpError } from '../middlewares/error';

export default class AssetService {
  private readonly AssetRepository: Repository<Asset>;

  constructor(assetRepository: Repository<Asset>) {
    this.AssetRepository = assetRepository;
  }

  public async getAssets(): Promise<[{ numberOfAssets: number }, Asset[]]> {
    const [assets, numberOfAssets] = await this.AssetRepository.findAndCount();
    return [{ numberOfAssets }, assets];
  }

  public async getAssetById(id: number): Promise<Asset> {
    const asset = await this.AssetRepository.findOne({ where: { id } });
    if (!asset) throw new HttpError('Ativo não encontrado', 404);
    return asset;
  }
}
