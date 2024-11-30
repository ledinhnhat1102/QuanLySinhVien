import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpUserService } from '../Services/http-user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public username: string = '';
  public password: string = '';
  public message: string = '';

  constructor(private router: Router, private httpUserService: HttpUserService) { }

  ngOnInit(): void {
  }

  login() {
    this.httpUserService.login(this.username, this.password).subscribe(
      (resp) => { 
        this.message = resp.msg; 
        if (resp.success) {
          console.log('Đăng nhập thành công!'); 
          this.router.navigate(['stocks', 'list']);
          alert('Đăng nhập thành công!');
          this.router.navigate(['students']);
        } else {
          console.log('Tài khoản hoặc mật khẩu không chính xác!'); 
          alert('Tài khoản hoặc mật khẩu không chính xác!');
        }
      },
      (err) => { 
        console.error('Error logging in', err);
        this.message = 'An error occurred. Please try again later.'; 
      }
    );
  }
  
  
}
