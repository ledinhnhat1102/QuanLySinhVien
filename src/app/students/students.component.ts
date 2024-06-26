import { Component, OnInit } from '@angular/core';
import { CommonService } from '../Services/common.service';
import { ServerHttpService } from '../Services/server-http.service';
import { Student } from 'models/Student';
import { Router } from '@angular/router';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent implements OnInit {

  public students: Student[] = [];

  constructor(
    private common: CommonService,
    private serverHttp: ServerHttpService,
    private router : Router,
  ) { }

  ngOnInit(): void {
    this.loadData();
  }

  private loadData() {
    this.serverHttp.getStudents().subscribe((data) => {
      console.log('getStudents', data);
      this.students = data;
      this.common.setTotalStudents(data.length);
    });
  }

  public addStudent() {
    this.router.navigate(['student-form', 0]);
    this.loadData();
  }

  public deleteStudent(studentId: number) {
    this.serverHttp.deleteStudent(studentId).subscribe({
      next: (data) => {
        console.log('delete', data);
        this.loadData();
      },
      error: (error) => {
        console.error('Error deleting student:', error);
      }
    });
  }

  public editStudent(studentId: number) {
    this.router.navigate(['student-form', studentId]);
  }
}
