# 33.1.2 ⭐⭐⭐⭐ .. not submitted (abdullah soln)

Status: Not started

```tsx
__________________________________________________________________Pagination.ts_______________________________________
 
 
 
import { Component, EventEmitter, Input, Output } from '@angular/core';@Component({

  selector: 'app-pagination',

  templateUrl: './pagination.component.html',

  styleUrls: ['./pagination.component.scss']

})

export class PaginationComponent {

  @Input() currentPage: number = 1;

  @Input() pageSize: number = 10;

  @Input() totalItems: number = 0;

  @Output() pageChanged = new EventEmitter<number>();
 
  get totalPages(): number {

    return Math.ceil(this.totalItems / this.pageSize);

  }
 
  nextPage() {

    if (this.currentPage < this.totalPages) {

      this.currentPage++;

      this.pageChanged.emit(this.currentPage);

    }

  }
 
  previousPage() {

    if (this.currentPage > 1) {

      this.currentPage--;

      this.pageChanged.emit(this.currentPage);

    }

  }
 
  onPageChange(page: number) {

    this.pageChanged.emit(page);

  }

}
 
 
__________________________________________________________________Product-filter.ts_______________________________________
 
 
import { Component, EventEmitter, Output } from '@angular/core';
 
@Component({

  selector: 'app-product-filter',

  templateUrl: './product-filter.component.html',

  styleUrls: ['./product-filter.component.scss']

})

export class ProductFilterComponent {

  @Output() filterChanged = new EventEmitter<any>();
 
  filters: any = {

    category: '',

    minPrice: null,

    maxPrice: null

  };
 
  applyFilters() {

    this.filterChanged.emit(this.filters);

  }
 
  onFilterChange(filters: any) {

    this.filters = { ...this.filters, ...filters };

    this.applyFilters();

  }

}
 
 
__________________________________________________________________product-list.ts_______________________________________
 
 
import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';

import { ProductService } from '../product.service';
 
@Component({

  selector: 'app-product-list',

  templateUrl: './product-list.component.html',

  styleUrls: ['./product-list.component.scss']

})

export class ProductListComponent implements OnInit {

  products: any[] = [];

  currentPage: number = 1;

  pageSize: number = 10;

  totalItems: number = 0;

  filters: any = {};

  sort: any = { sortBy: 'price', sortOrder: 'asc' };
 
  constructor(

    private productService: ProductService,

    private route: ActivatedRoute,

    private router: Router

  ) {}
 
  ngOnInit() {

    this.route.queryParams.subscribe(params => {

      this.currentPage = params['page'] || 1;

      this.pageSize = params['pageSize'] || 10;

      this.filters = {

        category: params['category'] || '',

        minPrice: params['minPrice'] || 0,

        maxPrice: params['maxPrice'] || 1000

      };

      this.sort = {

        sortBy: params['sortBy'] || 'price',

        sortOrder: params['sortOrder'] || 'asc'

      };

      this.fetchProducts();

    });

  }
 
  fetchProducts() {

    this.productService.getProducts(this.filters, this.sort, this.currentPage, this.pageSize).subscribe(response => {

      this.products = response.items;

      this.totalItems = response.total;

    });

  }
 
  updateQueryParams() {

    this.router.navigate([], {

      relativeTo: this.route,

      queryParams: {

        ...this.filters,

        ...this.sort,

        page: this.currentPage,

        pageSize: this.pageSize

      },

      queryParamsHandling: 'merge'

    });

  }
 
  onSortChanged(sort: any) {

    this.sort = sort;

    this.updateQueryParams();

    this.fetchProducts();

  }
 
  onPageChanged(page: number) {

    this.currentPage = page;

    this.updateQueryParams();

    this.fetchProducts();

  }
 
  onFilterChanged(filters: any) {

    this.filters = filters;

    this.updateQueryParams();

    this.fetchProducts();

  }

}

 
__________________________________________________________________app-routing.module.ts_______________________________________

import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';

import { ProductListComponent } from './product-list/product-list.component';
 
const routes: Routes = [

    { path: '', component: ProductListComponent }

    ];
 
 
@NgModule({

  imports: [RouterModule.forRoot(routes)],

  exports: [RouterModule]

})

export class AppRoutingModule { }
 
__________________________________________________________________app.component.html_______________________________________
 
 
<app-product-filter (filterChanged)="onFilterChanged($event)"></app-product-filter>
<app-product-list></app-product-list>
<app-pagination

  [currentPage]="currentPage"

    [pageSize]="pageSize"

      [totalItems]="totalItems"

        (pageChanged)="onPageChanged($event)"
></app-pagination>

__________________________________________________________________app.component.ts_______________________________________
 
import { Component } from '@angular/core';
 
@Component({

  selector: 'app-root',

  templateUrl: './app.component.html',

  styleUrls: ['./app.component.scss']

})

export class AppComponent {

  currentPage: number = 1;

  pageSize: number = 10;

  totalItems: number = 0;
 
  onFilterChanged(filters: any) {

    // Handle filter change

  }
 
  onPageChanged(page: number) {

    this.currentPage = page;

    // Handle page change

  }

}
 
__________________________________________________________________app.moudle.ts_______________________________________
 
import { ApplicationInitStatus, NgModule } from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';
 
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
 
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
 
 
import { ProductListComponent } from './product-list/product-list.component';

import { ProductFilterComponent } from './product-filter/product-filter.component';

import { PaginationComponent } from './pagination/pagination.component';
 
 
@NgModule({

  declarations: [

    AppComponent,

    ProductListComponent,

    ProductFilterComponent,

    PaginationComponent,

  ],

  imports: [

    BrowserModule,

    AppRoutingModule,

    FormsModule,

    ReactiveFormsModule,

  ],

  providers: [],

  bootstrap: [AppComponent],

})

export class AppModule {}
 
 
__________________________________________________________________product.service.ts_______________________________________
 
import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
 
@Injectable({

  providedIn: 'root'

})

export class ProductService {

  // Dummy product data

  private products = [

    { id: 1, name: 'Laptop', category: 'electronics', price: 1200, available: true },

    { id: 2, name: 'Headphones', category: 'electronics', price: 100, available: true },

    { id: 3, name: 'Smartphone', category: 'electronics', price: 700, available: false },

    { id: 4, name: 'Shirt', category: 'fashion', price: 40, available: true },

    { id: 5, name: 'Shoes', category: 'fashion', price: 80, available: true },

    { id: 6, name: 'Watch', category: 'fashion', price: 200, available: false },

    { id: 7, name: 'TV', category: 'electronics', price: 1500, available: true },

    { id: 8, name: 'Jacket', category: 'fashion', price: 150, available: true },

    { id: 9, name: 'Tablet', category: 'electronics', price: 500, available: true },

    { id: 10, name: 'Dress', category: 'fashion', price: 100, available: false },

    { id: 11, name: 'Blender', category: 'home_appliances', price: 75, available: true },

    { id: 12, name: 'Refrigerator', category: 'home_appliances', price: 950, available: true },

    { id: 13, name: 'Oven', category: 'home_appliances', price: 600, available: true },

    { id: 14, name: 'Mixer', category: 'home_appliances', price: 120, available: false },

    { id: 15, name: 'Sofa', category: 'furniture', price: 800, available: true },

    { id: 16, name: 'Dining Table', category: 'furniture', price: 500, available: false },

    { id: 17, name: 'Desk', category: 'furniture', price: 300, available: true },

    { id: 18, name: 'Bookshelf', category: 'furniture', price: 220, available: true },

    { id: 19, name: 'Microwave', category: 'home_appliances', price: 150, available: false },

    { id: 20, name: 'Lamp', category: 'furniture', price: 70, available: true }

  ];
 
  constructor() {}
 
  // Simulated method to get filtered, sorted, and paginated products

  getProducts(filters: any, sort: any, page: number, pageSize: number): Observable<any> {

    let filteredProducts = this.products;
 
    // Apply filters

    if (filters.category) {

      filteredProducts = filteredProducts.filter(product => product.category === filters.category);

    }

    if (filters.minPrice !== undefined) {

      filteredProducts = filteredProducts.filter(product => product.price >= filters.minPrice);

    }

    if (filters.maxPrice !== undefined) {

      filteredProducts = filteredProducts.filter(product => product.price <= filters.maxPrice);

    }

    if (filters.available !== undefined) {

      filteredProducts = filteredProducts.filter(product => product.available === filters.available);

    }
 
    // Apply sorting

    if (sort.sortBy) {

      filteredProducts = filteredProducts.sort((a, b) => {

        const valueA = a[sort.sortBy as keyof typeof a];

        const valueB = b[sort.sortBy as keyof typeof b];

        if (valueA < valueB) return sort.sortOrder === 'asc' ? -1 : 1;

        if (valueA > valueB) return sort.sortOrder === 'asc' ? 1 : -1;

        return 0;

      });

    }
 
    // Apply pagination

    const startIndex = (page - 1) * pageSize;

    const paginatedProducts = filteredProducts.slice(startIndex, startIndex + pageSize);
 
    return of({

      items: paginatedProducts,

      total: filteredProducts.length

    });

  }

}
 
 
D33_S1_A2_Implement Advance Query Parameter in Product Details
 
```