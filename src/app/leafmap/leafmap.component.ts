import { Component,OnInit} from '@angular/core';
import * as L from 'leaflet';
import { icon, Marker } from 'leaflet';
import { MqttService } from 'ngx-mqtt';
import { DataService } from '../data.service';

@Component({
  selector: 'app-leafmap',
  templateUrl: './leafmap.component.html',
  styleUrls: ['./leafmap.component.css']
})

export class LeafmapComponent{
  map:any;
  newMark:string="";
  MarkList:string[]=[];
  allMark:any[] = [];
  constructor(private dataService: DataService,private mqttService: MqttService) {}
  ngOnInit() {
    // get coordinate from mqtt
    this.mqttService.connect();
    this.mqttService.observe('Rocky').subscribe((message)=>{ // topic:testxamarin
      //console.log(message.payload.toString());
      this.newMark = message.payload.toString();
      this.MarkList = this.newMark.split(",");
      //const mark = {p1:this.MarkList[0],p2:this.MarkList[1],text:this.MarkList[2]};
      //this.dataService.storeMqttMap(mark).subscribe(response=>{
      //});
      // call addMarker function to add mark
      this.addMarker(this.MarkList[0],this.MarkList[1],this.MarkList[2]);
    });
    const iconRetinaUrl = 'assets/marker-icon-2x.png';
    const iconUrl = 'assets/marker-icon.png';
    const shadowUrl = 'assets/marker-shadow.png';
    const iconDefault = icon ({
      iconRetinaUrl,
      iconUrl,
      shadowUrl,
      iconSize: [25,41],
      iconAnchor: [12,41],
      popupAnchor: [1,-34],
      tooltipAnchor: [16,-28],
      shadowSize: [41,41]
    });
    Marker.prototype.options.icon = iconDefault;
    this.map = L.map('map', {
      center: [23.952672279106505, 120.92716871995295],
      zoom: 16
    });
    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      minZoom: 3,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });
    const marker1 = L
      .marker([23.952672279106505, 120.92716871995295],{title:'管院'})
      .addTo(this.map)
      .bindPopup("<h1>管院在這裡</h1>");
    marker1.openPopup();
    tiles.addTo(this.map);
  }
  addMarker(p1:string,p2:string,text:string) {
    // add mark
    const newMark = L
      .marker([this.convertNum(p1), this.convertNum(p2)],{title:text})
      .addTo(this.map)
      .bindPopup("<h1>"+text+"</h1>")
    // draw line
    this.allMark.push([this.convertNum(p1),this.convertNum(p2)]);
    L.polyline(this.allMark,{color:"blue"}).addTo(this.map);
  }

  //sendMqtt(p1:string,p2:string,text:string) {
  // const addmark = {message:p1+","+p2+","+text};
  //   this.dataService.sendMqttMap(addmark).subscribe(response => {
  //     alert('send mark to Mqtt!');
  //     //window.location.reload();
  //   });
  //}
  convertNum(text:string) {
    return parseFloat(text);
  }
}
