import { Repository } from 'typeorm';
import Asset from '../entities/Asset';

export default class AssetService {
  private readonly AssetRepository: Repository<Asset>;

  constructor(assetRepository: Repository<Asset>) {
    this.AssetRepository = assetRepository;
  }

  public async getAssets(): Promise<Asset[]> {
    const [assets] = await this.AssetRepository.findAndCount();
    return assets;
  }
}
