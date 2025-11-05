-- Excluir tabela antiga se existir
DROP TABLE IF EXISTS posts CASCADE;

-- Criação da tabela comentarios
CREATE TABLE comentarios (
    id SERIAL PRIMARY KEY,
    quem VARCHAR(100) NOT NULL,
    data_hora TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    comentario TEXT NOT NULL,
    bitcoin NUMERIC(18,8)
);

-- Índice para busca de texto no comentário
CREATE INDEX IF NOT EXISTS idx_comentarios_comentario ON comentarios USING gin(to_tsvector('portuguese', comentario));

-- Índice para data_hora (ordenação)
CREATE INDEX IF NOT EXISTS idx_comentarios_data_hora ON comentarios(data_hora DESC);

-- Índice para bitcoin
CREATE INDEX IF NOT EXISTS idx_comentarios_bitcoin ON comentarios(bitcoin);
