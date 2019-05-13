import { Component } from '@angular/core';

interface ICar {
  brand: string;
  model?: string;
  type?: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'leave-system';

  brand: string;
  model: string;
  type: string;

  types = ['SPORT', 'MINI', 'VAN'];

  fruits = ['Apple', 'Banana', 'Orange'];
  cars = [
    {brand: 'TOYOTA', model: 'Revo'},
    {brand: 'HONDA', model: 'Civic'}
  ];

  addCar() {
    const obj: ICar = {
      brand: 'xx',
      model: 'xxx',
      type: this.type
    };

    const obj2: any = {};
    obj2.model = this.model;
    obj2.brand = this.brand;
    obj2.type = this.type;

    this.cars.push(obj2);
  }

  removeCar(idx: number) {
    this.cars.splice(idx, 1);
  }

}
