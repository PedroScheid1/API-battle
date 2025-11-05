import { Pool } from "pg";
import * as dotenv from "dotenv";

dotenv.config();

const testConnection = async () => {
  console.log("🔍 Testando conexão com PostgreSQL...\n");

  const config = {
    host: process.env.DB_HOST || "localhost",
    port: parseInt(process.env.DB_PORT || "5432"),
    user: process.env.DB_USER || "postgres",
    password: process.env.DB_PASSWORD || "postgres",
  };

  console.log("📋 Configurações:");
  console.log(`   Host: ${config.host}`);
  console.log(`   Porta: ${config.port}`);
  console.log(`   Usuário: ${config.user}`);
  console.log(`   Senha: ${"*".repeat(config.password.length)}\n`);

  // Primeiro, testar conexão sem especificar banco
  console.log("1️⃣ Testando conexão com servidor PostgreSQL...");
  const pool = new Pool(config);

  try {
    const client = await pool.connect();
    console.log("✅ Conectado ao servidor PostgreSQL!\n");

    // Listar bancos de dados existentes
    console.log("📊 Bancos de dados disponíveis:");
    const result = await client.query(
      "SELECT datname FROM pg_database WHERE datistemplate = false;"
    );
    result.rows.forEach((row) => {
      console.log(`   - ${row.datname}`);
    });

    // Verificar se o banco api_db existe
    const dbCheck = await client.query(
      "SELECT 1 FROM pg_database WHERE datname = 'api_db'"
    );

    if (dbCheck.rows.length > 0) {
      console.log('\n✅ Banco "api_db" encontrado!');

      // Tentar conectar ao banco específico
      client.release();
      await pool.end();

      const poolWithDb = new Pool({
        ...config,
        database: "api_db",
      });

      const clientWithDb = await poolWithDb.connect();
      console.log('✅ Conectado ao banco "api_db" com sucesso!\n');

      // Listar tabelas
      const tables = await clientWithDb.query(`
        SELECT tablename FROM pg_tables WHERE schemaname = 'public'
      `);

      console.log("📋 Tabelas no banco:");
      if (tables.rows.length === 0) {
        console.log(
          "   (nenhuma tabela encontrada - execute: npm run setup-db)"
        );
      } else {
        tables.rows.forEach((row) => {
          console.log(`   - ${row.tablename}`);
        });
      }

      clientWithDb.release();
      await poolWithDb.end();
    } else {
      console.log('\n❌ Banco "api_db" NÃO encontrado!');
      console.log("\n💡 Para criar o banco, execute no psql ou pgAdmin:");
      console.log("   CREATE DATABASE api_db;");
    }

    client.release();
  } catch (error: any) {
    console.error("❌ Erro:", error.message);

    if (error.code === "28P01") {
      console.log("\n💡 Senha incorreta! Verifique o arquivo .env");
    } else if (error.code === "ECONNREFUSED") {
      console.log("\n💡 PostgreSQL não está rodando ou não está na porta 5432");
    }
  } finally {
    await pool.end();
  }
};

testConnection();
