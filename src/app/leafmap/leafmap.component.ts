import { Component,OnInit} from '@angular/core';
import * as L from 'leaflet';
import { icon, Marker } from 'leaflet';
import { MqttService } from 'ngx-mqtt';
import { DataService } from '../data.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-leafmap',
  templateUrl: './leafmap.component.html',
  styleUrls: ['./leafmap.component.css'],
  providers:[DatePipe]
})

export class LeafmapComponent{
  map:any;
  newMark:string="";
  oldMark1:string[]=[];
  MarkList:string[]=[];
  allMark:any[] = [];
  constructor(private dataService: DataService,private mqttService: MqttService,private datePipe:DatePipe) {}
  ngOnInit() {
    // get old mark
    this.dataService.getMap().subscribe((data)=>{
        //console.log(data);
	const oldMark = Object.entries(data);
	
	for (let i = 0; i < oldMark.length; i++) {
	      this.oldMark1 = Object.values(oldMark[i][1]);
              //for (let j = 0; j < oldMark1.length;j++) {
	          //console.log(typeof(oldMark1[j]));
	      //}
	      //console.log(typeof(oldMark1[1]));
	      this.addMarker(this.oldMark1[1],this.oldMark1[2],this.oldMark1[3]+" "+this.oldMark1[4]);
	}
    });
   
    // get coordinate from mqtt
    this.mqttService.connect();
    this.mqttService.observe('angularMap').subscribe((message)=>{ // topic:testxamarin
      //console.log(message.payload.toString());
      this.newMark = message.payload.toString();
      this.MarkList = this.newMark.split(",");
      //const mark = {p1:this.MarkList[0],p2:this.MarkList[1],text:this.MarkList[2],date:this.MarkList[3]};
      //this.dataService.storeMqttMap(mark).subscribe(response=>{
      //});

      // call addMarker function to draw mark
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
  userAddMark(p1:string,p2:string,text:string) {
    const now = new Date();
    const now1 = new Date(now.toLocaleString("en-US", { timeZone: "Asia/Taipei" }));
    const now2 = this.datePipe.transform(now1, 'yyyy-MM-dd HH:mm:ss');
    //console.log(now2);
    //console.log(text+" "+now2);
    this.addMarker(p1,p2,text+" "+now2);
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
