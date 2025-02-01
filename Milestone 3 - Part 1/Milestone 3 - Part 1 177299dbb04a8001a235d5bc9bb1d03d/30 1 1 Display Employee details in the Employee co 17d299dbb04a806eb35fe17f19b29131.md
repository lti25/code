# 30.1.1 Display Employee details in the Employee components template

**D30_S1_A1_Display Employee details in the Employee components template**

# app.component.ts

```tsx
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  employee = {
    name: 'John Doe',
    position: 'Software Developer',
    department: 'Engineering',
    salary: 75000
  }

}
```

# app.component.html

```tsx
<div>
    <h2>Employee Details</h2>
    <table>
        <tr>
            <th>Name</th>
            <th>Position</th>
            <th>department</th>
            <th>salary</th>
        </tr>
        <tr>
            <td>{{employee.name}}</td>
            <td>{{employee.position}}</td>
            <td>{{employee.department}}</td>
            <td>{{employee.salary}}</td>
        </tr>
    </table>

</div>
```

# app.component.scss

```css
table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;
}

th, td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: left;
}

th {
    background-color: #f2f2f2;
}

```