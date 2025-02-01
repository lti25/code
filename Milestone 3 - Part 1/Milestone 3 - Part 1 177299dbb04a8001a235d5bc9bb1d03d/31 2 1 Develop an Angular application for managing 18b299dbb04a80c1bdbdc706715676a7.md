# 31.2.1 Develop an Angular application for managing product inventory

## product-input.component.ts

```tsx
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ProductService } from '../product.service';
import { Product } from '../Models/product';

@Component({
  selector: 'app-product-input',
  templateUrl: './product-input.component.html',
  styleUrls: ['./product-input.component.css']
})
export class ProductInputComponent{
//complete missing code here.
productForm: FormGroup;
@Output() productAdded = new EventEmitter<{ name: string, quantity: number, price: number }>();

constructor(private fb: FormBuilder) {
  this.productForm = this.fb.group({
    name: ['', Validators.required],
    quantity: [0, [Validators.required, Validators.min(1)]],
    price: [0, [Validators.required, Validators.min(0.01)]]
  });
}

addProduct() {
  if (this.productForm.valid) {
    this.productAdded.emit(this.productForm.value);
    this.productForm.reset();
    this.productForm.patchValue({ quantity: 1, price: 0.01 });
  }
}

}

```

## product-input.component.html

```tsx
<div class="container mt-3">
    <h2>Product Input</h2>
    <form [formGroup]="productForm" (ngSubmit)="addProduct()" class="form-inline">
      <div class="form-group mr-2">
        <label for="name" class="mr-2">Product Name:</label>
        <input type="text" id="name" class="form-control" formControlName="name" required>
      </div>
      <div class="form-group mr-2">
        <label for="quantity" class="mr-2">Quantity:</label>
        <input type="number" id="quantity" class="form-control" formControlName="quantity" required>
      </div>
      <div class="form-group mr-2">
        <label for="price" class="mr-2">Price:</label>
        <input type="number" id="price" class="form-control" formControlName="price" required>
      </div>
      <button type="submit" class="btn btn-primary mt-3" [disabled]="productForm.invalid">Add Product</button>
    </form>
  </div>
  
```