import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular';

import { ConferenceData } from '../../providers/conference-data';

@Component({
  selector: 'page-session-detail',
  templateUrl: 'session-detail.html'
})
export class SessionDetailPage {
  session: any;

  constructor(
    public dataProvider: ConferenceData,
    public navParams: NavParams
  ) {}

  ionViewWillEnter() {
    this.dataProvider.load().subscribe((data: any) => {

      if (data && data.schedule) {
        // let index = data.schedule.findIndex(x => x.date === this.navParams.data.segment);
        // if (index === -1){
        //   return;
        // }
        for(let index =0; index <  data.schedule.length; index++){
          for (const group of data.schedule[index].groups) {
          if (group && group.sessions) {
            for (const session of group.sessions) {
              if (session && session.id === this.navParams.data.sessionId) {
                this.session = session;
                break;
              }
            }
          }
        }
        }
        
      }
    });
  }
}
