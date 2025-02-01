# 30.3.2 (🚨1 case failed) Angular Application for Real-Time Product Entry

30.3.2 (🚨1 case failed) **Angular Application for Real-Time Product Entry**

# app.component.css

```css
 .product-form {
    max-width: 400px;
    margin: 20px auto;
    padding: 20px;
    border: 1px solid #ddd;
    border-radius: 8px;
    background-color: #f9f9f9;
    box-shadow: 0 2px 4px (0, 0, 0, 0.1);
 
}
 
.product-form label {
    display: block;
    margin-bottom: 5px;
    font-weight: bold;
    color: #333;
 
}
 
.product-form input {
    width: calc(100% - 10px);
    padding:  5px;
    margin-bottom: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
}
 
.product-display {
    margin-top: 20px;
    background:  #fff;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
}
```

# app.component.ts

```css
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  //todo: complete missing code..

  product = {
    id: 4,
    name : "Laptop",
    price : 108,
    category : "Electronics"
  };
}
```

# app.component.html

```css
<!-- //todo: complete missing code.. -->

<div class="product-form">
    <h2>Product Details</h2>
    <label for="productId">Product ID:</label>
    <input type="number" id="productId" [(ngModel)]="product.id" /> <br> <br>
 
    <label for="productName">Product Name:</label>
    <input type="text" id="productName" [(ngModel)]="product.name" /> <br> <br>
 
    <label for="productPrice">Product Price:</label>
    <input type="number" id="productPrice" [(ngModel)]="product.price" /> <br> <br>
 
    <label for="productCategory">Product Category:</label>
    <input type="text" id="productCategory" [(ngModel)]="product.category" /> <br> <br>
   
    <div class="product-display">
        <h3>Updated Product Details</h3>
        <p><strong>ID: </strong>{{ product.id }}</p>
        <p><strong>Name: </strong> {{ product.name}} </p>
        <p><strong>Price: </strong> {{ product.price}} </p>
        <p><strong>Category: </strong> {{ product.category}} </p>
 
    </div>
</div>
```