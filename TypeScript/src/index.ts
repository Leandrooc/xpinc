import express from 'express';
import AppDataSource from './data-source';
import 'dotenv';
import routes from './routes';

AppDataSource.initialize().then(() => {
  const app = express();

  app.use(express.json());
  app.use(routes);

  return app.listen(
    process.env.PORT || 3000,
    () => console.log(`Server online at port ${process.env.PORT || 3000}`),
  );
});
