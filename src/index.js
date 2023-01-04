import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

mongoose.set('strictQuery', false);
mongoose
  .connect('mongodb://127.0.0.1:27017/express-zadanie')
  .then(() => console.log('Connected with MongoDB'));

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
