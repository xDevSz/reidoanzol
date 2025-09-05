// server.mjs (ou server.js com "type": "module" no package.json)

// Importa dependências
import express from 'express';
import cors from 'cors';
import { pool, testConnection } from './database.js';
import adminRoutes from "./routes/admin.js";


const app = express();

// Porta do servidor
const PORT = process.env.PORT || 3001;

// Middlewares
app.use(cors()); // Permite requisições de qualquer origem
app.use(express.json()); // Permite receber JSON no body das requisições

// Testar conexão
testConnection();

app.use("/api", adminRoutes);
// Exemplo de rota que consulta o banco
app.get('/users', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM users');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao consultar usuários' });
  }
});

// Rotas
app.get('/', (req, res) => {
  res.send('<h1>Servidor Node.js funcionando!</h1><p>Bem-vindo à API</p>');
});

app.get('/status', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date() });
});

// Rota de exemplo para criar um recurso
app.post('/create', (req, res) => {
  const data = req.body;
  res.json({ message: 'Dados recebidos com sucesso!', data });
});

// Inicializa o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
