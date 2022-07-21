import { InsertResult, Repository, UpdateResult } from 'typeorm';
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

  private async validateData(clientId: number, assetId: number): Promise<{
     user: Client, asset: Asset
    }> {
    const user = await this.ClientRepository.findOne({ where: { id: clientId } });
    if (!user) throw new HttpError('Cliente não encontrado!', 404);

    const asset = await this.AssetRepository.findOne({ where: { id: assetId } });
    if (!asset) throw new HttpError('Ativo não encontrado', 404);
    return { user, asset };
  }

  public async buy(clientId: number, assetId: number, quantity: number): Promise<
  number | undefined | InsertResult> {
    const { user, asset } = await this.validateData(clientId, assetId);

    if (asset.quantity < quantity) throw new HttpError('Não há ativos o suficiente para essa compra', 400);

    const assetsPrice: number = +asset.value * quantity;
    if (assetsPrice > +user.balance) throw new HttpError('Saldo insuficiente', 400);

    //
    const updatedBalance = +user.balance - assetsPrice;
    await this.ClientRepository.update({ id: clientId }, { balance: updatedBalance });

    const updatedAssetQuantity = asset.quantity - quantity;
    await this.AssetRepository.update({ id: assetId }, { quantity: updatedAssetQuantity });

    const assetInCustody = this.AssetInCustodyRepository
      .createQueryBuilder()
      .where('client_id = :clientId AND asset_id = :assetId', {
        clientId,
        assetId,
      });

    const getAssetInCustody = await assetInCustody.getOne();

    if (getAssetInCustody) {
      const quantityOfAssetsInCustody = getAssetInCustody.quantity + quantity;

      const updated = await this.AssetInCustodyRepository.update({ id: getAssetInCustody.id }, {
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

  public async sell(clientId: number, assetId: number, quantity: number): Promise<UpdateResult> {
    const { user, asset } = await this.validateData(clientId, assetId);

    const assetInCustody = await this.AssetInCustodyRepository
      .createQueryBuilder()
      .where('client_id = :clientId AND asset_id = :assetId', {
        clientId,
        assetId,
      }).getOne();
    if (!assetInCustody) throw new HttpError('Você não possui esse ativo em sua conta', 404);

    const canSell = quantity <= assetInCustody.quantity;
    if (!canSell) throw new HttpError('Você não tem essa quantidade para vender', 400);

    //
    const priceOfAssets = (+asset.value * quantity) + (+user.balance);
    await this.ClientRepository.update({ id: clientId }, { balance: priceOfAssets });

    const updatedQuantityOfAssets = assetInCustody.quantity - quantity;
    await this.AssetInCustodyRepository.update({ id: assetInCustody.id }, {
      quantity: updatedQuantityOfAssets,
    });

    const updated = await this.AssetRepository.update({ id: assetId }, {
      quantity: asset.quantity + quantity,
    });
    return updated;
  }
}
