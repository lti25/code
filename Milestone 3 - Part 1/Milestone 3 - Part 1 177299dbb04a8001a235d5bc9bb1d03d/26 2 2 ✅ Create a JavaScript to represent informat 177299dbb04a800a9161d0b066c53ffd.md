# 26.2.2 ✅ Create a JavaScript to represent information about books in a library

26.2.2 **Create a JavaScript to represent information about books in a library**

# index.js

```jsx
//todo: complete missing code
  
class Book{

    constructor(bookId, bookTitle, author, publishedYear){
        this.bookId = bookId;
        this.bookTitle = bookTitle;
        this.author = author;
        this.publishedYear = publishedYear;
    }

    displayDetails(){
        return `Book ID: ${this.bookId}, Title: ${this.bookTitle}, Author: ${this.author}, Published Year: ${this.publishedYear}`;
    }
}

const myBook = new Book(1, "1984", "Sahil", 1949);

document.addEventListener("DOMContentLoaded", () => {
    const pElement = document.createElement("p");
    pElement.textContent = myBook.displayDetails();
    document.body.appendChild(pElement);
});

module.exports = { Book, myBook };

```

# index.html

```jsx

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Book Detais</title>
    <script src="./index.js"></script>
</head>
<body>
</body>
</html>
```