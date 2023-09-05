# Documentação de Estrutura Backend - salvAE

## Índice

- [Introdução](#introdução)
- [Estrutura do Diretório](#estrutura-do-diretório)
  - [`main.ts`](#maints)
  - [`app.module.ts`](#appmodulets)
  - [`config/`](#config)
  - [`features/`](#features)
  - [`data-access/`](#data-access)
  - [`util/`](#util)
  - [`domain/`](#domain)
  - [`api/`](#api)
  - [`tests/`](#tests)

## Introdução

Este documento serve para esclarecer a organização e responsabilidades dos diretórios e arquivos no projeto NestJS.

## Estrutura do Diretório

### `main.ts`

O ponto de entrada do aplicativo. Este arquivo inicializa a aplicação NestJS.

---

### `app.module.ts`

Módulo principal que inicializa a aplicação NestJS e carrega os módulos dependentes.

---

### `config/`

Diretório que contém configurações globais, como configurações de banco de dados, variáveis de ambiente, etc.

---

### `features/`

Biblioteca "feature" que contém a lógica de negócios e os controladores para recursos específicos do aplicativo.

---

### `data-access/`

Biblioteca "data-access" responsável por gerenciar a interação com bancos de dados ou outras fontes de dados.

---

### `util/`

Diretório que contém utilitários, funções e helpers que podem ser usados em todo o projeto.

---

### `domain/`

Contém as entidades e regras de negócio puras, isolando a lógica de domínio do resto do aplicativo.

---

### `api/`

Serve como ponto de acesso para permitir que camadas de diferentes escopos se comuniquem entre si.

---

### `tests/`

Contém os testes unitários e de ponta a ponta para garantir a qualidade do código.

---

Espero que esta documentação ofereça uma visão clara da estrutura do projeto e da responsabilidade de cada segmento.