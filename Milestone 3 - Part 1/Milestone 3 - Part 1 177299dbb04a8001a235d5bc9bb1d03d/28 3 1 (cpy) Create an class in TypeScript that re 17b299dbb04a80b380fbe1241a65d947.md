# 28.3.1 (cpy) Create an class in TypeScript that represents an Employee

28.3.1 (cpy) **Create an class in TypeScript that represents an Employee**

```jsx
class Employee {
    private empId: number;
    private empName: string;
    private empSalary: number;

    constructor(empId: number, empName: string, empSalary: number) {
        this.empId = empId;
        this.empName = empName;
        this.empSalary = empSalary;
    }

    public displayDetails(): void {
        console.log(`Employee Details:\nEmployee ID: ${this.empId}\nEmployee Name: ${this.empName}\nEmployee Salary: ${this.empSalary}`);
    }
}

// Example usage:
let employee = new Employee(1, "John Doe", 50000);
employee.displayDetails();

export {Employee};

```