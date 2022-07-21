import { Repository } from 'typeorm';
import Asset from '../entities/Asset';
import AssetInCustody from '../entities/AssetInCustody';
import Client from '../entities/Client';
import { HttpError } from '../middlewares/error';

export default class InvestmentService {
  private readonly AssetRepository: Repository<Asset>;

  private readonly ClientRepository: Repository<Client>;

  private readonly AssetInCustodyRepository: Repository<AssetInCustody>;

  constructor(
    assetRepository: Repository<Asset>,
    clientRepository: Repository<Client>,
    assetInCustodyRepository: Repository<AssetInCustody>,
  ) {
    this.AssetRepository = assetRepository;
    this.ClientRepository = clientRepository;
    this.AssetInCustodyRepository = assetInCustodyRepository;
  }

  async buy(clientId: number, assetId: number, quantity: number): Promise<any> {
    const user = await this.ClientRepository.findOne({ where: { id: clientId } });
    if (!user) throw new HttpError('Cliente não encontrado!', 404);

    const asset = await this.AssetRepository.findOne({ where: { id: assetId } });
    if (!asset) throw new HttpError('Ativo não encontrado', 404);

    if (asset.quantity < quantity) throw new HttpError('Não há ativos o suficiente para essa compra', 400);

    const assetsPrice: number = +asset.value * quantity;
    if (assetsPrice > +user.balance) throw new HttpError('Saldo insuficiente', 400);

    //
    const updatedBalance = +user.balance - assetsPrice;
    await this.ClientRepository.update({ id: clientId }, { balance: updatedBalance });

    const updatedAssetQuantity = asset.quantity - quantity;
    await this.AssetRepository.update({ id: assetId }, { quantity: updatedAssetQuantity });

    const assetInCustody = await this.AssetInCustodyRepository
      .createQueryBuilder()
      .where('client_id = :clientId AND asset_id = :assetId', {
        clientId,
        assetId,
      }).getOne();

    if (assetInCustody) {
      const quantityOfAssetsInCustody = assetInCustody.quantity + quantity;

      const updated = await this.AssetInCustodyRepository.update({ clientId, assetId }, {
        quantity: quantityOfAssetsInCustody,
      });
      return updated.affected;
    }
    const updated = await this.AssetInCustodyRepository.insert({
      quantity,
      clientId,
      assetId,
    });
    return updated;
  }
}
