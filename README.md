# **Digital College Backend**

Este projeto é uma API RESTful para gerenciamento de usuários, autenticação (com JWT) e operações relacionadas a categorias. Foi desenvolvido utilizando Node.js, Sequelize, MySQL e JWT para autenticação segura.

---

## **Índice**
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Funcionalidades](#funcionalidades)
- [Pré-requisitos](#pré-requisitos)
- [Instalação](#instalação)
- [Créditos](#Créditos)
- [Colaboradores](#colaboradores)

---

## **Tecnologias Utilizadas**
- **Node.js** - Ambiente de execução para JavaScript.
- **Express** - Framework para criar a API.
- **Sequelize** - ORM para MySQL.
- **MySQL** - Banco de dados relacional.
- **JWT (JSON Web Token)** - Para autenticação.
- **bcrypt** - Para hash seguro de senhas.
- **dotenv** - Para gerenciar variáveis de ambiente.

---

## **Funcionalidades**
1. **Usuários**:
   - Criar, listar, atualizar e excluir usuários.
   - Senhas armazenadas de forma segura com hash (bcrypt).
2. **Autenticação**:
   - Login com geração de token JWT.
   - Middleware de validação para rotas protegidas.
3. **Categorias**:
   - Gerenciar categorias (CRUD).
4. **Sistema Seguro**:
   - Uso de tokens para proteger rotas.

---

## **Pré-requisitos**
Certifique-se de ter os seguintes itens instalados em seu sistema:
- **Node.js** (versão 14 ou superior)
- **npm** ou **yarn**
- **MySQL**

---

## **Instalação**
1. Clone o repositório:
   ```bash
   git clone https://github.com/henrymzs/backend-dgcollege.git

## **Créditos**

Documentacao do Projeto: https://github.com/digitalcollegebr/projeto-backend

## **Colaboradores**
Desenvolvedores responsáveis pelo projeto:

<table>
  <tr>
    <td align="center">
      <a href="https://github.com/henrymzs" title="link github">
        <img src="./public/gitHenry.png" width="100px;" alt="Foto do Henry no GitHub"/><br>
        <sub>
          <b>Henry de Oliveira Menezes</b>
        </sub>
      </a>
    </td>
    <td align="center">
      <a href="https://github.com/IporanRM" title="link github">
        <img src="./public/gitIporan.jpeg" width="100px;" alt="Foto do Iporan no GitHub"/><br>
        <sub>
          <b>Iporã Alves dos Santos</b>
        </sub>
      </a>
    </td>
    <td align="center">
      <a href="https://github.com/Nathan-Mn" title="link github">
        <img src="./public/profileNathan.jpeg" width="60px;" alt="Foto do Nathan no GitHub"/><br>
        <sub>
          <b>Antonio Nathan Moreno de Sousa</b>
        </sub>
      </a>
    </td>
  </tr>
</table>


