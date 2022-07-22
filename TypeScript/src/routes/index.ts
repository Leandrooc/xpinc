import { Router } from 'express';
import accountRouter from './account';
import assetRouter from './asset';
import investmentRouter from './investment';
import loginRouter from './login';

const routes = Router();

routes.use('/login', loginRouter);
routes.use('/account', accountRouter);
routes.use('/assets', assetRouter);
routes.use('/investment', investmentRouter);

export default routes;
