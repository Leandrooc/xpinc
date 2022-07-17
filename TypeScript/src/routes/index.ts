import { Router } from 'express';
import accountRouter from './account';

const routes = Router();

routes.use('/account', accountRouter);

export default routes;
