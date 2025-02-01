# 32.3.2 ✨ (O/p working) (DIRECTIVES - For Loop) Create an Angular application that displays a list of employees

Status: Not started

# employee.component.ts

```tsx
import { Component } from '@angular/core';
import { Employee } from '../model/employee.model';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.scss'
})
export class EmployeeComponent {
//import employee model and declare array of employees
  employees : Employee[] = [
    new Employee(1, 'John Doe', '1000'),
    new Employee(2, 'Jane Smith', '20000'),
    new Employee(3, 'Bob Johnson', '500000'),
  ]
}
```

# employee.component.html

```tsx

<table *ngIf="employees.length > 0; else elseBlock" >
    <tr>
        <th>ID</th>
        <th>Name</th>
        <th>Salary</th>
    </tr>

    <tr *ngFor="let emp of employees">
        <td>{{ emp.empId }}</td>
        <td>{{ emp.empName | uppercase }}</td>
        <td>{{ emp.empSalary | number: '1.2-2' }}</td>
    </tr>
</table>

<ng-template #elseBlock>
    No data Available
</ng-template>
```

# app.component.html  (change the link)

```tsx
<nav>
  <ul>
    <!-- <li><a routerLink="/employee">Employee</a></li> -->
    <li><a routerLink="/proxy/3000/employee">Employee</a></li>

  </ul>
</nav>
<div style="margin-top: 100px;">
  <router-outlet></router-outlet> 
</div>
```

# [https://ec2-3-110-97-74.projects.wecreateproblems.com/proxy/3000](https://ec2-3-110-97-74.projects.wecreateproblems.com/proxy/3000)