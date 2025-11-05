# 📁 Estrutura do Projeto - API Battle

```
API Battle/
│
├── 📄 LEIA-ME-PRIMEIRO.md          ⭐ Comece por aqui!
├── 📄 README.md                    📚 Documentação completa
├── 📄 GUIA_INSTALACAO.md          🚀 Guia de instalação
├── 📄 MIGRACAO_POSTGRESQL.md      🔄 Detalhes técnicos
│
├── ⚙️ package.json                 Dependências e scripts
├── ⚙️ tsconfig.json                Configuração TypeScript
├── 🔐 .env                         Configurações (NÃO COMMITAR!)
├── 📝 .env.example                 Template de configuração
├── 🚫 .gitignore                   Arquivos ignorados
│
├── 🧪 postman_collection.json      Collection Postman
├── 🧪 insomnia_collection.json     Collection Insomnia
│
├── 📂 src/                         📝 CÓDIGO FONTE
│   │
│   ├── 📂 config/
│   │   └── database.ts             🔌 Conexão PostgreSQL + Pool
│   │
│   ├── 📂 controllers/
│   │   └── postController.ts       🎮 Lógica dos 5 endpoints
│   │
│   ├── 📂 database/
│   │   └── schema.sql              🗄️ Tabela + Índices + Triggers
│   │
│   ├── 📂 interfaces/
│   │   └── IPost.ts                📋 Tipagem TypeScript do Post
│   │
│   ├── 📂 models/
│   │   └── Post.ts                 💾 Queries SQL (create, find, etc)
│   │
│   ├── 📂 routes/
│   │   └── postRoutes.ts           🛣️ Definição das rotas REST
│   │
│   ├── 📂 scripts/
│   │   ├── setupDatabase.ts        🔧 Criar tabelas
│   │   └── seedData.ts             🌱 Inserir 51.001 posts
│   │
│   └── server.ts                   🚀 Servidor Express principal
│
├── 📂 dist/                        🏗️ Código JavaScript compilado
└── 📂 node_modules/                📦 Dependências instaladas

```

---

## 🎯 Fluxo de Dados

```
Cliente (Postman/Browser)
    ↓ HTTP Request
    ↓
┌───────────────────────────────┐
│   server.ts (Express)         │  ← Servidor HTTP
└───────────────────────────────┘
    ↓
┌───────────────────────────────┐
│   postRoutes.ts               │  ← Roteamento
└───────────────────────────────┘
    ↓
┌───────────────────────────────┐
│   postController.ts           │  ← Lógica de negócio
└───────────────────────────────┘
    ↓
┌───────────────────────────────┐
│   Post.ts (Model)             │  ← Queries SQL
└───────────────────────────────┘
    ↓
┌───────────────────────────────┐
│   database.ts (Pool)          │  ← Pool de conexões
└───────────────────────────────┘
    ↓
┌───────────────────────────────┐
│   PostgreSQL Database         │  ← Banco de dados
│   Tabela: posts               │
│   51.001 registros            │
└───────────────────────────────┘
```

---

## 🔄 Ciclo de Vida das Requisições

### 1. POST /api/post (Criar)

```
Cliente → postRoutes → createPost() → Post.create() → INSERT INTO posts → Banco
```

### 2. GET /api/post/count (Contar)

```
Cliente → postRoutes → getPostsCount() → Post.count() → SELECT COUNT(*) → Banco
```

### 3. GET /api/post (Listar)

```
Cliente → postRoutes → getAllPosts() → Post.findAll() → SELECT * LIMIT/OFFSET → Banco
```

### 4. GET /api/post/:id (Buscar por ID)

```
Cliente → postRoutes → getPostById() → Post.findById() → SELECT * WHERE id → Banco
```

### 5. GET /api/post/search/:exp (Buscar por expressão)

```
Cliente → postRoutes → searchPostsByExpression() → Post.searchByExpression() → SELECT * WHERE ILIKE → Banco
```

---

## 📊 Estrutura do Banco de Dados

```sql
┌─────────────────────────────────────────┐
│           Tabela: posts                 │
├─────────────────┬──────────┬────────────┤
│ Campo           │ Tipo     │ Restrições │
├─────────────────┼──────────┼────────────┤
│ id              │ SERIAL   │ PK         │
│ quem            │ VARCHAR  │ NOT NULL   │
│ data_hora       │ TIMESTAMP│ NOT NULL   │
│ comentario      │ TEXT     │ NOT NULL   │
│ likes           │ INTEGER  │ DEFAULT 0  │
│ created_at      │ TIMESTAMP│ DEFAULT NOW│
│ updated_at      │ TIMESTAMP│ DEFAULT NOW│
└─────────────────┴──────────┴────────────┘

Índices:
├── 🔍 idx_posts_comentario (GIN)     ← Busca full-text
├── 📅 idx_posts_data_hora             ← Ordenação
└── ❤️ idx_posts_likes                 ← Filtros

Triggers:
└── 🔄 update_posts_updated_at         ← Atualiza updated_at
```

---

## 🚀 Scripts NPM Disponíveis

```bash
# 🔧 Setup inicial
npm install          # Instalar dependências
npm run setup-db     # Criar tabela posts

# 🌱 Popular dados
npm run seed         # Inserir 51.001 posts

# 💻 Desenvolvimento
npm run dev          # Servidor com hot-reload (ts-node-dev)

# 🏗️ Produção
npm run build        # Compilar TypeScript → JavaScript
npm start            # Executar servidor compilado
```

---

## 📝 Arquivos de Configuração

### package.json

```json
{
  "dependencies": {
    "express": "Framework web",
    "pg": "Driver PostgreSQL",
    "dotenv": "Variáveis de ambiente",
    "cors": "Cross-Origin Resource Sharing"
  },
  "devDependencies": {
    "typescript": "Linguagem",
    "@types/*": "Tipagens",
    "ts-node-dev": "Hot reload"
  }
}
```

### .env

```env
PORT=3000                      ← Porta do servidor
DB_HOST=localhost              ← Host PostgreSQL
DB_PORT=5432                   ← Porta PostgreSQL
DB_NAME=api_db       ← Nome do banco
DB_USER=postgres               ← Usuário
DB_PASSWORD=sua_senha          ← Senha
```

### tsconfig.json

```json
{
  "compilerOptions": {
    "target": "ES2020",          ← JavaScript moderno
    "module": "commonjs",        ← Compatível com Node.js
    "outDir": "./dist",          ← Código compilado
    "rootDir": "./src",          ← Código fonte
    "strict": true               ← Tipagem rigorosa
  }
}
```

---

## 🎯 Endpoints e Seus Arquivos

| Endpoint                    | Rota          | Controller                | Model                     |
| --------------------------- | ------------- | ------------------------- | ------------------------- |
| `POST /api/post`            | postRoutes.ts | createPost()              | Post.create()             |
| `GET /api/post/count`       | postRoutes.ts | getPostsCount()           | Post.count()              |
| `GET /api/post`             | postRoutes.ts | getAllPosts()             | Post.findAll()            |
| `GET /api/post/:id`         | postRoutes.ts | getPostById()             | Post.findById()           |
| `GET /api/post/search/:exp` | postRoutes.ts | searchPostsByExpression() | Post.searchByExpression() |

---

## 🔍 Onde Está Cada Coisa?

### Precisa modificar...

**📡 Adicionar novo endpoint?**
→ `src/routes/postRoutes.ts` (rota)
→ `src/controllers/postController.ts` (lógica)
→ `src/models/Post.ts` (query SQL)

**🗄️ Mudar estrutura da tabela?**
→ `src/database/schema.sql` (SQL)
→ `src/interfaces/IPost.ts` (TypeScript)

**⚙️ Configurar banco diferente?**
→ `.env` (credenciais)
→ `src/config/database.ts` (se precisar lógica diferente)

**📊 Adicionar mais dados?**
→ `src/scripts/seedData.ts`

**🎨 Mudar porta do servidor?**
→ `.env` (PORT=3000)

---

## 📚 Documentações Incluídas

| Arquivo                    | Conteúdo                      |
| -------------------------- | ----------------------------- |
| **LEIA-ME-PRIMEIRO.md**    | Resumo executivo do projeto   |
| **README.md**              | Documentação técnica completa |
| **GUIA_INSTALACAO.md**     | Passo a passo para rodar      |
| **MIGRACAO_POSTGRESQL.md** | Detalhes da implementação     |
| **ESTRUTURA.md**           | Este arquivo!                 |

---

## ✅ Checklist de Arquivos Importantes

```
[ ] Código fonte em src/
[ ] package.json com dependências
[ ] .env configurado
[ ] README.md lido
[ ] Postman/Insomnia collection testada
[ ] PostgreSQL instalado e rodando
[ ] Banco de dados criado
[ ] Tabela criada (npm run setup-db)
[ ] Dados inseridos (npm run seed)
[ ] Servidor funcionando (npm run dev)
```

---

**🎉 Estrutura completa e organizada!**

Tudo está no lugar certo para facilitar manutenção, testes e deploy.
