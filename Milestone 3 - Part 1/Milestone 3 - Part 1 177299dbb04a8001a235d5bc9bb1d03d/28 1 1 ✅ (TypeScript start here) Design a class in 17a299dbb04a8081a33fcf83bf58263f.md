# 28.1.1 ✅ (TypeScript start here)  Design a class in TypeScript that represents information about books in a library

# index.ts

```jsx
//todo: complete missing code...

export class Book{
    bookId: string;
    bookTitle: string;
    author: string;
    publishedYear: number;

    constructor(bookId: string , bookTitle: string, author: string, publishedYear: number){
        this.bookId = bookId;
        this.bookTitle = bookTitle;
        this.author = author;
        this.publishedYear = publishedYear;
    }

    displayDetails(): string{
        return `Book ID: ${this.bookId}\nTitle: ${this.bookTitle}\nAuthor: ${this.author}\nPublished Year: ${this.publishedYear}`;
    }
}

const book = new Book('1', 'The Great Gatsby', 'F_Scott', 1925);
console.log(book.displayDetails());
```