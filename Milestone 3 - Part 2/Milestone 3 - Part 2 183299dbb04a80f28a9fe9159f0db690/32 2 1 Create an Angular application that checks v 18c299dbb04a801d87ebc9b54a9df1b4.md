# 32.2.1 Create an Angular application that checks voting eligibility

Status: Not started

**D32_S2_A1_Create an Angular application that checks voting eligibility**

## vote.comp.ts

```tsx
import { Component } from '@angular/core';

@Component({
  selector: 'app-vote',
  templateUrl: './vote.component.html',
  styleUrl: './vote.component.scss'
})
export class VoteComponent {
  userAge:any;
  eligibilityMessage: any;

  checkEligibility() {
    this.eligibilityMessage =
      this.userAge >= 18 ? 'Eligible to vote' : 'Not eligible to vote';
  }
}

```

## vote.comp.html

```tsx
<div>
    <label for="age">Enter your age:</label>
    <input type="number" id="age" [(ngModel)]="userAge">
    <button (click)="checkEligibility()">Check Eligibility</button>
</div>

<p>{{ eligibilityMessage }}</p>

```

## employee.comp.ts

```tsx
import { Component } from '@angular/core';

class Employee {
  constructor(public id: number, public name: string, public position: string) {}
}

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent {
  employees: Employee[] = [
    new Employee(1, 'John Doe', 'Software Developer'),
    new Employee(2, 'Jane Smith', 'Product Manager'),
    new Employee(3, 'Bob Johnson', 'QA Engineer')
  ];
}

```

## .html

```tsx
<table>
    <thead>
      <tr>
        <th>ID</th>
        <th>Name</th>
        <th>Position</th>
      </tr>
    </thead>
    <tbody>
      <tr *ngFor="let employee of employees">
        <td>{{ employee.id }}</td>
        <td>{{ employee.name }}</td>
        <td>{{ employee.position }}</td>
      </tr>
    </tbody>
</table>
  
```

## dfk

```tsx

```

## dkf

```tsx

```