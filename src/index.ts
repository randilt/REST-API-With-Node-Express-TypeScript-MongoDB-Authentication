import express from "express";
import http from "http";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compression from "compression";
import cors from "cors";
import dotenv from "dotenv";
import router from "./router";
import mongoose from "mongoose";

const app = express();
dotenv.config();
app.use(
  cors({
    credentials: true,
  })
);

app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());

const server = http.createServer(app);

const PORT = 8080;

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}/ `);
});

const MONGO_URL = process.env.MONGO_URL; // DB URI

mongoose.Promise = Promise;
mongoose.connect(MONGO_URL); // Connecting with the mongoDB database
mongoose.connection.on("connected", () => {
  console.log("MongoDB connected successfully");
});
mongoose.connection.on("error", (error) => {
  console.error("MongoDB connection error: " + error);
});

app.use("/", router());
