# 30.2.2 (for loop) Create a simple Angular application for sharing recipes

**D30_S2_A2_Create a simple Angular application for sharing recipes**

# recipe.component.ts

```tsx
import { Component } from '@angular/core';
import { Recipe } from 'src/Models/recipe';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.css']
})
export class RecipeComponent {
//todo complete missing code..
recipes: Recipe[] = [
  {
   title: 'Spaghetti Carbonara',
   ingredients: ['Spaghetti', 'Eggs', 'Parmesan Cheese', 'Pancetta', 'Pepper'],
   instructions: 'Boil pasta. Fry pancetta. Mix eggs and cheese. Combine all with pepper.'
  },

  {
   title: 'Chicken Curry',
   ingredients: ['Chicken', 'Curry Powder', 'Coconut Milk', 'Onions', 'Garlic'],
   instructions: 'Cook onions and garlic. Add chicken and curry powder. Pour in coconut milk and simmer.'
  },

  {
   title: 'Beef Stroganoff',
   ingredients: ['Beef', 'Mushrooms', 'Onions', 'Sour Cream', 'Garlic'],
   instructions: 'Cook beef and onions. Add mushrooms and garlic. Stir in sour cream and simmer.'
  },

  {
   title: 'Vegetable Stir Fry',
   ingredients: ['Broccoli', 'Carrots', 'Bell Peppers', 'Soy Sauce', 'Garlic', 'Ginger'],
   instructions: 'Stir fry vegetables with garlic and ginger. Add soy sauce and cook until tender.'
  },

  {
   title: 'Fish Tacos',
   ingredients: ['Fish Fillets', 'Tortillas', 'Cabbage', 'Avocado', 'Sour Cream', 'Lime'],
   instructions: 'Cook fish fillets. Serve on tortillas with cabbage, avocado, sour cream, and lime.'
  },

  {
   title: 'Chocolate Cake',
   ingredients: ['Flour', 'Sugar', 'Cocoa Powder', 'Baking Powder', 'Eggs', 'Milk', 'Butter'],
   instructions: 'Mix dry ingredients. Add wet ingredients and mix well. Bake in preheated oven.'
  }
 ];
 
}
```

# recipe.component.html

```html
<!-- //todo complete missing code.. -->

<!-- src/app/recipe/recipe.component.html -->
<div class="card" *ngFor="let recipe of recipes">
    <h2 class="card-title">{{ recipe.title }}</h2>
    <h3>Ingredients:</h3>
    <ul>
      <li *ngFor="let ingredient of recipe.ingredients">{{ ingredient }}</li>
    </ul>
    <h3>Instructions:</h3>
    <p>{{ recipe.instructions }}</p>
  </div>
  
```

# recipe.component.css

```css
/* //todo complete missing code.. */

.recipe {
    border: 1px solid #ddd;
    padding: 15px;
    margin-bottom: 15px;
    border-radius: 5px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  }
  
  .recipe h2 {
    color: #ff6347;
  }
  
  .recipe h3 {
    margin-bottom: 5px;
  }
  
  .recipe ul {
    list-style-type: disc;
    padding-left: 20px;
  }
  
```