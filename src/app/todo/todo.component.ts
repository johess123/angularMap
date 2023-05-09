import { Component } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent {
  data:any;
  constructor(private dataService: DataService) {}
  ngOnInit() {
      this.dataService.getData().subscribe((data) => {
	      this.data = data;
      });
  }
  //	
  title = 'firstapp';
  // defined filter words
  //search = "";
  // defiend job
  //allJobs = [
    //{title:"hello",date: new Date("2023-01-01"),content:"say hello",done:false},
    //{title:"goodbye",date:new Date("2023-01-02"),content:"say goodbye",done:false},
  //]
  // display job to html
  get myJob() {
    //if (this.search=="") {
    return this.data;
      //return this.allJobs;
    //}
    
    //let filterJobs = this.data.filter(function(data:job) {
      //return (data.title === filter || data.content === filter);
    //});
    //return this.data;
  }
  // function addJob
  addJob(title: string, date:string, content: string) {
    if (title=="" || date=="Invalid Date" || content=="") {
      alert("please fill in all filed!");
      return;
    }
    const job = {title:title,date:date,content:content};
    this.dataService.addData(job).subscribe(response=>{
      //console.log(response);
      alert('add job success!');
      window.location.reload();
    });
  }
  searchJob(filter: string) {
    const job = {keywords:filter};
    this.dataService.searchData(job).subscribe((data) => {
      this.data = data;
    })
  }
  // function removeJob
  removeJob(id: string) {
    const job = {id:id};
    this.dataService.deleteData(job).subscribe(response=>{
      alert('delete job success!');
      window.location.reload();
    });
  }
  convertDate(date: string) {
    return new Date(date);
  }
}
