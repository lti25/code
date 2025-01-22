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
  //todo: complete missing code..
  ];

  filter: 'all' | 'passed' | 'failed' = 'all';
  sortAsc: boolean = true;

  get filteredStudents() {
   //todo: complete missing code..
  }

  // New methods added
  getClassForGrade(grade: number): string {
   //todo: complete missing code..
  }

  getColorForGrade(grade: number): string {
   //todo: complete missing code..
  }  

}