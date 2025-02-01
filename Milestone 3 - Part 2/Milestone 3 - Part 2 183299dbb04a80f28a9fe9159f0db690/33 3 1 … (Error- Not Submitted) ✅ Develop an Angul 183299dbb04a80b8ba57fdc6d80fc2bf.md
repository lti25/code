# 33.3.1 … (Error- Not Submitted) ✅ Develop an Angular application for collecting survey feedback from users

Status: Not started

# survey-from.component.ts

```tsx
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-survey-form',
  templateUrl: './survey-form.component.html',
  styleUrls: ['./survey-form.component.css']
})
export class SurveyFormComponent {
  username: string = ' ';
  feedback: string = ' ';
  submitted: boolean = false;
  onSubmit(form: NgForm)
  {
    if(form.valid){
      this.username=form.value.username;
      this.feedback=form.value.feedback;
      this.submitted=true;
      form.reset();
    }
  }
//todo: complete missing code..
}
```

# survey-form.component.html

```tsx
<div class="container mt-5">
<div class ="container mt-5">
<h2> Survey Feedback Form </h2>
<form #surveyForm ="ngForm" (submit) = "onSubmit(surveyForm)">
<div class="mb-3">
	<label for="username" class="form-label">Username</label>
	<input type="text" id="username" name="username" class="form-control" ngModel required>
	<div *ngIf = "surveyForm.submitted && !surveyForm.controls['username']?.valid" class="text-danger">Username is required</div>
</div>
<div class="mb-3">
<label for ="feedback" class="form-label">Feedback</label>
<textarea id="feedback" name="feedback" class="form-control" ngModel required></textarea>
<div *ngIf = "surveyForm.submitted && !surveyForm.controls['feedback']?.valid" class="text-danger">Feedback is required</div>
</div>
<button type="submit" class="btn btn-primary"> Submit </button>
</form>
<div *ngIf="submitted" class="mt-4">
<h3> Submitted Feedback </h3>
<p><strong> Username: </strong>{{ username }}</p>
<p><strong> Feedback: </strong>{{ feedback }}</p>
</div>
</div>
```

![Screenshot 2025-01-22 222238.png](33%203%201%20%E2%80%A6%20(Error-%20Not%20Submitted)%20%E2%9C%85%20Develop%20an%20Angul%20183299dbb04a80b8ba57fdc6d80fc2bf/Screenshot_2025-01-22_222238.png)

# **My Code:**

## .ts file

```tsx
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-survey-form',
  templateUrl: './survey-form.component.html',
  styleUrls: ['./survey-form.component.css']
})

export class SurveyFormComponent {
  username: string = ' ';
  feedback: string = ' ';
  submitted: boolean = false;

  onMySubmit(form: NgForm){
    console.log("Form Submitted");
    console.log(form);
    console.log(form.valid);
    console.log(form.value.username1);        

    this.username = form.value.username1;
    this.feedback = form.value.feedback;
    this.submitted = true;

    // alert("Form Submitted");
  }

//todo: complete missing code..
}
```

## html

```tsx
<div class="container mt-5">
    <h2>Survey Feedback Form</h2>
    <form #surveyForm="ngForm" (submit)="onMySubmit(surveyForm)" >

        <div class="mb-3">
            <label for="username" class="form-label">Username</label>
            <input type="text" id="username" name="username1" class="form-control" ngModel required>
            <div class="text-danger" id="username-error" style="display: none;">Username is required</div>
        </div>
        <div class="mb-3">
            <label for="feedback" class="form-label">Feedback</label>
            <textarea id="feedback" name="feedback" class="form-control" ngModel required ></textarea>
            <div class="text-danger" id="feedback-error" style="display: none;">Feedback is required</div>
        </div>

        <!-- <button type="button" class="btn btn-primary" onclick="submitForm()">Submit</button> -->
        <button type="submit" class="btn btn-primary">Submit</button>

    </form>
    
    <!-- <div  id="submitted-feedback" class="mt-4"> -->
    <div *ngIf="submitted" id="submitted-feedback" class="mt-4">
    <!-- <div *ngIf="surveyForm.submitted && surveyForm.valid" id="submitted-feedback" class="mt-4"> -->
        <h3>Submitted Feedback</h3>
        <p><strong>Username:</strong> <span id="submitted-username" > {{ username }} </span></p>
        <p><strong>Feedback:</strong> <span id="submitted-feedback-text"> {{ feedback }} </span></p>
    </div>
    
</div>

```