import { Component, Input } from '@angular/core';
import { job } from '../job';

@Component({
  selector: 'app-edit-job',
  templateUrl: './edit-job.component.html',
  styleUrls: ['./edit-job.component.css']
})
export class EditJobComponent {
  // defined job which is Input from other file
  @Input() theJob!: job;
  // defined display
  display = false;
  // edit the job
  editJob(title: string, date:Date, content: string) {
    if (title=="" || date.toString()=="Invalid Date" || content=="") {
      alert("please fill in all filed!");
      this.display=false;
      return;
    }
    this.display = false;
    this.theJob.title=title;
    this.theJob.date=date;
    this.theJob.content=content;
  }
  convertDate(date: string) {
    return new Date(date);
  }
}