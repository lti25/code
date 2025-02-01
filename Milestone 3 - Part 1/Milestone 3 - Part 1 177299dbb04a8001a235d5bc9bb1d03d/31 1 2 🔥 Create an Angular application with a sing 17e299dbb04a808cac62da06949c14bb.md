# 31.1.2 🔥 Create an Angular application with a single component and model class

# employee-model.ts

```tsx
// employee-model.ts
export class EmployeeModel{
    empId : number = 1;
    empName : string = "1";
    empSalary : number = 123;
}
```

# app.component.html

```tsx
<nav class="navbar">
  <ul>
    <li><a href="/employee">Employee</a></li>
    <!-- <li><a href="proxy/3000/employee">Employee</a></li> -->
  </ul>
</nav>
<div style="margin-top: 100px;">
  <router-outlet></router-outlet> 
</div>

```

# employee

## employee.component.ts

```tsx
import { Component, OnInit } from '@angular/core';
import { EmployeeModel } from '../employee-model';
 
@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.scss'
})
export class EmployeeComponent implements OnInit {
  employee:any;
 
  ngOnInit():void{
    this.employee=new EmployeeModel();
    this.employee.empId=1;
    this.employee.empName='John Doe';
    this.employee.empSalary=50000;
  }
 
}
```

## employee.component.html

```tsx
<div>
      <h3>Welcome! The employee component has been generated successfully.</h3>
</div>
 
```