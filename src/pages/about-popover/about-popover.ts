import { Component } from '@angular/core';

import { App, NavController, ModalController, ViewController } from 'ionic-angular';


@Component({
  template: `
    <ion-list>
      <button ion-item (click)="close('http://ionicframework.com/docs/v2/getting-started')">Learn Ionic</button>
      <button ion-item (click)="close('http://ionicframework.com/docs/v2')">Documentation</button>
      <button ion-item (click)="close('http://showcase.ionicframework.com')">Showcase</button>
      <button ion-item (click)="close('https://github.com/ionic-team/ionic')">GitHub Repo</button>
      <button ion-item (click)="support()">Contact</button>
    </ion-list>
  `
})
export class PopoverPage {

  constructor(
    public viewCtrl: ViewController,
    public navCtrl: NavController,
    public app: App,
    public modalCtrl: ModalController
  ) { }

  support() {
    this.app.getRootNav().push('ContactPage');
    this.viewCtrl.dismiss();
  }

  close(url: string) {
    window.open(url, '_blank');
    this.viewCtrl.dismiss();
  }
}