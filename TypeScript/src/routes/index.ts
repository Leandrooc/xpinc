import { Router } from 'express';
import accountRouter from './account';
import assetRouter from './asset';
import investmentRouter from './investment';

const routes = Router();

routes.use('/account', accountRouter);
routes.use('/assets', assetRouter);
routes.use('/investment', investmentRouter);

export default routes;
