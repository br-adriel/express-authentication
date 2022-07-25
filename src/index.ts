import * as dotenv from 'dotenv'
dotenv.config();

import express from 'express';
import statusRouter from './routes/status.route';
import usersRoute from './routes/users.route';

const app = express();

// Configuracoes da aplicacao
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configuracoes das rotas
app.use(usersRoute);
app.use(statusRouter);

// Inicializacao do servidor
app.listen(3000, () =>
  console.log(`Servidor em execução => http://localhost:3000`)
);
