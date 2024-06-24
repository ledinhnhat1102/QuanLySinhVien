import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent implements OnInit {
  public name = '';
  public password = '';
  public vehicles = ['Toyota', 'Honda', 'Nissan', 'Ford', 'Mustang'];
  private selectedVehicle = '';

  constructor() {}

  ngOnInit(): void {}

  public onSubmit() {
    console.log('onSubmit');
    console.log('name = ' + this.name);
    console.log('password = ' + this.password);
    console.log('selected Vehicle = ' + this.selectedVehicle);
  }

  public selectVehicle(event: Event) {
    const target = event.target as HTMLSelectElement;
    this.selectedVehicle = target.value;
    console.log('selectVehicle', this.selectedVehicle);
  }
}
