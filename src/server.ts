import express, { Application, Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/database";
import postRoutes from "./routes/postRoutes";

dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rota de teste
app.get("/", (req: Request, res: Response) => {
  res.json({
    message: "🚀 API Battle - Posts de Rede Social",
    version: "1.0.0",
    endpoints: {
      "POST /post": "Criar um post",
      "GET /post/count": "Consultar quantidade de posts",
      "GET /post": "Consultar todos os posts (com paginação)",
      "GET /post/:id": "Consultar um post específico",
      "GET /post/search/:exp": "Buscar posts por expressão no comentário",
    },
  });
});

// Rotas da API
app.use("/api", postRoutes);

// Conectar ao banco e iniciar servidor
const startServer = async () => {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log(`🚀 Servidor rodando na porta ${PORT}`);
      console.log(`📍 URL: http://localhost:${PORT}`);
      console.log(`📚 Documentação: http://localhost:${PORT}/`);
    });
  } catch (error) {
    console.error("❌ Erro ao iniciar servidor:", error);
    process.exit(1);
  }
};

startServer();

export default app;
