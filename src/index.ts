import express from 'express';
import 'dotenv/config';
import connectDb from './config/database.config';
import routes from './routes';
import errorHandler from './middlewares/error.middleware';
import notFound from './middlewares/notFound.middleware';

const app = express();
const PORT = process.env.PORT || 5000

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/v1', routes);

app.use(notFound)

app.use(errorHandler);

app.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}`);
  await connectDb();
});
