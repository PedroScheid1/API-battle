import { connectDB, disconnectDB } from "../config/database";
import Post from "../models/Post";

// Listas de dados para gerar posts aleatórios
const usuarios = [
  "João Silva",
  "Maria Santos",
  "Pedro Oliveira",
  "Ana Costa",
  "Carlos Souza",
  "Juliana Lima",
  "Rafael Alves",
  "Fernanda Rocha",
  "Lucas Martins",
  "Beatriz Ferreira",
  "Thiago Ribeiro",
  "Camila Gomes",
  "Bruno Cardoso",
  "Leticia Pereira",
  "Gustavo Mendes",
  "Patricia Barbosa",
  "Diego Castro",
  "Amanda Silva",
  "Felipe Santos",
  "Larissa Costa",
];

const comentarios = [
  "Que dia incrível! #happy",
  "Adorando esse novo projeto! 🚀",
  "Finalmente consegui resolver aquele bug difícil",
  "Bom dia pessoal! Como estão?",
  "Alguém tem dicas de TypeScript?",
  "Esse framework é simplesmente perfeito!",
  "Trabalhando no fim de semana... #dev",
  "Café é essencial para programar ☕",
  "Deploy feito com sucesso! 🎉",
  "Estudando PostgreSQL hoje",
  "API REST finalizada! Que sensação boa!",
  "Alguma dica de curso de Node.js?",
  "Express é muito fácil de usar",
  "Amando trabalhar com backend",
  "Fullstack é o caminho! 💻",
  "Documentação é importante, pessoal!",
  "Testes automatizados salvam vidas",
  "Git é fundamental para qualquer dev",
  "VS Code é o melhor editor!",
  "JavaScript everywhere! 🌍",
  "Aprendendo algo novo todos os dias",
  "Clean Code é essencial",
  "SOLID principles na prática",
  "Refatoração concluída com sucesso",
  "Code review é muito importante",
  "Pair programming é incrível! 👥",
  "Scrum funcionando perfeitamente",
  "Sprint review amanhã! 🏃",
  "Retrospectiva foi muito produtiva",
  "Daily meeting às 9h",
  "Trabalho remoto é o futuro",
  "Home office tem seus benefícios",
  "Equipe incrível! #teamwork",
  "Aprendendo React agora",
  "Vue.js é muito interessante",
  "Angular tem uma curva de aprendizado",
  "Docker simplifica tudo! 🐳",
  "Kubernetes para orquestração",
  "CI/CD é fundamental hoje em dia",
  "DevOps culture mudou tudo",
  "Cloud computing é o presente",
  "AWS tem muitos serviços",
  "Azure está crescendo bastante",
  "GCP tem bons preços",
  "Serverless é o futuro?",
  "Microsserviços vs Monolito",
  "GraphQL ou REST?",
  "WebSockets para tempo real",
  "Performance é crucial!",
  "Otimização prematura é ruim",
];

// Função para gerar um post aleatório
const gerarPostAleatorio = (): any => {
  const quem = usuarios[Math.floor(Math.random() * usuarios.length)];
  const comentario =
    comentarios[Math.floor(Math.random() * comentarios.length)];
  const bitcoin = parseFloat((Math.random() * 10).toFixed(8));

  // Data aleatória nos últimos 30 dias
  const dataAtual = new Date();
  const diasAtras = Math.floor(Math.random() * 30);
  const data_hora = new Date(
    dataAtual.getTime() - diasAtras * 24 * 60 * 60 * 1000
  );

  return { quem, data_hora, comentario, bitcoin };
};

// Função para inserir posts em lote
const inserirPostsEmLote = async (
  quantidade: number,
  descricao: string
): Promise<void> => {
  console.log(`\n📝 Inserindo ${quantidade} posts - ${descricao}...`);
  const inicio = Date.now();

  const posts = [];
  for (let i = 0; i < quantidade; i++) {
    posts.push(gerarPostAleatorio());
  }

  await Post.insertMany(posts);

  const tempo = ((Date.now() - inicio) / 1000).toFixed(2);
  console.log(`✅ ${quantidade} posts inseridos em ${tempo}s`);
};

// Função principal
const seedDatabase = async (): Promise<void> => {
  try {
    console.log("🌱 Iniciando seed do banco de dados...\n");

    await connectDB();

    // Limpar posts existentes
    console.log("🗑️  Limpando posts existentes...");
    await Post.deleteAll();
    console.log("✅ Posts removidos\n");

    // Inserir dados conforme especificação
    await inserirPostsEmLote(1, "Insert 1");
    await inserirPostsEmLote(1000, "Insert 1000");
    await inserirPostsEmLote(5000, "Insert 5000");
    await inserirPostsEmLote(15000, "Insert 15000");
    await inserirPostsEmLote(30000, "Insert 30000");

    // Verificar total
    const total = await Post.count();
    console.log(`\n📊 Total de posts no banco: ${total}`);
    console.log("✅ Seed concluído com sucesso!");
  } catch (error) {
    console.error("❌ Erro ao fazer seed:", error);
  } finally {
    await disconnectDB();
    process.exit(0);
  }
};

// Executar seed
seedDatabase();
