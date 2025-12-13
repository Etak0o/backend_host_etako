import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.js";
import menuRoutes from "./routes/menu.js";
import orderRoutes from "./routes/order.js";

const app = express();
app.use(express.json());
app.use(cors());


app.use("/auth", authRoutes);
app.use("/menu", menuRoutes);
app.use("/order", orderRoutes);

app.get("/", (req, res) => {
  res.send("Backend is running!");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
