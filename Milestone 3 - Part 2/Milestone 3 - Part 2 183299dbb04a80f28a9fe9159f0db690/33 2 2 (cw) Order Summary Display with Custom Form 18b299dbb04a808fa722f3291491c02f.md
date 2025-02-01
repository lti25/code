# 33.2.2 (cw) Order Summary Display with Custom Formatting

Status: Not started

# .ts

```tsx
import { Component } from '@angular/core';
import { Order } from 'src/model/orderModel';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  orders: Order[] = [
    new Order(1, 'laptop', 1500),
    new Order(2, 'smartphone', 800),
    new Order(3, 'headphones', 200),
  ];

  // Custom method for title case transformation
  transformTitleCase(input: string): string {
   //todo:complete missing code..

   return input.replace(/\b\w/g, (char) => char.toUpperCase() );

  }

  // Custom method for currency transformation
  transformCurrency(value: number): string {
   //todo:complete missing code..

   return `Rs. ${value.toLocaleString('en-IN', {minimumFractionDigits: 2})}`;
  }
}

```

# .html

```tsx
<!-- //todo:complete missing code.. -->

<div class="container mt-5">
    <h2>Order Submitted</h2>

    <ul class="list-group" >
        <div class="list-group-item" *ngFor="let order of orders" >
            <strong>Product:</strong> {{ transformTitleCase(order.productName) }} <br>
            <strong>Product:</strong> {{ transformCurrency(order.orderTotal) }}
        </div>
    </ul>

</div>
```