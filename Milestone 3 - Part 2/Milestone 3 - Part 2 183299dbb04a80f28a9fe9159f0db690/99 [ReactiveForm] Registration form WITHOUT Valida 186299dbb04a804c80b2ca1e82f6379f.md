# 99. [ReactiveForm] Registration form WITHOUT Validation

Status: Not started

```tsx
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-eventform',
  templateUrl: './eventform.component.html',
  styleUrls: ['./eventform.component.css']
})
export class EventformComponent implements OnInit {

  registrationForm : FormGroup;
  submitted : boolean = false;
  formData : any;
  sportsList : string[] = ["Football","Basketball","Athletics","Tennis"];
  selectedSports : string;

  constructor(private formBuilder : FormBuilder) { }

  ngOnInit(): void {
    this.registrationForm = this.formBuilder.group({
      name: this.formBuilder.control(""),
      age: this.formBuilder.control(""),
      grade: this.formBuilder.control(""),
      gender: this.formBuilder.control(""),
      email: this.formBuilder.control(""),
      phone: this.formBuilder.control(""),
      sports: this.formBuilder.group({
        sport1: this.formBuilder.control(""),
        sport2: this.formBuilder.control(""),
        sport3: this.formBuilder.control(""),
        sport4: this.formBuilder.control("")
      })
    });
  }

  public getSelectedSports() : string{
    let st : string = "";

    let gp : FormGroup = this.registrationForm.get('sports') as FormGroup;

    if(gp.get('sport1').value){
      st = st + this.sportsList[0]+",";
    }

    if(gp.get('sport2').value){
      st = st + this.sportsList[1]+",";
    }

    if(gp.get('sport3').value){
      st = st + this.sportsList[2]+",";
    }

    if(gp.get('sport4').value){
      st = st + this.sportsList[3]+",";
    }

    if(st.endsWith(',')){
      st = st.substring(0,st.length-1);
    }
    console.log(st);
    return st;
  }

  public onSubmit(){
    this.submitted = true;
    this.formData = this.registrationForm.value;
    this.selectedSports = this.getSelectedSports();
    this.registrationForm.reset();
  }

  public closeModal(){
    this.submitted = false;
  }

}

---------------------------------------------HTML---------------------------------------------------

<div class="container d-flex justify-content-center">
    <form [formGroup]="registrationForm" (ngSubmit)="onSubmit()">
        <h1>Registration Form</h1>

        <div class="form-group">
            <label for="name" class="form-label">Name:<span style="color: red;">*</span></label>
            <input type="text" formControlName="name" name="name" id="name" class="form-control" placeholder="Name">
        </div>

        <div class="form-group">
            <label for="age" class="form-label">Age:<span style="color: red;">*</span></label>
            <input type="text" formControlName="age" name="age" id="age" class="form-control" placeholder="Age">
        </div>

        <div class="form-group">
            <label for="grade" class="form-label">Grade:<span style="color: red;">*</span></label>
            <input type="text" formControlName="grade" name="grade" id="grade" class="form-control" placeholder="Grade">
        </div>

        <div class="form-group">
            <label for="gender" class="form-label">Gender:<span style="color: red;">*</span></label>
            <select formControlName="gender" name="gender" id="gender" class="form-control">
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
            </select>
        </div>

        <div class="form-check" class="form-label" formGroupName="sports">
            <label class="form-check-label" class="form-label">Sports<span style="color: red;">*</span></label>
                <input type="checkbox" formControlName="sport1" name="sport1" id="sport1" class="form-check-input" value="{{sportsList[0]}}"> {{sportsList[0]}}
                <input type="checkbox" formControlName="sport2" name="sport2" id="sport2" class="form-check-input" value="{{sportsList[1]}}"> {{sportsList[1]}}
                <input type="checkbox" formControlName="sport3" name="sport3" id="sport3" class="form-check-input" value="{{sportsList[2]}}"> {{sportsList[2]}}
                <input type="checkbox" formControlName="sport4" name="sport4" id="sport4" class="form-check-input" value="{{sportsList[3]}}"> {{sportsList[3]}}
        </div>

        <div class="form-group">
            <label for="email" class="form-label">Email:<span style="color: red;">*</span></label>
            <input type="email" formControlName="email" name="email" id="email" class="form-control" placeholder="Email">
        </div>

        <div class="form-group">
            <label for="phone" class="form-label">Phone:<span style="color: red;">*</span></label>
            <input type="text" formControlName="phone" name="phone" id="phone" class="form-control" placeholder="Phone">
        </div>

        <button class="bnt bnt-primary" type="submit">Submit</button>

    </form>
</div>

<div class="container" *ngIf="submitted">
    <h1>Registration Successfull</h1>
    <p>Name: {{formData.name}}</p>
    <p>Age: {{formData.age}}</p>
    <p>Grade: {{formData.grade}}</p>
    <p>Gender: {{formData.gender}}</p>
    <p>Sports: {{selectedSports}}</p>
    <p>Email: {{formData.email}}</p>
    <p>Phone: {{formData.phone}}</p>
    <br>
    <button class="btn btn-primary" (click)="closeModal()">Close</button>
</div>
```

[task-detail.component.ts.txt](99%20%5BReactiveForm%5D%20Registration%20form%20WITHOUT%20Valida%20186299dbb04a804c80b2ca1e82f6379f/task-detail.component.ts.txt)