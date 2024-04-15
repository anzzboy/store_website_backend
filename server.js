import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import lists from "./routes/lists.js";

const app = express();
const PORT = process.env.PORT || 5050;

app.use(cors());
app.use(express.json());
app.use("/lists", lists);

app.listen((PORT) => {
  console.log("Up on " + PORT);
});
