import { Component } from '@angular/core';
import { job } from './job';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'firstapp';
  // defined filter words
  search = "";
  // defiend job
  allJobs = [
    {title:"hello",date: new Date("2023-01-01"),content:"say hello",done:false},
    {title:"goodbye",date:new Date("2023-01-02"),content:"say goodbye",done:false},
  ]
  // display job to html
  get myJob() {
    if (this.search=="") {
      return this.allJobs;
    }
    let filter = this.search;
    let filterJobs = this.allJobs.filter(function(allJob) {
      return (allJob.title === filter || allJob.content === filter);
    });
    return filterJobs;
  }
  // function addJob
  addJob(title: string, date:Date, content: string) {
    if (title=="" || date.toString()=="Invalid Date" || content=="") {
      alert("please fill in all filed!");
      return;
    }
    this.allJobs.push({
      title,
      date,
      content,
      done: false
    });
  }
  // function removeJob
  removeJob(theJob: job) {
    this.allJobs.splice(this.allJobs.indexOf(theJob),1);
  }
  convertDate(date: string) {
    return new Date(date);
  }
}