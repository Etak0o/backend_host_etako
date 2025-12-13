import express from "express";
import db from "../config/db.js";

const router = express.Router();

// register
router.post("/register", async (req, res) => {
  const { name, email, password, roomnumber } = req.body;

  try {

    console.log("Request body:", req.body);


    const exists = await db.query(
      "SELECT * FROM users WHERE email=$1",
      [email]
    );

    if (exists.rows.length > 0) {
      return res.json({ success: false, error: "Email already exists" });
    }

    await db.query(
      "INSERT INTO users(name, email, password, roomnumber) VALUES($1,$2,$3,$4)",
      [name, email, password, roomnumber]
    );

    res.json({ success: true });
  } catch (err) {
    console.error("register error:", err);
    res.json({ success: false });
  }
});

//login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const result = await db.query(
      "SELECT * FROM users WHERE email=$1 AND password=$2",
      [email, password]
    );

    if (result.rows.length === 0) {
      return res.json({ success: false, error: "Invalid credentials" });
    }

    res.json({ success: true, user: result.rows[0] });
  } catch (err) {
    res.json({ success: false });
  }
});

export default router;
