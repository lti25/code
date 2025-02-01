# 29.1 (❓cpy) MCQ - (29.S2.1) Create an Interface in TypeScript that represents a Person

# **D29_S2_A1_Create an Interface in TypeScript that represents a Person**

```tsx
// Define the Person interface
interface Person {
    id: number;
    name: string;
    showDetails(): void;
  }
  
  // Implement the Employee class that extends the Person interface
  class Employee implements Person {
    id: number;
    name: string;
    birthdate: string;
    salary: number;
  
    constructor(id: number, name: string, birthdate: string, salary: number) {
      this.id = id;
      this.name = name;
      this.birthdate = birthdate;
      this.salary = salary;
    }
  
    showDetails(): void {
      console.log(`Employee Details: ID-${this.id}, Name-${this.name}, Birthdate-${this.birthdate}, Salary-${this.salary}`);
    }
  }
  
  // Implement the Customer class that extends the Person interface
  class Customer implements Person {
    id: number;
    name: string;
    product: string;
    billAmount: number;
  
    constructor(id: number, name: string, product: string, billAmount: number) {
      this.id = id;
      this.name = name;
      this.product = product;
      this.billAmount = billAmount;
    }
  
    showDetails(): void {
      console.log(`Customer Details: ID-${this.id}, Name-${this.name}, Product-${this.product}, Bill Amount-${this.billAmount}`);
    }
  }
  
  // Export the classes for testing
  export { Employee, Customer };
  
```