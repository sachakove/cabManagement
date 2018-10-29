import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AgmCoreModule } from '@agm/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { environment } from '../environments/environment';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';

import { AppComponent } from './app.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { DriversComponent } from './components/drivers/drivers.component';
import { TasksComponent } from './components/tasks/tasks.component';
import { MapComponent } from './components/map/map.component';
import { MainService } from './services/main.service';
import { FilterPipe } from './filters/filter.pipe';
import { FormComponent } from './components/form/form.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    DriversComponent,
    TasksComponent,
    MapComponent,
    FilterPipe,
    FormComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBe7BnAU-SceHEZwW2tNzpNbvUHoJJiNdM'
    }),
    AngularFireModule.initializeApp(environment.firebase, 'clientpanel'),
    AngularFirestoreModule,
    AngularFireAuthModule
  ],
  providers: [MainService],
  bootstrap: [AppComponent]
})
export class AppModule { }
