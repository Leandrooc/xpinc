import { Router } from 'express';
import AccountController from '../controllers/AccountController';

const accountRouter = Router();

const accountController = new AccountController();

accountRouter.post('/deposit', accountController.deposit);
accountRouter.post('/withdraw', accountController.withdraw);

export default accountRouter;
