# Microsserviço de autenticacao :closed_lock_with_key:

API de autenticação desenvolvida com express durante os cursos "Aplicando o Estilo Arquitetural REST com Node.js", "Node.js com Bancos de
Dados Relacionais (SQL)" e "Microsserviços e Integrações com Node.js" da [DIO](https://web.dio.me/)

![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)

## Endpoints do projeto
| Método | Rota | Utilização |
| :----: | :--- | :--------- |
| `GET` | /status | Utilizada para verificar se o servidor está em execução |
| `GET` | /users | Retorna lista com todos os usuários |
| `GET` | /users/:uuid | Retorna dados do usuário com o uuid especificado |
| `POST` | /users | Cria um novo usuário |
| `PUT` | /users/:uuid | Atualiza dados do usuário com o uuid especificado |
| `DELETE` | /users/:uuid | Exclui dados do usuário com o uuid especificado |
| `POST` | /token | Retorna token de acesso |
| `POST` | /token/validate | Utilizada para verificar se o token passado ainda é válido |

## Executando o projeto

Para a configuração e execução desse projeto você precisará ter o [NodeJS e o npm](https://nodejs.org/en/) instalados na sua máquina,
além de uma conta na plataforma [ElephantSQL](https://www.elephantsql.com/).

1. Faça o download do código para a sua máquina

2. Acesse a pasta com o código utilizando o cmd, powershell, terminal, ou outra ferramenta de linha de comando

3. Execute o comando `npm install`

4. Faça uma copia do arquivo `.env.example` e o renomeie para `.env`

5. Faça login na sua conta ElephantSQL

6. Crie um novo banco de dados na plataforma

7. Copie a URL de acesso ao banco

8. Cole a URL de acesso no campo `DB_CONNECTION_STRING` do arquivo `.env`

9. Preencha o campo `DB_CRYPTO_SALT` do arquivo `.env` com a chave de criptografia utilizada para as senhas

10. Preencha o campo `SECRET_KEY` do arquivo `.env` com a chave de criptografia utilizada para os tokens

11. Acesse a aba `BROWSER` no ElephantSQL

12. Copie o código do arquivo `init.sql` da pasta `src/sql`

13. Cole o código na aba `BROWSER` do ElephantSQL e troque a string `my_salt` pela chave de criptografia de senhas

14. Execute o código SQL colado no ElephantSQL

15. Execute o comando `npm run dev` para iniciar o servidor em modo de desenvolvimento
