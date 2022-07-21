import AppDataSource from '../data-source';
import Asset from '../entities/Asset';

const assetRepository = AppDataSource.getRepository(Asset);

export default assetRepository;
