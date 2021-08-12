import express from 'express';

import { calculateBmi } from './bmiCalculator.ts';

const app = express();
const PORT = 3001;

app.use('/hello', (_req, res) => res.send('Hello Full Stack!'));
app.use('/bmi', (req, res) => {
  const { height, weight } = req.query;

  const outHeight = Number(height),
    outWeight = Number(weight);

  if (isNaN(outHeight) || isNaN(outWeight)) {
    return res.status(404).json({ error: 'malformatted parameters' });
  }
  return res.json({
    height: outHeight,
    weight: outWeight,
    bmi: calculateBmi(outHeight, outWeight)
  });
});
app.listen(PORT, () => console.log(`server running on ${PORT}`));
