# 34.2.1 [cw][✨Reactive Form] Develop an Angular application for collecting contact information from users

Status: Not started

Abdullah Soln.

# contact-form.component.ts

```tsx
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.css']
})

export class ContactFormComponent {
  //todo: please complete missing code..
  contactForm : FormGroup;
  submitted : boolean = false;
 
  constructor(private fb:FormBuilder){
    this.contactForm = fb.group({
      name : ['' , [Validators.required , Validators.minLength(3)]],
      email : ['' , [Validators.required , Validators.email]],
      phoneNumber : ['' , [Validators.required , Validators.pattern('^[0-9]{10}$')]],
    });
  }
 
  onSubmit(){
    if(this.contactForm.valid){
      this.submitted = true;
    }
  }
}
```

# contact-form.component.html

```tsx
<!-- //todo: complete missing code.. -->

<form [formGroup]="contactForm" (ngSubmit)="onSubmit()">
  <div>
    <label for="name">Name:</label>
    <input id="name" formControlName="name" />
    <div *ngIf="contactForm.get('name')?.invalid && contactForm.get('name')?.touched">
      Name is required and must be at least 3 characters long.
    </div>
  </div>

  <div>
    <label for="email">Email:</label>
    <input id="email" formControlName="email" />
    <div *ngIf="contactForm.get('email')?.invalid && contactForm.get('email')?.touched">
      Please enter a valid email.
    </div>
  </div>

  <div>
    <label for="phoneNumber">Phone Number:</label>
    <input id="phoneNumber" formControlName="phoneNumber" />
    <div *ngIf="contactForm.get('phoneNumber')?.invalid && contactForm.get('phoneNumber')?.touched">
      Please enter a valid phone number.
    </div>
  </div>

  <button type="submit" [disabled]="contactForm.invalid">Submit</button>
</form>

<div *ngIf="submitted">
  <h3>Contact Information</h3>
  <p>Name: {{ contactForm.value.name }}</p>
  <p>Email: {{ contactForm.value.email }}</p>
  <p>Phone Number: {{ contactForm.value.phoneNumber }}</p>
</div>
```