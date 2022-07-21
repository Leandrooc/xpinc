import AppDataSource from '../data-source';
import AssetInCustody from '../entities/AssetInCustody';

const assetInCustodyRepository = AppDataSource.getRepository(AssetInCustody);

export default assetInCustodyRepository;
