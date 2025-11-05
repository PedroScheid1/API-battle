# 🔄 Migração MongoDB → PostgreSQL

Este documento explica as mudanças realizadas na migração do MongoDB para PostgreSQL.

## ✅ O que foi alterado

### 1. Dependências (package.json)

**Antes (MongoDB):**

```json
"mongoose": "^8.0.0"
```

**Depois (PostgreSQL):**

```json
"pg": "^8.11.3",
"@types/pg": "^8.10.9"
```

### 2. Variáveis de Ambiente (.env)

**Antes (MongoDB):**

```env
MONGODB_URI=mongodb://localhost:27017/api-battle-posts
```

**Depois (PostgreSQL):**

```env
DB_HOST=localhost
DB_PORT=5432
DB_NAME=api_battle_posts
DB_USER=postgres
DB_PASSWORD=postgres
```

### 3. Configuração do Banco (src/config/database.ts)

**Mudanças principais:**

- Substituído Mongoose por `pg.Pool`
- Connection string única → Configuração com múltiplos parâmetros
- Pool de conexões para melhor performance

### 4. Model (src/models/Post.ts)

**Antes (MongoDB/Mongoose):**

- Schema com Mongoose
- Métodos como `save()`, `find()`, `findById()`
- IDs automáticos como ObjectId

**Depois (PostgreSQL):**

- Classe estática com métodos SQL
- Queries com `pool.query()`
- IDs numéricos sequenciais (SERIAL)
- Métodos: `create()`, `findAll()`, `findById()`, etc.

### 5. Interface (src/interfaces/IPost.ts)

**Mudanças:**

- `_id: string` → `id: number`
- Removido `extends Document`
- Adicionados campos `created_at` e `updated_at`

### 6. Controllers (src/controllers/postController.ts)

**Mudanças principais:**

- `new Post().save()` → `Post.create()`
- `Post.find()` → `Post.findAll()`
- `Post.findById(id)` → `Post.findById(parseInt(id))`
- Tratamento de IDs numéricos ao invés de strings

### 7. Schema SQL (novo arquivo)

**Criado:** `src/database/schema.sql`

- Definição da tabela `posts`
- Índices para performance:
  - GIN index para busca full-text
  - Index em data_hora
  - Index em likes
- Trigger para atualizar `updated_at` automaticamente

### 8. Script de Setup (novo arquivo)

**Criado:** `src/scripts/setupDatabase.ts`

- Executa o schema.sql
- Cria tabelas, índices e triggers
- Comando: `npm run setup-db`

## 🆚 Comparação de Funcionalidades

| Funcionalidade     | MongoDB            | PostgreSQL            |
| ------------------ | ------------------ | --------------------- |
| **Tipo de Banco**  | NoSQL (Documentos) | SQL (Relacional)      |
| **ID Primária**    | ObjectId (string)  | SERIAL (integer)      |
| **Schema**         | Flexível           | Rígido (definido)     |
| **Índices**        | text index         | GIN index (full-text) |
| **Transações**     | Sim                | Sim (ACID)            |
| **Busca de Texto** | `$regex`           | `ILIKE` ou full-text  |
| **Timestamps**     | Plugin Mongoose    | Trigger SQL           |

## 📊 Vantagens do PostgreSQL

1. **ACID Compliance**: Transações mais confiáveis
2. **Joins Eficientes**: Melhor para dados relacionais
3. **Constraints**: Validação no nível do banco
4. **Triggers**: Automação de lógica no banco
5. **Índices Avançados**: GIN, GIST, BRIN, etc.
6. **Extensões**: PostGIS, pg_trgm, etc.
7. **Maturidade**: Banco de dados robusto e testado

## 🔧 Comandos Úteis

### MongoDB (antes)

```bash
# Conectar
mongosh

# Ver databases
show dbs

# Usar database
use api_battle_posts

# Ver collections
show collections

# Contar documentos
db.posts.countDocuments()
```

### PostgreSQL (agora)

```bash
# Conectar
psql -U postgres -d api_battle_posts

# Listar databases
\l

# Conectar a database
\c api_battle_posts

# Listar tabelas
\dt

# Descrever tabela
\d posts

# Contar registros
SELECT COUNT(*) FROM posts;

# Ver primeiros registros
SELECT * FROM posts LIMIT 5;

# Buscar por termo
SELECT * FROM posts WHERE comentario ILIKE '%TypeScript%';

# Ver índices
\di

# Sair
\q
```

## 🚀 Como Usar

### Primeira vez (setup completo)

```bash
# 1. Instalar dependências
npm install

# 2. Configurar .env
# Edite com suas credenciais PostgreSQL

# 3. Criar banco de dados
psql -U postgres -c "CREATE DATABASE api_battle_posts;"

# 4. Configurar tabelas
npm run setup-db

# 5. Popular com dados
npm run seed

# 6. Iniciar servidor
npm run dev
```

### Resetar banco de dados

```bash
# Método 1: Usando TRUNCATE (rápido)
psql -U postgres -d api_battle_posts -c "TRUNCATE TABLE posts RESTART IDENTITY CASCADE;"

# Método 2: Recriar tudo
psql -U postgres -c "DROP DATABASE api_battle_posts;"
psql -U postgres -c "CREATE DATABASE api_battle_posts;"
npm run setup-db
npm run seed
```

## 📝 Exemplos de Queries SQL

### Criar post

```sql
INSERT INTO posts (quem, data_hora, comentario, likes)
VALUES ('João Silva', NOW(), 'Meu post!', 0)
RETURNING *;
```

### Buscar todos (com paginação)

```sql
SELECT * FROM posts
ORDER BY data_hora DESC
LIMIT 10 OFFSET 0;
```

### Buscar por ID

```sql
SELECT * FROM posts WHERE id = 123;
```

### Buscar por expressão

```sql
SELECT * FROM posts
WHERE comentario ILIKE '%TypeScript%'
ORDER BY data_hora DESC
LIMIT 10;
```

### Contar posts

```sql
SELECT COUNT(*) as total FROM posts;
```

### Posts mais curtidos

```sql
SELECT * FROM posts
ORDER BY likes DESC
LIMIT 10;
```

### Posts por usuário

```sql
SELECT quem, COUNT(*) as total_posts
FROM posts
GROUP BY quem
ORDER BY total_posts DESC;
```

## ⚠️ Notas Importantes

1. **IDs agora são numéricos**: Troque `_id` por `id` em toda aplicação
2. **Timestamps diferentes**: `createdAt/updatedAt` → `created_at/updated_at`
3. **Backup**: PostgreSQL usa `pg_dump` ao invés de `mongodump`
4. **Performance**: Índices GIN são importantes para busca de texto
5. **Conexões**: Use pool de conexões para melhor performance

## 🎯 Próximos Passos

- [ ] Testar todos os endpoints
- [ ] Verificar performance com 51.001 posts
- [ ] Configurar backups automáticos
- [ ] Monitorar uso de conexões do pool
- [ ] Otimizar queries se necessário

---

**Migração concluída com sucesso! ✅**
