# 26.1.1 (✅) Performing operation on array of Employee Salary

Revise

26.1.1 (cpy) **Performing operation on array of Employee Salary**

```jsx
// employeeSalaries.js

// Function to generate a random salary between a given range
const generateRandomSalary = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

// Generate an array of 10 random employee salaries between 30000 and 100000
const generateSalaries = () => Array.from({ length: 10 }, () => generateRandomSalary(30000, 100000));

// Calculate tax (10% flat rate) for each salary using an arrow function
const calculateTax = salary => salary * 0.1;

// Print salaries and their corresponding tax deductions using an iterator
const printSalariesAndTaxes = salaries => {
  salaries.forEach(salary => {
    const tax = calculateTax(salary);
    console.log(`Salary: ₹${salary}, Tax Deducted: ₹${tax}`);
  });
};

// Main function to execute the operations
const main = () => {
  const salaries = generateSalaries();
  printSalariesAndTaxes(salaries);
};

// Execute the main function
main();

module.exports = { generateSalaries, calculateTax, printSalariesAndTaxes };

```