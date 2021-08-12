import express from 'express';

const app = express();
const PORT = 3001;

app.use('/hello', (_req, res) => res.send('Hello Full Stack!'));

app.listen(PORT, () => console.log(`server running on ${PORT}`));
