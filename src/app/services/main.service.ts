import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';

import { Driver } from '../models/driver';
import { Task } from '../models/task';

@Injectable({
  providedIn: 'root'
})
export class MainService {

  urlDrivers: string = 'https://next.json-generator.com/api/json/get/NkkJwf2KS';
  urlTasks: string = 'https://next.json-generator.com/api/json/get/NkEFbehKS';
  driversAfs: AngularFirestoreCollection<Driver>;
  tasksAfs: AngularFirestoreCollection<Task>;
  schTasksAfs: AngularFirestoreCollection<Task>;
  testAfs: AngularFirestoreCollection<Driver>;
  drivers: Driver[] = [];
  tasks: Task[] = [];
  schTasks: Task[] = [];


  constructor(private http: HttpClient, private afs: AngularFirestore) {
    this.driversAfs = afs.collection('drivers');
    this.tasksAfs = afs.collection('tasks');
    this.schTasksAfs = afs.collection('schTasks');
    this.testAfs = afs.collection('test');
  }

  getDrivers(): Observable<Driver[]> {
    return this.driversAfs.snapshotChanges().pipe(map(changes => {
      return changes.map(action => {
        const data = action.payload.doc.data() as Driver;
        data._id = action.payload.doc.id;
        return data;
      });
    }));
  }

  getTasks(): Observable<Task[]> {
    return this.tasksAfs.snapshotChanges().pipe(map(changes => {
      return changes.map(action => {
        const data = action.payload.doc.data() as Task;
        data._id = action.payload.doc.id;
        return data;
      });
    }));
  }

  getSchTasks(): Observable<Task[]> {
  return this.schTasksAfs.snapshotChanges().pipe(map(changes => {
    return changes.map(action => {
      const data = action.payload.doc.data() as Task;
      data._id = action.payload.doc.id;
      return data;
    });
  }));
  }

  save(driver: Driver) {
    this.driversAfs.add(driver);
  }

  remove(driver: Driver) {
     this.afs.doc(`drivers/${driver._id}`).delete();
  }

  // updating the tasks drivers and unscheduled tasks
  update(driver: Driver, task: Task) {
    this.afs.doc<Driver>(`drivers/${driver._id}`).update(driver);
    this.afs.doc<Task>(`tasks/${task._id}`).update(task);
    this.afs.doc(`schTasks/${task._id}`).delete();
  }

}
