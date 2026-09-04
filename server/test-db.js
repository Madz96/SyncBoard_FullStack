import mongoose from 'mongoose';
mongoose.connect('mongodb+srv://<username>:<password>@<cluster>/<database>?retryWrites=true&w=majority').then(() => {
  console.log('Connected!');
  process.exit(0);
}).catch(err => {
  console.error(err);
  process.exit(1);
});
