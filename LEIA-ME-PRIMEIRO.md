# 🎯 API Battle - Posts de Rede Social (PostgreSQL)

## ✅ Projeto Completo e Funcional!

Esta é uma API REST completa para gerenciamento de posts de rede social, desenvolvida com **TypeScript**, **Express** e **PostgreSQL**.

---

## 📦 O que está incluído

### ✨ Funcionalidades Implementadas

- ✅ **5 Endpoints completos** (todos os requisitos atendidos)
- ✅ **51.001 posts** de dados de teste
- ✅ **Paginação** em todas as listagens
- ✅ **Busca por expressão** no comentário
- ✅ **Validações** de dados
- ✅ **Tratamento de erros**
- ✅ **TypeScript** com tipagem completa
- ✅ **PostgreSQL** com pool de conexões

### 📂 Arquivos Principais

#### Código Fonte (src/)

```
src/
├── config/database.ts         ✅ Configuração PostgreSQL com pool
├── controllers/postController.ts  ✅ Lógica de todos endpoints
├── database/schema.sql        ✅ Schema, índices e triggers
├── interfaces/IPost.ts        ✅ Tipagem TypeScript
├── models/Post.ts            ✅ Model com queries SQL
├── routes/postRoutes.ts      ✅ Definição das rotas
├── scripts/
│   ├── seedData.ts           ✅ Inserção de 51.001 posts
│   └── setupDatabase.ts      ✅ Configuração inicial do banco
└── server.ts                 ✅ Servidor Express
```

#### Documentação

```
📄 README.md                   ✅ Documentação completa da API
📄 GUIA_INSTALACAO.md         ✅ Guia passo a passo
📄 MIGRACAO_POSTGRESQL.md     ✅ Detalhes da migração MongoDB→PostgreSQL
📄 postman_collection.json    ✅ Collection Postman
📄 insomnia_collection.json   ✅ Collection Insomnia
```

#### Configuração

```
⚙️ package.json               ✅ Dependências e scripts
⚙️ tsconfig.json              ✅ Configuração TypeScript
⚙️ .env / .env.example        ✅ Variáveis de ambiente
⚙️ .gitignore                 ✅ Arquivos ignorados
```

---

## 🚀 Como Começar (Resumo Rápido)

### 1️⃣ Pré-requisitos

- Node.js (v16+)
- PostgreSQL (v12+)

### 2️⃣ Instalação (3 comandos)

```bash
# 1. Instalar dependências
npm install

# 2. Configurar banco (criar tabela)
npm run setup-db

# 3. Popular com dados
npm run seed
```

### 3️⃣ Executar

```bash
# Desenvolvimento (com hot-reload)
npm run dev

# Produção
npm run build && npm start
```

🎉 **Servidor rodando em:** http://localhost:3000

---

## 🌐 Endpoints da API

| Método | Endpoint                | Descrição               |
| ------ | ----------------------- | ----------------------- |
| `POST` | `/api/post`             | Criar um post           |
| `GET`  | `/api/post/count`       | Total de posts          |
| `GET`  | `/api/post`             | Listar posts (paginado) |
| `GET`  | `/api/post/:id`         | Buscar por ID           |
| `GET`  | `/api/post/search/:exp` | Buscar por expressão    |

### Exemplo de Uso

**Criar post:**

```bash
curl -X POST http://localhost:3000/api/post \
  -H "Content-Type: application/json" \
  -d '{"quem":"João","comentario":"Meu post!"}'
```

**Contar posts:**

```bash
curl http://localhost:3000/api/post/count
# Resposta: {"success":true,"count":51001}
```

**Buscar posts:**

```bash
curl "http://localhost:3000/api/post?page=1&limit=5"
```

**Buscar por expressão:**

```bash
curl http://localhost:3000/api/post/search/TypeScript
```

---

## 📊 Estrutura do Post

```typescript
{
  id: number; // ID sequencial (1, 2, 3...)
  quem: string; // Nome do autor
  data_hora: Date; // Data e hora do post
  comentario: string; // Conteúdo do post
  likes: number; // Número de curtidas (campo extra)
  created_at: Date; // Timestamp de criação
  updated_at: Date; // Timestamp de atualização
}
```

---

## 🗄️ Banco de Dados

### Schema PostgreSQL

- **Tabela:** `posts`
- **Índices:**
  - GIN index para busca full-text
  - Index em `data_hora` (ordenação)
  - Index em `likes`
- **Triggers:** Atualização automática de `updated_at`

### Dados de Teste

- ✅ 1 post (Insert 1)
- ✅ 1.000 posts (Insert 1000)
- ✅ 5.000 posts (Insert 5000)
- ✅ 15.000 posts (Insert 15000)
- ✅ 30.000 posts (Insert 30000)
- **Total: 51.001 posts**

---

## 🧪 Testes

### Postman / Insomnia

Importe os arquivos de collection incluídos:

- `postman_collection.json`
- `insomnia_collection.json`

Todos os endpoints estão pré-configurados e prontos para testar!

### Comandos de Teste Rápido

```bash
# Ver quantidade de posts
curl http://localhost:3000/api/post/count

# Listar 10 posts
curl "http://localhost:3000/api/post?limit=10"

# Buscar por ID
curl http://localhost:3000/api/post/1

# Buscar palavra "TypeScript"
curl http://localhost:3000/api/post/search/TypeScript
```

---

## 🖥️ Deploy na VM

### Preparação da VM

```bash
# 1. Instalar Node.js e PostgreSQL
sudo apt update
sudo apt install -y nodejs npm postgresql

# 2. Criar banco de dados
sudo -u postgres psql -c "CREATE DATABASE api_db;"

# 3. Transferir arquivos
scp -r "API Battle" usuario@IP_VM:/home/usuario/

# 4. Configurar e executar
cd /home/usuario/API\ Battle
npm install
npm run setup-db
npm run seed
npm start
```

### Manter Rodando (PM2)

```bash
sudo npm install -g pm2
pm2 start dist/server.js --name api-battle
pm2 save
pm2 startup
```

---

## 📚 Documentação Completa

Consulte os arquivos de documentação para mais detalhes:

1. **README.md** - Documentação completa da API
2. **GUIA_INSTALACAO.md** - Instalação passo a passo
3. **MIGRACAO_POSTGRESQL.md** - Detalhes técnicos da implementação

---

## ✅ Checklist de Requisitos

### Requisitos Obrigatórios

- [x] Tema: Posts de rede social
- [x] Estrutura: quem, data_hora, comentario, likes
- [x] Banco de dados (PostgreSQL)
- [x] Todos os 5 endpoints implementados

### Endpoints

- [x] POST /api/post - criar post
- [x] GET /api/post/count - quantidade
- [x] GET /api/post - listar todos
- [x] GET /api/post/:id - buscar por ID
- [x] GET /api/post/search/:exp - buscar por expressão

### Dados

- [x] Insert 1 (1 post)
- [x] Insert 1000 (1.000 posts)
- [x] Insert 5000 (5.000 posts)
- [x] Insert 15000 (15.000 posts)
- [x] Insert 30000 (30.000 posts)
- [x] **Total: 51.001 posts**

### Extras

- [x] TypeScript
- [x] Paginação
- [x] Validações
- [x] Tratamento de erros
- [x] Collections Postman/Insomnia
- [x] Documentação completa
- [x] Scripts de setup e seed

---

## 🛠️ Scripts NPM

```bash
npm run dev          # Desenvolvimento (hot-reload)
npm run build        # Compilar TypeScript
npm start            # Produção
npm run setup-db     # Criar tabelas no banco
npm run seed         # Popular banco com 51.001 posts
```

---

## 💡 Tecnologias Utilizadas

- **TypeScript 5.3** - Linguagem tipada
- **Node.js 20** - Runtime JavaScript
- **Express 4.18** - Framework web
- **PostgreSQL 15** - Banco de dados relacional
- **pg 8.11** - Driver PostgreSQL
- **ts-node-dev** - Hot reload

---

## 🎓 Aprendizados

Este projeto demonstra:

- ✅ API REST completa com TypeScript
- ✅ CRUD com PostgreSQL
- ✅ Queries SQL otimizadas
- ✅ Pool de conexões
- ✅ Índices para performance
- ✅ Paginação de dados
- ✅ Busca full-text
- ✅ Tratamento de erros
- ✅ Boas práticas de código

---

## 📞 Suporte

Se tiver problemas:

1. Verifique se o PostgreSQL está rodando
2. Confira as credenciais no arquivo `.env`
3. Execute `npm run setup-db` novamente
4. Consulte a seção "Solução de Problemas" no GUIA_INSTALACAO.md

---

## 🏆 Projeto Pronto para Apresentação!

Todos os requisitos foram atendidos e o código está:

- ✅ Funcional
- ✅ Documentado
- ✅ Testável
- ✅ Pronto para deploy
- ✅ Seguindo boas práticas

**Boa sorte na API Battle! 🚀**

---

_Desenvolvido com TypeScript + Express + PostgreSQL_
