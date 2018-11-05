import { Component, OnInit, Input, OnChanges, SimpleChanges, SimpleChange } from '@angular/core';

import { Driver } from '../../models/driver';
import { Task } from '../../models/task';
import { Marker } from '../../models/marker';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit, OnChanges {

  @Input() drivers: Driver[]; // getting drivers list from dashboard
  @Input() tasks: Task[]; // getting tasks list from dashboard
  @Input() schTasks: Task[]; // getting unscheduled tasks from dashboard
  @Input() driverMarker: Driver; // getting selected driver (from app-drivers --> app-dashboard)
  @Input() driverLocation: Driver; // getting selected driver (from app-drivers --> app-dashboard)
  @Input() showAllMap: boolean = false;
  @Input() showUnMap: boolean = false;
  showDriver: boolean = false;
  location: boolean = false;
  showMarker: boolean = false;
  tasksMarks: string = 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png';
  markers: Marker[] = [];
  marker: Marker = {
    latitude: null,
    longitude: null
  }
  lat: number = 31.4;
  lng: number = 35.35;

  constructor() { }

  ngOnInit() { }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.driverMarker) {
      if (this.driverMarker !== undefined) {
        this.showDriver = true;
        this.showMarker = true;
        this.showAllMap = false;
        this.showUnMap = false;
        this.location = false;
      }
    }
    if (changes.driverLocation) {
      if (this.driverLocation !== undefined) {
        this.showDriver = true;
        this.location = true;
        this.showMarker = false;
        this.showAllMap = false;
        this.showUnMap = false;
      }
    }

    if(changes.showAllMap || changes.showUnMap) {
      this.markers.splice(0, this.markers.length);
      if(this.showAllMap === true) {
        this.showDriver = false;
        this.location = false;
        this.showMarker = false;
        this.allTasks();
      }
      if(this.showUnMap === true) {
        this.showDriver = false;
        this.location = false;
        this.showMarker = false;
        this.notScheduledTasks();
      }
    }
  }

  allTasks() {
    this.tasks.forEach(task => {
      this.marker = { latitude: null, longitude: null };
      this.marker.latitude = task.latitude;
      this.marker.longitude = task.longitude;
      this.markers.push(this.marker);
    });
  }

  notScheduledTasks() {
    this.schTasks.forEach(task => {
      this.marker = { latitude: null, longitude: null };
      this.marker.latitude = task.latitude;
      this.marker.longitude = task.longitude;
      this.markers.push(this.marker);
    });
  }

}
