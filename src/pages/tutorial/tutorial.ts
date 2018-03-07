import { Component, ViewChild } from '@angular/core';

import { MenuController, NavController, Slides } from 'ionic-angular';

import { Storage } from '@ionic/storage';

import { TabsPage } from '../tabs-page/tabs-page';
import { ToastController } from 'ionic-angular';

@Component({
  selector: 'page-tutorial',
  templateUrl: 'tutorial.html'
})

export class TutorialPage {
  showSkip = true;
  pwd: string;
	@ViewChild('slides') slides: Slides;

  constructor(
    public navCtrl: NavController,
    public menu: MenuController,
    public storage: Storage,
    public toastCtrl: ToastController
  ) { }

  startApp() {
    this.navCtrl.push(TabsPage).then(() => {
      this.storage.set('hasSeenTutorial', 'true');
    })
  }

  onSlideChangeStart(slider: Slides) {
    this.showSkip = !slider.isEnd();
  }

  public password = 'alks'

  onClick(){
    if (this.pwd == "reformation"){
      this.storage.set(this.password, true);
      this.startApp();
    } else {
      this.pwd = "";
      let toast = this.toastCtrl.create({
        message: 'Incorrect Password',
        duration: 3000,
        position: 'bottom'
      });
        toast.present();
    }
  }

  ionViewCanLeave() {
    this.storage.get(this.password).then((val)=>{
      return !!val
    });
  }

  ionViewCanEnter() {
    this.storage.get(this.password).then((val)=>{
      return !val
    });
  }

  ionViewDidEnter() {
    // the root left menu should be disabled on the tutorial page
    this.menu.enable(false);
  }

  ionViewDidLeave() {
    // enable the root left menu when leaving the tutorial page
    this.menu.enable(true);
  }

}
