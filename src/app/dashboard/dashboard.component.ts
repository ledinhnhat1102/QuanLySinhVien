import { Component, OnInit } from '@angular/core';
import { ServerHttpService } from '../Services/server-http.service';
import { MatTableDataSource } from '@angular/material/table';
import { Student } from 'models/Student';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  totalStudents: number = 0;
  totalMaleStudents: number = 0;
  totalFemaleStudents: number = 0;
  dataSource = new MatTableDataSource<Student>([]);
  displayedColumns: string[] = ['id', 'name', 'gender', 'dob'];

  constructor(private serverHttp: ServerHttpService) {}

  ngOnInit(): void {
    this.fetchStudentsData();
  }

  fetchStudentsData(): void {
    this.serverHttp.getStudents().subscribe(
      (students: Student[]) => {
        this.dataSource.data = students;
        this.totalStudents = students.length;
        this.totalMaleStudents = students.filter(student => student.gender === 'Nam').length;
        this.totalFemaleStudents = students.filter(student => student.gender === 'Nữ').length;
      },
      (error) => {
        console.error('Lỗi khi lấy dữ liệu sinh viên:', error);
      }
    );
  }
}
