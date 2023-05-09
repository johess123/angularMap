import { Component } from '@angular/core';
import { DataService } from '../data.service';
import { MqttService } from 'ngx-mqtt';

@Component({
  selector: 'app-connect-mqtt',
  templateUrl: './connect-mqtt.component.html',
  styleUrls: ['./connect-mqtt.component.css']
})
export class ConnectMqttComponent {
  message:string[]=[];
  constructor(private dataService: DataService,private mqttService: MqttService) {}
  ngOnInit() {
      this.mqttService.connect();
      this.mqttService.observe('app/room2').subscribe((message)=>{
        this.message.push(message.payload.toString());
        const text = {content:message.payload.toString()};
        //console.log(text);
        this.dataService.storeMqtt(text).subscribe(response=>{
        });
      });
  }

  //	
  title = 'Mqtt';
  sendMqtt(message: string) {
    const text = {message:message};
    this.dataService.sendMqtt(text).subscribe(response => {
      alert('send text to Mqtt!');
      //window.location.reload();
    });
  }
}