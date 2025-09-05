// src/api/routes/admin.js

import express from "express";
import { pool } from "../database.js";
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";

const router = express.Router();

/**
 * Gera um código único de convite (5 dígitos).
 */
function generateInviteCode() {
  return Math.floor(10000 + Math.random() * 90000).toString();
}

/**
 * Cria uma equipe com código único.
 */
async function createTeamWithUniqueCode(client, leaderId, teamName) {
  const maxAttempts = 7;
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    const inviteCode = generateInviteCode();
    const tournamentId = 1;
    const status = "pendente";

    try {
      const teamInsert = await client.query(
        `INSERT INTO teams (tournament_id, name, invite_code, leader_id, status)
         VALUES ($1, $2, $3, $4, $5)
         RETURNING id, invite_code`,
        [tournamentId, teamName, inviteCode, leaderId, status]
      );
      return teamInsert.rows[0];
    } catch (error) {
      if (error.code === "23505" && error.constraint === "teams_invite_code_key") {
        continue; // código repetido → tenta novamente
      }
      throw error;
    }
  }
  throw new Error("Não foi possível gerar um código único de convite após várias tentativas.");
}

/**
 * Rota para registrar usuário + equipe
 */
router.post("/register", async (req, res) => {
  const client = await pool.connect();
  try {
    const {
      email = "",
      password = "",
      fullName = "",
      cpf = "",
      birthdate = null,
      address = "",
      city = "",
      uf = "",
      cep = "",
      membros = [],
    } = req.body;

    // Funções de sanitização
    const sanitize = {
      cpf: (v) => (v || "").replace(/\D/g, ""),
      cep: (v) => (v || "").replace(/\D/g, ""),
      uf: (v) => (v || "").toUpperCase().slice(0, 2),
    };

    // Valida obrigatórios
    const requiredFields = { email, password, fullName, cpf };
    for (const [key, value] of Object.entries(requiredFields)) {
      if (!value) {
        return res.status(400).json({ success: false, error: `Campo obrigatório ausente: ${key}` });
      }
    }

    if (!Array.isArray(membros)) {
      return res.status(400).json({ success: false, error: "Formato inválido para membros." });
    }

    if (membros.length > 3) {
      return res.status(400).json({ success: false, error: "Máximo de 3 membros extras por equipe." });
    }

    // Transação
    await client.query("BEGIN");

    const leaderId = uuidv4();
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insere líder
    await client.query(
      `INSERT INTO users (id, nome, email, cpf, data_nascimento, endereco, cidade, estado, cep, senha)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)`,
      [leaderId, fullName, email, sanitize.cpf(cpf), birthdate, address, city, sanitize.uf(uf), sanitize.cep(cep), hashedPassword]
    );

    // Cria equipe
    const teamName = `${fullName} — Equipe`;
    const teamData = await createTeamWithUniqueCode(client, leaderId, teamName);
    const teamId = teamData.id;

    // Liga líder à equipe
    await client.query(
      `INSERT INTO team_members (user_id, team_id, role_in_team)
       VALUES ($1, $2, 'lider')`,
      [leaderId, teamId]
    );

    // Insere membros extras
    for (const membro of membros) {
      if (membro?.nome) {
        const membroId = uuidv4();
        try {
          await client.query(
            `INSERT INTO users (id, nome, cpf, data_nascimento, email)
             VALUES ($1, $2, $3, $4, $5)`,
            [membroId, membro.nome, sanitize.cpf(membro.cpf), membro.birthdate || null, null]
          );
        } catch (err) {
          if (err.code === "23505" && err.constraint === "users_cpf_key") {
            throw new Error(`O CPF ${membro.cpf} já está cadastrado.`);
          }
          throw err;
        }

        await client.query(
          `INSERT INTO team_members (user_id, team_id, role_in_team)
           VALUES ($1, $2, 'participante')`,
          [membroId, teamId]
        );
      }
    }

    await client.query("COMMIT");
    res.json({ success: true, invite_code: teamData.invite_code });
  } catch (err) {
    await client.query("ROLLBACK");
    console.error("❌ Erro no cadastro de equipe:", err);

    let userMessage = "Erro interno no servidor.";
    if (err.code === "23505") {
      if (err.constraint === "users_email_key") {
        userMessage = "Este e-mail já está em uso.";
      } else if (err.constraint === "users_cpf_key") {
        userMessage = "Este CPF já foi cadastrado.";
      }
    } else if (err.message.includes("já está cadastrado")) {
      userMessage = err.message;
    }

    res.status(500).json({ success: false, error: userMessage });
  } finally {
    client.release();
  }
});

export default router;
