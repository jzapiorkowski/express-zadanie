import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { db } from './server.js';

db();

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
