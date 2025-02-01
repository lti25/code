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
