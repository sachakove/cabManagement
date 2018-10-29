import { Component, OnInit } from '@angular/core';
import { MainService } from '../../services/main.service';

import { Driver } from '../../models/driver';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  driver: Driver = {
    _id: '',
    name: '',
    age: null,
    email: '',
    longitude: null,
    latitude: null,
    picture: '',
    address: '',
    isActive: true,
    tasks: [
      {
          _id: '',
          title: '',
          scheduled_for: '',
          address: '',
          longitude: null,
          latitude: null
      }
    ]
  }

  constructor(private service: MainService) { }

  ngOnInit() {
  }

  addDriver(driver: Driver) {
    this.service.save(driver);
  }

}
