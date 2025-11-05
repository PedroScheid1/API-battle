# API Battle - Posts de Rede Social

API REST para gerenciamento de posts de uma rede social, desenvolvida com TypeScript, Express e PostgreSQL.

## 📋 Requisitos do Projeto

### Estrutura do Dado

- **quem**: Nome do usuário que criou o post
- **data_hora**: Data e hora da criação do post
- **comentario**: Conteúdo do post
- **bitcoin**: Valor do post (campo extra)

### Endpoints Implementados

1. `POST /api/post` - Criar um post
2. `GET /api/post/count` - Consultar quantidade de posts
3. `GET /api/post` - Consultar todos os posts
4. `GET /api/post/:id` - Consultar um post específico
5. `GET /api/post/search/:exp` - Consultar posts por expressão nos comentários

### Dados Inseridos

- Insert 1: 1 post
- Insert 1000: 1.000 posts
- Insert 5000: 5.000 posts
- Insert 15000: 15.000 posts
- Insert 30000: 30.000 posts
- **Total**: 51.001 posts

## 🚀 Tecnologias

- **TypeScript** - Linguagem
- **Node.js** - Runtime
- **Express** - Framework web
- **PostgreSQL** - Banco de dados relacional
- **node-postgres (pg)** - Driver PostgreSQL para Node.js

## 📦 Instalação

### Pré-requisitos

- Node.js (v16 ou superior)
- PostgreSQL (v12 ou superior)
- npm ou yarn

### Passo a Passo

1. **Clone o repositório (ou descompacte o arquivo)**

```bash
cd "API Battle"
```

2. **Instale as dependências**

```bash
npm install
```

3. **Configure as variáveis de ambiente**

```bash
# Copie o arquivo .env.example para .env
copy .env.example .env
```

Edite o arquivo `.env` com suas configurações do PostgreSQL:

```env
PORT=3000
NODE_ENV=development

# PostgreSQL Database Configuration
DB_HOST=localhost
DB_PORT=5432
DB_NAME=api_db
DB_USER=postgres
DB_PASSWORD=sua_senha_aqui
```

4. **Crie o banco de dados PostgreSQL**

```bash
# Entre no PostgreSQL
psql -U postgres

# Crie o banco de dados
CREATE DATABASE api_db;

# Saia do psql
\q
```

5. **Configure as tabelas do banco**

```bash
npm run setup-db
```

6. **Execute o seed para popular o banco**

```bash
npm run seed
```

7. **Inicie o servidor**

```bash
# Desenvolvimento (com hot reload)
npm run dev

# Produção
npm run build
npm start
```

A API estará disponível em: `http://localhost:3000`

## 📚 Documentação da API

### Base URL

```
http://localhost:3000/api
```

### 1. Criar Post

**Endpoint:** `POST /api/post`

**Body (JSON):**

```json
{
  "quem": "João Silva",
  "comentario": "Meu primeiro post na rede social!",
  "bitcoin": 0,
  "data_hora": "2025-11-05T10:30:00.000Z"
}
```

**Resposta (201):**

```json
{
  "success": true,
  "message": "Post criado com sucesso!",
  "data": {
    "id": 1,
    "quem": "João Silva",
    "comentario": "Meu primeiro post na rede social!",
    "bitcoin": 0,
    "data_hora": "2025-11-05T10:30:00.000Z",
    "created_at": "2025-11-05T10:30:00.000Z",
    "updated_at": "2025-11-05T10:30:00.000Z"
  }
}
```

### 2. Consultar Quantidade de Posts

**Endpoint:** `GET /api/post/count`

**Resposta (200):**

```json
{
  "success": true,
  "count": 51001
}
```

### 3. Consultar Todos os Posts

**Endpoint:** `GET /api/post`

**Resposta (200):**

```json
{
  "success": true,
  "data": [
    {
      "id": 42,
      "quem": "Maria Santos",
      "comentario": "Adorando esse novo projeto! 🚀",
      "bitcoin": 42,
      "data_hora": "2025-11-05T10:30:00.000Z",
      "created_at": "2025-11-05T10:30:00.000Z",
      "updated_at": "2025-11-05T10:30:00.000Z"
    }
  ],
  "total": 51001
}
```

### 4. Consultar Post por ID

**Endpoint:** `GET /api/post/:id`

**Exemplo:** `GET /api/post/123`

**Resposta (200):**

```json
{
  "success": true,
  "data": {
    "id": 123,
    "quem": "Pedro Oliveira",
    "comentario": "TypeScript é incrível!",
    "bitcoin": 128,
    "data_hora": "2025-11-04T15:20:00.000Z",
    "created_at": "2025-11-04T15:20:00.000Z",
    "updated_at": "2025-11-04T15:20:00.000Z"
  }
}
```

### 5. Buscar Posts por Expressão

**Endpoint:** `GET /api/post/search/:exp`

**Query Parameters:**

- `page` (opcional): Número da página (padrão: 1)
- `limit` (opcional): Itens por página (padrão: 10)

**Exemplo:** `GET /api/post/search/TypeScript?page=1&limit=10`

**Resposta (200):**

```json
{
  "success": true,
  "data": [
    {
      "id": 456,
      "quem": "Ana Costa",
      "comentario": "Alguém tem dicas de TypeScript?",
      "bitcoin": 15,
      "data_hora": "2025-11-03T09:15:00.000Z",
      "created_at": "2025-11-03T09:15:00.000Z",
      "updated_at": "2025-11-03T09:15:00.000Z"
    }
  ],
  "searchTerm": "TypeScript",
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 3,
    "pages": 1
  }
}
```

## 🧪 Testando a API

### Com curl

```bash
# Criar post
curl -X POST http://localhost:3000/api/post -H "Content-Type: application/json" -d "{\"quem\":\"Teste\",\"comentario\":\"Post de teste\"}"

# Contar posts
curl http://localhost:3000/api/post/count

# Listar todos os posts
curl http://localhost:3000/api/post

# Buscar post por ID
curl http://localhost:3000/api/post/SEU_ID_AQUI

# Buscar por expressão
curl http://localhost:3000/api/post/search/TypeScript
```

### Com Postman/Insomnia

Importe o arquivo `postman_collection.json` no Postman ou `insomnia_collection.json` no Insomnia.

## 🖥️ Deploy na VM

### Configuração na VM

1. **Instalar Node.js e PostgreSQL na VM**

```bash
# Atualizar sistema
sudo apt update && sudo apt upgrade -y

# Instalar Node.js
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs

# Instalar PostgreSQL
sudo apt install -y postgresql postgresql-contrib

# Iniciar e habilitar PostgreSQL
sudo systemctl start postgresql
sudo systemctl enable postgresql
```

2. **Configurar PostgreSQL**

```bash
# Entrar como usuário postgres
sudo -u postgres psql

# Dentro do psql:
# Criar banco de dados
CREATE DATABASE api_db;

# Criar usuário (opcional, ou usar o padrão postgres)
CREATE USER seu_usuario WITH PASSWORD 'sua_senha';
GRANT ALL PRIVILEGES ON DATABASE api_db TO seu_usuario;

# Sair
\q
```

3. **Transferir arquivos para VM**

```bash
# Usando SCP (do seu computador)
scp -r "API Battle" usuario@IP_DA_VM:/home/usuario/
```

4. **Configurar e executar na VM**

```bash
# Conectar na VM
ssh usuario@IP_DA_VM

# Navegar até o projeto
cd /home/usuario/API\ Battle

# Instalar dependências
npm install

# Configurar .env com dados da VM
nano .env
# Edite as credenciais do PostgreSQL

# Configurar tabelas
npm run setup-db

# Executar seed
npm run seed

# Iniciar aplicação
npm run build
npm start
```

5. **Manter aplicação rodando (PM2)**

```bash
# Instalar PM2
sudo npm install -g pm2

# Iniciar aplicação com PM2
pm2 start dist/server.js --name api-battle

# Configurar PM2 para iniciar com o sistema
pm2 startup
pm2 save
```

6. **Configurar Firewall**

```bash
sudo ufw allow 3000/tcp
sudo ufw allow 5432/tcp  # PostgreSQL (se necessário)
sudo ufw enable
```

A API estará disponível em: `http://IP_DA_VM:3000`

## 📁 Estrutura do Projeto

```
API Battle/
├── src/
│   ├── config/
│   │   └── database.ts          # Configuração do PostgreSQL
│   ├── controllers/
│   │   └── postController.ts    # Lógica dos endpoints
│   ├── database/
│   │   └── schema.sql           # Schema e migrations
│   ├── interfaces/
│   │   └── IPost.ts             # Interface do Post
│   ├── models/
│   │   └── Post.ts              # Model com queries SQL
│   ├── routes/
│   │   └── postRoutes.ts        # Rotas da API
│   ├── scripts/
│   │   ├── seedData.ts          # Script de seed
│   │   └── setupDatabase.ts     # Script de setup do banco
│   └── server.ts                # Servidor Express
├── .env                         # Variáveis de ambiente
├── .env.example                 # Exemplo de variáveis
├── .gitignore                   # Arquivos ignorados pelo Git
├── package.json                 # Dependências do projeto
├── tsconfig.json                # Configuração TypeScript
├── postman_collection.json      # Collection do Postman
└── README.md                    # Documentação
```

## 👥 Contribuindo

Este projeto foi desenvolvido para a atividade API Battle.

## 📄 Licença

ISC

---

**Desenvolvido com ❤️ para API Battle**
