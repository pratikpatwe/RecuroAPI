import express from 'express';
import { PORT } from './config/env.js';
import connectToDatabase from './database/mongodb.js';

import authRouter from './routes/auth.routes.js';
import userRouter from './routes/users.routes.js';
import subRouter from './routes/subscription.routes.js';

const app = express();

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/subscriptions', subRouter);

app.get('/', (req, res) => {
  res.send('<p>Welcome to the <b>RecuroAPI</b> - Effortless management of recurring subscriptions and payments.</p><br><p>This is an API service.</p>');
});

app.listen(PORT, async () => {
console.log(`Server is running on http://localhost:${PORT}`);

await connectToDatabase();
});