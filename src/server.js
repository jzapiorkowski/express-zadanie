import mongoose from 'mongoose';

export function db() {
  mongoose.set('strictQuery', false);
  mongoose
    .connect('mongodb://127.0.0.1:27017/express-zadanie')
    .then(() => console.log('Connected with MongoDB'));
}
