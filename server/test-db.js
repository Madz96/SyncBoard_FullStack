import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

if (!process.env.MONGO_URI) {
  console.error('MONGO_URI is not configured');
  process.exit(1);
}

mongoose.connect(process.env.MONGO_URI).then(() => {
  console.log('Connected!');
  process.exit(0);
}).catch(err => {
  console.error(err);
  process.exit(1);
});
