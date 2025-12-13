import express from "express";
import db from "../config/db.js";

const router = express.Router();


router.get("/", async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM menu ORDER BY id ASC");
    res.json({ success: true, menu: result.rows });
  } catch (err) {
    console.error("Menu fetch error:", err);
    res.json({ success: false, error: "Could not fetch menu" });
  }
});

export default router;
