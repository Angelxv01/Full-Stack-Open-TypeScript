interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: String;
  target: number;
  average: number;
}

const calculateExercises = (exercise: number[], target: number): Result => {
  const periodLength = exercise.length;
  const trainingDays = exercise.reduce((acc, obj) => {
    obj > 0 && acc++;
    return acc;
  }, 0);
  const average = exercise.reduce((acc, obj) => (acc += obj), 0) / periodLength;
  const ratingArg = average / target;

  let rating: number = 0;
  if (ratingArg > 1) rating = 3;
  if (ratingArg < 1) rating = 2;
  if (ratingArg < 0.5) rating = 1;

  let ratingDescription: string;
  switch (rating) {
    case 1:
      ratingDescription = 'Next time you can do better';
      break;
    case 2:
      ratingDescription = 'You did a great job, it is time to break the target';
      break;
    case 3:
      ratingDescription = 'You get to the next level, keep up!';
      break;
    default:
      ratingDescription = 'Did you really got this? It is strange';
  }
  return {
    periodLength,
    trainingDays,
    success: average >= target,
    rating,
    ratingDescription,
    target,
    average
  };
};

const processInput = () => {
  let [inTarget, ...inExercise] = process.argv.slice(2);
  const target = Number(inTarget);
  const exercise = inExercise.map((obj) => Number(obj));
  if (isNaN(target) || exercise.some((obj) => isNaN(obj))) {
    console.log('Your input is bugged');
    return;
  }
  console.log(calculateExercises(exercise, target));
};

processInput();
