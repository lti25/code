# 31 (✨✨idx.google) Self Practice: of Concept - Q. Parent to Child, Child to Parent

Q. Parent to Child, Child to Parent 

# Parent

## app.component.ts

```tsx
// File: app.component.ts

import { AfterViewInit, Component, Input, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MovieComponent } from './movie/movie.component';

@Component({
  selector: 'app-root',
  imports: [MovieComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements AfterViewInit {
  title = 'myapp';
  parentMsg = 'This is a message from parent';
  msgFromChild='';

  @ViewChild(MovieComponent) movieComp:any;

  ngAfterViewInit(){
    this.msgFromChild = this.movieComp.childMsg;
    console.log(this.msgFromChild);
  }

  receiveMessage($event:any){
    this.msgFromChild = $event;
  }

}
```

## app.component.html

```tsx
      <!-- app.component.html (Parent) ======================= -->

      <!-- <app-movie [fromParent]="parentMsg" ></app-movie> -->
      
      <app-movie [fromParent]="parentMsg" (messageEvent)="receiveMessage($event)" ></app-movie>
      
      <p>{{msgFromChild}}</p>
      <!-- ======================= -->
```

# Child

## movie.component.ts

```tsx
// <!-- movie.component.html (Child) ================= -->
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-movie',
  imports: [],
  templateUrl: './movie.component.html',
  styleUrl: './movie.component.css'
})

export class MovieComponent { 
  childMsg:string ='this is a message from child to daddy';
  outputChildMsg:string ='Message from child component via Output';
 
  @Input() fromParent : any;
 
  @Output() messageEvent = new EventEmitter<string>();
 
  emitMessage(){
    this.messageEvent.emit(this.outputChildMsg);
  }
}
```

```tsx
<!-- movie.component.html (Child) ================= -->

<p>movie works!</p>
<h2>{{ fromParent }}</h2>

<button (click)="emitMessage()">Show</button>
```