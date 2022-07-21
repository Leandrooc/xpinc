import { Request, Response } from 'express';
import InvestmentService from '../services/InvestmentService';

export default class AssetController {
  private readonly investmentService;

  constructor(investmentService: InvestmentService) {
    this.investmentService = investmentService;
  }

  async buy(req: Request, res: Response): Promise<Response> {
    const { clientId, assetId, quantity } = req.body;
    const success = await this.investmentService.buy(clientId, assetId, quantity);

    if (!success) return res.status(400).json({ message: 'Erro interno, compra não realizada' });
    return res.status(201).json({ message: 'Compra realizada com sucesso' });
  }

  async sell(req: Request, res: Response): Promise<Response> {
    const { clientId, assetId, quantity } = req.body;
    const success = await this.investmentService.sell(clientId, assetId, quantity);

    if (!success) return res.status(400).json({ message: 'Erro interno, venda não realizada' });
    return res.status(201).json({ message: 'Venda realizada com sucesso' });
  }
}
