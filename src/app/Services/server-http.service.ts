import { Injectable } from '@angular/core';
import {
  HttpHeaders,
  HttpClient,
  HttpErrorResponse,
} from '@angular/common/http';
import { throwError } from 'rxjs/internal/observable/throwError';
import { Observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Student } from 'models/Student';

@Injectable({
  providedIn: 'root',
})
export class ServerHttpService {
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      // Authorization: 'my-auth-token',
      // Authorization: 'Basic ' + btoa('username:password'),
    }),
  };
   //  private REST_API_SERVER = 'https://localhost:7075/api';  
  private REST_API_SERVER = 'https://96lxj2-8080.csb.app';

  constructor(private httpClient: HttpClient) {}

  public getStudents(): Observable<Student[]> {
    const url = `${this.REST_API_SERVER}/students`;
    return this.httpClient
      .get<Student[]>(url, this.httpOptions)
      .pipe(catchError(this.handleError));
  }
  

  public getStudent(studentId: number) {
    const url = `${this.REST_API_SERVER}/students/` + studentId;
    return this.httpClient
      .get<any>(url, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  public getRandomStudent() {
    const url = `https://randomuser.me/api/?results=1`;
    return this.httpClient
      .get<any>(url, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  public addStudent(data: Student) {
    const url = `${this.REST_API_SERVER}/students`;
    return this.httpClient
      .post<any>(url, data, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  public modifyStudent(studentId: number, data: Student) {
    const url = `${this.REST_API_SERVER}/students/`+ studentId;
    return this.httpClient
      .put<any>(url, data, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  public deleteStudent(studentId: number) {
    const url = `${this.REST_API_SERVER}/students/` + studentId;
    return this.httpClient.delete<any>(url).pipe(catchError(this.handleError));
  }


  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
        // A client-side or network error occurred. Handle it accordingly.
        console.error('An error occurred:', error.error.message);
    } else {
        // The backend returned an unsuccessful response code.
        // The response body may contain clues as to what went wrong,
        // console.error(
        //     `Backend returned code ${error.status}, ` +
        //     `body was: ${JSON.stringify(error.error)}`
        // );
    }
    // return an observable with a user-facing error message
    return throwError('Something bad happened; please try again later.');
  }
  public searchStudents(firstName: string, lastName: string): Observable<Student[]> {
    const url = `${this.REST_API_SERVER}/students`;
    return this.httpClient
      .get<Student[]>(url, this.httpOptions)
      .pipe(
        map(students =>
          students.filter(student =>
            student.firstName.toLowerCase().includes(firstName.toLowerCase()) ||
            student.lastName.toLowerCase().includes(lastName.toLowerCase())
          )
        ),
        catchError(this.handleError)
      );
  }
}
