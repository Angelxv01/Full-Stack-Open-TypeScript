import express from 'express';

const app = express();
const PORT = 4000;

app.use(express.json());

app.get('/ping', (_req, res) => {
  res.send('pong');
});

app.listen(PORT, () => console.log(`app listening on port ${PORT}`));
