# 36.3.1 ⭐⭐(full CRUD) Develop an Angular application for managing a collection of books

Status: Not started

[36.3.1 All Crud Operation- MyApp.zip](36%203%201%20%E2%AD%90%E2%AD%90(full%20CRUD)%20Develop%20an%20Angular%20applicatio%2018a299dbb04a80c79ff5e671c5cc1ca3/36.3.1_All_Crud_Operation-_MyApp.zip)

**36.3.1 ⭐⭐(full CRUD) Develop an Angular application for managing a collection of books**

# .service.ts

```tsx
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Book } from './Models/book.model';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private apiUrl = environment.apiUrl;
  
  constructor(private http: HttpClient) { }
  
  getBooks(): Observable<Book[]> {
    //todo: complete missing code..
    console.log(this.apiUrl);
    return this.http.get<Book[]>(`${this.apiUrl}`);
  }

  getBook(id: any): Observable<Book> {
    //todo: complete missing code..

    return this.http.get<Book>(`${this.apiUrl}/${id}`);
    
  }
  
  addBook(book: Book): Observable<Book> {
    //todo: complete missing code..
    return this.http.post<Book>(`${this.apiUrl}`, book);     
  }

  updateBook(id: number, book: Book): Observable<Book> {
    //todo: complete missing code..
    return this.http.put<Book>(`${this.apiUrl}/${id}`, book);
  }

  deleteBook(id: any): Observable<void> {
     //todo: complete missing code..
     return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}

```

# Enviornment.development.ts

```tsx
// Enviornment.development.ts
export const environment = {
  production: false,
  // apiUrl: window.location.origin.replace("5000", "3000")+'/proxy/5000/books'
  apiUrl: window.location.origin.replace("5000", "3000")+'/proxy/3000/books'
};

// ------------------------------
// File: Enviornment.development.ts
export const environment = {
  production: false,
   apiUrl: window.location.origin.replace("5000", "3000")+'/proxy/5000/books'
};

```

# book-list.component

```tsx
import { Component, OnInit } from '@angular/core';
import { BookService } from '../book.service';
import { Book } from '../Models/book.model';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {
 //todo: complete missing code..

 books: Book[] = [];

 constructor(private bookService: BookService){}

  ngOnInit(): void {
    this.reloadBookList();
  }

reloadBookList(): void {  
  this.bookService.getBooks().subscribe(data => {
    this.books = data;
    console.log(data);
  } );
 }

   // --- ACTION BUTTONS - METHODS 
   viewBook(id: any): void {

   }
 
   deleteBook(id: any): void {
     this.bookService.deleteBook(id).subscribe( () => {
        this.reloadBookList();
     } )
   }

}

```

# book-list.

```tsx
<!-- //todo: complete missing code.. -->

<h1>Book List</h1>
<table class="table table-striped">
    <thead>
        <tr>
            <!-- <th>id</th> -->
            <th>Title</th>
            <th>Author</th>            
            <th>Genre</th>
            <th>Price</th>
            <th>Pages</th>
            <th>Actions</th>
        </tr>
    </thead>
    <tbody>
        <tr *ngFor="let book of books" >
            <!-- <td>{{ book.id }}</td> -->
            <td>{{ book.title }}</td>
            <td>{{ book.author }}</td>
            <td>{{ book.genre }}</td>
            <td>{{ book.price }}</td>
            <td>{{ book.pages }}</td>        
            <td class="d-flex gap-3">
                <button class="btn btn-primary btn-sm" [routerLink]="['/detail', book.id]" >View</button>
                <!-- <button class="btn btn-warning btn-sm" (click)="editBook(book.id)">Edit</button> -->
                <button class="btn btn-danger btn-sm" (click)="deleteBook(book.id)">Delete</button>
            </td>
        </tr>
    </tbody>
    
</table>

<button routerLink="/add" class="btn btn-success btn-sm" >Add Book</button>

```

# book-form.component.ts

```tsx
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BookService } from '../book.service';
import { Book } from '../Models/book.model';

@Component({
  selector: 'app-book-form',
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.css']
})
export class BookFormComponent implements OnInit {
  //todo: complete missing code..
  bookForm: FormGroup;

  constructor(private fb: FormBuilder, private bookService: BookService, private router: Router) {
    this.bookForm = this.fb.group({
      title: ['', Validators.required],
      author: ['', Validators.required],
      genre: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(0)]],
      pages: ['', [Validators.required, Validators.min(0)]],
    });
  }

  ngOnInit(): void {        
  }

  onSubmit(): void {
    if (this.bookForm.valid) {
      console.log("form submit");
      const newBook: Book = this.bookForm.value;
      
      this.bookService.addBook(newBook).subscribe(()=> {
        this.router.navigate(['/']);
      });
      
      this.bookForm.reset();

    }
  }

  // action btn methods 
  onCancel(): void {
    this.router.navigate(['/']);
  }

}

```

# book-form.component.

```tsx
<h1>Add Book : </h1>

<div class="container">

  <form [formGroup]="bookForm" (ngSubmit)="onSubmit()">
    <div>
      <label for="title">Title</label>
      <input id="title" formControlName="title" type="text" />
      <div *ngIf="bookForm.controls['title'].invalid && (bookForm.controls['title'].dirty || bookForm.controls['title'].touched)">
        <small *ngIf="bookForm.controls['title'].errors?.['required']">Title is required.</small>
      </div>
    </div>
    
    <div>
      <label for="author">Author</label>
      <input id="author" formControlName="author" type="text" />
      <div *ngIf="bookForm.controls['author'].invalid && (bookForm.controls['author'].dirty || bookForm.controls['author'].touched)">
        <small *ngIf="bookForm.controls['author'].errors?.['required']">Author is required.</small>
      </div>
    </div>
    
    <div>
      <label for="genre">Genre</label>
      <input id="genre" formControlName="genre" type="text" />
      <div *ngIf="bookForm.controls['genre'].invalid && (bookForm.controls['genre'].dirty || bookForm.controls['genre'].touched)">
        <small *ngIf="bookForm.controls['genre'].errors?.['required']">Genre is required.</small>
      </div>
    </div>
    
    <div>
      <label for="price">Price</label>
      <input id="price" formControlName="price" type="number" />
      <div *ngIf="bookForm.controls['price'].invalid && (bookForm.controls['price'].dirty || bookForm.controls['price'].touched)">
        <small *ngIf="bookForm.controls['price'].errors?.['required']">Price is required.</small>
        <small *ngIf="bookForm.controls['price'].errors?.['min']">Price must be at least 0.</small>
      </div>
    </div>
    
    <div>
      <label for="pages">Pages</label>
      <input id="pages" formControlName="pages" type="number" />
      <div *ngIf="bookForm.controls['pages'].invalid && (bookForm.controls['pages'].dirty || bookForm.controls['pages'].touched)">
        <small *ngIf="bookForm.controls['pages'].errors?.['required']">Pages is required.</small>
        <small *ngIf="bookForm.controls['pages'].errors?.['min']">Pages must be at least 0.</small>
      </div>
    </div>
    
    <button type="submit" [disabled]="bookForm.invalid">Submit</button>
    <button  class="btn btn-danger mx-3" (click)="onCancel()" >Cancel</button>
  </form>
  
</div>
```

# book-detail.ts

```tsx
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BookService } from '../book.service';
import { Book } from '../Models/book.model';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css']
})
export class BookDetailsComponent implements OnInit {
  book: Book | undefined;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private bookService: BookService
  ) { }

  ngOnInit(): void {
    // const id = Number(this.route.snapshot.paramMap.get('id'));
    const id = this.route.snapshot.paramMap.get('id');
    this.bookService.getBook(id).subscribe(data => {
      this.book = data;
    });
  }

  // HTML Action Button - Methods
  editBook(id: any): void{  
    this.router.navigate(['/edit', id]);
  }

  goBack(): void {
    this.router.navigate(['/']);
  }

}

```

# book-detail.html

```tsx

<div class="container mt-4" *ngIf="book">
  <h2 class="mb-3">{{ book.title }}</h2>
  <ul class="list-group">
    <li class="list-group-item"><strong>Author:</strong> {{ book.author }}</li>
    <li class="list-group-item"><strong>Genre:</strong> {{ book.genre }}</li>
    <li class="list-group-item"><strong>Price:</strong> {{ book.price | currency }}</li>
    <li class="list-group-item"><strong>Pages:</strong> {{ book.pages }}</li>
  </ul>
  <div class="mt-3 d-flex gap-3">
    <button class="btn btn-warning" (click)="editBook(book.id)">Edit</button>
    <button class="btn btn-primary" (click)="goBack()">Back to List</button>
  </div>
</div>

```

# book-edit.ts

```tsx
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BookService } from '../book.service';

@Component({
  selector: 'app-edit-book',
  templateUrl: './edit-book.component.html',
  styleUrls: ['./edit-book.component.css']
})
export class EditBookComponent implements OnInit {
  bookForm: FormGroup;
  currentBookId: any | null = null;

  constructor(
    private fb: FormBuilder,
    private bookService: BookService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.bookForm = this.fb.group({
      title: ['', Validators.required],
      author: ['', Validators.required],
      genre: ['', Validators.required],
      price: [0, [Validators.required, Validators.min(0)]],
      pages: [0, [Validators.required, Validators.min(0)]],
    });
  }

  ngOnInit(): void {
    this.currentBookId = this.route.snapshot.paramMap.get('id')!;

    this.bookService.getBook(this.currentBookId).subscribe(data=> {
      this.bookForm.patchValue(data);
    })

  }

  // IT MEANS ON UPDATE BTN CLICK
  onSubmit(): void {
    this.bookService.updateBook(this.currentBookId, this.bookForm.value).subscribe( () => {
      this.router.navigate(['/']);
    } )
  }

}

```

# book-edit.html

```tsx
<div class="container">
    <form [formGroup]="bookForm" (ngSubmit)="onSubmit()">
      <div>
        <label for="title">Title</label>
        <input id="title" formControlName="title" type="text" />
        <div *ngIf="bookForm.controls['title'].invalid && (bookForm.controls['title'].dirty || bookForm.controls['title'].touched)">
          <small *ngIf="bookForm.controls['title'].errors?.['required']">Title is required.</small>
        </div>
      </div>
  
      <div>
        <label for="author">Author</label>
        <input id="author" formControlName="author" type="text" />
        <div *ngIf="bookForm.controls['author'].invalid && (bookForm.controls['author'].dirty || bookForm.controls['author'].touched)">
          <small *ngIf="bookForm.controls['author'].errors?.['required']">Author is required.</small>
        </div>
      </div>
  
      <div>
        <label for="genre">Genre</label>
        <input id="genre" formControlName="genre" type="text" />
        <div *ngIf="bookForm.controls['genre'].invalid && (bookForm.controls['genre'].dirty || bookForm.controls['genre'].touched)">
          <small *ngIf="bookForm.controls['genre'].errors?.['required']">Genre is required.</small>
        </div>
      </div>
  
      <div>
        <label for="price">Price</label>
        <input id="price" formControlName="price" type="number" />
        <div *ngIf="bookForm.controls['price'].invalid && (bookForm.controls['price'].dirty || bookForm.controls['price'].touched)">
          <small *ngIf="bookForm.controls['price'].errors?.['required']">Price is required.</small>
          <small *ngIf="bookForm.controls['price'].errors?.['min']">Price must be at least 0.</small>
        </div>
      </div>
  
      <div>
        <label for="pages">Pages</label>
        <input id="pages" formControlName="pages" type="number" />
        <div *ngIf="bookForm.controls['pages'].invalid && (bookForm.controls['pages'].dirty || bookForm.controls['pages'].touched)">
          <small *ngIf="bookForm.controls['pages'].errors?.['required']">Pages is required.</small>
          <small *ngIf="bookForm.controls['pages'].errors?.['min']">Pages must be at least 0.</small>
        </div>
      </div>
  
      <button type="submit" [disabled]="bookForm.invalid">Update Book</button>
      <button type="button" [routerLink]="['/book-list']">Back to List</button>
    </form>
  </div>
  
```

---

---

# app.module.ts

```tsx
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BookListComponent } from './book-list/book-list.component';
import { BookDetailsComponent } from './book-details/book-details.component';
import { BookFormComponent } from './book-form/book-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    BookListComponent,
    BookDetailsComponent,
    BookFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

```

# app-routing.ts

```tsx
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookListComponent } from './book-list/book-list.component';
import { BookDetailsComponent } from './book-details/book-details.component';
import { BookFormComponent } from './book-form/book-form.component';
import { EditBookComponent } from './edit-book/edit-book.component';

const routes: Routes = [
 //tood: add routes here
 { path:'', component: BookListComponent },
 { path:'add', component: BookFormComponent },
 { path:'detail/:id', component: BookDetailsComponent },
 { path:'edit/:id', component: EditBookComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
```

# app-component.html

```tsx
<!-- //todo: complete missing code.. -->

<div>
    <h2>Book Management</h2>

    <a routerLink="/" >Book List</a> &nbsp;
    <a routerLink="/add" >Add Book</a>
</div>

<router-outlet></router-outlet>
```