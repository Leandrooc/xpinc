import { Request, Response } from 'express';
import AssetService from '../services/AssetService';

export default class AssetController {
  private readonly assetService;

  constructor(assetService: AssetService) {
    this.assetService = assetService;
  }

  async getAssets(req: Request, res: Response): Promise<Response> {
    const assets = await this.assetService.getAssets();
    return res.status(200).json(assets);
  }
}
