import { Component } from '@angular/core';
import { ConferenceData } from '../../providers/conference-data';

@Component({
  selector: 'information',
  templateUrl: 'information.html'
})
export class InformationPage {
  information: ICardInfo[] = [];

  constructor(public conferenceData: ConferenceData) { }

  ionViewWillEnter() {
    this.conferenceData.getInformation().subscribe((message: ICardInfo[]) => {
      this.information = message;
    })  
  }
}

interface ICardInfo {
  title: string, 
  body: string
}