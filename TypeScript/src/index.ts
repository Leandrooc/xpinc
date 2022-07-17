import express from 'express';
import AppDataSource from './data-source';
import 'dotenv';

AppDataSource.initialize().then(() => {
  const app = express();

  app.use(express.json());

  app.get('/', (req, res) => res.json('ok'));

  return app.listen(
    process.env.PORT || 3000,
    () => console.log(`Server online at port ${process.env.PORT || 3000}`),
  );
});
