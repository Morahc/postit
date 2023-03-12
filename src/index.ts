import express from 'express';
import 'dotenv/config';
import connectDb from './config/database.config';
import routes from './routes';
import errorHandler from './middlewares/error.middleware';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/v1', routes);

app.use(errorHandler);

app.listen(process.env.PORT || 5000, async () => {
  console.log('Server is running...');
  await connectDb();
});
