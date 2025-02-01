# 32.3.1 (10/10) Student Grade Management System Implementing Directives

Status: Not started

32.3.1 (10/10) **Student Grade Management System Implementing Directives**

[student-grades.component.ts](32%203%201%20(10%2010)%20Student%20Grade%20Management%20System%20Imp%2017f299dbb04a804c9ebcea5300bb5947/student-grades.component_(1).ts)

# student-grades.component.ts

```tsx
// src/app/student-grades/student-grades.component.ts
import { Component } from '@angular/core';
import { Student } from '../models/model';

@Component({
  selector: 'app-student-grades',
  templateUrl: './student-grades.component.html',
  styleUrls: ['./student-grades.component.css']
})

  export class StudentGradesComponent {
    students: Student[] = [
    // //todo: complete missing code..  
    { name: 'Alice', subject: 'Math', grade: 85 },
    { name: 'Eve', subject: 'Science', grade: 75 },
    { name: 'Charlie', subject: 'History', grade: 60 },
    { name: 'Bob', subject: 'Science', grade: 45 },
    { name: 'David', subject: 'Math', grade: 30 }
  ];  

  filter: 'all' | 'passed' | 'failed' = 'all';
  sortAsc: boolean = true;

  get filteredStudents() {
   //todo: complete missing code..
   return this.students.filter(student => {

      if (this.filter === 'all') {
        return true;
      }      
      if (this.filter === 'passed' && student.grade < 50) {
        return false;
      }
      if (this.filter === 'failed' && student.grade >= 50) {
        return false;
      }
      return true;
    }).sort((a, b) => {
      if (this.sortAsc) {
        return a.grade - b.grade;
      } else {
        return b.grade - a.grade;
      }
    });

  }

  // New methods added
  getClassForGrade(grade: number): string {
   //todo: complete missing code..
   return grade >= 50? 'pass' : 'fail';   
  }

  getColorForGrade(grade: number): string {
   //todo: complete missing code..
   return grade >= 50? 'green' : 'red';
  }   

}
```