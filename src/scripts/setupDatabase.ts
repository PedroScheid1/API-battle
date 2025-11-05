import { pool, connectDB, disconnectDB } from "../config/database";
import * as fs from "fs";
import * as path from "path";

const setupDatabase = async (): Promise<void> => {
  try {
    console.log("🔧 Iniciando configuração do banco de dados...\n");

    await connectDB();

    // Ler o arquivo SQL de schema
    const schemaPath = path.join(__dirname, "../database/schema.sql");
    const schemaSql = fs.readFileSync(schemaPath, "utf-8");

    console.log("📝 Executando script de criação de tabelas...");
    await pool.query(schemaSql);
    console.log('✅ Tabela "posts" criada com sucesso!');
    console.log("✅ Índices criados com sucesso!");
    console.log("✅ Triggers configurados com sucesso!\n");

    // Verificar se a tabela foi criada
    const result = await pool.query(`
      SELECT column_name, data_type, is_nullable
      FROM information_schema.columns
      WHERE table_name = 'posts'
      ORDER BY ordinal_position;
    `);

    console.log('📊 Estrutura da tabela "posts":');
    console.table(result.rows);

    console.log("\n✅ Configuração do banco de dados concluída!");
    console.log("💡 Agora você pode executar: npm run seed");
  } catch (error) {
    console.error("❌ Erro ao configurar banco de dados:", error);
    throw error;
  } finally {
    await disconnectDB();
    process.exit(0);
  }
};

setupDatabase();
