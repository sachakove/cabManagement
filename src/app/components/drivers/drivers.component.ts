import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MainService } from '../../services/main.service';
import { Driver } from '../../models/driver';

@Component({
  selector: 'app-drivers',
  templateUrl: './drivers.component.html',
  styleUrls: ['./drivers.component.css']
})
export class DriversComponent implements OnInit {

  driver: Driver;
  @Input() drivers: Driver[]; // drivers array from dashboard
  @Output() currentDriver: EventEmitter<Driver> = new EventEmitter(); // passes the selected driver to dashboard
  @Output() showLocation: EventEmitter<Driver> = new EventEmitter(); // passes event to dashboard to display info-window

  constructor(private service: MainService) { }

  ngOnInit() {
  }

  onShowLocation(driver: Driver) {
    this.showLocation.emit(driver);
  }

  onDriver(driver:Driver) {
    this.currentDriver.emit(driver);
  }

  // remove selected driver from the list
  removeDriver(driver: Driver) {
    this.service.remove(driver);
  }

}
