import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpUserService } from '../Services/http-user.service';
import { User } from 'models/User';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  public user: User = new User();

  constructor(private router: Router, private httpUserService: HttpUserService) { }

  ngOnInit(): void {
  }

  register() {
    if (!this.user.name.trim()) {
      alert('Vui lòng nhập họ tên.');
      return;
    }
    if (!this.user.username.trim()) {
      alert('Vui lòng nhập tên tài khoản.');
      return;
    }
    if (!this.user.password.trim()) {
      alert('Vui lòng nhập mật khẩu.');
      return;
    }

    // Call HttpUserService to register the user
    this.httpUserService.register(this.user).subscribe(
      () => {
        console.log('Đăng ký tài khoản thành công');
        alert('Đăng ký tài khoản thành công!');   
        this.router.navigate(['/login']); 
      },
      error => {
        console.error('Error registering user:', error);
        alert('Registration failure !');
      }
    );
  }
}
