import { Request, Response, Router } from 'express';
import clientRepository from '../repositories/clientRepository';
import LoginService from '../services/LoginService';
import LoginController from '../controllers/LoginController';
import middlewares from '../middlewares';

const loginRouter = Router();

const loginServiceWithRepository = new LoginService(clientRepository);
const loginController = new LoginController(loginServiceWithRepository);

loginRouter.post(
  '/',
  middlewares.login,
  (req: Request, res: Response) => loginController.login(req, res),
);

export default loginRouter;
