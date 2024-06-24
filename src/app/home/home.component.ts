import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public name = 'Huy Nguyễn';
  public age: any;

  public vehicles = ['Toyota', 'Honda', 'Nissan', 'Ford', 'Mustang'];

  constructor() { }

  ngOnInit(): void {
  }

}
