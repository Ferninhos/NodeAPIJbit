# Order Management API

API REST para gerenciamento de pedidos com Node.js, Express e MongoDB.

## Pré-requisitos

- Node.js 18+
- MongoDB rodando localmente (ou Atlas)

## Instalação

```bash
cp .env.example .env
npm install
```

## Executar

```bash
# Desenvolvimento (com hot-reload)
npm run dev

# Produção
npm start
```

O servidor inicia em `http://localhost:3000`.
Documentação Swagger em `http://localhost:3000/api-docs`.

## Endpoints

| Método | URL | Descrição | Auth |
|--------|-----|-----------|------|
| POST | `/order` | Criar pedido | Não |
| GET | `/order/list` | Listar pedidos | Não |
| GET | `/order/:orderId` | Obter pedido | Não |
| PUT | `/order/:orderId` | Atualizar pedido | JWT |
| DELETE | `/order/:orderId` | Deletar pedido | JWT |
| POST | `/auth/token` | Gerar token JWT | Não |

## Exemplos

### Criar pedido
```bash
curl -X POST http://localhost:3000/order \
  -H 'Content-Type: application/json' \
  -d '{
    "numeroPedido": "v10089015vdb-01",
    "valorTotal": 10000,
    "dataCriacao": "2023-07-19T12:24:11.5299601+00:00",
    "items": [{ "idItem": "2434", "quantidadeItem": 1, "valorItem": 1000 }]
  }'
```

### Obter token JWT
```bash
curl -X POST http://localhost:3000/auth/token \
  -H 'Content-Type: application/json' \
  -d '{ "username": "admin", "password": "admin123" }'
```

### Deletar pedido (com auth)
```bash
curl -X DELETE http://localhost:3000/order/v10089015vdb-01 \
  -H 'Authorization: Bearer SEU_TOKEN_AQUI'
```

## Estrutura

```
├── src/
│   ├── server.js
│   ├── models/Order.js
│   ├── controllers/orderController.js
│   ├── routes/orderRoutes.js
│   ├── routes/authRoutes.js
│   ├── middlewares/
│   │   ├── authMiddleware.js
│   │   └── errorHandler.js
│   ├── utils/orderMapper.js
│   └── swagger.json
├── .env.example
├── package.json
└── README.md
```

## Mapeamento de Dados

A API transforma os campos do request para o formato do banco:

| Request (PT-BR) | Banco (EN) |
|-----------------|------------|
| numeroPedido | orderId |
| valorTotal | value |
| dataCriacao | creationDate |
| idItem | productId |
| quantidadeItem | quantity |
| valorItem | price |
