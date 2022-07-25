import express, { NextFunction, Request, Response } from 'express';
import usersRoute from './routes/users.route';

const app = express();

// Configuracoes da aplicacao
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configuracoes das rotas
app.use(usersRoute);

app.get('/', (req: Request, res: Response, next: NextFunction) => {
  res.status(200).send({ foo: 'bar' });
});

// Inicializacao do servidor
app.listen(3000, () =>
  console.log(`Servidor em execução => http://localhost:3000`)
);
