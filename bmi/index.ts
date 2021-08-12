import express from 'express';

import { calculateBmi } from './bmiCalculator.ts';
import { Result, calculateExercises } from './exerciseCalculator';

const app = express();
const PORT = 3001;

app.use(express.json());

app.get('/hello', (_req, res) => res.send('Hello Full Stack!'));

app.get('/bmi', (req, res) => {
  const { height, weight } = req.query;

  const outHeight = Number(height),
    outWeight = Number(weight);

  if (isNaN(outHeight) || isNaN(outWeight)) {
    return res.status(404).json({ error: 'parameters missing' });
  }
  return res.json({
    height: outHeight,
    weight: outWeight,
    bmi: calculateBmi(outHeight, outWeight)
  });
});

app.post('/exercises', (req, res) => {
  // : { daily_exercises: number[]; target: number }
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { daily_exercises, target } = req.body;
  if (!(daily_exercises && target)) {
    return res.status(400).json({ error: 'missing data' });
  }

  let result: Result | { error: string };
  let status;
  try {
    result = calculateExercises(daily_exercises, Number(target));
    status = 200;
  } catch (err) {
    result = { error: 'malformatted parameters' };
    status = 400;
  }
  return res.status(status).json(result);
});
app.listen(PORT, () => console.log(`server running on ${PORT}`));
