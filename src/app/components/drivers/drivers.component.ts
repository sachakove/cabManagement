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
  @Output() driverMarker: EventEmitter<Driver> = new EventEmitter(); // event to show driver on map (as marker) & on tasks
  @Output() driverLocation: EventEmitter<Driver> = new EventEmitter(); // event to show driver on map (as info-win) & on tasks

  constructor(private service: MainService) { }

  ngOnInit() {
  }

  onShowLocation(driver: Driver) {
    // this.showLocation.emit(driver);
    this.showLocation.emit(driver);
    
  }

  onDriver(driver:Driver) {
    // this.currentDriver.emit(driver);
    this.driverMarker.emit(driver);
  }

  // remove selected driver from the list
  removeDriver(driver: Driver) {
    this.service.remove(driver);
  }

}
