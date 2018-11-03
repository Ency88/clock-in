import {Component, OnInit, ViewChild} from '@angular/core';
import {MatProgressSpinner} from '@angular/material';

@Component({
  selector: 'ci-time-component',
  templateUrl: './time-component.component.html',
  styleUrls: ['./time-component.component.scss']
})
export class TimeComponentComponent implements OnInit {
  public date: Date;
  @ViewChild('progress_spinner')
  public progress_spinner: MatProgressSpinner;

  constructor() {
  }

  ngOnInit() {
    console.log(this.progress_spinner.mode);
    this.progress_spinner.value = 90;
    this.date = new Date();
  }

  startTracking() {

  }
}
