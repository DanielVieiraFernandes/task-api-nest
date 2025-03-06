<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Descrição

Este é um projeto de Back-end desenvolvido com NestJS, que implementa um CRUD de tarefas com autenticação JWT. O projeto segue princípios da Clean Architecture e utiliza o Prisma ORM para gerenciamento do banco de dados.

## Qual o objetivo do projeto?

Se familiarizar com o framework, construir uma base sólida, para então, poder evoluir e me aprofundar no desenvolvimento back-end.

## Tecnologias utilizadas no projeto

- NestJS – Framework modular e escalável para Node.js
- Prisma ORM – Abstração poderosa para banco de dados
- JWT (JSON Web Token) – Autenticação segura e baseada em tokens
- Clean Architecture – Organização do código para melhor manutenção e escalabilidade
- TypeScript – Código mais seguro e robusto

## Funcionalidades

- [X] Cadastro, atualização, listagem e remoção de tarefas (CRUD)
- [X] Autenticação segura com JWT
- [X] Proteção de rotas para usuários autenticados
- [X] Estrutura baseada na Clean Architecture
- [X] Integração com o Prisma para manipulação eficiente dos dados

<hr>
## 📂 Estrutura do Projeto  

```
📦 src
 ┣ 📂 infra
 ┃ ┣ 📂 controllers
 ┃ ┃ ┣ 📜 task
 ┃ ┃ ┃ ┣ 📜 get-task-details.controller.ts
 ┃ ┃ ┃ ┗ 📜 mark-task-completed.controller.ts
 ┃ ┗ 📂 database (configuração do Prisma)
 ┣ 📂 modules
 ┃ ┣ 📂 use-cases
 ┃ ┃ ┣ 📜 get-task-details.ts
 ┃ ┃ ┗ 📜 mark-task-completed.ts
 ┗ 📜 main.ts (ponto de entrada da aplicação)
```
<hr>

## Autenticação

As rotas protegidas exigem um token JWT para acesso. Para obter um token, faça login com um usuário cadastrado e utilize o token nos headers das requisições.