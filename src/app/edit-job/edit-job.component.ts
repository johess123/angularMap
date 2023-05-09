import { Component, Input, OnInit} from '@angular/core';
import { job } from '../job';
import { DataService } from '../data.service';

@Component({
  selector: 'app-edit-job',
  templateUrl: './edit-job.component.html',
  styleUrls: ['./edit-job.component.css']
})
export class EditJobComponent implements OnInit{
  //
  data:any;
  // defined job which is Input from other file
  @Input() theJob!: job;
  constructor(private dataService: DataService) { }
  ngOnInit() {
      this.dataService.getData().subscribe((data) => {
	  this.data = data;
      });
  }
  // defined display
  display = false;
  id = "";
  // edit the job
  editJob(title: string, date:string, content: string) {
    if (title=="" || date=="" || content=="") {
      alert("please fill in all filed!");
      this.display=false;
      return;
    }
    this.id = this.theJob.id;
    const job = {id:this.id,title:title,date:date,content:content};
    this.dataService.editData(job).subscribe(response=>{
      //console.log(response);
      alert('edit job success!');
      window.location.reload();
    });
  }
  convertDate(date: string) {
    return new Date(date);
  }
}