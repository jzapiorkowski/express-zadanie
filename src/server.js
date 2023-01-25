import { MongoClient } from "mongodb";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import productsRouter from "./Routes/products.route.js";

dotenv.config();
const dbPath = process.env.MONGO_URI;

const port = process.env.PORT || 3001;
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(productsRouter);

const client = new MongoClient(dbPath, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

let db;

app.listen(port, async () => {
  try {
    await client.connect();
    db = client.db("products-list");

    console.log(`Server is running on port: ${port}`);
  } catch (error) {
    console.log(error);
  }
});

export const getDb = () => {
  return db;
};
