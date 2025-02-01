# 29.3.2 (CW) Develop an Angular application for managing online course information

# Models/courses.ts

```tsx
// src/app/models/course.model.ts
// complete model class

  export class Course{
    constructor(
        public title: string,
        public instructor: string,
        public duration: string,
        public description: string
        )  {}  
  }
```

# app/course

## course.component.ts

```tsx
// src/app/course/course.component.ts
import { Component } from '@angular/core';
import { Course } from '../Models/course';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent {
//todo: complete missing code...

  course: Course = new Course(
    'Introduction to Angular',
    'John Doe',
    '5 hours',
    'A comprehensive course on Angular framework.'
  );

}
```

## course.component.html

```tsx
<!-- //todo: complete missing code... -->

<div class="course-details">
    <h2>{{ course.title }}</h2>
    <p><strong>Instructor:</strong> {{ course.instructor }}</p>
    <p><strong>Duration:</strong> {{ course.duration }}</p>
    <p><strong>Description:</strong> {{ course.description }}</p>
</div>
  
```