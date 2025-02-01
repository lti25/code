# 96. CRUD Operation (Unordered List)

Status: Not started

# MODEL

```tsx
export interface Product {
    id ?: number,
    name ?: string,
    category ?: string,
    price ?: number,
    description ?: string
}
```

# SERVICE:

```tsx

SERVICES

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../model/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  baseUrl : string = "https://ide-ceddaddbdaecae322573671abecbaadaccedone.premiumproject.examly.io/proxy/3001/product";

  constructor(private httpClient : HttpClient) { }

  public getAllProducts() : Observable<Product[]>{
    return this.httpClient.get(this.baseUrl) as Observable<Product[]>; 
  }

  public addProduct(product : Product) : Observable<Product>{
    return this.httpClient.post(this.baseUrl,product) as  Observable<Product>;
  }

  public updateProduct(id : number, product : Product) : Observable<Product>{
    return this.httpClient.put(this.baseUrl+"/"+id,product) as Observable<Product>;
  }

  public deleteProduct(id : number) : Observable<any>{
    return this.httpClient.delete(this.baseUrl+"/"+id) as Observable<any>;
  }

  public getProductById(id : number) : Observable<Product>{
    return this.httpClient.get(this.baseUrl+"/"+id) as Observable<Product>;
  }
}

```

# App-Routing

```tsx

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductListComponent } from './product-list/product-list.component';
import { ViewProductComponent } from './view-product/view-product.component';
import { EditProductComponent } from './edit-product/edit-product.component';
import { AddProductComponent } from './add-product/add-product.component';

const routes: Routes = [
  {path : 'products', component : ProductListComponent},
  {path : 'products/view/:productId', component : ViewProductComponent},
  {path : 'products/edit/:productId', component : EditProductComponent},
  {path : 'products/add', component : AddProductComponent},
  {path : '**', component : ProductListComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
```

# PRODUCT-LIST

```tsx
PRODUCT-LIST.ts

import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products : any[] = [];

  constructor(private productService : ProductService) { }

  ngOnInit(): void {
    this.getAllProducts();
  }

  public getAllProducts() : void{
    this.productService.getAllProducts().subscribe(data=>{
      this.products = data;
    });
  }

  public deleteProduct(productId : number) : void{
    this.productService.deleteProduct(productId).subscribe(data=>{
      this.getAllProducts();
    });
  }

}

-------------------------------------------------------------------------------------------------------

```

# PRODUCT-LIST.html

```tsx
---------------------------------------------------------------------------------------------------------

PRODUCT-LIST.html

<div class="container">
    <h2>Product List</h2>
    <ul style="list-style: none;">
        <li *ngFor="let it of products">
            {{it.name}} - Category: {{it.category}}
            <a style="padding: 4px; margin: 4px;" [routerLink]="['/products/view',it.id]">View</a>
            <a style="padding: 4px; margin: 4px;" [routerLink]="['/products/edit',it.id]">Edit</a>
            <a style="padding: 4px; margin: 4px;" (click)="deleteProduct(it.id)">Delete</a>
        </li>
        <br>
    </ul>
    <p *ngIf="!products">No products available</p>
</div>
<a [routerLink]="['/products/add']">Add Product</a>

--------------------------------------------------------------------------------------------------------
```

# ADD-PRODUCT.ts

```tsx
--------------------------------------------------------------------------------------------------------

ADD-PRODUCT.ts

import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Router } from '@angular/router';
import { Product } from '../model/product.model';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  product : Product = {id:0, name:"", category:"", price:0, description:""};

  constructor(private productService : ProductService, private router : Router) { }

  ngOnInit(): void {
  }

  public addProduct() : void{
    this.productService.addProduct(this.product).subscribe(data=>{
      this.router.navigate(['/products']);
    });
  }

}

--------------------------------------------------------------------------------------------------------------
-----------------------------------------------------------------------------------------------------------
```

# ADD-PRODUCT.html

```tsx
-------------------------------------------------------------------------------------------------------------

ADD-PRODUCT.html

<div class="container">
    <h2>Add Product</h2>
    <form (ngSubmit)="addProduct()">
        <label for="productName">Product Name:</label>
        <input type="text" [(ngModel)]="product.name" name="name" id="name">
        <br>

        <label for="productCategory">Product Category:</label>
        <input type="text" [(ngModel)]="product.category" name="category" id="category">
        <br>

        <label for="productPrice">Product Price:</label>
        <input type="text" [(ngModel)]="product.price" name="price" id="price">
        <br>

        <label for="productDescription">Product Description:</label>
        <input type="text" [(ngModel)]="product.description" name="description" id="description">
        <br>

        <button type="submit">Add Product</button>
    </form>
</div>

```

# VIEW

```tsx
---------------------------------------------------------------------------------------------------------
VIEW-PRODUCT.ts

import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../model/product.model';

@Component({
  selector: 'app-view-product',
  templateUrl: './view-product.component.html',
  styleUrls: ['./view-product.component.css']
})
export class ViewProductComponent implements OnInit {

  productId : number = 0;
  product : Product = {id:0, name:"", category:"", price:0, description:""};

  constructor(private productService : ProductService, private activatedRoute : ActivatedRoute) { }

  ngOnInit(): void {
    this.productId = parseInt(this.activatedRoute.snapshot.paramMap.get("productId"));
    this.getProductById();
  }

  public getProductById() : void{
    this.productService.getProductById(this.productId).subscribe(data=>{
      this.product = data;
    });
  }

}

---------------------------------------------------------------------------------------------------------

```

# VIEW

```tsx
----------------------------------------------------------------------------------------------------------

VIEW-PRODUCT.html

<div class="container">
    <h2>View Product</h2>
    <p>ID: {{product.id}}</p>
    <p>Name: {{product.name}}</p>
    <p>Category: {{product.category}}</p>
    <p>Price: {{product.price}}</p>
    <p>Description: {{product.description}}</p>
</div>
```

# EDIT

```tsx
-----------------------------------------------------------------------------------------------------------]
EDIT-PRODUCT.ts

import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../model/product.model';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {

  productId : number = 0;
  product : Product = {id:0, name:"", category:"", price:0, description:""};

  constructor(private productService : ProductService, private activatedRoute : ActivatedRoute, private router : Router) { }

  ngOnInit(): void {
    this.productId = parseInt(this.activatedRoute.snapshot.paramMap.get("productId"));
    this.productService.getProductById(this.productId).subscribe(data=>{
      this.product = data;
    });
  }

  public updateProduct() : void{
    this.productService.updateProduct(this.productId,this.product).subscribe(data=>{
      this.router.navigate(['/products']);
    });
  }

}

```

# EDIT-PRODUCT.html

```tsx

------------------------------------------------------------------------------------------------------------
----------------------------------------------------------------------------------------------------------
EDIT-PRODUCT.html

<div class="container">
    <h2>Edit Product</h2>
    <form (ngSubmit)="updateProduct()">
        <label for="productName">Product Name:</label>
        <input type="text" [(ngModel)]="product.name" name="name" id="name">
        <br>

        <label for="productCategory">Product Category:</label>
        <input type="text" [(ngModel)]="product.category" name="category" id="category">
        <br>

        <label for="productPrice">Product Price:</label>
        <input type="text" [(ngModel)]="product.price" name="price" id="price">
        <br>

        <label for="productDescription">Product Description:</label>
        <input type="text" [(ngModel)]="product.description" name="description" id="description">
        <br>

        <button type="submit">Update Product</button>
    </form>
</div>

```