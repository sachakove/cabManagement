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
  showDriver: boolean = false; // whether to display or not currentDriver on the map (info or marker) & table 
  currentDriver: Driver; // selected driver
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
  onCurrentDriver(driver: Driver) {
    this.currentDriver = driver;
    this.showDriver = true; // show currentDriver on the map (info or marker)
    this.showMarker = true; // display marker instand info-window
    this.location = false;
    this.showUnMap = false;
    this.showAllMap = false;
  }

   // getting the selected driver from the drivers-component
   onShowLocation(driver: Driver) {
    this.currentDriver = driver;
    this.showMarker = false;
    this.location = true; // display info-window instand marker
    this.showDriver = true; // show currentDriver on the map (info or marker)
    this.showUnMap = false;
    this.showAllMap = false;
  }

  // displaying all tasks on the map and table (from app-tasks)
  showAll() {
    this.showDriver = false;
    this.showUnMap = false;
    this.showAllMap = true;
  }

  // displaying unsceduled tasks on the map and table (from app-tasks)
  showUn() {
    this.showDriver = false;
    this.showAllMap = false
    this.showUnMap = true;
  }

}
