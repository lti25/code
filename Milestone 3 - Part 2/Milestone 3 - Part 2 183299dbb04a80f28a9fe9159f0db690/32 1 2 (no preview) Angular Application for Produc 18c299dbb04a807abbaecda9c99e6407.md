# 32.1.2 (no preview) Angular Application for Product Search and Filtering

Status: Not started

```tsx
D32_S1_A2
 
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product.service';
 
@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  products:any = [];
 
  constructor(private route: ActivatedRoute,
    private productService: ProductService) {}
    ngOnInit(): void {
      this.route.queryParams.subscribe(params =>{
        const filters = {
          category: params['category'],
          price: params['price'],
          rating: params['rating'],
        };
        this.products = this.productService.getProducts(filters);
      })
    }
}
 
 
<div class="product-list">
<h2>Product List</h2>
<div *ngIf="products.length > 0; else noProducts">
<ul class="product-items">
<li *ngFor="let product of products" class="product-item">
<h3>{{ product.name }}</h3>
<p>Category: {{ product.category }}</p>
<p>Price: ${{ product.price }}</p>
<p>Rating: {{ product.rating }} stars</p>
</li>
</ul>
</div>
 
  <ng-template #noProducts>
<p>No products found with the selected filters.</p>
</ng-template>
</div>
 
 
 
import { Component } from '@angular/core';
import { Router } from '@angular/router';
 
@Component({
  selector: 'app-product-filter',
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.css'],
})
export class ProductFilterComponent {
  category = '';
  price?: number;
  rating?: number;
 
  constructor(private router: Router) {}
  applyFilters(): void {
    const queryParams: any = {};
    if(this.category){
      queryParams.category = this.category;
    }
 
    if(this.price)
    {
      queryParams.price = this.price;
    }
 
    if(this.rating){
      queryParams.rating = this.rating;
    }
 
    this.router.navigate(['/products'], {queryParams});
  }
}
 
 
<div class="product-filter">
<h2>Filter Products</h2>
<form (ngSubmit)="applyFilters()">
<div class="form-group">
<label for="category">Category:</label>
<input type="text" id="category" [(ngModel)]="category" name="category" class="form-control" placeholder="Enter category">
</div>
 
    <div class="form-group">
<label for="price">Price (up to):</label>
<input type="number" id="price" [(ngModel)]="price" name="price" class="form-control" placeholder="Enter max price">
</div>
 
    <div class="form-group">
<label for="rating">Rating (min):</label>
<input type="number" id="rating" [(ngModel)]="rating" name="rating" class="form-control" placeholder="Enter min rating" step="0.1" min="0" max="5">
</div>
 
    <button type="submit" class="btn btn-primary">Apply Filters</button>
</form>
</div>
 
 
import { Injectable } from '@angular/core';
import { filter } from 'rxjs';
 
@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private products = [
    { id: 1, name: 'Phone', category: 'Electronics', price: 699, rating: 4.5 },
    { id: 2, name: 'Laptop', category: 'Electronics', price: 999, rating: 4.8 },
    { id: 3, name: 'Shoes', category: 'Fashion', price: 120, rating: 4.2 },
    { id: 4, name: 'Watch', category: 'Accessories', price: 150, rating: 4.1 },
    { id: 5, name: 'Headphones', category: 'Electronics', price: 199, rating: 4.7 },
  ];
 
  getProducts(filters: { category?: string; price?: number; rating?: number }) {
      return this.products.filter(product =>{
        let matches = true;
 
        if(filters.category && product.category !== filters.category){
          matches = false;
        }
 
        if(filters.price && product.price>filters.price){
          matches = false;
        }
 
        if(filters.rating && product.rating < filters.rating)
        {
          matches = false;
        }
      });
  }
}

```

**D32_S1_A2_Angular Application for Product Search and Filtering**

# Nishant Soln