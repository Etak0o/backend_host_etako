import pkg from "pg";
const { Pool } = pkg;

const pool = new Pool({
  connectionString: "postgresql://nichole:WkGnn3DwI4sfwNPO6muAaxZuHbK43jsX@dpg-d4rc26umcj7s73cpqs1g-a.virginia-postgres.render.com/exam_db_gipz",
  ssl: { require: true, rejectUnauthorized: false },
});

pool.on("connect", () => console.log("Connected to Postgres Database"));

export default pool;

