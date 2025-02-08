import express from 'express';
import { PORT } from './config/env.js';
const app = express();

app.get('/', (req, res) => {
  res.send('<p>Welcome to the <b>RecuroAPI</b> - Effortless management of recurring subscriptions and payments.</p><br><p>This is an API service.</p>');
});

app.listen(PORT, () => {
console.log(`Server is running on http://localhost:${PORT}`);
});