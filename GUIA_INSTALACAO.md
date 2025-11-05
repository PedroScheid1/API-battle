# 🚀 Guia Rápido de Instalação e Execução

## Pré-requisitos

Antes de iniciar, você precisa ter instalado:

### 1. Node.js (v16 ou superior)

- **Windows:** Baixe de https://nodejs.org/
- Após instalar, verifique: `node --version` e `npm --version`

### 2. PostgreSQL (v12 ou superior)

#### Opção A: PostgreSQL Local (Windows)

1. Baixe: https://www.postgresql.org/download/windows/
2. Execute o instalador do PostgreSQL
3. Durante a instalação:
   - Defina uma senha para o usuário `postgres` (anote essa senha!)
   - Porta padrão: 5432
   - Instale o pgAdmin (ferramenta gráfica)
4. Após instalar, o PostgreSQL será iniciado automaticamente como serviço

#### Opção B: PostgreSQL no Docker (Recomendado para desenvolvimento)

```bash
# Instale o Docker Desktop para Windows
# Depois execute:
docker run --name postgres-api-battle -e POSTGRES_PASSWORD=postgres -p 5432:5432 -d postgres:15

# Para parar:
docker stop postgres-api-battle

# Para iniciar novamente:
docker start postgres-api-battle
```

#### Opção C: PostgreSQL na Nuvem (Grátis)

1. **Supabase:** https://supabase.com (oferece PostgreSQL gratuito)
2. **ElephantSQL:** https://www.elephantsql.com (plano gratuito)
3. **Neon:** https://neon.tech (serverless PostgreSQL gratuito)

---

## 📦 Instalação

### Passo 1: Abrir o terminal no projeto

- Abra o VS Code
- Terminal → New Terminal (ou Ctrl + ')

### Passo 2: Instalar dependências

```bash
npm install
```

### Passo 3: Configurar o arquivo .env

Edite o arquivo `.env` com suas credenciais do PostgreSQL:

```env
PORT=3000
NODE_ENV=development

# PostgreSQL Database Configuration
DB_HOST=localhost
DB_PORT=5432
DB_NAME=api_battle_posts
DB_USER=postgres
DB_PASSWORD=sua_senha_aqui  # A senha que você definiu na instalação
```

### Passo 4: Criar o banco de dados

#### Opção 1: Usando psql (linha de comando)

```bash
# Abrir o psql
psql -U postgres

# Dentro do psql, criar o banco:
CREATE DATABASE api_battle_posts;

# Sair
\q
```

#### Opção 2: Usando pgAdmin (interface gráfica)

1. Abra o pgAdmin
2. Conecte-se ao servidor PostgreSQL
3. Clique com o botão direito em "Databases"
4. Selecione "Create" → "Database"
5. Nome: `api_battle_posts`
6. Clique em "Save"

### Passo 5: Configurar as tabelas

Execute o script que cria as tabelas, índices e triggers:

```bash
npm run setup-db
```

Saída esperada:

```
🔧 Iniciando configuração do banco de dados...
✅ PostgreSQL conectado com sucesso!
📊 Database: api_battle_posts
📝 Executando script de criação de tabelas...
✅ Tabela "posts" criada com sucesso!
✅ Índices criados com sucesso!
✅ Triggers configurados com sucesso!
```

---

## 🌱 Popular o Banco de Dados

Execute o script de seed para inserir os 51.001 posts:

```bash
npm run seed
```

Saída esperada:

```
🌱 Iniciando seed do banco de dados...

✅ PostgreSQL conectado com sucesso!
📊 Database: api_battle_posts
🏠 Host: localhost:5432

🗑️  Limpando posts existentes...
✅ Posts removidos

📝 Inserindo 1 posts - Insert 1...
✅ 1 posts inseridos em 0.02s

📝 Inserindo 1000 posts - Insert 1000...
✅ 1000 posts inseridos em 0.85s

📝 Inserindo 5000 posts - Insert 5000...
✅ 5000 posts inseridos em 3.12s

📝 Inserindo 15000 posts - Insert 15000...
✅ 15000 posts inseridos em 9.45s

📝 Inserindo 30000 posts - Insert 30000...
✅ 30000 posts inseridos em 18.67s

📊 Total de posts no banco: 51001
✅ Seed concluído com sucesso!
```

---

## 🚀 Executar o Servidor

### Modo Desenvolvimento (com hot-reload)

```bash
npm run dev
```

### Modo Produção

```bash
npm run build
npm start
```

Servidor rodando em: **http://localhost:3000**

---

## 🧪 Testar a API

### 1. Abrir no navegador

Acesse: http://localhost:3000

Você verá a documentação com todos os endpoints.

### 2. Usar Postman/Insomnia

**Postman:**

1. Abra o Postman
2. File → Import
3. Selecione o arquivo `postman_collection.json`
4. Todos os endpoints estarão prontos para testar!

**Insomnia:**

1. Abra o Insomnia
2. Application → Preferences → Data → Import Data
3. Selecione o arquivo `insomnia_collection.json`

### 3. Testar endpoints manualmente

**Exemplo 1: Criar um post**

```bash
curl -X POST http://localhost:3000/api/post -H "Content-Type: application/json" -d "{\"quem\":\"Teste\",\"comentario\":\"Meu post de teste\"}"
```

**Exemplo 2: Contar posts**

```bash
curl http://localhost:3000/api/post/count
```

**Exemplo 3: Listar posts**

```bash
curl http://localhost:3000/api/post?page=1&limit=5
```

**Exemplo 4: Buscar por palavra**

```bash
curl http://localhost:3000/api/post/search/TypeScript
```

---

## ❌ Solução de Problemas

### Erro: "Cannot connect to PostgreSQL"

**Causas possíveis:**

1. PostgreSQL não está rodando

   - **Windows:** Abra Serviços → procure por "postgresql" → Iniciar
   - **Docker:** `docker start postgres-api-battle`

2. Senha incorreta no `.env`

   - Verifique a senha do usuário postgres
   - Teste a conexão: `psql -U postgres -d api_battle_posts`

3. Banco de dados não existe
   - Execute: `npm run setup-db`

### Erro: "database api_battle_posts does not exist"

```bash
# Criar o banco manualmente
psql -U postgres -c "CREATE DATABASE api_battle_posts;"

# Depois executar o setup
npm run setup-db
```

### Erro: "Port 3000 is already in use"

- Altere a porta no arquivo `.env`:
  ```
  PORT=3001
  ```

### Erro: "FATAL: password authentication failed"

- Verifique a senha no arquivo `.env`
- Tente redefinir a senha do usuário postgres:
  ```bash
  psql -U postgres
  ALTER USER postgres PASSWORD 'nova_senha';
  ```

### Erro ao compilar TypeScript

- Limpe e reinstale:
  ```bash
  rmdir /s /q node_modules
  rmdir /s /q dist
  npm install
  npm run build
  ```

### Verificar se PostgreSQL está funcionando

```bash
# Verificar versão
psql --version

# Testar conexão
psql -U postgres -d api_battle_posts

# Listar tabelas (dentro do psql)
\dt

# Ver dados da tabela
SELECT COUNT(*) FROM posts;
```

---

## 📊 Endpoints Disponíveis

| Método | Endpoint                | Descrição               |
| ------ | ----------------------- | ----------------------- |
| POST   | `/api/post`             | Criar um post           |
| GET    | `/api/post/count`       | Quantidade de posts     |
| GET    | `/api/post`             | Listar todos (paginado) |
| GET    | `/api/post/:id`         | Buscar por ID           |
| GET    | `/api/post/search/:exp` | Buscar por expressão    |

---

## 🖥️ Deploy na VM

Consulte a seção "Deploy na VM" no arquivo `README.md` para instruções detalhadas de como publicar a aplicação em uma máquina virtual.

---

## ✅ Checklist de Requisitos

- [x] Tema: Posts de rede social
- [x] Estrutura do dado: quem, data_hora, comentario, likes
- [x] POST /api/post - criar post
- [x] GET /api/post/count - consultar quantidade
- [x] GET /api/post - consulta todos posts (com paginação)
- [x] GET /api/post/:id - consulta 1 post
- [x] GET /api/post/search/:exp - consulta por expressão
- [x] Inserção de 51.001 posts (1 + 1000 + 5000 + 15000 + 30000)
- [x] Banco de dados (PostgreSQL)
- [x] Collection Postman/Insomnia criada
- [x] Código para inserções em lote (seedData.ts)
- [x] Schema SQL com índices e triggers

---

**Sucesso! 🎉**

Se tiver alguma dúvida, consulte o `README.md` completo.
