import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { CommonService } from '../Services/common.service';
import { ServerHttpService } from '../Services/server-http.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Student } from 'models/Student';

@Component({
  selector: 'app-student-form',
  templateUrl: './student-form.component.html',
  styleUrls: ['./student-form.component.css'],
})
export class StudentFormComponent implements OnInit {
  public id = 0;
  public studentForm = new FormGroup({
    code: new FormControl(''),
    gender: new FormControl(''),
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    dob: new FormControl(''),
    email: new FormControl(''),
    phone: new FormControl(''),
    picture: new FormControl(''),
  });

  constructor(
    private common: CommonService,
    private serverHttp: ServerHttpService,
    private router: Router,
    private route: ActivatedRoute //nhan dc tham so
  ) {}

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    this.id = idParam ? +idParam : 0; //+idParam  chuyen string -number
    if (this.id > 0) {
      this.loadData(this.id);
    }
  }

  private loadData(id: number) {
    this.serverHttp.getStudent(id).subscribe((data) => {
      console.log('getStudent', data);
      for (const controlName in this.studentForm.controls) {
        if (controlName) {
          this.studentForm.controls[controlName].setValue(data[controlName]);
        }
      }
    });
  }

  private createNewData(id: number): Student {
    const newStudent: { [key: string]: any } = {}; //co the chua 1 chuoi or any
    for (const controlName in this.studentForm.controls) {
      if (controlName) {
        newStudent[controlName] = this.studentForm.controls[controlName].value;
      }
    }
    newStudent['id'] = id; // đặt ID cho sinh viên mới
    return newStudent as Student;
  }

  public saveAndGotoList() {
    if (this.id > 0) {
      this.serverHttp
        .modifyStudent(this.id, this.createNewData(this.id))
        .subscribe((data) => {
          this.router.navigate(['students']);
        });
    } else {
      this.serverHttp.getStudents().subscribe((students) => {
        const maxId = Math.max(...students.map((student: { id: any; }) => student.id));
        const newId = maxId + 1;
        this.serverHttp.addStudent(this.createNewData(newId)).subscribe((data) => {
          this.router.navigate(['students']);
        });
      });
    }
  }

  public save() {
    if (this.id > 0) {
      this.serverHttp.modifyStudent(this.id, this.createNewData(this.id)).subscribe((data) => {
        // Xử lý khi lưu thành công
      });
    } else {
      this.serverHttp.getStudents().subscribe((students) => {
        const maxId = Math.max(...students.map((student: { id: any; }) => student.id));
        const newId = maxId + 1;
        this.serverHttp.addStudent(this.createNewData(newId)).subscribe((data) => {
          this.common.increamentStudent();
          this.studentForm.reset();
        });
      });
    }
  }
  public randomStudent() {
    this.serverHttp.getRandomStudent().subscribe((data) => {
      console.log('getRandomStudent', data);
      if (data && data.results && data.results.length > 0) {
        const student = data.results[0];
        this.studentForm.controls['code'].setValue(
          (student.id.name || '') + '-' + (student.id.value || '')
        );
        this.studentForm.controls['gender'].setValue(student.gender);
        this.studentForm.controls['firstName'].setValue(student.name.first);
        this.studentForm.controls['lastName'].setValue(student.name.last);
        this.studentForm.controls['dob'].setValue(student.dob.date);
        this.studentForm.controls['email'].setValue(student.email);
        this.studentForm.controls['phone'].setValue(student.phone);
        this.studentForm.controls['picture'].setValue(student.picture.large);
      }
    });
  }
}
