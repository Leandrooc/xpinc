import { Request, Response, Router } from 'express';
import AccountController from '../controllers/AccountController';
import AccountService from '../services/AccountService';
import clientRepository from '../repositories/clientRepository';
import middlewares from '../middlewares';

const accountRouter = Router();

const accountServiceWithRepository = new AccountService(clientRepository);
const accountController = new AccountController(accountServiceWithRepository);

accountRouter.post(
  '/deposit',
  middlewares.accoutDeposit,
  (req: Request, res: Response) => accountController.deposit(req, res),
);
// accountRouter.post('/withdraw', accountController.withdraw);

export default accountRouter;
