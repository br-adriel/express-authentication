import express, { Request, Response, NextFunction } from 'express';

const app = express();

app.get('/', (req: Request, res: Response, next: NextFunction) => {
  res.status(200).send({ foo: 'bar' });
});

app.listen(3000, () =>
  console.log(`Servidor em execução => http://localhost:3000`)
);
