import express from 'express';
import cors from 'cors';

import diagnoseRouter from './routes/diagnoses';

const app = express();
const PORT = 3001;

app.use(express.json(), cors());

app.use('/api/diagnoses', diagnoseRouter);
app.get('/api/ping', (_req, res) => {
  return res.send('pong');
});

app.get('*', (_req, res) => {
  console.error('There route does not exist');
  return res.status(404).send('There route does not exist');
});

app.listen(PORT, () => console.log(`app listening on port ${PORT}`));
