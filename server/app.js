import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import postsRouter from "./router/postRouter.js";
import authRouter from "./router/authRouter.js";

import * as dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

app.use("/posts", postsRouter);
app.use("/auth", authRouter);

async function startApp() {
  try {
    await mongoose.connect(process.env.DB_URL, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    app.listen(process.env.PORT, () => {
      console.log("Server started");
    });
  } catch (e) {
    console.log(e);
  }
}

startApp();

app.use((req, res) => {
  console.log("ERROR");
  res.status(404).send();
});
