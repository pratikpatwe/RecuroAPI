import express from 'express';
import { PORT } from './config/env.js';
import connectToDatabase from './database/mongodb.js';
import errorMiddleware from './middlewares/error.middleware.js';
import arcjetMiddleware from './middlewares/arcjet.middleware.js';

import authRouter from './routes/auth.routes.js';
import userRouter from './routes/users.routes.js';
import subRouter from './routes/subscription.routes.js';
import cookieParser from 'cookie-parser';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(arcjetMiddleware);

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/subscriptions', subRouter);

app.use(errorMiddleware);

app.get('/', (req, res) => {
  res.send('<p>Welcome to the <b>RecuroAPI</b> - Effortless management of recurring subscriptions and payments.</p><br><p>This is an API service.</p>');
});

app.listen(PORT, async () => {
  console.log(`Server is running on http://localhost:${PORT}`);

  await connectToDatabase();
});