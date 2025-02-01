# 28.2.2 (cpy) (✨TYPESCRIPT) Calculate Employee Salaries

28.2.2 (cpy) Calculate Employee Salaries

# index.ts

```jsx

// Array of employee names
let employeeNames: string[] = ["Alice", "Bob", "Charlie", "David", "Eve"];

// Array of employee salaries
let employeeSalaries: number[] = [50000, 60000, 55000, 70000, 65000];

// Function to display names and salaries
function displayEmployees(names: string[], salaries: number[]): void {
    console.log("Employee Details:");
    for (let i = 0; i < names.length; i++) {
        console.log(`Name: ${names[i]}, Salary: ${salaries[i]}`);
    }
}

// Function to calculate the average salary
function findAvgSalary(salaries: number[]): number {
    if (salaries.length === 0) {
        return NaN; // Return NaN for an empty array
    }
    let total: number = 0;
    for (let i = 0; i < salaries.length; i++) {
        total += salaries[i];
    }
    return total / salaries.length;
}

// Display employee details
displayEmployees(employeeNames, employeeSalaries);

// Calculate and display the average salary
let averageSalary: number = findAvgSalary(employeeSalaries);
console.log(`The average salary is: ${averageSalary}`);

```