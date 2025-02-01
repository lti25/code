# 99. [ReactiveForm] Registration Form with Validation

Status: Not started

```tsx
<div class="container">
    <h2>Reactive Form</h2>
    <form [formGroup]="form"  (ngSubmit)="onSubmit()">
        <div class="form-group">
            <label for="firstName" class="form-label">First Name:</label>
            <input type="text" class="form-control" formControlName="firstName" name="firstName" id="firstName">
        </div>
        <div class="alert alert-danger error-message" *ngIf="(firstName.touched || firstName.dirty )&& firstName.invalid ">
            <span *ngIf="firstName.errors['required']">First Name is required</span>
        </div>

        <div class="form-group">
            <label for="lastName" class="form-label">Last Name:</label>
            <input type="text" class="form-control" formControlName="lastName" name="lastName" id="lastName">
        </div>
        <div class="alert alert-danger error-message" *ngIf="(lastName.touched || lastName.dirty )&& lastName.invalid ">
            <span *ngIf="lastName.errors['required']">Last Name is required</span>
        </div>

        <div class="form-group">
            <label for="password" class="form-label">Password:</label>
            <input type="text" class="form-control" formControlName="password" name="password" id="password">
        </div>
        <div class="alert alert-danger error-message" *ngIf="(password.touched || password.dirty )&& password.invalid ">
            <span *ngIf="password.errors['required']">Password is required</span>
            <span *ngIf="password.errors['minlength']">Password length should be min 6 character</span>
        </div>

        <div class="form-group">
            <label for="confirmPassword" class="form-label">Confirm Password:</label>
            <input type="text" class="form-control" formControlName="confirmPassword" name="confirmPassword" id="confirmPassword">
            <div class="alert alert-danger error-message" *ngIf="(confirmPassword.touched || confirmPassword.dirty )&& confirmPassword.invalid ">
                <span *ngIf="confirmPassword.errors['required']">Confirm Password is required</span>
            </div>
            <div *ngIf="confirmPassword.value != password.value">
                <span >Passwords do not match</span>
            </div>
        </div>

        <div class="form-group">
            <label for="phoneNumber" class="form-label">Phone number:</label>
            <input type="phoneNumber" class="form-control" formControlName="phoneNumber" name="phoneNumber" id="phoneNumber">
        </div>
        <div class="alert alert-danger error-message" *ngIf="(phoneNumber.touched || phoneNumber.dirty )&& phoneNumber.invalid ">
            <span *ngIf="phoneNumber.errors['required']">Phone Number is required</span>
        </div>

        <div class="form-group">
            <label for="email" class="form-label">Email:</label>
            <input type="email" class="form-control" formControlName="email" name="email" id="email">
        </div>
        <div class="alert alert-danger error-message" *ngIf="(email.touched || email.dirty )&& email.invalid ">
            <span *ngIf="email.errors['required']">Email is required</span>
            <span *ngIf="email.errors['email']">Enter a vaild email address</span>
        </div>

        <div class="form-group">
            <label for="age" class="form-label">Age:</label>
            <input type="age" class="form-control" formControlName="age" name="age" id="age">
        </div>
        <div class="alert alert-danger error-message" *ngIf="(age.touched || age.dirty )&& age.invalid ">
            <span *ngIf="age.errors['required']">Age is required</span>
            <span *ngIf="age.errors['min']">Age must be at least 18</span>
        </div>
        

        <button type="submit" (click)="form" [disabled]="form.valid">Submit</button>
    </form>
    <div></div>
</div>

-------------------------------------------------------------------ts---------------------------------------------------------------------------

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  form : FormGroup;
  constructor(private formBuilder : FormBuilder) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      firstName : this.formBuilder.control("",Validators.required),
      lastName : this.formBuilder.control("",Validators.required),
      password : this.formBuilder.control("", [Validators.required,Validators.minLength(6)]),
      confirmPassword: this.formBuilder.control("",Validators.required),
      phoneNumber: this.formBuilder.control("",Validators.required),
      email : this.formBuilder.control("",[Validators.required,Validators.email]),
      age : this.formBuilder.control("",[Validators.required,Validators.min(18)])

    });
  }

  public get firstName() : FormControl{
    return this.form.get('firstName') as FormControl;
  }

  public get lastName() : FormControl{
    return this.form.get('lastName') as FormControl;
  }

  public get password() : FormControl{
    return this.form.get('password') as FormControl;
  }

  public get confirmPassword() : FormControl{
    return this.form.get('confirmPassword') as FormControl;
  }

  public get phoneNumber() : FormControl{
    return this.form.get('phoneNumber') as FormControl;
  }

  public get email() : FormControl{
    return this.form.get('email') as FormControl;
  }

  public get age() : FormControl{
    return this.form.get('age') as FormControl;
  }

  onSubmit(){
    if(this.form.valid){
      window.alert("Form submitted successfully!")
      console.log(this.form);
    }
     
  }
  

}

```