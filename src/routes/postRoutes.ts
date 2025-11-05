import { Router } from "express";
import {
  createPost,
  getPostsCount,
  getAllPosts,
  getPostById,
  searchPostsByExpression,
} from "../controllers/postController";

const router = Router();

// POST /post - Criar um post
router.post("/post", createPost);

// GET /post/count - Consultar quantidade de posts
router.get("/post/count", getPostsCount);

// GET /post/search/:exp - Consultar posts por expressão (DEVE VIR ANTES DE /post/:id)
router.get("/post/search/:exp", searchPostsByExpression);

// GET /post/:id - Consultar um post específico
router.get("/post/:id", getPostById);

// GET /post - Consultar todos os posts
router.get("/post", getAllPosts);

export default router;
