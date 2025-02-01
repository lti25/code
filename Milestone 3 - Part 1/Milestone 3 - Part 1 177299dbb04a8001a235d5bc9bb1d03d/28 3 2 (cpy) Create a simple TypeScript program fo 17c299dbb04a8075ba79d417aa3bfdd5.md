# 28.3.2 (cpy) Create a simple TypeScript program for managing product inventory

# index.ts

```jsx
// index.ts

export const productNames: string[] = ["Product A", "Product B", "Product C", "Product D", "Product E"];
export const productPrices: number[] = [100, 200, 150, 300, 250];

// Function to display products
export function displayProducts(names: string[], prices: number[]): void {
    console.log("Product Inventory:");
    for (let i = 0; i < names.length; i++) {
        console.log(`Product Name: ${names[i]}, Price: $${prices[i]}`);
    }
}

// Function to find the average price of products
export function findAvg(prices: number[]): number {
    let total: number = 0;
    for (let price of prices) {
        total += price;
    }
    return total / prices.length;
}

// Example usage (for demonstration purposes, can be removed in actual implementation)
displayProducts(productNames, productPrices);
console.log(`Average Price: $${findAvg(productPrices)}`);

```