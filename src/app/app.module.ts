import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EditJobComponent } from './edit-job/edit-job.component';
import { HttpClientModule } from '@angular/common/http';
import { DataService } from './data.service';
import { MqttModule } from 'ngx-mqtt';
import { ConnectMqttComponent } from './connect-mqtt/connect-mqtt.component';
import { TodoComponent } from './todo/todo.component';
import { LeafmapComponent } from './leafmap/leafmap.component';

@NgModule({
  declarations: [
    AppComponent,
    EditJobComponent,
    ConnectMqttComponent,
    TodoComponent,
    LeafmapComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MqttModule.forRoot({
      hostname: '192.168.100.1', // broker.hivemq.com
      port: 9001, // 8000
      protocol:'ws',
      path: '/mqtt'
    }),
  ],
  providers: [DataService],
  bootstrap: [AppComponent],
})
export class AppModule { }
