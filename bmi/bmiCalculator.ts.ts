const calculateBmi = (height: string, weight: string): String => {
  const bmi = Number(weight) / (Number(height) / 100) ** 2
  // console.log(bmi)
  if (bmi < 16) return 'Underweight (Severe thinness)'
  if (bmi < 16.9) return 'Underweight (Moderate thinness)'
  if (bmi < 18.4) return 'Underweight (Mild thinness)'
  if (bmi < 24.9) return 'Normal range'
  if (bmi < 29.9) return 'Overweight (Pre-obese)'
  if (bmi < 34.9) return 'Obese (Class II)'
  if (bmi < 39.9) return 'Obese (Class II)'
  return 'Obese (Class III)'
}

const [height, weight] = process.argv.slice(2, 4)
console.log(calculateBmi(height, weight))
