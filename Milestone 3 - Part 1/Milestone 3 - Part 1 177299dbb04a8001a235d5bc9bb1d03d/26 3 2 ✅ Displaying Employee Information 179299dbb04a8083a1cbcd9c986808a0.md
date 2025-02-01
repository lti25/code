# 26.3.2 ✅ Displaying Employee Information

**D26_S3_A2_Displaying Employee Information**

# revise

```jsx
// employee.js

// Method to display employee details  --function displayDetails
  
// Example usage
class Employee {
    constructor(employeeId, employeeName, designation, salary) {
        this.employeeId = employeeId;
        this.employeeName = employeeName;
        this.designation = designation; // No default assignment
        this.salary = salary;
    }

    displayDetails() {
        console.log(`Employee ID: ${this.employeeId}`);
        console.log(`Employee Name: ${this.employeeName}`);
        console.log(`Designation: ${this.designation}`);
        console.log(`Salary: $${this.salary}`);
    }
}

// Example usage:
const employee1 = new Employee(1, "John Doe", "Software Engineer", 75000);
employee1.displayDetails();

module.exports = Employee;
```