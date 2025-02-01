# 26.1.2 Create a class in JavaScript that represents an Employee

# **26.1.2 ✅ Create a class in JavaScript that represents an Employee**

```jsx

class Employee{

  constructor(empId, empName, empSalary){
    this.empId = empId;
    this.empName = empName;
    this.empSalary = empSalary;
  }

  displayDetails(){
    console.log(`Employee Details:
        empId: ${this.empId}
        empName: ${this.empName}
        empSalary: ${this.empSalary};
    `);
  }

}

module.exports = Employee;
```