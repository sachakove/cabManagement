import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChange, SimpleChanges } from '@angular/core';
import { MainService } from '../../services/main.service';

import { Task } from '../../models/task';
import { Driver } from '../../models/driver';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit, OnChanges {

  @Input() tasks: Task[]; // tasks array from dashboard
  @Input() schTasks: Task[]; // unscheduled tasks from dashboard
  @Input() drivers: Driver[]; // drivers array from dashboard
  @Input() currentDriver: Driver; // selected driver (from app-drivers --> app-dashboard)
  @Input() showDriver: boolean; // whether to display or not currentDriver on the table (from dashboard)
  @Output() showAll: EventEmitter<void> = new EventEmitter(); // passes event to dashboard whether to display or not all tasks
  @Output() showUn: EventEmitter<void> = new EventEmitter(); // passes event to dashboard whether to display or not unscheduled tasks
  curTasks: Task[] = []; // array to display on table
  allTasks: boolean = false; // whether to display or not all tasks
  unTasks: boolean = false; // whether to display or not unscheduled tasks
  show: boolean = false; // wheter to display or not the table

  constructor(private service: MainService) { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.currentDriver) {
      this.show = false;
    }
  }

  // scheduled new task to driver
  scheduled(driver: Driver, task: Task) {
    task.scheduled_for = driver.name;
    driver.tasks.push(task);
    this.service.update(driver, task);
  }

  showAllTasks() {
    this.allTasks = !this.allTasks;
    this.show = true;
    this.unTasks = false;
    this.curTasks = this.tasks;
    this.showAll.emit();
  }

  showUnTasks() {
    this.unTasks = !this.unTasks;
    this.show = true;
    this.allTasks = false;
    this.curTasks = this.schTasks;
    this.showUn.emit();
  }

}
