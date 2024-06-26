import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { HttpClient } from '@angular/common/http';


interface Student {
  id: number;
  name: string;
  gender: string;
  dob: Date;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  totalStudents = 0;
  totalMaleStudents = 0;
  totalFemaleStudents = 0;
  dataSource = new MatTableDataSource<Student>([]);
  displayedColumns: string[] = ['id', 'name', 'gender', 'dob'];

  constructor(private httpClient: HttpClient) { }

  ngOnInit(): void {
    this.fetchStudentsData();
  }

  fetchStudentsData(): void {
    this.httpClient.get<Student[]>('http://localhost:7075/api/SinhVienItems').subscribe(data => {
      this.totalStudents = data.length;
      this.totalMaleStudents = data.filter(student => student.gender === 'Nam').length;
      this.totalFemaleStudents = data.filter(student => student.gender === 'Nữ').length;
      this.dataSource.data = data;
    });
  }
}
