import { Request, Response, Router } from 'express';
import clientRepository from '../repositories/clientRepository';
import InvestmentService from '../services/InvestmentService';
import InvestmentController from '../controllers/InvestmentController';
import assetRepository from '../repositories/assetRepository';
import assetInCustodyRepository from '../repositories/assetInCustodyRepository';
import middlewares from '../middlewares';

const investmentRouter = Router();

const investmentServiceWithRepositories = new InvestmentService(
  assetRepository,
  clientRepository,
  assetInCustodyRepository,
);
const investmentController = new InvestmentController(investmentServiceWithRepositories);

investmentRouter.post(
  '/buy',
  middlewares.investmentBuy,
  (req: Request, res: Response) => investmentController.buy(req, res),
);

export default investmentRouter;
