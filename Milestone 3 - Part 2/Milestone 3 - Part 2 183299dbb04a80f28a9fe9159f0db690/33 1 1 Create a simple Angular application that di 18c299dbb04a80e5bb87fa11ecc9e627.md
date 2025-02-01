# 33.1.1 Create a simple Angular application that displays an array of integers

Status: Not started

```tsx
============================D33_S1_A1_Create a simple Angular application that displays an array of integers================================================
//app ts file
import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent{
  integerArray: number[] =[10,20,30,40,50];
}
------------------------------------------------------------------------------------------------------------------------------------------------------------
//app html
<h2>Integer Array:</h2>
<!-- <div *ngFor="let ia of integerArray">
<ul>{{ia}}</ul>
</div> -->

<ul>
<li *ngFor="let number of integerArray">{{ number }}</li>
</ul>
-----------------------------------------------------------------------------------------------------------------------------------------------------------
//app scss file 

ul {
    list-style-type: none;
    padding: 0;
  }
  li {
    background-color: #f0f0f0;
    padding: 10px;
    margin: 5px;
    border-radius: 5px;
  }

has context menu
```