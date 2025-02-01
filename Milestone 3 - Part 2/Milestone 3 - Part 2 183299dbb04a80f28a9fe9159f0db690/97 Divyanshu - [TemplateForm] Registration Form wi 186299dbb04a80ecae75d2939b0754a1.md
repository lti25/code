# 97. Divyanshu - [TemplateForm] Registration Form with Validation

Status: Not started

```tsx
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

export interface User{
  firstName ?: string;
  lastName ?: string;
  mobileNumber ?: string;
  email ?: string;
  password ?: string;
  confirmPassword ?: string;
}

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  user : User = {};
  isFormSubmitted : boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  public onSubmit(registrationForm : NgForm){
    if(registrationForm.valid){
      this.isFormSubmitted = true;
    }
  }

  public resetForm(registrationForm : NgForm){
    registrationForm.resetForm();
    this.isFormSubmitted = false;
  }

}
```

```html

<div class="container d-flex justify-content-center">
    <form ngForm #registrationForm="ngForm" (ngSubmit)="onSubmit(registrationForm)">
        <h2>User Registration</h2>
        <div class="form-group">
            <label for="firstName">Enter the First Name:</label>
            <input class="form-control" type="text" [(ngModel)]="user.firstName" #firstName="ngModel" required minlength="6" name="firstName" id="firstName">
            <div class="error-message alert alert-danger" *ngIf="firstName.touched && firstName.invalid">
                <span *ngIf="firstName.errors['required']">First Name is required</span>
                <span *ngIf="firstName.errors['minlength']">Need at least 6 characters.</span>
            </div>
        </div>

        <div class="form-group">
            <label for="lastName">Enter the Last Name:</label>
            <input class="form-control" type="text" [(ngModel)]="user.lastName" #lastName="ngModel" required minlength="6" name="lastName" id="lastName">
            <div class="error-message alert alert-danger" *ngIf="lastName.touched && lastName.invalid">
                <span *ngIf="lastName.errors['required']">Last Name is required</span>
                <span *ngIf="lastName.errors['minlength']">Need at least 6 characters.</span>
            </div>
        </div>

        <div class="form-group">
            <label for="mobileNumber">Enter the Mobile Number:</label>
            <input class="form-control" type="text" [(ngModel)]="user.mobileNumber" #mobileNumber="ngModel" required pattern="[0-9]{10}" name="mobileNumber" id="mobileNumber">
            <div class="error-message alert alert-danger" *ngIf="mobileNumber.touched && mobileNumber.invalid">
                <span *ngIf="mobileNumber.errors['required'] || mobileNumber.errors['pattern']">Mobile Number is required and should be 10 digits.</span>
            </div>
        </div>

        <div class="form-group">
            <label for="email">Enter the Email:</label>
            <input class="form-control" type="email" [(ngModel)]="user.email" #email="ngModel" required email name="email" id="email">
            <div class="error-message alert alert-danger" *ngIf="email.touched && email.invalid">
                <span *ngIf="email.errors['required'] || email.errors['email']">Email is required and must be a valid email address.</span>
            </div>
        </div>

        <div class="form-group">
            <label for="password">Enter the Password:</label>
            <input class="form-control" type="password" 
                                        [(ngModel)]="user.password"
                                        #password="ngModel"
                                        required
                                        minlength="8"
                                        pattern="^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[0-9])(?=.*?[!@#$%^&*]).{8,}$"
                                        name="password"
                                        id="password">
            <div class="error-message alert alert-danger" *ngIf="password.touched && password.invalid">
                <span *ngIf="password.errors['required']">Passowrd is required.</span>
                <span *ngIf="password.errors['minlength']">Need at least 8 characters.</span>
                <span *ngIf="password.errors['pattern']">Password must contain at least 1 numerical character and 1 special character.</span>
            </div>
        </div>

        <div class="form-group">
            <label for="confirmPassword">Confirm Password:</label>
            <input class="form-control" type="password" [(ngModel)]="user.confirmPassword" #confirmPassword="ngModel" required name="confirmPassword" id="confirmPassword">
            <div class="error-message alert alert-danger" *ngIf="confirmPassword.touched && (confirmPassword.invalid || password.value != confirmPassword.value)">
                <div *ngIf="confirmPassword.errors['required'] && confirmPassword.invalid">Confirm Passowrd is required.</div>
                <div *ngIf="password.value != confirmPassword.value">Passwords do not match.</div>
            </div>
        </div>

        <button type="submit" [disabled]="registrationForm.invalid">Submit</button>
        <button type="button" (click)="resetForm(registrationForm)">Reset</button>
    </form>
</div>

<div class="success-message">
    <span *ngIf="isFormSubmitted">From submitted successfully!</span>
</div>
```