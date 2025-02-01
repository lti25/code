# 31.1.1 (cw)⭐ Implement filter operation using Query Parameter on E-Commerce Product

# filter.component.ts

```tsx
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent  {
  //todo: complete missing code..
  //Also call filter component here

  category = '';
  minPrice: any = 0;
  maxPrice: any = 1000;

  constructor(private router: Router) {}

  updateFilters(param: string, value: string) {
    const queryParams = { [param]: value };
    this.router.navigate([], {
      queryParams: queryParams,
      queryParamsHandling: 'merge'
    });
  }

}

```

# .html

```tsx
<!-- //todo: complete missing code.. -->

<div>
    <label>Category:
      <select [(ngModel)]="category" (change)="updateFilters()">
        <option value="">All</option>
        <option value="Electronics">Electronics</option>
        <option value="Clothing">Clothing</option>
        <option value="Furniture">Furniture</option>
      </select>
    </label>
  
    <label>Min Price:
      <input type="number" [(ngModel)]="minPrice" (change)="updateFilters()" />
    </label>
  
    <label>Max Price:
      <input type="number" [(ngModel)]="maxPrice" (change)="updateFilters()" />
    </label>
  </div>
  
```

# list.component.ts

```tsx
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Item } from '../Item';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  //todo: complete missing code..
 
  items: Item[] = [
    { name: 'Item 1', category: 'Electronics', price: 100 },
    { name: 'Item 2', category: 'Clothing', price: 50 },
    { name: 'Item 3', category: 'Electronics', price: 300 },
    { name: 'Item 4', category: 'Furniture', price: 200 },
    { name: 'Item 5', category: 'Clothing', price: 80 },
  ];

  filteredItems: Item[] = [];
  category: string = '';
  minPrice: number = 0;
  maxPrice: number = Infinity;  

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.category = params['category'] || '';
      this.minPrice = params['minPrice'] || 0;
      this.maxPrice = params['maxPrice'] || Infinity;
      this.filterItems();
    });
  }

  // filterItems(category: string, minPrice: number, maxPrice: number) {
  filterItems() {
    if(this.category === 'All') {
      this.filteredItems = this.items.filter(item => 
        item.price >= this.minPrice && item.price <= this.maxPrice
      );
    } else {
      this.filteredItems = this.items.filter( (item: Item) => 
        (!this.category || item.category === this.category ) &&
        item.price >= this.minPrice && item.price <= this.maxPrice)       
    }
    
  }
}

```

# list.component.html

```tsx
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Item } from '../Item';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  //todo: complete missing code..
 
  items: Item[] = [
    { name: 'Item 1', category: 'Electronics', price: 100 },
    { name: 'Item 2', category: 'Clothing', price: 50 },
    { name: 'Item 3', category: 'Electronics', price: 300 },
    { name: 'Item 4', category: 'Furniture', price: 200 },
    { name: 'Item 5', category: 'Clothing', price: 80 },
  ];

  filteredItems: Item[] = [];
  category: string = '';
  minPrice: number = 0;
  maxPrice: number = Infinity;  

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.category = params['category'] || '';
      this.minPrice = params['minPrice'] || 0;
      this.maxPrice = params['maxPrice'] || Infinity;
      this.filterItems();
    });
  }

  // filterItems(category: string, minPrice: number, maxPrice: number) {
  filterItems() {
    if(this.category === 'All') {
      this.filteredItems = this.items.filter(item => 
        item.price >= this.minPrice && item.price <= this.maxPrice
      );
    } else {
      this.filteredItems = this.items.filter( (item: Item) => 
        (!this.category || item.category === this.category ) &&
        item.price >= this.minPrice && item.price <= this.maxPrice)       
    }
    
  }
}

```

# app-routing.module.ts

```tsx
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from './list/list.component';

const routes: Routes = [
//todo: complete missing code..

{ path:'', redirectTo:'/list', pathMatch:'full' },
{ path:'list', component: ListComponent },
{ path:'**', redirectTo: '/list' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
```

# app.component.html

```tsx
<!-- //todo: complete missing code.. -->

<!-- <router-outlet></router-outlet> -->

<app-filter></app-filter>
<app-list></app-list>
```