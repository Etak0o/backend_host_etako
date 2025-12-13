import express from "express";
import db from "../config/db.js";

const router = express.Router();


router.get("/", async (req, res) => {
  try {
    const result = await db.query(
      `SELECT o.id, o.user_id, o.menu_id, m.name AS menu_name, o.quantity, o.order_time
       FROM orders o
       JOIN menu m ON o.menu_id = m.id
       ORDER BY o.order_time DESC`
    );
    res.json({ success: true, orders: result.rows });
  } catch (err) {
    console.error("Orders fetch error:", err);
    res.json({ success: false, error: "Could not fetch orders" });
  }
});


router.post("/", async (req, res) => {
  const { user_id, menu_id, quantity } = req.body;

  if (!user_id || !menu_id || !quantity) {
    return res.json({ success: false, error: "Missing order data" });
  }

  try {
    await db.query(
      "INSERT INTO orders(user_id, menu_id, quantity) VALUES($1, $2, $3)",
      [user_id, menu_id, quantity]
    );
    res.json({ success: true, message: "Order placed!" });
  } catch (err) {
    console.error("Order placement error:", err);
    res.json({ success: false, error: "Could not place order" });
  }
});

export default router;
