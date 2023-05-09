import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TodoComponent } from './todo/todo.component' 
import { ConnectMqttComponent } from './connect-mqtt/connect-mqtt.component'
import { LeafmapComponent } from './leafmap/leafmap.component'

const routes: Routes = [
  {path:'todo',component:TodoComponent},
  {path:'mqtt',component:ConnectMqttComponent},
  {path:'map',component:LeafmapComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }