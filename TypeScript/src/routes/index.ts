import { Router } from 'express';
import accountRouter from './account';
import assetRouter from './asset';

const routes = Router();

routes.use('/account', accountRouter);
routes.use('/assets', assetRouter);

export default routes;
