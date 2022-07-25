import express, { NextFunction, Request, Response } from 'express';
import usersRoute from './routes/users.route';

const app = express();

app.use(usersRoute);

app.get('/', (req: Request, res: Response, next: NextFunction) => {
  res.status(200).send({ foo: 'bar' });
});

app.listen(3000, () =>
  console.log(`Servidor em execução => http://localhost:3000`)
);
