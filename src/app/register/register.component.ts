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
      alert('Please enter your name.');
      return;
    }
    if (!this.user.username.trim()) {
      alert('Please enter a username.');
      return;
    }
    if (!this.user.password.trim()) {
      alert('Please enter a password.');
      return;
    }

    // Call HttpUserService to register the user
    this.httpUserService.register(this.user).subscribe(
      () => {
        console.log('User registered successfully');
        alert('Registration successful!');   
        this.router.navigate(['/login']); // Redirect to login page after successful registration
      },
      error => {
        console.error('Error registering user:', error);
        alert('Registration failure !');
      }
    );
  }
}
