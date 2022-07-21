import { Request, Response, Router } from 'express';
import assetRepository from '../repositories/assetRepository';
import AssetService from '../services/AssetService';
import AssetController from '../controllers/AssetController';

const assetRouter = Router();

const assetServiceWithRepository = new AssetService(assetRepository);
const assetController = new AssetController(assetServiceWithRepository);

assetRouter.get(
  '/',
  (req: Request, res: Response) => assetController.getAssets(req, res),
);

assetRouter.get(
  '/:id',
  (req: Request, res: Response) => assetController.getAssetById(req, res),
);

export default assetRouter;
