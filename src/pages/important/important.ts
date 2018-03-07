import { Component } from '@angular/core';
import { ConferenceData } from '../../providers/conference-data';

@Component({
  selector: 'important',
  templateUrl: 'important.html'
})
export class ImportantPage {
  cooks:ICooks;
  houseparents: any;

  constructor(public conferenceData: ConferenceData) { }

  ionViewWillEnter() {
    this.conferenceData.getCooks().subscribe((message: ICooks) => {
      this.cooks = message;
    })  

     this.conferenceData.getHouseparents().subscribe((message: any) => {
      this.houseparents = message;
    })  
  }
}

interface ICooks {
  message: string,
  imgUrl: string 
}