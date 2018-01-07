import { Component } from '@angular/core';

import { ConferenceData } from '../../providers/conference-data';

import { Platform } from 'ionic-angular';

@Component({
  selector: 'page-map',
  templateUrl: 'map.html'
})
export class MapPage {

  constructor(public confData: ConferenceData, public platform: Platform) {
  }

  ionViewDidLoad() {

  }
}
