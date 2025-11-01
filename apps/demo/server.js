import express from "express";
import dotenv from "dotenv";
import mysql from "mysql2/promise";

dotenv.config();
const app = express();
const port = process.env.PORT || 8080;

app.get("/health", (_req, res) => res.json({ ok: true }));

app.get("/", async (_req, res) => {
  // Connexion MySQL facultative pendant l’apprentissage
  // Renseigne ces variables plus tard ou commente ce bloc
  const { DB_HOST, DB_USER, DB_PASSWORD, DB_NAME } = process.env;
  let dbStatus = "skipped";
  try {
    if (DB_HOST && DB_USER) {
      const conn = await mysql.createConnection({
        host: DB_HOST, user: DB_USER, password: DB_PASSWORD, database: DB_NAME
      });
      const [rows] = await conn.query("SELECT NOW() AS now");
      dbStatus = `ok (${rows[0].now})`;
      await conn.end();
    }
  } catch (e) {
    dbStatus = `error: ${e.message}`;
  }
  res.send(`Hello from Node! DB: ${dbStatus}`);
});

app.listen(port, () => console.log(`Listening on :${port}`));
