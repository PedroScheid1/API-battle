import { pool } from "../config/database";
import { IPost } from "../interfaces/IPost";

export class Post {
  // Criar um novo post
  static async create(postData: Omit<IPost, "id">): Promise<IPost> {
    const { quem, data_hora, comentario, bitcoin } = postData;

    const result = await pool.query(
      `INSERT INTO comentarios (quem, data_hora, comentario, bitcoin)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
      [quem, data_hora, comentario, bitcoin]
    );

    return result.rows[0];
  }

  // Contar total de posts
  static async count(): Promise<number> {
    const result = await pool.query(
      "SELECT COUNT(*) as count FROM comentarios"
    );
    return parseInt(result.rows[0].count);
  }

  // Buscar todos os posts com paginação
  static async findAll(page: number = 1, limit: number = 10): Promise<IPost[]> {
    const offset = (page - 1) * limit;

    const result = await pool.query(
      `SELECT * FROM comentarios
       ORDER BY data_hora DESC
       LIMIT $1 OFFSET $2`,
      [limit, offset]
    );

    return result.rows;
  }

  // Buscar post por ID
  static async findById(id: number): Promise<IPost | null> {
    const result = await pool.query("SELECT * FROM comentarios WHERE id = $1", [
      id,
    ]);

    return result.rows[0] || null;
  }

  // Buscar posts por expressão no comentário
  static async searchByExpression(
    expression: string,
    page: number = 1,
    limit: number = 10
  ): Promise<IPost[]> {
    const offset = (page - 1) * limit;

    const result = await pool.query(
      `SELECT * FROM comentarios
       WHERE comentario ILIKE $1
       ORDER BY data_hora DESC
       LIMIT $2 OFFSET $3`,
      [`%${expression}%`, limit, offset]
    );

    return result.rows;
  }

  // Contar posts por expressão
  static async countByExpression(expression: string): Promise<number> {
    const result = await pool.query(
      "SELECT COUNT(*) as count FROM comentarios WHERE comentario ILIKE $1",
      [`%${expression}%`]
    );

    return parseInt(result.rows[0].count);
  }

  // Inserir múltiplos posts (para seed)
  static async insertMany(posts: Omit<IPost, "id">[]): Promise<void> {
    const client = await pool.connect();

    try {
      await client.query("BEGIN");

      for (const post of posts) {
        await client.query(
          `INSERT INTO comentarios (quem, data_hora, comentario, bitcoin)
           VALUES ($1, $2, $3, $4)`,
          [post.quem, post.data_hora, post.comentario, post.bitcoin]
        );
      }

      await client.query("COMMIT");
    } catch (error) {
      await client.query("ROLLBACK");
      throw error;
    } finally {
      client.release();
    }
  }

  // Deletar todos os posts
  static async deleteAll(): Promise<void> {
    await pool.query("TRUNCATE TABLE comentarios RESTART IDENTITY CASCADE");
  }
}

export default Post;
