import { Component } from '@angular/core';
import { ConferenceData } from '../../providers/conference-data';

@Component({
  selector: 'page-user',
  templateUrl: 'convenor.html'
})
export class ConvenorPage {
  message: string;

  constructor(public conferenceData: ConferenceData) { }

  ionViewWillEnter() {
    this.conferenceData.getConvenorsMessage().subscribe((message: string) => {
      this.message = message;
    })  
  }
}
