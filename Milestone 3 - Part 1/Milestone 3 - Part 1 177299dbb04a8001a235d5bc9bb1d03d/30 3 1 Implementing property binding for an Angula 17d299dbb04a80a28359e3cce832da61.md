# 30.3.1 Implementing property binding for an Angular application

[Dhruv Code ](30%203%201%20Implementing%20property%20binding%20for%20an%20Angula%2017d299dbb04a80a28359e3cce832da61/Dhruv%20Code%20183299dbb04a80a59871ffb554b78140.md)

**30.3.1 Implementing property binding for an Angular application**

# My Code :

# employee.component.ts

```tsx
import { Component } from '@angular/core';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.scss'
})
export class EmployeeComponent {
  //declare employee model here 
  employee = {
    empId: '',
    empName: '',
    empSalary: ''
  }
}
```

# employee.component.html

```tsx
<div>
    <label for="empld">Employee ID:</label>
    <input type="text" id="empld" placeholder="Employee ID" [(ngModel)]="employee.empId">
</div>
<div>
    <label for="empName">Employee Name:</label>
    <input type="text" id="empName" placeholder="Employee Name" [(ngModel)]="employee.empName">
</div>
<div>
    <label for="empSalary">Employee Salary:</label>
    <input type="text" id="empSalary" placeholder="Employee Salary" [(ngModel)]="employee.empSalary">
</div>
```

# employee.component.scss

```tsx
div {
    margin-bottom: 10px;
  }
  
  label {
    display: block;
    font-weight: bold;
    margin-bottom: 5px;
  }
  
  input[type="text"] {
    width: 100%;
    padding: 8px;
    box-sizing: border-box;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  
  input[type="text"]:focus {
    border-color: #66afe9;
    outline: none;
  }
  
```