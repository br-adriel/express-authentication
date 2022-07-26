import * as dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import bearerAuthenticationMiddleware from './middlewares/bearer-authentication.middleware';
import errorHandler from './middlewares/error-handler.middleware';
import authorizationRoute from './routes/authorization.route';
import statusRoute from './routes/status.route';
import usersRoute from './routes/users.route';

const app = express();

// Configuracoes da aplicacao
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configuracoes das rotas
app.use(bearerAuthenticationMiddleware, usersRoute);
app.use(statusRoute);
app.use(authorizationRoute);

// Configuracoes dos middlewares de erro
app.use(errorHandler);

// Inicializacao do servidor
app.listen(3000, () =>
  console.log(`Servidor em execução => http://localhost:3000`)
);
