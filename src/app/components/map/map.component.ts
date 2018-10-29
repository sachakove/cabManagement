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
  @Input() currentDriver: Driver; // getting selected driver (from app-drivers --> app-dashboard)
  @Input() showDriver: boolean; // 
  @Input() showAllMap: boolean;
  @Input() showUnMap: boolean;
  @Input() location: boolean;
  @Input() showMarker: boolean;
  tasksMarks: string = 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png';
  markers: Marker[] = [];
  marker: Marker = {
    latitude: null,
    longitude: null
  }
  lat: number = 31.4;
  lng: number = 35.35;

  constructor() { }

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges) {
    if(changes.showAllMap) {
      this.markers.splice(0, this.markers.length);
      if(this.showAllMap === true) {
        this.allTasks();
      }
      if(this.showUnMap === true) {
        this.notScheduledTasks();
      }
    }
    if(this.location === true) {
      console.log(this.showUnMap, this.showAllMap, this.location, this.showDriver);
      console.log(this.currentDriver);
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
