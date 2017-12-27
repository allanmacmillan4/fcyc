import { Component } from '@angular/core';
import { ConferenceData } from '../../providers/conference-data';

@Component({
  selector: 'cooks',
  templateUrl: 'cooks.html'
})
export class CooksPage {
  information:ICooks;

  constructor(public conferenceData: ConferenceData) { }

  ionViewWillEnter() {
    this.conferenceData.getCooks().subscribe((message: ICooks) => {
      debugger;
      this.information = message;
    })  
  }
}

interface ICooks {
  message: string,
  imgUrl: string 
}