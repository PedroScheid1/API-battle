import { Pool, PoolConfig } from "pg";
import dotenv from "dotenv";

dotenv.config();

const poolConfig: PoolConfig = {
  host: process.env.DB_HOST || "localhost",
  port: parseInt(process.env.DB_PORT || "5432"),
  database: process.env.DB_NAME || "api_db",
  user: process.env.DB_USER || "postgres",
  password: process.env.DB_PASSWORD || "postgres",
  max: 20, // máximo de conexões no pool
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
};

export const pool = new Pool(poolConfig);

export const connectDB = async (): Promise<void> => {
  try {
    const client = await pool.connect();
    console.log("✅ PostgreSQL conectado com sucesso!");
    console.log(`📊 Database: ${poolConfig.database}`);
    console.log(`🏠 Host: ${poolConfig.host}:${poolConfig.port}`);
    client.release();
  } catch (error) {
    console.error("❌ Erro ao conectar ao PostgreSQL:", error);
    throw error;
  }
};

export const disconnectDB = async (): Promise<void> => {
  try {
    await pool.end();
    console.log("🔌 PostgreSQL desconectado");
  } catch (error) {
    console.error("❌ Erro ao desconectar do PostgreSQL:", error);
  }
};

// Query helper
export const query = (text: string, params?: any[]) => {
  return pool.query(text, params);
};
