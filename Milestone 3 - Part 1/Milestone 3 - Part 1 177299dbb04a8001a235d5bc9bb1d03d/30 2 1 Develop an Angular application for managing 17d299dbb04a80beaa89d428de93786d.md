# 30.2.1 Develop an Angular application for managing a product catalog

30.2.1 **Develop an Angular application for managing a product catalog**

# Models/Product-mode.ts

```css
// complete this model class

export class ProductModel{
    productId: number;
    productName: string;
    productPrice: number;

    constructor(productId: number, productName: string, productPrice: number ){
        this.productId = productId;
        this.productName = productName;
        this.productPrice = productPrice;
    }
}
```

# /product/

## product.component.ts

```css
import { Component } from '@angular/core';
import { ProductModel } from '../Models/product-model';
// import { ProductModel } from '../Models/product-model';
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent {
  //complete missing code
  product: ProductModel = new ProductModel(1, 'Sample Product', 99.99);
}

```

# product.component.html

```css
<!-- //compete missing code here -->
<div>
    <h2>Product Details</h2>
    <p><strong>ID: </strong>{{product.productId}}</p>
    <p><strong>Name: </strong>{{product.productName}}</p>
    <p><strong>Price: </strong>{{product.productPrice}}</p>
</div>

```