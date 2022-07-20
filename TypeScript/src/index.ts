import 'express-async-errors';
import express from 'express';
import AppDataSource from './data-source';
import 'dotenv';
import routes from './routes';
import middlewares from './middlewares';

AppDataSource.initialize().then(() => {
  const app = express();

  app.use(express.json());
  app.use(routes);

  app.use(middlewares.error);
  return app.listen(
    process.env.PORT || 3000,
    () => console.log(`Server online at port ${process.env.PORT || 3000}`),
  );
});
