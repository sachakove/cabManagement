import { Component, OnInit, Input, OnChanges, SimpleChange, SimpleChanges } from '@angular/core';
import { MainService } from '../../services/main.service';

import { Driver } from '../../models/driver';
import { Task } from '../../models/task';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnChanges {

  drivers: Driver[] = []; // array with all drivers (from service)
  tasks: Task[] = []; // array with all tasks (from service)
  schTasks: Task[] = []; // array whith unscheduled tasks (from service)
  currentDriver: Driver; // display currentDriver on the table 
  driverMarker: Driver; // selected driver
  driverLocation: Driver; // selected driver
  showAllMap: boolean = false; // whether to display or not all tasks (scheduled & unscheduled)
  showUnMap: boolean = false; // whether to display or not unscheduled tasks
  location: boolean = false; // whether to display or not info-window about the currentDriver
  showMarker: boolean = false; // whether to display or not marker on the location of the currentDriver 

  constructor(private service: MainService) { }

  ngOnInit() { this.getDrivers(); }

  ngOnChanges(changes: SimpleChanges) {
  }

  // get the drivers list from the service
  getDrivers() {
    this.service.getDrivers().subscribe(drivers => {
      this.drivers = drivers;
      this.getTasks();
    });
  }

  // get the tasks list & the unscheduled tasks from the service
  getTasks() {
    this.service.getTasks().subscribe(tasks => {
      this.tasks = tasks;
    });
    this.service.getSchTasks().subscribe(schTasks => {
      this.schTasks = schTasks;
    });
  }

  // getting the selected driver from the drivers-component
  onShowMarker(driver: Driver) {
    this.driverMarker = driver;
    this.showUnMap = false;
    this.showAllMap = false;
    this.currentDriver = driver;
  }

   // getting the selected driver from the drivers-component
   onShowLocation(driver: Driver) {
    this.driverLocation = driver;
    this.showUnMap = false;
    this.showAllMap = false;
    this.currentDriver = driver;
  }

  // displaying all tasks on the map and table (from app-tasks)
  showAll() {
    this.showUnMap = false;
    this.showAllMap = true;
  }

  // displaying unsceduled tasks on the map and table (from app-tasks)
  showUn() {
    this.showAllMap = false
    this.showUnMap = true;
  }

}
