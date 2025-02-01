# 33.2.1 Pipes concept implementation on Date and Currency data.

Status: Not started

[✅ 12/12 Ganesh Soln.](33%202%201%20Pipes%20concept%20implementation%20on%20Date%20and%20Cu%20183299dbb04a803ea79fc68c702b1326/%E2%9C%85%2012%2012%20Ganesh%20Soln%20183299dbb04a80599e65e0acd471c02f.md)

## My Code :

# Files:

[currency-format.pipe.ts](33%202%201%20Pipes%20concept%20implementation%20on%20Date%20and%20Cu%20183299dbb04a803ea79fc68c702b1326/currency-format.pipe.ts)

[date-format.pipe.ts](33%202%201%20Pipes%20concept%20implementation%20on%20Date%20and%20Cu%20183299dbb04a803ea79fc68c702b1326/date-format.pipe.ts)

[app.component.html](33%202%201%20Pipes%20concept%20implementation%20on%20Date%20and%20Cu%20183299dbb04a803ea79fc68c702b1326/app.component.html)

[user-list.component.html](33%202%201%20Pipes%20concept%20implementation%20on%20Date%20and%20Cu%20183299dbb04a803ea79fc68c702b1326/user-list.component.html)

[user-list.component.ts](33%202%201%20Pipes%20concept%20implementation%20on%20Date%20and%20Cu%20183299dbb04a803ea79fc68c702b1326/user-list.component.ts)

# pipes

## currency-format.pipe.ts

```tsx
import { getNumberOfCurrencyDigits } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'currencyFormat'
})

// export class CurrencyFormatPipe //doto: complete missing code..
//doto: complete missing code..
export class CurrencyFormatPipe implements PipeTransform{

  transform(value: any, symbol: string = "$" ) : any {

    if(isNaN(value) || value == null || value === undefined )
      return 'Invalid amount';

    // convert the value to a number
    let numberValue = Number(value);

    // Format the number with commas as thousand separator
    let formattedValue = numberValue.toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  
    return `${symbol}${formattedValue}`;
  }

}
```

## date-format.pipe.ts

```tsx
import { Pipe, PipeTransform } from '@angular/core';
import { format, parseISO } from 'date-fns'; // Using date-fns for formatting

@Pipe({
  name: 'dateFormat'
})

// export class DateFormatPipe //doto: complete missing code..

//doto: complete missing code..
export class DateFormatPipe implements PipeTransform{

  transform(value: any, dateFormat: string = 'MMMM dd, yyyy' ) : any {
    if(!value){
      return "Invalid date";
    }
    if(value === null){
      return "Invalid date";
    }

      const date = new Date(value);
      if(isNaN(date.getTime()))
        return "Invalid date format";

      const day = date.getDate();
      const month = date.toLocaleString('en-IN', {month: 'long'});
      const year = date.getFullYear();

      // return `${month} ${day}, ${year}`;
      return format(date, dateFormat);

  }
}
```

# user-list

## user-list.component.ts

```tsx
import { Component } from '@angular/core';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent {
 //doto: complete missing code..
  users: any[];

 constructor(){
  this.users = [  
    {name: 'John Doe', registrationDate: '2023-01-25', balance: 1234.56},
    
    {name: 'Jane Smith', registrationDate: '2022-11-15', balance: 9876.54},
    
    {name: 'Sam Johnson', registrationDate: '2023-07-03', balance: 250.00}
    
  ];
}
}

```

## user-list.component.html

```html
<!-- //doto: complete missing code.. -->
<!-- <h1>User List</h1> -->
<div *ngIf = "users.length > 0" >
    <table>
        <tr>
            <th>Name</th>
            <th>Registration Date</th>
            <th>Account Balance</th>
        </tr>
            
        <tr *ngFor = "let user of users" >
            <td>{{ user.name }}</td>
            <td>{{ user.registrationDate | dateFormat: 'MMMM dd, yyyy' }}</td>
            <!-- <td>{{ user.balance | currencyFormat }}</td> -->
            <td>{{ user.balance | currencyFormat: '$' }}</td>
        </tr>
    </table>
</div>
```

# app-component.html

```html
<!-- //doto: complete missing code.. -->

<app-user-list></app-user-list>
<router-outlet></router-outlet>
```