import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class DataService {
    constructor(private http: HttpClient) {}
    getData() {
        const httpOptions = {
	        headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
	            'Access-Control-Alllow-Origin': '*',
		        'Access-Control-Allow-Methods': 'GET,POST,PUT,DELETE"'
	        })
	    };
	    return this.http.post('http://192.168.31.224/data.php', httpOptions);						
    }
    addData(job: Object){
	    return this.http.post('http://192.168.31.224/insert.php', job);
    }
    searchData(job: Object){
	    return this.http.post('http://192.168.31.224/search.php', job);
    }
    editData(job: Object){
	    return this.http.post('http://192.168.31.224/edit.php', job);
    }
    deleteData(job: Object){
        return this.http.post('http://192.168.31.224/delete.php', job);
    }
    sendMqtt(text: Object){
        return this.http.post('http://192.168.31.224/connectMqtt.php',text);
    }
    storeMqtt(text:Object){
        return this.http.post('http://192.168.31.224/storeMqtt.php',text);
    }
    sendMqttMap(text: Object){
        return this.http.post('http://192.168.31.224/sendMqttMap.php',text);
    }
    storeMqttMap(mark:Object){
        return this.http.post('http://192.168.31.224/storeMqttMap.php',mark);
    }
}
