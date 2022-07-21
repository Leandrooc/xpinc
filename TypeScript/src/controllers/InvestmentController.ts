import { Request, Response } from 'express';
import InvestmentService from '../services/InvestmentService';

export default class AssetController {
  private readonly investmentService;

  constructor(investmentService: InvestmentService) {
    this.investmentService = investmentService;
  }

  async buy(req: Request, res: Response): Promise<Response> {
    const { clientId, assetId, quantity } = req.body;
    const asset = await this.investmentService.buy(clientId, assetId, quantity);
    return res.status(200).json(asset);
  }
}
