import { Request, Response } from "express";
import Post from "../models/Post";

// POST /post - Criar um novo post
export const createPost = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { quem, data_hora, comentario, bitcoin } = req.body;

    // Validação básica
    if (!quem || !comentario) {
      res.status(400).json({
        success: false,
        message: 'Os campos "quem" e "comentario" são obrigatórios',
      });
      return;
    }

    const post = await Post.create({
      quem,
      data_hora: data_hora ? new Date(data_hora) : new Date(),
      comentario,
      bitcoin: bitcoin || null,
    });

    res.status(201).json({
      success: true,
      message: "Post criado com sucesso!",
      data: post,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Erro ao criar post",
      error: error.message,
    });
  }
};

// GET /post/count - Consultar quantidade de posts
export const getPostsCount = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const count = await Post.count();

    res.status(200).json({
      success: true,
      count,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Erro ao contar posts",
      error: error.message,
    });
  }
};

// GET /post - Consultar todos os posts
export const getAllPosts = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { page = 1, limit = 10 } = req.query;

    const pageNum = parseInt(page as string);
    const limitNum = parseInt(limit as string);

    const posts = await Post.findAll(pageNum, limitNum);
    const total = await Post.count();

    res.status(200).json({
      success: true,
      data: posts,
      pagination: {
        page: pageNum,
        limit: limitNum,
        total,
        pages: Math.ceil(total / limitNum),
      },
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Erro ao buscar posts",
      error: error.message,
    });
  }
};

// GET /post/:id - Consultar um post específico
export const getPostById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const id = parseInt(req.params.id);

    if (isNaN(id)) {
      res.status(400).json({
        success: false,
        message: "ID inválido",
      });
      return;
    }

    const post = await Post.findById(id);

    if (!post) {
      res.status(404).json({
        success: false,
        message: "Post não encontrado",
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: post,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Erro ao buscar post",
      error: error.message,
    });
  }
};

// GET /post/search/:exp - Buscar posts por expressão no comentário
export const searchPostsByExpression = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { exp } = req.params;
    const { page = 1, limit = 10 } = req.query;

    const pageNum = parseInt(page as string);
    const limitNum = parseInt(limit as string);

    const posts = await Post.searchByExpression(exp, pageNum, limitNum);
    const total = await Post.countByExpression(exp);

    res.status(200).json({
      success: true,
      data: posts,
      searchTerm: exp,
      pagination: {
        page: pageNum,
        limit: limitNum,
        total,
        pages: Math.ceil(total / limitNum),
      },
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Erro ao buscar posts",
      error: error.message,
    });
  }
};
