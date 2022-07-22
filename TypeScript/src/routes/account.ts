import { Request, Response, Router } from 'express';
import AccountController from '../controllers/AccountController';
import AccountService from '../services/AccountService';
import clientRepository from '../repositories/clientRepository';
import middlewares from '../middlewares';

const accountRouter = Router();

const accountServiceWithRepository = new AccountService(clientRepository);
const accountController = new AccountController(accountServiceWithRepository);

accountRouter.post(
  '/',
  middlewares.createClient,
  (req: Request, res: Response) => accountController.createClient(req, res),
);

accountRouter.post(
  '/deposit',
  middlewares.accoutDeposit,
  (req: Request, res: Response) => accountController.deposit(req, res),
);
accountRouter.post(
  '/withdraw',
  middlewares.accountWithdraw,
  (req: Request, res: Response) => accountController.withdraw(req, res),
);

accountRouter.get(
  '/:clientId/assets',
  (req: Request, res: Response) => accountController.getClientByAsset(req, res),
);

accountRouter.get(
  '/:clientId',
  (req: Request, res: Response) => accountController.getBalance(req, res),
);

accountRouter.get(
  '/',
  (req: Request, res: Response) => accountController.getClients(req, res),
);

export default accountRouter;
