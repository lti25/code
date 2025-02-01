# 26.3.1 ✅ A simple JavaScript program that uses arrow functions and iterators

# index.js

```jsx
//todo: Create getRandom number function 
//define getRandomNumber = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min to generate random numbers.
//todo: Create Random Number Array Function
//todo: Create function calculate Sum of array values named calculateSum
//todo: Create function which calculate Average from array values named calculateAverage
//todo: Create a function to Print Array named printArrayElements

const getRandomNumber = (min, max) => Math.floor(Math.random() * (max - min +1)  + min);

const createRandomNumbersArray = () =>{
  const randomNumbersArray = Array.from( {length: 10},  () => getRandomNumber(1, 100) );
  console.log("Generated Array:", randomNumbersArray);
  return randomNumbersArray;
};

const calculateSum = (array) => {
  const sum = array.reduce((acc, num) => acc + num, 0 );
  console.log("Sum:", sum);
  return sum;
};

const calculateAverage = (array) => {
  const sum = calculateSum(array);

  const average = array.length === 0 ? 0 : sum/array.length;
  console.log("Average:", average);
  return average;
}

const printArrayElements = (array) =>{
  console.log("Generated Array:", array);
  console.log("Printing Elements using Iterator:");
  array.forEach((num, index) => {
    console.log(`Element ${index + 1}: ${num}`);
  });
};

createRandomNumbersArray();

// Exporting all necessary modules
module.exports = {
    getRandomNumber,
    calculateSum,
    calculateAverage,
    printArrayElements,
    createRandomNumbersArray
  };
```