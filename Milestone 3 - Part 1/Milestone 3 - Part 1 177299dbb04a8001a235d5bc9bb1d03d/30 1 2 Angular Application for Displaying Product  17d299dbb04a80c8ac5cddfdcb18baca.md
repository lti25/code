# 30.1.2 Angular Application for Displaying Product Details

30.1.2 **Angular Application for Displaying Product Details**

# app.component.ts

```tsx
import { Component } from '@angular/core';
import { catchError } from 'rxjs';
  
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',  
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  //todo: complete missing code..
  title = 'simple-Angular15 Ayush';

  product = {
    name: 'Awesoem Product',
    price: 49.99,
    category: 'Gadegts',
    description: 'This is amazing product, you can buy hassle free.'
  }

}
```

# app.component.html

```tsx
<!-- //todo: complete missing code.. -->

<div class="product-card">
    <h2>{{ product.name }}</h2>
    <p><strong>Price:</strong>${{ product.price }}</p>
    <p><strong>Category:</strong> {{ product.category }}</p>
    <p><strong>Description:</strong> {{ product.description }}</p>
</div>
```