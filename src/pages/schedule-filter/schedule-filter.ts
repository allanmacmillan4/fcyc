import { Component } from '@angular/core';

import { NavParams, ViewController } from 'ionic-angular';

import { ConferenceData } from '../../providers/conference-data';


@Component({
  selector: 'page-schedule-filter',
  templateUrl: 'schedule-filter.html'
})
export class ScheduleFilterPage {
  tracks: Array<{name: string, isChecked: boolean}> = [];

  constructor(
    public confData: ConferenceData,
    public navParams: NavParams,
    public viewCtrl: ViewController
  ) {
    // passed in array of track names that should be excluded (unchecked)
    let excludedTrackNames = this.navParams.data;

    this.confData.getTracks().subscribe((trackNames: string[]) => {

      trackNames.forEach(trackName => {
        this.tracks.push({
          name: trackName,
          isChecked: (excludedTrackNames.indexOf(trackName) === -1)
        });
      });

    });
  }

  resetFilters(val: boolean) {
    // reset all of the toggles to be checked
    this.tracks.forEach(track => {
      track.isChecked = val;
    });
  }

  applyFilters() {
    // Pass back a new array of track names to exclude
    let excludedTrackNames = this.tracks.filter(c => !c.isChecked).map(c => c.name);
    this.dismiss(excludedTrackNames);
  }

  color =  {
    chill : '#AC282B',
    mainmeeting : '#8E8D93',
    prayer: '#FE4C52',
    seminarsession1: '#FD8B2D',
    seminarsession2 : '#FED035',
    misc : '#69BB7B',
    food : '#3BC7C4',
    seminarsession3: '#B16BE3'
  }

  getColor(name: string) {
        return this.color[name.toLowerCase().replace(/\s/g, '')];
  }

  dismiss(data?: any) {
    // using the injected ViewController this page
    // can "dismiss" itself and pass back data
    this.viewCtrl.dismiss(data);
  }
}
